package com.waste2worth.repository;

import com.waste2worth.entity.WasteCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WasteCategoryRepository extends JpaRepository<WasteCategory, Long> {
    Optional<WasteCategory> findByCode(String code);
    Optional<WasteCategory> findByNameIgnoreCase(String name);
    List<WasteCategory> findByActiveTrue();
}
