package com.waste2worth.service;

import com.waste2worth.dto.*;
import com.waste2worth.entity.*;
import com.waste2worth.exception.BadRequestException;
import com.waste2worth.exception.ResourceNotFoundException;
import com.waste2worth.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PickupService {

    private final PickupRequestRepository pickupRequestRepository;
    private final PickupStatusHistoryRepository statusHistoryRepository;
    private final WasteSubmissionRepository wasteSubmissionRepository;
    private final RecommendationRepository recommendationRepository;
    private final CollectorProfileRepository collectorProfileRepository;
    private final UserRepository userRepository;
    private final GreenPointTransactionRepository pointTransactionRepository;
    private final NotificationRepository notificationRepository;

    public PickupService(PickupRequestRepository pickupRequestRepository,
                         PickupStatusHistoryRepository statusHistoryRepository,
                         WasteSubmissionRepository wasteSubmissionRepository,
                         RecommendationRepository recommendationRepository,
                         CollectorProfileRepository collectorProfileRepository,
                         UserRepository userRepository,
                         GreenPointTransactionRepository pointTransactionRepository,
                         NotificationRepository notificationRepository) {
        this.pickupRequestRepository = pickupRequestRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.wasteSubmissionRepository = wasteSubmissionRepository;
        this.recommendationRepository = recommendationRepository;
        this.collectorProfileRepository = collectorProfileRepository;
        this.userRepository = userRepository;
        this.pointTransactionRepository = pointTransactionRepository;
        this.notificationRepository = notificationRepository;
    }

    @Transactional
    public PickupRequestDTO requestPickup(PickupRequestDTO req, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        WasteSubmission submission = wasteSubmissionRepository.findById(req.getWasteSubmissionId())
                .orElseThrow(() -> new ResourceNotFoundException("Waste submission not found"));

        Recommendation recommendation = recommendationRepository.findByWasteSubmissionId(submission.getId()).orElse(null);

        CollectorProfile assignedCollector = null;
        if (recommendation != null && recommendation.getNearbyCollectorId() != null) {
            assignedCollector = collectorProfileRepository.findById(recommendation.getNearbyCollectorId()).orElse(null);
        }
        if (assignedCollector == null) {
            List<CollectorProfile> list = collectorProfileRepository.findAll();
            if (!list.isEmpty()) assignedCollector = list.get(0);
        }

        PickupRequest pickup = new PickupRequest();
        pickup.setWasteSubmission(submission);
        pickup.setUser(user);
        pickup.setCollector(assignedCollector);
        pickup.setPickupAddress(req.getPickupAddress());
        pickup.setCity(req.getCity() != null ? req.getCity() : user.getCity());
        pickup.setPincode(req.getPincode() != null ? req.getPincode() : user.getPincode());
        pickup.setPreferredDate(req.getPreferredDate());
        pickup.setPreferredTimeSlot(req.getPreferredTimeSlot());
        pickup.setNotes(req.getNotes());
        pickup.setStatus(PickupStatus.REQUESTED);

        PickupRequest saved = pickupRequestRepository.save(pickup);

        // Audit Trail
        statusHistoryRepository.save(new PickupStatusHistory(saved, PickupStatus.REQUESTED, "USER", "Pickup request created"));

        submission.setStatus("PICKUP_REQUESTED");
        wasteSubmissionRepository.save(submission);

        // Notification
        notificationRepository.save(new Notification(
                user,
                "Pickup Request Submitted",
                "Your pickup request for " + submission.getItemTitle() + " has been scheduled for " + req.getPreferredDate() + ".",
                "PICKUP_STATUS"
        ));

        return mapToDTO(saved);
    }

    @Transactional
    public PickupRequestDTO updateStatus(Long pickupId, UpdatePickupStatusDTO req, String updatedByRole) {
        PickupRequest pickup = pickupRequestRepository.findById(pickupId)
                .orElseThrow(() -> new ResourceNotFoundException("Pickup request not found: " + pickupId));

        PickupStatus newStatus = req.getStatus();
        pickup.setStatus(newStatus);

        if (req.getActualQuantityKg() != null) pickup.setActualQuantityKg(req.getActualQuantityKg());
        if (req.getVerifiedValue() != null) pickup.setVerifiedValue(req.getVerifiedValue());
        if (req.getProofImageUrl() != null) pickup.setProofImageUrl(req.getProofImageUrl());

        if (req.getAssignedCollectorId() != null) {
            CollectorProfile cp = collectorProfileRepository.findById(req.getAssignedCollectorId()).orElse(null);
            if (cp != null) pickup.setCollector(cp);
        }

        if (newStatus == PickupStatus.COMPLETED) {
            pickup.setCompletedAt(LocalDateTime.now());
            processCompletionRewards(pickup);
        }

        PickupRequest saved = pickupRequestRepository.save(pickup);

        // Status history log
        statusHistoryRepository.save(new PickupStatusHistory(saved, newStatus, updatedByRole, req.getComments() != null ? req.getComments() : "Status updated to " + newStatus));

        // Send notification to citizen
        notificationRepository.save(new Notification(
                pickup.getUser(),
                "Pickup Status Update: " + newStatus,
                "Your pickup for " + pickup.getWasteSubmission().getItemTitle() + " status is now " + newStatus + ".",
                "PICKUP_STATUS"
        ));

        return mapToDTO(saved);
    }

    private void processCompletionRewards(PickupRequest pickup) {
        User user = pickup.getUser();
        WasteSubmission submission = pickup.getWasteSubmission();
        Recommendation rec = recommendationRepository.findByWasteSubmissionId(submission.getId()).orElse(null);

        double actualKg = pickup.getActualQuantityKg() != null ? pickup.getActualQuantityKg() : submission.getEstimatedQuantity();
        double valueEarned = pickup.getVerifiedValue() != null ? pickup.getVerifiedValue() : submission.getEstimatedValueMin();

        int pointsEarned = rec != null ? rec.getGreenPointsReward() : 50;
        pickup.setEarnedGreenPoints(pointsEarned);

        // Update User Totals
        user.setGreenPoints(user.getGreenPoints() + pointsEarned);
        user.setTotalWasteDivertedKg(user.getTotalWasteDivertedKg() + actualKg);
        user.setTotalValueEarned(user.getTotalValueEarned() + valueEarned);
        user.setImpactScore(user.getImpactScore() + (rec != null ? rec.getEstimatedImpactScore() : 25));

        if (rec != null) {
            if (rec.getRecommendedAction() == RecommendedAction.REUSE) user.setItemsReusedCount(user.getItemsReusedCount() + 1);
            else if (rec.getRecommendedAction() == RecommendedAction.DONATE) user.setItemsDonatedCount(user.getItemsDonatedCount() + 1);
            else if (rec.getRecommendedAction() == RecommendedAction.RECYCLE) user.setItemsRecycledCount(user.getItemsRecycledCount() + 1);
        }

        userRepository.save(user);

        // Transaction log
        pointTransactionRepository.save(new GreenPointTransaction(
                user,
                pointsEarned,
                "EARNED_" + (rec != null ? rec.getRecommendedAction().name() : "RECYCLE"),
                "Earned " + pointsEarned + " Green Points for completed waste action on " + submission.getItemTitle()
        ));

        // Award notification
        notificationRepository.save(new Notification(
                user,
                "🏆 Green Points Earned!",
                "You earned +" + pointsEarned + " Green Points for recycling/donating " + submission.getItemTitle() + "! Total score: " + user.getGreenPoints(),
                "POINTS_EARNED"
        ));
    }

    public List<PickupRequestDTO> getUserPickups(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return pickupRequestRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<PickupRequestDTO> getCollectorPickups(String collectorEmail) {
        User user = userRepository.findByEmail(collectorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        CollectorProfile cp = collectorProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Collector profile not found for user"));
        return pickupRequestRepository.findByCollectorIdOrderByCreatedAtDesc(cp.getId())
                .stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public List<PickupRequestDTO> getAllPickups() {
        return pickupRequestRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public PickupRequestDTO getPickupById(Long id) {
        PickupRequest p = pickupRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pickup request not found with ID: " + id));
        return mapToDTO(p);
    }

    public List<PickupStatusHistory> getStatusHistory(Long pickupId) {
        return statusHistoryRepository.findByPickupRequestIdOrderByTimestampAsc(pickupId);
    }

    private PickupRequestDTO mapToDTO(PickupRequest p) {
        PickupRequestDTO dto = new PickupRequestDTO();
        dto.setId(p.getId());
        dto.setWasteSubmissionId(p.getWasteSubmission().getId());
        dto.setItemTitle(p.getWasteSubmission().getItemTitle());
        dto.setCategoryName(p.getWasteSubmission().getCategory() != null ? p.getWasteSubmission().getCategory().getName() : "General Waste");
        dto.setUserId(p.getUser().getId());
        dto.setUserName(p.getUser().getName());
        dto.setUserPhone(p.getUser().getPhone());
        if (p.getCollector() != null) {
            dto.setCollectorId(p.getCollector().getId());
            dto.setCollectorOrganizationName(p.getCollector().getOrganizationName());
        }
        dto.setPickupAddress(p.getPickupAddress());
        dto.setCity(p.getCity());
        dto.setPincode(p.getPincode());
        dto.setPreferredDate(p.getPreferredDate());
        dto.setPreferredTimeSlot(p.getPreferredTimeSlot());
        dto.setStatus(p.getStatus());
        dto.setNotes(p.getNotes());
        dto.setActualQuantityKg(p.getActualQuantityKg());
        dto.setVerifiedValue(p.getVerifiedValue());
        dto.setEarnedGreenPoints(p.getEarnedGreenPoints());
        dto.setProofImageUrl(p.getProofImageUrl());
        dto.setCompletedAt(p.getCompletedAt());
        dto.setCreatedAt(p.getCreatedAt());
        return dto;
    }
}
