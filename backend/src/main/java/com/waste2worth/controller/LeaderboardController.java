package com.waste2worth.controller;

import com.waste2worth.dto.ApiResponse;
import com.waste2worth.dto.LeaderboardEntryDTO;
import com.waste2worth.service.GreenPointsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@Tag(name = "Community Leaderboard", description = "Endpoints for monthly eco champions and community rankings")
public class LeaderboardController {

    private final GreenPointsService greenPointsService;

    public LeaderboardController(GreenPointsService greenPointsService) {
        this.greenPointsService = greenPointsService;
    }

    @GetMapping
    @Operation(summary = "Get top 10 Green Champions leaderboard")
    public ResponseEntity<ApiResponse<List<LeaderboardEntryDTO>>> getLeaderboard() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Leaderboard retrieved", greenPointsService.getLeaderboard()));
    }
}
