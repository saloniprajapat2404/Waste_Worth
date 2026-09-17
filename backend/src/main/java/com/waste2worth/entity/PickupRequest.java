package com.waste2worth.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pickup_requests")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PickupRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "waste_submission_id", nullable = false)
    private WasteSubmission wasteSubmission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collector_id")
    private CollectorProfile collector;

    private String pickupAddress;
    private String city;
    private String pincode;
    private String preferredDate;
    private String preferredTimeSlot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupStatus status = PickupStatus.REQUESTED;

    @Column(columnDefinition = "TEXT")
    private String notes;

    private Double actualQuantityKg;
    private Double verifiedValue;
    private Integer earnedGreenPoints = 0;
    private String proofImageUrl;

    private LocalDateTime completedAt;
    private LocalDateTime createdAt = LocalDateTime.now();

    public PickupRequest() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public WasteSubmission getWasteSubmission() { return wasteSubmission; }
    public void setWasteSubmission(WasteSubmission wasteSubmission) { this.wasteSubmission = wasteSubmission; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public CollectorProfile getCollector() { return collector; }
    public void setCollector(CollectorProfile collector) { this.collector = collector; }

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

    public PickupStatus getStatus() { return status; }
    public void setStatus(PickupStatus status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

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
