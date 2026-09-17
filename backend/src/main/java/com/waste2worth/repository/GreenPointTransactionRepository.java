package com.waste2worth.repository;

import com.waste2worth.entity.GreenPointTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GreenPointTransactionRepository extends JpaRepository<GreenPointTransaction, Long> {
    List<GreenPointTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);
}
