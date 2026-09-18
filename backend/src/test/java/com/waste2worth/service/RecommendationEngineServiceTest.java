package com.waste2worth.service;

import com.waste2worth.entity.*;
import com.waste2worth.repository.CollectorProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RecommendationEngineServiceTest {

    @Mock
    CollectorProfileRepository collectorProfileRepository;

    @Mock
    ValueCalculatorService valueCalculatorService;

    @Mock
    ImpactCalculatorService impactCalculatorService;

    private RecommendationEngineService service;

    @BeforeEach
    void setUp() {
        service = new RecommendationEngineService(collectorProfileRepository, valueCalculatorService, impactCalculatorService);
    }

    @Test
    void generateRecommendation_forClothesGoodCondition_prefersReuse_andAssignsCollector() {
        WasteCategory c = new WasteCategory();
        c.setCode("CLOTHES");
        c.setRewardPointsPerKg(10);

        WasteSubmission submission = new WasteSubmission();
        submission.setCategory(c);
        submission.setConditionState(ItemCondition.GOOD);
        submission.setEstimatedQuantity(2.0);

        CollectorProfile cp = new CollectorProfile();
        cp.setId(55L);
        cp.setOrganizationName("Helping Hands");
        cp.setCollectorType(CollectorType.NGO);
        cp.setVerificationStatus(VerificationStatus.VERIFIED);

        when(collectorProfileRepository.findByVerificationStatus(VerificationStatus.VERIFIED)).thenReturn(List.of(cp));
        when(valueCalculatorService.calculateEstimatedValueRange(c, ItemCondition.GOOD, 2.0)).thenReturn(new double[]{5.0, 10.0});
        when(impactCalculatorService.calculateCo2SavedKg(c, 2.0)).thenReturn(3.0);
        when(impactCalculatorService.calculateImpactScore(2.0, 3.0)).thenReturn(14);

        Recommendation rec = service.generateRecommendation(submission);

        assertNotNull(rec);
        assertEquals(RecommendedAction.REUSE, rec.getRecommendedAction());
        // greenPoints = basePoints(10) * qty(2) * actionMultiplier(REUSE -> 4) = 80
        assertEquals(80, rec.getGreenPointsReward());
        assertEquals(55L, rec.getNearbyCollectorId());
        assertEquals("Helping Hands", rec.getNearbyCollectorName());
        assertEquals(5.0, rec.getEstimatedValueMin());
        assertEquals(10.0, rec.getEstimatedValueMax());
        assertEquals(14, rec.getEstimatedImpactScore());
    }
}