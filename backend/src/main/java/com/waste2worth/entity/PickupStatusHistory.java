package com.waste2worth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pickup_status_history")
public class PickupStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_request_id", nullable = false)
    private PickupRequest pickupRequest;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupStatus status;

    private String updatedByRole;
    private String comments;
    private LocalDateTime timestamp = LocalDateTime.now();

    public PickupStatusHistory() {}

    public PickupStatusHistory(PickupRequest pickupRequest, PickupStatus status, String updatedByRole, String comments) {
        this.pickupRequest = pickupRequest;
        this.status = status;
        this.updatedByRole = updatedByRole;
        this.comments = comments;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PickupRequest getPickupRequest() { return pickupRequest; }
    public void setPickupRequest(PickupRequest pickupRequest) { this.pickupRequest = pickupRequest; }

    public PickupStatus getStatus() { return status; }
    public void setStatus(PickupStatus status) { this.status = status; }

    public String getUpdatedByRole() { return updatedByRole; }
    public void setUpdatedByRole(String updatedByRole) { this.updatedByRole = updatedByRole; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
