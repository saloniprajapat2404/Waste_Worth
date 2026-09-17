package com.waste2worth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_submission_id", nullable = false)
    private WasteSubmission wasteSubmission;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RecommendedAction recommendedAction;

    private Integer confidenceScore = 95; // 0-100%

    @Column(columnDefinition = "TEXT")
    private String rationale;

    private Double estimatedValueMin = 0.0;
    private Double estimatedValueMax = 0.0;
    private Integer greenPointsReward = 0;
    private Integer estimatedImpactScore = 0;

    private String nearbyCollectorName;
    private Double nearbyCollectorDistanceKm;
    private Long nearbyCollectorId;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Recommendation() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public WasteSubmission getWasteSubmission() { return wasteSubmission; }
    public void setWasteSubmission(WasteSubmission wasteSubmission) { this.wasteSubmission = wasteSubmission; }

    public RecommendedAction getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(RecommendedAction recommendedAction) { this.recommendedAction = recommendedAction; }

    public Integer getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Integer confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }

    public Double getEstimatedValueMin() { return estimatedValueMin; }
    public void setEstimatedValueMin(Double estimatedValueMin) { this.estimatedValueMin = estimatedValueMin; }

    public Double getEstimatedValueMax() { return estimatedValueMax; }
    public void setEstimatedValueMax(Double estimatedValueMax) { this.estimatedValueMax = estimatedValueMax; }

    public Integer getGreenPointsReward() { return greenPointsReward; }
    public void setGreenPointsReward(Integer greenPointsReward) { this.greenPointsReward = greenPointsReward; }

    public Integer getEstimatedImpactScore() { return estimatedImpactScore; }
    public void setEstimatedImpactScore(Integer estimatedImpactScore) { this.estimatedImpactScore = estimatedImpactScore; }

    public String getNearbyCollectorName() { return nearbyCollectorName; }
    public void setNearbyCollectorName(String nearbyCollectorName) { this.nearbyCollectorName = nearbyCollectorName; }

    public Double getNearbyCollectorDistanceKm() { return nearbyCollectorDistanceKm; }
    public void setNearbyCollectorDistanceKm(Double nearbyCollectorDistanceKm) { this.nearbyCollectorDistanceKm = nearbyCollectorDistanceKm; }

    public Long getNearbyCollectorId() { return nearbyCollectorId; }
    public void setNearbyCollectorId(Long nearbyCollectorId) { this.nearbyCollectorId = nearbyCollectorId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
