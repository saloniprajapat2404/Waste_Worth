package com.waste2worth.controller;

import com.waste2worth.dto.ApiResponse;
import com.waste2worth.entity.*;
import com.waste2worth.service.GreenPointsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rewards")
@Tag(name = "Rewards & Green Points", description = "Endpoints for reward catalog, points transaction ledger, and reward redemptions")
public class RewardController {

    private final GreenPointsService greenPointsService;

    public RewardController(GreenPointsService greenPointsService) {
        this.greenPointsService = greenPointsService;
    }

    @GetMapping
    @Operation(summary = "Get active reward catalog")
    public ResponseEntity<ApiResponse<List<Reward>>> getRewards() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Rewards retrieved", greenPointsService.getAvailableRewards()));
    }

    @PostMapping("/{id}/redeem")
    @Operation(summary = "Redeem reward with Green Points")
    public ResponseEntity<ApiResponse<RewardRedemption>> redeemReward(@PathVariable Long id, Authentication authentication) {
        RewardRedemption redemption = greenPointsService.redeemReward(id, authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Reward redeemed successfully!", redemption));
    }

    @GetMapping("/my-redemptions")
    @Operation(summary = "Get current user's redeemed rewards wallet")
    public ResponseEntity<ApiResponse<List<RewardRedemption>>> getMyRedemptions(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Redemptions retrieved", greenPointsService.getUserRedemptions(authentication.getName())));
    }

    @GetMapping("/history")
    @Operation(summary = "Get user Green Points transaction log")
    public ResponseEntity<ApiResponse<List<GreenPointTransaction>>> getPointsHistory(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Point history retrieved", greenPointsService.getUserPointHistory(authentication.getName())));
    }

    @GetMapping("/achievements")
    @Operation(summary = "Get current user's unlocked badges and achievements")
    public ResponseEntity<ApiResponse<List<UserAchievement>>> getMyAchievements(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Achievements retrieved", greenPointsService.getUserAchievements(authentication.getName())));
    }
}
