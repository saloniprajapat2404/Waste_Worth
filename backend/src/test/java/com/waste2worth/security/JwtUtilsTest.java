package com.waste2worth.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.*;

public class JwtUtilsTest {

    private JwtUtils jwtUtils;

    @BeforeEach
    void setUp() throws Exception {
        jwtUtils = new JwtUtils();
        // Set private fields via reflection
        Field secretField = JwtUtils.class.getDeclaredField("jwtSecret");
        secretField.setAccessible(true);
        secretField.set(jwtUtils, "my-test-secret-which-is-long-enough");

        Field expField = JwtUtils.class.getDeclaredField("jwtExpirationMs");
        expField.setAccessible(true);
        expField.set(jwtUtils, 3600000L);
    }

    @Test
    void generateAndValidateToken_andExtractEmail() {
        String token = jwtUtils.generateToken("alice@example.com");
        assertNotNull(token);
        assertTrue(jwtUtils.validateJwtToken(token));
        String email = jwtUtils.getEmailFromJwtToken(token);
        assertEquals("alice@example.com", email);
    }

    @Test
    void validateJwtToken_invalidToken_returnsFalse() {
        String bad = "this.is.not.a.jwt";
        assertFalse(jwtUtils.validateJwtToken(bad));
    }
}