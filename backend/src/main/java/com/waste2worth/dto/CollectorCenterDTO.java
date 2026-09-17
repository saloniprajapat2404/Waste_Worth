package com.waste2worth.dto;

import com.waste2worth.entity.CollectorType;
import com.waste2worth.entity.VerificationStatus;

public class CollectorCenterDTO {
    private Long id;
    private String name;
    private String organizationName;
    private CollectorType type;
    private VerificationStatus verificationStatus;
    private Double rating;
    private Double latitude;
    private Double longitude;
    private String address;
    private String city;
    private String pincode;
    private String acceptedMaterials;
    private String operatingHours;
    private String phone;
    private String email;

    public CollectorCenterDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getOrganizationName() { return organizationName; }
    public void setOrganizationName(String organizationName) { this.organizationName = organizationName; }

    public CollectorType getType() { return type; }
    public void setType(CollectorType type) { this.type = type; }

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

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
