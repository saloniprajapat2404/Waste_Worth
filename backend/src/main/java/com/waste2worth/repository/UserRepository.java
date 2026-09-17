package com.waste2worth.repository;

import com.waste2worth.entity.Role;
import com.waste2worth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    List<User> findByRole(Role role);
    List<User> findTop10ByOrderByGreenPointsDesc();

    @Query("SELECT SUM(u.totalWasteDivertedKg) FROM User u")
    Double getTotalPlatformWasteDivertedKg();

    @Query("SELECT SUM(u.totalValueEarned) FROM User u")
    Double getTotalPlatformValueEarned();

    @Query("SELECT SUM(u.greenPoints) FROM User u")
    Long getTotalPlatformGreenPoints();
}
