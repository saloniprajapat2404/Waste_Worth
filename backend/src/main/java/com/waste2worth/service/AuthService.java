package com.waste2worth.service;

import com.waste2worth.dto.*;
import com.waste2worth.entity.*;
import com.waste2worth.exception.BadRequestException;
import com.waste2worth.exception.ResourceNotFoundException;
import com.waste2worth.repository.CollectorProfileRepository;
import com.waste2worth.repository.UserRepository;
import com.waste2worth.security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final CollectorProfileRepository collectorProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       CollectorProfileRepository collectorProfileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.collectorProfileRepository = collectorProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Error: Email is already registered!");
        }

        Role role = req.getRole() != null ? req.getRole() : Role.ROLE_USER;
        User user = new User(
                req.getName(),
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                req.getPhone(),
                req.getAddress(),
                req.getCity(),
                req.getPincode(),
                role
        );

        User savedUser = userRepository.save(user);

        if (role == Role.ROLE_COLLECTOR) {
            CollectorType cType = CollectorType.RECYCLER;
            if (req.getCollectorType() != null) {
                try {
                    cType = CollectorType.valueOf(req.getCollectorType().toUpperCase());
                } catch (Exception ignored) {}
            }
            CollectorProfile cp = new CollectorProfile(
                    savedUser,
                    req.getOrganizationName() != null ? req.getOrganizationName() : req.getName() + " Center",
                    cType,
                    VerificationStatus.PENDING,
                    4.5,
                    28.6139,
                    77.2090,
                    req.getAddress(),
                    req.getCity(),
                    req.getPincode(),
                    req.getAcceptedMaterials() != null ? req.getAcceptedMaterials() : "Paper, Plastic, E-Waste",
                    "09:00 AM - 06:00 PM"
            );
            collectorProfileRepository.save(cp);
        }

        String jwt = jwtUtils.generateToken(savedUser.getEmail());
        return new AuthResponse(jwt, savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole(), savedUser.getGreenPoints(), savedUser.getImpactScore());
    }

    public AuthResponse login(LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(req.getEmail());

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new AuthResponse(jwt, user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getGreenPoints(), user.getImpactScore());
    }

    public User getProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }
}
