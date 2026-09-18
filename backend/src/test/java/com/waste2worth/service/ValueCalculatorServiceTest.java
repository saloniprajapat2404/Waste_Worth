package com.waste2worth.service;

import com.waste2worth.entity.ItemCondition;
import com.waste2worth.entity.WasteCategory;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class ValueCalculatorServiceTest {

    private final ValueCalculatorService service = new ValueCalculatorService();

    @Test
    void calculateEstimatedValueRange_nullOrInvalid_returnsZeroRange() {
        double[] r1 = service.calculateEstimatedValueRange(null, ItemCondition.GOOD, 2.0);
        assertArrayEquals(new double[]{0.0, 0.0}, r1);

        WasteCategory c = new WasteCategory();
        double[] r2 = service.calculateEstimatedValueRange(c, ItemCondition.GOOD, 0.0);
        assertArrayEquals(new double[]{0.0, 0.0}, r2);

        double[] r3 = service.calculateEstimatedValueRange(c, ItemCondition.GOOD, null);
        assertArrayEquals(new double[]{0.0, 0.0}, r3);
    }

    @Test
    void calculateEstimatedValueRange_withCategoryAndCondition_calculatesCorrectly() {
        WasteCategory c = new WasteCategory();
        c.setMinPricePerKg(10.0);
        c.setMaxPricePerKg(20.0);

        double[] res = service.calculateEstimatedValueRange(c, ItemCondition.EXCELLENT, 2.0);
        // baseMin 10 * qty 2 * conditionMultiplier 1.4 => 28.0
        // baseMax 20 * qty 2 * conditionMultiplier 1.4 => 56.0
        assertArrayEquals(new double[]{28.0, 56.0}, res);
    }
}