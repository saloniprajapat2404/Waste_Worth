package com.waste2worth.controller;

import com.waste2worth.dto.*;
import com.waste2worth.entity.PickupStatusHistory;
import com.waste2worth.service.PickupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pickups")
@Tag(name = "Pickup Management", description = "Endpoints for pickup scheduling, collector tracking, and journey status updates")
public class PickupController {

    private final PickupService pickupService;

    public PickupController(PickupService pickupService) {
        this.pickupService = pickupService;
    }

    @PostMapping
    @Operation(summary = "Schedule a waste pickup request")
    public ResponseEntity<ApiResponse<PickupRequestDTO>> requestPickup(@Valid @RequestBody PickupRequestDTO request, Authentication authentication) {
        PickupRequestDTO response = pickupService.requestPickup(request, authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Pickup scheduled successfully!", response));
    }

    @GetMapping
    @Operation(summary = "Get current user's pickup requests")
    public ResponseEntity<ApiResponse<List<PickupRequestDTO>>> getUserPickups(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Pickups retrieved", pickupService.getUserPickups(authentication.getName())));
    }

    @GetMapping("/collector")
    @Operation(summary = "Get collector's assigned pickup requests")
    public ResponseEntity<ApiResponse<List<PickupRequestDTO>>> getCollectorPickups(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Collector pickups retrieved", pickupService.getCollectorPickups(authentication.getName())));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get pickup details by ID")
    public ResponseEntity<ApiResponse<PickupRequestDTO>> getPickupById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Pickup details", pickupService.getPickupById(id)));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update pickup status (Collector/Admin)")
    public ResponseEntity<ApiResponse<PickupRequestDTO>> updateStatus(@PathVariable Long id, @Valid @RequestBody UpdatePickupStatusDTO dto, Authentication authentication) {
        PickupRequestDTO response = pickupService.updateStatus(id, dto, "COLLECTOR");
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated to " + dto.getStatus(), response));
    }

    @GetMapping("/{id}/history")
    @Operation(summary = "Get step-by-step status history timeline for waste journey tracking")
    public ResponseEntity<ApiResponse<List<PickupStatusHistory>>> getStatusHistory(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Status history retrieved", pickupService.getStatusHistory(id)));
    }
}
