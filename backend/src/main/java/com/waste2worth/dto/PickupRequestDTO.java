package com.waste2worth.dto;

import com.waste2worth.entity.PickupStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class PickupRequestDTO {
    private Long id;

    @NotNull(message = "Waste submission ID is required")
    private Long wasteSubmissionId;

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    private String city;
    private String pincode;

    @NotBlank(message = "Preferred date is required")
    private String preferredDate;

    @NotBlank(message = "Preferred time slot is required")
    private String preferredTimeSlot;

    private String notes;

    // Output fields
    private Long userId;
    private String userName;
    private String userPhone;
    private String itemTitle;
    private String categoryName;
    private Long collectorId;
    private String collectorOrganizationName;
    private PickupStatus status;
    private Double actualQuantityKg;
    private Double verifiedValue;
    private Integer earnedGreenPoints;
    private String proofImageUrl;
    private LocalDateTime completedAt;
    private LocalDateTime createdAt;

    public PickupRequestDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getWasteSubmissionId() { return wasteSubmissionId; }
    public void setWasteSubmissionId(Long wasteSubmissionId) { this.wasteSubmissionId = wasteSubmissionId; }

    public String getPickupAddress() { return pickupAddress; }
    public void setPickupAddress(String pickupAddress) { this.pickupAddress = pickupAddress; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getPreferredDate() { return preferredDate; }
    public void setPreferredDate(String preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredTimeSlot() { return preferredTimeSlot; }
    public void setPreferredTimeSlot(String preferredTimeSlot) { this.preferredTimeSlot = preferredTimeSlot; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserPhone() { return userPhone; }
    public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

    public String getItemTitle() { return itemTitle; }
    public void setItemTitle(String itemTitle) { this.itemTitle = itemTitle; }

    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }

    public Long getCollectorId() { return collectorId; }
    public void setCollectorId(Long collectorId) { this.collectorId = collectorId; }

    public String getCollectorOrganizationName() { return collectorOrganizationName; }
    public void setCollectorOrganizationName(String collectorOrganizationName) { this.collectorOrganizationName = collectorOrganizationName; }

    public PickupStatus getStatus() { return status; }
    public void setStatus(PickupStatus status) { this.status = status; }

    public Double getActualQuantityKg() { return actualQuantityKg; }
    public void setActualQuantityKg(Double actualQuantityKg) { this.actualQuantityKg = actualQuantityKg; }

    public Double getVerifiedValue() { return verifiedValue; }
    public void setVerifiedValue(Double verifiedValue) { this.verifiedValue = verifiedValue; }

    public Integer getEarnedGreenPoints() { return earnedGreenPoints; }
    public void setEarnedGreenPoints(Integer earnedGreenPoints) { this.earnedGreenPoints = earnedGreenPoints; }

    public String getProofImageUrl() { return proofImageUrl; }
    public void setProofImageUrl(String proofImageUrl) { this.proofImageUrl = proofImageUrl; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
