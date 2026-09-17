package com.waste2worth.repository;

import com.waste2worth.entity.PickupRequest;
import com.waste2worth.entity.PickupStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRequestRepository extends JpaRepository<PickupRequest, Long> {
    List<PickupRequest> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<PickupRequest> findByCollectorIdOrderByCreatedAtDesc(Long collectorId);
    List<PickupRequest> findByStatusOrderByCreatedAtDesc(PickupStatus status);
    List<PickupRequest> findByCollectorIdAndStatusOrderByCreatedAtDesc(Long collectorId, PickupStatus status);
    Long countByStatus(PickupStatus status);
}
