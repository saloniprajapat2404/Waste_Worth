package com.waste2worth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rewards")
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer pointsRequired;

    private String rewardType; // COUPON, TREE_PLANTATION, CERTIFICATE, GIFT_CARD
    private String defaultCouponCode;
    private String imageUrl;
    private Boolean active = true;

    public Reward() {}

    public Reward(String title, String description, Integer pointsRequired, String rewardType, String defaultCouponCode, String imageUrl) {
        this.title = title;
        this.description = description;
        this.pointsRequired = pointsRequired;
        this.rewardType = rewardType;
        this.defaultCouponCode = defaultCouponCode;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getPointsRequired() { return pointsRequired; }
    public void setPointsRequired(Integer pointsRequired) { this.pointsRequired = pointsRequired; }

    public String getRewardType() { return rewardType; }
    public void setRewardType(String rewardType) { this.rewardType = rewardType; }

    public String getDefaultCouponCode() { return defaultCouponCode; }
    public void setDefaultCouponCode(String defaultCouponCode) { this.defaultCouponCode = defaultCouponCode; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
