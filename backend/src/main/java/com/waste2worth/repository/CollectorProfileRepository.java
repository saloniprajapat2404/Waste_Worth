package com.waste2worth.repository;

import com.waste2worth.entity.CollectorProfile;
import com.waste2worth.entity.CollectorType;
import com.waste2worth.entity.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollectorProfileRepository extends JpaRepository<CollectorProfile, Long> {
    Optional<CollectorProfile> findByUserId(Long userId);
    List<CollectorProfile> findByVerificationStatus(VerificationStatus status);
    List<CollectorProfile> findByCollectorTypeAndVerificationStatus(CollectorType type, VerificationStatus status);
}
