package com.waste2worth.dto;

import com.waste2worth.entity.Role;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String name;
    private String email;
    private Role role;
    private Integer greenPoints;
    private Integer impactScore;

    public AuthResponse() {}

    public AuthResponse(String token, Long id, String name, String email, Role role, Integer greenPoints, Integer impactScore) {
        this.token = token;
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.greenPoints = greenPoints;
        this.impactScore = impactScore;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public Integer getGreenPoints() { return greenPoints; }
    public void setGreenPoints(Integer greenPoints) { this.greenPoints = greenPoints; }

    public Integer getImpactScore() { return impactScore; }
    public void setImpactScore(Integer impactScore) { this.impactScore = impactScore; }
}
