package com.waste2worth.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @JsonIgnore
    private String password;

    private String phone;
    private String address;
    private String city;
    private String pincode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ROLE_USER;

    private Integer greenPoints = 0;
    private Integer impactScore = 0;
    private Double totalWasteDivertedKg = 0.0;
    private Double totalValueEarned = 0.0;
    private Integer itemsReusedCount = 0;
    private Integer itemsDonatedCount = 0;
    private Integer itemsRecycledCount = 0;

    private Boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}

    public User(String name, String email, String password, String phone, String address, String city, String pincode, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.pincode = pincode;
        this.role = role;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Integer getGreenPoints() { return greenPoints; }
    public void setGreenPoints(Integer greenPoints) { this.greenPoints = greenPoints; }

    public Integer getImpactScore() { return impactScore; }
    public void setImpactScore(Integer impactScore) { this.impactScore = impactScore; }

    public Double getTotalWasteDivertedKg() { return totalWasteDivertedKg; }
    public void setTotalWasteDivertedKg(Double totalWasteDivertedKg) { this.totalWasteDivertedKg = totalWasteDivertedKg; }

    public Double getTotalValueEarned() { return totalValueEarned; }
    public void setTotalValueEarned(Double totalValueEarned) { this.totalValueEarned = totalValueEarned; }

    public Integer getItemsReusedCount() { return itemsReusedCount; }
    public void setItemsReusedCount(Integer itemsReusedCount) { this.itemsReusedCount = itemsReusedCount; }

    public Integer getItemsDonatedCount() { return itemsDonatedCount; }
    public void setItemsDonatedCount(Integer itemsDonatedCount) { this.itemsDonatedCount = itemsDonatedCount; }

    public Integer getItemsRecycledCount() { return itemsRecycledCount; }
    public void setItemsRecycledCount(Integer itemsRecycledCount) { this.itemsRecycledCount = itemsRecycledCount; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
