package com.waste2worth.dto;

import com.waste2worth.entity.ItemCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class WasteSubmissionRequest {

    @NotBlank(message = "Item title is required")
    private String itemTitle;

    private String categoryCode;
    private String description;

    @NotNull(message = "Item condition is required")
    private ItemCondition conditionState;

    private Double estimatedQuantity = 1.0;
    private String unit = "KG";
    private String imageUrl;

    public WasteSubmissionRequest() {}

    public String getItemTitle() { return itemTitle; }
    public void setItemTitle(String itemTitle) { this.itemTitle = itemTitle; }

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

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
