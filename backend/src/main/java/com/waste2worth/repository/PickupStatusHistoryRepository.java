package com.waste2worth.repository;

import com.waste2worth.entity.PickupStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupStatusHistoryRepository extends JpaRepository<PickupStatusHistory, Long> {
    List<PickupStatusHistory> findByPickupRequestIdOrderByTimestampAsc(Long pickupRequestId);
}
