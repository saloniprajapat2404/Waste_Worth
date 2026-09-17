package com.waste2worth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "collector_profiles")
public class CollectorProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String organizationName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CollectorType collectorType = CollectorType.RECYCLER;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus verificationStatus = VerificationStatus.VERIFIED;

    private Double rating = 4.8;
    private Double latitude;
    private Double longitude;
    private String address;
    private String city;
    private String pincode;

    @Column(columnDefinition = "TEXT")
    private String acceptedMaterials; // Comma separated: Paper, Plastic, E-Waste, Clothes...

    private String operatingHours = "09:00 AM - 07:00 PM";
    private LocalDateTime createdAt = LocalDateTime.now();

    public CollectorProfile() {}

    public CollectorProfile(User user, String organizationName, CollectorType collectorType, VerificationStatus verificationStatus, Double rating, Double latitude, Double longitude, String address, String city, String pincode, String acceptedMaterials, String operatingHours) {
        this.user = user;
        this.organizationName = organizationName;
        this.collectorType = collectorType;
        this.verificationStatus = verificationStatus;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.city = city;
        this.pincode = pincode;
        this.acceptedMaterials = acceptedMaterials;
        this.operatingHours = operatingHours;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public CollectorType getCollectorType() { return collectorType; }
    public void setCollectorType(CollectorType collectorType) { this.collectorType = collectorType; }

    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getAcceptedMaterials() { return acceptedMaterials; }
    public void setAcceptedMaterials(String acceptedMaterials) { this.acceptedMaterials = acceptedMaterials; }

    public String getOperatingHours() { return operatingHours; }
    public void setOperatingHours(String operatingHours) { this.operatingHours = operatingHours; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
