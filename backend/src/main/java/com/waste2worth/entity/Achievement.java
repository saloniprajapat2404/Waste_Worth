package com.waste2worth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "achievements")
public class Achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String badgeKey;

    @Column(nullable = false)
    private String title;

    private String description;
    private String icon;
    private Integer pointsBonus = 50;
    private String requirementType; // TOTAL_KG, RECYCLED_COUNT, DONATED_COUNT, REUSED_COUNT
    private Double requirementThreshold;

    public Achievement() {}

    public Achievement(String badgeKey, String title, String description, String icon, Integer pointsBonus, String requirementType, Double requirementThreshold) {
        this.badgeKey = badgeKey;
        this.title = title;
        this.description = description;
        this.icon = icon;
        this.pointsBonus = pointsBonus;
        this.requirementType = requirementType;
        this.requirementThreshold = requirementThreshold;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBadgeKey() { return badgeKey; }
    public void setBadgeKey(String badgeKey) { this.badgeKey = badgeKey; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public Integer getPointsBonus() { return pointsBonus; }
    public void setPointsBonus(Integer pointsBonus) { this.pointsBonus = pointsBonus; }

    public String getRequirementType() { return requirementType; }
    public void setRequirementType(String requirementType) { this.requirementType = requirementType; }

    public Double getRequirementThreshold() { return requirementThreshold; }
    public void setRequirementThreshold(Double requirementThreshold) { this.requirementThreshold = requirementThreshold; }
}
