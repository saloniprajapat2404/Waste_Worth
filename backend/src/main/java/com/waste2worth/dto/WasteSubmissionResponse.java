package com.waste2worth.dto;

import com.waste2worth.entity.ItemCondition;
import com.waste2worth.entity.RecommendedAction;

import java.time.LocalDateTime;

public class WasteSubmissionResponse {
    private Long id;
    private String itemTitle;
    private String categoryName;
    private String categoryCode;
    private String description;
    private ItemCondition conditionState;
    private Double estimatedQuantity;
    private String unit;
    private Double estimatedValueMin;
    private Double estimatedValueMax;
    private String imageUrl;
    private String status;
    private LocalDateTime createdAt;

    // Recommendation summary
    private RecommendedAction recommendedAction;
    private Integer recommendationConfidence;
    private String rationale;
    private Integer greenPointsReward;
    private Integer estimatedImpactScore;
    private String nearbyCollectorName;
    private Double nearbyCollectorDistanceKm;

    public WasteSubmissionResponse() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemTitle() { return itemTitle; }
    public void setItemTitle(String itemTitle) { this.itemTitle = itemTitle; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public String getCategoryCode() { return categoryCode; }
    public void setCategoryCode(String categoryCode) { this.categoryCode = categoryCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public ItemCondition getConditionState() { return conditionState; }
    public void setConditionState(ItemCondition conditionState) { this.conditionState = conditionState; }

    public Double getEstimatedQuantity() { return estimatedQuantity; }
    public void setEstimatedQuantity(Double estimatedQuantity) { this.estimatedQuantity = estimatedQuantity; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Double getEstimatedValueMin() { return estimatedValueMin; }
    public void setEstimatedValueMin(Double estimatedValueMin) { this.estimatedValueMin = estimatedValueMin; }

    public Double getEstimatedValueMax() { return estimatedValueMax; }
    public void setEstimatedValueMax(Double estimatedValueMax) { this.estimatedValueMax = estimatedValueMax; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public RecommendedAction getRecommendedAction() { return recommendedAction; }
    public void setRecommendedAction(RecommendedAction recommendedAction) { this.recommendedAction = recommendedAction; }

    public Integer getRecommendationConfidence() { return recommendationConfidence; }
    public void setRecommendationConfidence(Integer recommendationConfidence) { this.recommendationConfidence = recommendationConfidence; }

    public String getRationale() { return rationale; }
    public void setRationale(String rationale) { this.rationale = rationale; }

    public Integer getGreenPointsReward() { return greenPointsReward; }
    public void setGreenPointsReward(Integer greenPointsReward) { this.greenPointsReward = greenPointsReward; }

    public Integer getEstimatedImpactScore() { return estimatedImpactScore; }
    public void setEstimatedImpactScore(Integer estimatedImpactScore) { this.estimatedImpactScore = estimatedImpactScore; }

    public String getNearbyCollectorName() { return nearbyCollectorName; }
    public void setNearbyCollectorName(String nearbyCollectorName) { this.nearbyCollectorName = nearbyCollectorName; }

    public Double getNearbyCollectorDistanceKm() { return nearbyCollectorDistanceKm; }
    public void setNearbyCollectorDistanceKm(Double nearbyCollectorDistanceKm) { this.nearbyCollectorDistanceKm = nearbyCollectorDistanceKm; }
}
