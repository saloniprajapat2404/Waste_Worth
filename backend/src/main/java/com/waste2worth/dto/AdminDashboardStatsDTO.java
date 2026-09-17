package com.waste2worth.dto;

public class AdminDashboardStatsDTO {
    private Long totalUsers;
    private Long totalWasteSubmissions;
    private Double totalWasteDivertedKg;
    private Double totalValueGenerated;
    private Long totalGreenPoints;
    private Long activePickups;
    private Long completedPickups;
    private Long verifiedCollectors;
    private Long verifiedNgos;

    public AdminDashboardStatsDTO() {}

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getTotalWasteSubmissions() { return totalWasteSubmissions; }
    public void setTotalWasteSubmissions(Long totalWasteSubmissions) { this.totalWasteSubmissions = totalWasteSubmissions; }

    public Double getTotalWasteDivertedKg() { return totalWasteDivertedKg; }
    public void setTotalWasteDivertedKg(Double totalWasteDivertedKg) { this.totalWasteDivertedKg = totalWasteDivertedKg; }

    public Double getTotalValueGenerated() { return totalValueGenerated; }
    public void setTotalValueGenerated(Double totalValueGenerated) { this.totalValueGenerated = totalValueGenerated; }

    public Long getTotalGreenPoints() { return totalGreenPoints; }
    public void setTotalGreenPoints(Long totalGreenPoints) { this.totalGreenPoints = totalGreenPoints; }

    public Long getActivePickups() { return activePickups; }
    public void setActivePickups(Long activePickups) { this.activePickups = activePickups; }

    public Long getCompletedPickups() { return completedPickups; }
    public void setCompletedPickups(Long completedPickups) { this.completedPickups = completedPickups; }

    public Long getVerifiedCollectors() { return verifiedCollectors; }
    public void setVerifiedCollectors(Long verifiedCollectors) { this.verifiedCollectors = verifiedCollectors; }

    public Long getVerifiedNgos() { return verifiedNgos; }
    public void setVerifiedNgos(Long verifiedNgos) { this.verifiedNgos = verifiedNgos; }
}
