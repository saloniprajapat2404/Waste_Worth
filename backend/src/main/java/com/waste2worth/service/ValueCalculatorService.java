package com.waste2worth.service;

import com.waste2worth.entity.ItemCondition;
import com.waste2worth.entity.WasteCategory;
import org.springframework.stereotype.Service;

@Service
public class ValueCalculatorService {

    public double[] calculateEstimatedValueRange(WasteCategory category, ItemCondition condition, Double quantity) {
        if (category == null || quantity == null || quantity <= 0) {
            return new double[]{0.0, 0.0};
        }

        double baseMin = category.getMinPricePerKg() != null ? category.getMinPricePerKg() : 5.0;
        double baseMax = category.getMaxPricePerKg() != null ? category.getMaxPricePerKg() : 15.0;

        double conditionMultiplier = switch (condition) {
            case EXCELLENT -> 1.4;
            case GOOD -> 1.1;
            case FAIR -> 0.9;
            case POOR -> 0.6;
        };

        double estMin = Math.round(baseMin * quantity * conditionMultiplier * 10.0) / 10.0;
        double estMax = Math.round(baseMax * quantity * conditionMultiplier * 10.0) / 10.0;

        return new double[]{estMin, estMax};
    }
}
