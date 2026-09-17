package com.waste2worth.dto;

import com.waste2worth.entity.ItemCondition;
import java.util.List;

public class ClassificationResultResponse {
    private String detectedCategoryCode;
    private String detectedCategoryName;
    private String detectedItemTitle;
    private ItemCondition suggestedCondition;
    private Double confidence;
    private List<String> tags;
    private Double estimatedValueMin;
    private Double estimatedValueMax;
    private String disclaimer = "Modular Classification Estimate. Accuracy will increase with AI integration.";

    public ClassificationResultResponse() {}

    public ClassificationResultResponse(String detectedCategoryCode, String detectedCategoryName, String detectedItemTitle, ItemCondition suggestedCondition, Double confidence, List<String> tags, Double estimatedValueMin, Double estimatedValueMax) {
        this.detectedCategoryCode = detectedCategoryCode;
        this.detectedCategoryName = detectedCategoryName;
        this.detectedItemTitle = detectedItemTitle;
        this.suggestedCondition = suggestedCondition;
        this.confidence = confidence;
        this.tags = tags;
        this.estimatedValueMin = estimatedValueMin;
        this.estimatedValueMax = estimatedValueMax;
    }

    public String getDetectedCategoryCode() { return detectedCategoryCode; }
    public void setDetectedCategoryCode(String detectedCategoryCode) { this.detectedCategoryCode = detectedCategoryCode; }

    public String getDetectedCategoryName() { return detectedCategoryName; }
    public void setDetectedCategoryName(String detectedCategoryName) { this.detectedCategoryName = detectedCategoryName; }

    public String getDetectedItemTitle() { return detectedItemTitle; }
    public void setDetectedItemTitle(String detectedItemTitle) { this.detectedItemTitle = detectedItemTitle; }

    public ItemCondition getSuggestedCondition() { return suggestedCondition; }
    public void setSuggestedCondition(ItemCondition suggestedCondition) { this.suggestedCondition = suggestedCondition; }

    public Double getConfidence() { return confidence; }
    public void setConfidence(Double confidence) { this.confidence = confidence; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Double getEstimatedValueMin() { return estimatedValueMin; }
    public void setEstimatedValueMin(Double estimatedValueMin) { this.estimatedValueMin = estimatedValueMin; }

    public Double getEstimatedValueMax() { return estimatedValueMax; }
    public void setEstimatedValueMax(Double estimatedValueMax) { this.estimatedValueMax = estimatedValueMax; }

    public String getDisclaimer() { return disclaimer; }
    public void setDisclaimer(String disclaimer) { this.disclaimer = disclaimer; }
}
