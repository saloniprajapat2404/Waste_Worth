package com.waste2worth.repository;

import com.waste2worth.entity.WasteSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WasteSubmissionRepository extends JpaRepository<WasteSubmission, Long> {
    List<WasteSubmission> findByUserIdOrderByCreatedAtDesc(Long userId);
    Long countByUserId(Long userId);
}
