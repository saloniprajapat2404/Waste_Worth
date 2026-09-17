package com.waste2worth.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "waste_submissions")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class WasteSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private WasteCategory category;

    @Column(nullable = false)
    private String itemTitle;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemCondition conditionState = ItemCondition.GOOD;

    private Double estimatedQuantity = 1.0;
    private String unit = "KG"; // KG, ITEMS

    private Double estimatedValueMin = 0.0;
    private Double estimatedValueMax = 0.0;

    private String imageUrl;
    private String status = "SUBMITTED";

    private LocalDateTime createdAt = LocalDateTime.now();

    public WasteSubmission() {}

    public WasteSubmission(User user, WasteCategory category, String itemTitle, String description, ItemCondition conditionState, Double estimatedQuantity, String unit, String imageUrl) {
        this.user = user;
        this.category = category;
        this.itemTitle = itemTitle;
        this.description = description;
        this.conditionState = conditionState;
        this.estimatedQuantity = estimatedQuantity;
        this.unit = unit;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public WasteCategory getCategory() { return category; }
    public void setCategory(WasteCategory category) { this.category = category; }

    public String getItemTitle() { return itemTitle; }
    public void setItemTitle(String itemTitle) { this.itemTitle = itemTitle; }

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
}
