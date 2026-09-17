package com.waste2worth.service;

import com.waste2worth.dto.*;
import com.waste2worth.entity.*;
import com.waste2worth.exception.ResourceNotFoundException;
import com.waste2worth.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WasteSubmissionService {

    private final WasteSubmissionRepository wasteSubmissionRepository;
    private final WasteCategoryRepository wasteCategoryRepository;
    private final RecommendationRepository recommendationRepository;
    private final RecommendationEngineService recommendationEngineService;
    private final UserRepository userRepository;

    public WasteSubmissionService(WasteSubmissionRepository wasteSubmissionRepository,
                                  WasteCategoryRepository wasteCategoryRepository,
                                  RecommendationRepository recommendationRepository,
                                  RecommendationEngineService recommendationEngineService,
                                  UserRepository userRepository) {
        this.wasteSubmissionRepository = wasteSubmissionRepository;
        this.wasteCategoryRepository = wasteCategoryRepository;
        this.recommendationRepository = recommendationRepository;
        this.recommendationEngineService = recommendationEngineService;
        this.userRepository = userRepository;
    }

    @Transactional
    public WasteSubmissionResponse submitWaste(WasteSubmissionRequest req, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        WasteCategory category = null;
        if (req.getCategoryCode() != null && !req.getCategoryCode().isEmpty()) {
            category = wasteCategoryRepository.findByCode(req.getCategoryCode())
                    .orElseGet(() -> wasteCategoryRepository.findByNameIgnoreCase(req.getCategoryCode()).orElse(null));
        }

        WasteSubmission submission = new WasteSubmission(
                user,
                category,
                req.getItemTitle(),
                req.getDescription(),
                req.getConditionState(),
                req.getEstimatedQuantity() != null ? req.getEstimatedQuantity() : 1.0,
                req.getUnit() != null ? req.getUnit() : "KG",
                req.getImageUrl() != null ? req.getImageUrl() : "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=60"
        );

        WasteSubmission savedSubmission = wasteSubmissionRepository.save(submission);

        // Generate Smart Recommendation
        Recommendation recommendation = recommendationEngineService.generateRecommendation(savedSubmission);
        Recommendation savedRec = recommendationRepository.save(recommendation);

        savedSubmission.setStatus("RECOMMENDED");
        wasteSubmissionRepository.save(savedSubmission);

        return mapToResponse(savedSubmission, savedRec);
    }

    public List<WasteSubmissionResponse> getUserSubmissions(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<WasteSubmission> list = wasteSubmissionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return list.stream().map(sub -> {
            Recommendation rec = recommendationRepository.findByWasteSubmissionId(sub.getId()).orElse(null);
            return mapToResponse(sub, rec);
        }).collect(Collectors.toList());
    }

    public WasteSubmissionResponse getSubmissionById(Long id) {
        WasteSubmission sub = wasteSubmissionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Submission not found with ID: " + id));
        Recommendation rec = recommendationRepository.findByWasteSubmissionId(sub.getId()).orElse(null);
        return mapToResponse(sub, rec);
    }

    private WasteSubmissionResponse mapToResponse(WasteSubmission sub, Recommendation rec) {
        WasteSubmissionResponse res = new WasteSubmissionResponse();
        res.setId(sub.getId());
        res.setItemTitle(sub.getItemTitle());
        res.setCategoryName(sub.getCategory() != null ? sub.getCategory().getName() : "General Waste");
        res.setCategoryCode(sub.getCategory() != null ? sub.getCategory().getCode() : "OTHER");
        res.setDescription(sub.getDescription());
        res.setConditionState(sub.getConditionState());
        res.setEstimatedQuantity(sub.getEstimatedQuantity());
        res.setUnit(sub.getUnit());
        res.setEstimatedValueMin(sub.getEstimatedValueMin());
        res.setEstimatedValueMax(sub.getEstimatedValueMax());
        res.setImageUrl(sub.getImageUrl());
        res.setStatus(sub.getStatus());
        res.setCreatedAt(sub.getCreatedAt());

        if (rec != null) {
            res.setRecommendedAction(rec.getRecommendedAction());
            res.setRecommendationConfidence(rec.getConfidenceScore());
            res.setRationale(rec.getRationale());
            res.setGreenPointsReward(rec.getGreenPointsReward());
            res.setEstimatedImpactScore(rec.getEstimatedImpactScore());
            res.setNearbyCollectorName(rec.getNearbyCollectorName());
            res.setNearbyCollectorDistanceKm(rec.getNearbyCollectorDistanceKm());
        }

        return res;
    }
}
