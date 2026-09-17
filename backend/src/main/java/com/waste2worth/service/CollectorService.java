package com.waste2worth.service;

import com.waste2worth.dto.CollectorCenterDTO;
import com.waste2worth.entity.CollectorProfile;
import com.waste2worth.entity.CollectorType;
import com.waste2worth.entity.VerificationStatus;
import com.waste2worth.repository.CollectorProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CollectorService {

    private final CollectorProfileRepository collectorProfileRepository;

    public CollectorService(CollectorProfileRepository collectorProfileRepository) {
        this.collectorProfileRepository = collectorProfileRepository;
    }

    public List<CollectorCenterDTO> getNearbyCenters(String type, String material) {
        List<CollectorProfile> profiles = collectorProfileRepository.findByVerificationStatus(VerificationStatus.VERIFIED);

        return profiles.stream()
                .filter(cp -> {
                    if (type != null && !type.isEmpty() && !type.equalsIgnoreCase("ALL")) {
                        try {
                            CollectorType cType = CollectorType.valueOf(type.toUpperCase());
                            if (cp.getCollectorType() != cType) return false;
                        } catch (Exception ignored) {}
                    }
                    if (material != null && !material.isEmpty() && !material.equalsIgnoreCase("ALL")) {
                        if (cp.getAcceptedMaterials() != null && !cp.getAcceptedMaterials().toLowerCase().contains(material.toLowerCase())) {
                            return false;
                        }
                    }
                    return true;
                })
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private CollectorCenterDTO mapToDTO(CollectorProfile cp) {
        CollectorCenterDTO dto = new CollectorCenterDTO();
        dto.setId(cp.getId());
        dto.setName(cp.getOrganizationName());
        dto.setOrganizationName(cp.getOrganizationName());
        dto.setType(cp.getCollectorType());
        dto.setVerificationStatus(cp.getVerificationStatus());
        dto.setRating(cp.getRating());
        dto.setLatitude(cp.getLatitude());
        dto.setLongitude(cp.getLongitude());
        dto.setAddress(cp.getAddress());
        dto.setCity(cp.getCity());
        dto.setPincode(cp.getPincode());
        dto.setAcceptedMaterials(cp.getAcceptedMaterials());
        dto.setOperatingHours(cp.getOperatingHours());
        dto.setPhone(cp.getUser() != null ? cp.getUser().getPhone() : "+91 98765 43210");
        dto.setEmail(cp.getUser() != null ? cp.getUser().getEmail() : "contact@greencenter.org");
        return dto;
    }
}
