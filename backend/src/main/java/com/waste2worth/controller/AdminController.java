package com.waste2worth.controller;

import com.waste2worth.dto.AdminDashboardStatsDTO;
import com.waste2worth.dto.ApiResponse;
import com.waste2worth.entity.*;
import com.waste2worth.service.AdminService;
import com.waste2worth.service.PickupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Platform Management", description = "Endpoints for platform analytics, pricing configuration, collector verification, and user management")
public class AdminController {

    private final AdminService adminService;
    private final PickupService pickupService;

    public AdminController(AdminService adminService, PickupService pickupService) {
        this.adminService = adminService;
        this.pickupService = pickupService;
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get platform-wide admin analytics statistics")
    public ResponseEntity<ApiResponse<AdminDashboardStatsDTO>> getDashboardStats() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats retrieved", adminService.getDashboardStats()));
    }

    @GetMapping("/users")
    @Operation(summary = "Get list of all platform users")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Users retrieved", adminService.getAllUsers()));
    }

    @PutMapping("/users/{id}/toggle-status")
    @Operation(summary = "Block/Unblock user account")
    public ResponseEntity<ApiResponse<User>> toggleUserStatus(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "User status updated", adminService.toggleUserStatus(id)));
    }

    @GetMapping("/collectors")
    @Operation(summary = "Get list of all recyclers and NGOs")
    public ResponseEntity<ApiResponse<List<CollectorProfile>>> getAllCollectors() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Collectors retrieved", adminService.getAllCollectors()));
    }

    @PutMapping("/collectors/{id}/verify")
    @Operation(summary = "Approve/Reject collector or NGO application")
    public ResponseEntity<ApiResponse<CollectorProfile>> verifyCollector(@PathVariable Long id, @RequestParam VerificationStatus status) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Collector verification updated", adminService.updateCollectorVerification(id, status)));
    }

    @PutMapping("/categories/{id}")
    @Operation(summary = "Configure waste category prices, points, and environmental factors")
    public ResponseEntity<ApiResponse<WasteCategory>> updateCategoryPricing(@PathVariable Long id, @RequestBody WasteCategory category) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Category updated", adminService.updateCategoryPricing(id, category)));
    }

    @GetMapping("/pickups")
    @Operation(summary = "Get all platform pickup requests")
    public ResponseEntity<ApiResponse<List<?>>> getAllPickups() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Pickups retrieved", pickupService.getAllPickups()));
    }
}
