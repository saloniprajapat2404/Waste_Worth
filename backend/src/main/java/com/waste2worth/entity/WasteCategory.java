package com.waste2worth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "waste_categories")
public class WasteCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String iconName;

    private Double basePricePerKg;
    private Double minPricePerKg;
    private Double maxPricePerKg;
    private Integer rewardPointsPerKg;
    private Double co2SavedFactor; // kg CO2 saved per kg recycled
    private Double landfillFactor; // kg diverted per kg recycled

    private Boolean active = true;

    public WasteCategory() {}

    public WasteCategory(String name, String code, String description, String iconName, Double basePricePerKg, Double minPricePerKg, Double maxPricePerKg, Integer rewardPointsPerKg, Double co2SavedFactor, Double landfillFactor) {
        this.name = name;
        this.code = code;
        this.description = description;
        this.iconName = iconName;
        this.basePricePerKg = basePricePerKg;
        this.minPricePerKg = minPricePerKg;
        this.maxPricePerKg = maxPricePerKg;
        this.rewardPointsPerKg = rewardPointsPerKg;
        this.co2SavedFactor = co2SavedFactor;
        this.landfillFactor = landfillFactor;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIconName() { return iconName; }
    public void setIconName(String iconName) { this.iconName = iconName; }

    public Double getBasePricePerKg() { return basePricePerKg; }
    public void setBasePricePerKg(Double basePricePerKg) { this.basePricePerKg = basePricePerKg; }

    public Double getMinPricePerKg() { return minPricePerKg; }
    public void setMinPricePerKg(Double minPricePerKg) { this.minPricePerKg = minPricePerKg; }

    public Double getMaxPricePerKg() { return maxPricePerKg; }
    public void setMaxPricePerKg(Double maxPricePerKg) { this.maxPricePerKg = maxPricePerKg; }

    public Integer getRewardPointsPerKg() { return rewardPointsPerKg; }
    public void setRewardPointsPerKg(Integer rewardPointsPerKg) { this.rewardPointsPerKg = rewardPointsPerKg; }

    public Double getCo2SavedFactor() { return co2SavedFactor; }
    public void setCo2SavedFactor(Double co2SavedFactor) { this.co2SavedFactor = co2SavedFactor; }

    public Double getLandfillFactor() { return landfillFactor; }
    public void setLandfillFactor(Double landfillFactor) { this.landfillFactor = landfillFactor; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
