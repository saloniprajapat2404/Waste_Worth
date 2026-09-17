package com.waste2worth.dto;

import com.waste2worth.entity.PickupStatus;
import jakarta.validation.constraints.NotNull;

public class UpdatePickupStatusDTO {

    @NotNull(message = "Status is required")
    private PickupStatus status;

    private String comments;
    private Double actualQuantityKg;
    private Double verifiedValue;
    private String proofImageUrl;
    private Long assignedCollectorId;

    public UpdatePickupStatusDTO() {}

    public PickupStatus getStatus() { return status; }
    public void setStatus(PickupStatus status) { this.status = status; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public Double getActualQuantityKg() { return actualQuantityKg; }
    public void setActualQuantityKg(Double actualQuantityKg) { this.actualQuantityKg = actualQuantityKg; }

    public Double getVerifiedValue() { return verifiedValue; }
    public void setVerifiedValue(Double verifiedValue) { this.verifiedValue = verifiedValue; }

    public String getProofImageUrl() { return proofImageUrl; }
    public void setProofImageUrl(String proofImageUrl) { this.proofImageUrl = proofImageUrl; }

    public Long getAssignedCollectorId() { return assignedCollectorId; }
    public void setAssignedCollectorId(Long assignedCollectorId) { this.assignedCollectorId = assignedCollectorId; }
}
