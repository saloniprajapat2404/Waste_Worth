package com.waste2worth.service;

import com.waste2worth.entity.*;
import com.waste2worth.repository.CollectorProfileRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationEngineService {

    private final CollectorProfileRepository collectorProfileRepository;
    private final ValueCalculatorService valueCalculatorService;
    private final ImpactCalculatorService impactCalculatorService;

    public RecommendationEngineService(CollectorProfileRepository collectorProfileRepository,
                                       ValueCalculatorService valueCalculatorService,
                                       ImpactCalculatorService impactCalculatorService) {
        this.collectorProfileRepository = collectorProfileRepository;
        this.valueCalculatorService = valueCalculatorService;
        this.impactCalculatorService = impactCalculatorService;
    }

    public Recommendation generateRecommendation(WasteSubmission submission) {
        WasteCategory category = submission.getCategory();
        ItemCondition condition = submission.getConditionState();
        Double quantity = submission.getEstimatedQuantity() != null ? submission.getEstimatedQuantity() : 1.0;

        RecommendedAction action;
        String rationale;

        String catCode = category != null ? category.getCode() : "OTHER";

        // Priority 1: REUSE
        if ((condition == ItemCondition.EXCELLENT || condition == ItemCondition.GOOD) &&
                (catCode.equalsIgnoreCase("BOOKS") || catCode.equalsIgnoreCase("FURNITURE") ||
                 catCode.equalsIgnoreCase("CLOTHES") || catCode.equalsIgnoreCase("EWASTE"))) {
            action = RecommendedAction.REUSE;
            rationale = "This item is in " + condition + " condition. Reusing or upcycling avoids manufacturing energy and gives this product a extended lifecycle.";
        }
        // Priority 2: DONATE
        else if ((condition == ItemCondition.EXCELLENT || condition == ItemCondition.GOOD || condition == ItemCondition.FAIR) &&
                (catCode.equalsIgnoreCase("CLOTHES") || catCode.equalsIgnoreCase("BOOKS") || catCode.equalsIgnoreCase("FURNITURE"))) {
            action = RecommendedAction.DONATE;
            rationale = "This item is still functional and highly suitable for community donation to local NGOs and charity centers.";
        }
        // Priority 3: RECYCLE
        else if (catCode.equalsIgnoreCase("PAPER") || catCode.equalsIgnoreCase("PLASTIC") ||
                 catCode.equalsIgnoreCase("METAL") || catCode.equalsIgnoreCase("GLASS") ||
                 catCode.equalsIgnoreCase("EWASTE")) {
            action = RecommendedAction.RECYCLE;
            rationale = "This item contains highly valuable recyclable materials. Sending it to a certified recycler keeps toxic components out of landfills.";
        }
        // Priority 4: DISPOSE
        else {
            action = RecommendedAction.DISPOSE;
            rationale = "No direct reuse/recycling pathway exists for this item condition. Responsible eco-disposal is recommended.";
        }

        // Value Range Calculation
        double[] range = valueCalculatorService.calculateEstimatedValueRange(category, condition, quantity);
        submission.setEstimatedValueMin(range[0]);
        submission.setEstimatedValueMax(range[1]);

        // Impact & Points
        double co2Saved = impactCalculatorService.calculateCo2SavedKg(category, quantity);
        int impactScore = impactCalculatorService.calculateImpactScore(quantity, co2Saved);
        int basePoints = category != null && category.getRewardPointsPerKg() != null ? category.getRewardPointsPerKg() : 10;
        int actionMultiplier = switch (action) {
            case REUSE -> 4;
            case DONATE -> 3;
            case RECYCLE -> 2;
            case DISPOSE -> 1;
        };
        int greenPoints = (int) Math.round(basePoints * quantity * actionMultiplier);

        // Find Nearby Collector / NGO
        List<CollectorProfile> verified = collectorProfileRepository.findByVerificationStatus(VerificationStatus.VERIFIED);
        CollectorProfile matchedCollector = null;

        for (CollectorProfile cp : verified) {
            if (action == RecommendedAction.DONATE && cp.getCollectorType() == CollectorType.NGO) {
                matchedCollector = cp;
                break;
            } else if (action == RecommendedAction.RECYCLE && (cp.getCollectorType() == CollectorType.RECYCLER || cp.getCollectorType() == CollectorType.SCRAP_COLLECTOR)) {
                matchedCollector = cp;
                break;
            }
        }

        if (matchedCollector == null && !verified.isEmpty()) {
            matchedCollector = verified.get(0);
        }

        Recommendation rec = new Recommendation();
        rec.setWasteSubmission(submission);
        rec.setRecommendedAction(action);
        rec.setConfidenceScore(96);
        rec.setRationale(rationale);
        rec.setEstimatedValueMin(range[0]);
        rec.setEstimatedValueMax(range[1]);
        rec.setGreenPointsReward(greenPoints);
        rec.setEstimatedImpactScore(impactScore);

        if (matchedCollector != null) {
            rec.setNearbyCollectorId(matchedCollector.getId());
            rec.setNearbyCollectorName(matchedCollector.getOrganizationName());
            rec.setNearbyCollectorDistanceKm(2.4); // Sample distance radius
        } else {
            rec.setNearbyCollectorName("GreenCycle Hub");
            rec.setNearbyCollectorDistanceKm(3.1);
        }

        return rec;
    }
}
