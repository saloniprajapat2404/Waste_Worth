package com.waste2worth.service;

import com.waste2worth.dto.LeaderboardEntryDTO;
import com.waste2worth.entity.*;
import com.waste2worth.exception.BadRequestException;
import com.waste2worth.exception.ResourceNotFoundException;
import com.waste2worth.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class GreenPointsService {

    private final UserRepository userRepository;
    private final GreenPointTransactionRepository transactionRepository;
    private final RewardRepository rewardRepository;
    private final RewardRedemptionRepository redemptionRepository;
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final NotificationRepository notificationRepository;

    public GreenPointsService(UserRepository userRepository,
                              GreenPointTransactionRepository transactionRepository,
                              RewardRepository rewardRepository,
                              RewardRedemptionRepository redemptionRepository,
                              AchievementRepository achievementRepository,
                              UserAchievementRepository userAchievementRepository,
                              NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.transactionRepository = transactionRepository;
        this.rewardRepository = rewardRepository;
        this.redemptionRepository = redemptionRepository;
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.notificationRepository = notificationRepository;
    }

    public List<GreenPointTransaction> getUserPointHistory(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return transactionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public List<Reward> getAvailableRewards() {
        return rewardRepository.findByActiveTrue();
    }

    @Transactional
    public RewardRedemption redeemReward(Long rewardId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Reward reward = rewardRepository.findById(rewardId)
                .orElseThrow(() -> new ResourceNotFoundException("Reward not found with ID: " + rewardId));

        if (user.getGreenPoints() < reward.getPointsRequired()) {
            throw new BadRequestException("Insufficient Green Points! Required: " + reward.getPointsRequired() + ", Current: " + user.getGreenPoints());
        }

        // Deduct points
        user.setGreenPoints(user.getGreenPoints() - reward.getPointsRequired());
        userRepository.save(user);

        // Record point transaction
        transactionRepository.save(new GreenPointTransaction(
                user,
                -reward.getPointsRequired(),
                "REDEEMED_REWARD",
                "Redeemed reward: " + reward.getTitle()
        ));

        // Generate unique redemption code
        String code = "W2W-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        RewardRedemption redemption = new RewardRedemption(user, reward, reward.getPointsRequired(), code);
        RewardRedemption saved = redemptionRepository.save(redemption);

        // Notification
        notificationRepository.save(new Notification(
                user,
                "🎁 Reward Redeemed!",
                "You successfully redeemed " + reward.getTitle() + "! Use voucher code: " + code,
                "REWARD_REDEEMED"
        ));

        return saved;
    }

    public List<RewardRedemption> getUserRedemptions(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return redemptionRepository.findByUserIdOrderByRedeemedAtDesc(user.getId());
    }

    public List<LeaderboardEntryDTO> getLeaderboard() {
        List<User> topUsers = userRepository.findTop10ByOrderByGreenPointsDesc();
        AtomicInteger rank = new AtomicInteger(1);
        return topUsers.stream().map(u -> new LeaderboardEntryDTO(
                rank.getAndIncrement(),
                u.getId(),
                u.getName(),
                u.getCity() != null ? u.getCity() : "Green City",
                u.getGreenPoints(),
                u.getTotalWasteDivertedKg(),
                u.getImpactScore()
        )).collect(Collectors.toList());
    }

    public List<UserAchievement> getUserAchievements(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return userAchievementRepository.findByUserIdOrderByUnlockedAtDesc(user.getId());
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }
}
