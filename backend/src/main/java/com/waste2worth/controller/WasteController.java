package com.waste2worth.controller;

import com.waste2worth.dto.*;
import com.waste2worth.entity.WasteCategory;
import com.waste2worth.repository.WasteCategoryRepository;
import com.waste2worth.service.ModularClassificationService;
import com.waste2worth.service.WasteSubmissionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/waste")
@Tag(name = "Waste & Recommendations", description = "Endpoints for waste submission, modular category identification, and smart recommendations")
public class WasteController {

    private final WasteSubmissionService wasteSubmissionService;
    private final WasteCategoryRepository wasteCategoryRepository;
    private final ModularClassificationService classificationService;

    public WasteController(WasteSubmissionService wasteSubmissionService,
                           WasteCategoryRepository wasteCategoryRepository,
                           ModularClassificationService classificationService) {
        this.wasteSubmissionService = wasteSubmissionService;
        this.wasteCategoryRepository = wasteCategoryRepository;
        this.classificationService = classificationService;
    }

    @GetMapping("/categories")
    @Operation(summary = "List all active waste categories and base pricing")
    public ResponseEntity<ApiResponse<List<WasteCategory>>> getCategories() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Categories retrieved", wasteCategoryRepository.findByActiveTrue()));
    }

    @PostMapping("/classify")
    @Operation(summary = "Modular classifier — identifies category and condition from text/photo keywords")
    public ResponseEntity<ApiResponse<ClassificationResultResponse>> classifyItem(@RequestBody Map<String, String> payload) {
        String query = payload.getOrDefault("query", payload.getOrDefault("fileName", "old item"));
        String originalFileName = payload.get("originalFileName");
        ClassificationResultResponse response = classificationService.classifyItem(query, originalFileName);
        return ResponseEntity.ok(new ApiResponse<>(true, "Classification successful", response));
    }

    @PostMapping
    @Operation(summary = "Submit waste item for recommendation engine analysis")
    public ResponseEntity<ApiResponse<WasteSubmissionResponse>> submitWaste(@Valid @RequestBody WasteSubmissionRequest request, Authentication authentication) {
        WasteSubmissionResponse response = wasteSubmissionService.submitWaste(request, authentication.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Waste submitted and recommended successfully", response));
    }

    @GetMapping
    @Operation(summary = "Get all submissions of current user")
    public ResponseEntity<ApiResponse<List<WasteSubmissionResponse>>> getUserSubmissions(Authentication authentication) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Submissions retrieved", wasteSubmissionService.getUserSubmissions(authentication.getName())));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get submission details by ID")
    public ResponseEntity<ApiResponse<WasteSubmissionResponse>> getSubmissionById(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Submission details", wasteSubmissionService.getSubmissionById(id)));
    }
}
