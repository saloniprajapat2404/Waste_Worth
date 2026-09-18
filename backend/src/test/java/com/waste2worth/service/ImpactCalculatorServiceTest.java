package com.waste2worth.service;

import com.waste2worth.entity.WasteCategory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ImpactCalculatorServiceTest {

    private final ImpactCalculatorService service = new ImpactCalculatorService();

    @Test
    void calculateLandfillDivertedKg_nullQuantity_returnsZero() {
        assertEquals(0.0, service.calculateLandfillDivertedKg(null, null));
    }

    @Test
    void calculateLandfillDivertedKg_withFactor_calculatesRounded() {
        WasteCategory c = new WasteCategory();
        c.setLandfillFactor(0.8);
        double res = service.calculateLandfillDivertedKg(c, 3.25);
        assertEquals(2.6, res);
    }

    @Test
    void calculateCo2SavedKg_defaultsAndCustom() {
        double resDefault = service.calculateCo2SavedKg(null, 2.0);
        // default factor 1.5 => 3.0
        assertEquals(3.0, resDefault);

        WasteCategory c = new WasteCategory();
        c.setCo2SavedFactor(2.0);
        double res = service.calculateCo2SavedKg(c, 1.5);
        assertEquals(3.0, res);
    }

    @Test
    void calculateImpactScore_boundsAndCalculation() {
        int score = service.calculateImpactScore(2.0, 3.0);
        // (2*2.5) + (3*3) = 5 + 9 = 14
        assertEquals(14, score);

        int low = service.calculateImpactScore(0.1, 0.0);
        assertTrue(low >= 10); // min bound
    }
}