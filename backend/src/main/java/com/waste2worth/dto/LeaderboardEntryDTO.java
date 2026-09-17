package com.waste2worth.dto;

public class LeaderboardEntryDTO {
    private Integer rank;
    private Long userId;
    private String name;
    private String city;
    private Integer greenPoints;
    private Double wasteDivertedKg;
    private Integer impactScore;

    public LeaderboardEntryDTO() {}

    public LeaderboardEntryDTO(Integer rank, Long userId, String name, String city, Integer greenPoints, Double wasteDivertedKg, Integer impactScore) {
        this.rank = rank;
        this.userId = userId;
        this.name = name;
        this.city = city;
        this.greenPoints = greenPoints;
        this.wasteDivertedKg = wasteDivertedKg;
        this.impactScore = impactScore;
    }

    public Integer getRank() { return rank; }
    public void setRank(Integer rank) { this.rank = rank; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getGreenPoints() { return greenPoints; }
    public void setGreenPoints(Integer greenPoints) { this.greenPoints = greenPoints; }

    public Double getWasteDivertedKg() { return wasteDivertedKg; }
    public void setWasteDivertedKg(Double wasteDivertedKg) { this.wasteDivertedKg = wasteDivertedKg; }

    public Integer getImpactScore() { return impactScore; }
    public void setImpactScore(Integer impactScore) { this.impactScore = impactScore; }
}
