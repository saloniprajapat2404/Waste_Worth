package com.waste2worth.controller;

import com.waste2worth.dto.ApiResponse;
import com.waste2worth.dto.CollectorCenterDTO;
import com.waste2worth.service.CollectorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/centers")
@Tag(name = "Recycler & NGO Discovery", description = "Endpoints for discovering nearby recyclers, NGOs, donation centers, and scrap collectors")
public class CenterController {

    private final CollectorService collectorService;

    public CenterController(CollectorService collectorService) {
        this.collectorService = collectorService;
    }

    @GetMapping("/nearby")
    @Operation(summary = "Get verified nearby recyclers, NGOs, and donation centers for map filtering")
    public ResponseEntity<ApiResponse<List<CollectorCenterDTO>>> getNearbyCenters(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String material) {
        List<CollectorCenterDTO> list = collectorService.getNearbyCenters(type, material);
        return ResponseEntity.ok(new ApiResponse<>(true, "Centers retrieved successfully", list));
    }
}
