package com.waste2worth.service;

import com.waste2worth.entity.WasteCategory;
import org.springframework.stereotype.Service;

@Service
public class ImpactCalculatorService {

    public double calculateLandfillDivertedKg(WasteCategory category, Double quantityKg) {
        if (quantityKg == null) return 0.0;
        double factor = category != null && category.getLandfillFactor() != null ? category.getLandfillFactor() : 1.0;
        return Math.round(quantityKg * factor * 10.0) / 10.0;
    }

    public double calculateCo2SavedKg(WasteCategory category, Double quantityKg) {
        if (quantityKg == null) return 0.0;
        double factor = category != null && category.getCo2SavedFactor() != null ? category.getCo2SavedFactor() : 1.5;
        return Math.round(quantityKg * factor * 10.0) / 10.0;
    }

    public int calculateImpactScore(Double quantityKg, double co2SavedKg) {
        if (quantityKg == null) return 0;
        int score = (int) Math.round((quantityKg * 2.5) + (co2SavedKg * 3.0));
        return Math.max(10, Math.min(1000, score));
    }
}
