package com.waste2worth.service;

import com.waste2worth.dto.ClassificationResultResponse;
import com.waste2worth.entity.ItemCondition;
import com.waste2worth.entity.WasteCategory;
import com.waste2worth.repository.WasteCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ModularClassificationService {

    private final WasteCategoryRepository wasteCategoryRepository;

    public ModularClassificationService(WasteCategoryRepository wasteCategoryRepository) {
        this.wasteCategoryRepository = wasteCategoryRepository;
    }

    public ClassificationResultResponse classifyItem(String textOrFileName, String originalFileName) {
        String query = (textOrFileName + " " + (originalFileName != null ? originalFileName : "")).toLowerCase();
        
        List<WasteCategory> categories = wasteCategoryRepository.findByActiveTrue();
        WasteCategory matchedCategory = null;
        ItemCondition suggestedCondition = ItemCondition.GOOD;
        List<String> tags = new ArrayList<>();

        if (query.contains("phone") || query.contains("laptop") || query.contains("electronic") || query.contains("circuit") || query.contains("cable") || query.contains("tv") || query.contains("battery") || query.contains("monitor")) {
            matchedCategory = findCategoryByCode(categories, "EWASTE");
            tags.addAll(Arrays.asList("E-Waste", "Hazardous Material", "Precious Metals", "Recyclable"));
            if (query.contains("broken") || query.contains("old")) {
                suggestedCondition = ItemCondition.FAIR;
            } else if (query.contains("working")) {
                suggestedCondition = ItemCondition.GOOD;
            }
        } else if (query.contains("cloth") || query.contains("shirt") || query.contains("pant") || query.contains("jacket") || query.contains("textile") || query.contains("dress")) {
            matchedCategory = findCategoryByCode(categories, "CLOTHES");
            tags.addAll(Arrays.asList("Textile", "Wearable", "Donation Eligible", "Reusable"));
        } else if (query.contains("book") || query.contains("paper") || query.contains("newspaper") || query.contains("cardboard") || query.contains("magazine") || query.contains("notebook")) {
            if (query.contains("book")) {
                matchedCategory = findCategoryByCode(categories, "BOOKS");
                tags.addAll(Arrays.asList("Educational", "Donation Eligible", "Paper Fiber", "Reusable"));
            } else {
                matchedCategory = findCategoryByCode(categories, "PAPER");
                tags.addAll(Arrays.asList("Paper Pulp", "Recyclable", "Landfill Saver"));
            }
        } else if (query.contains("bottle") || query.contains("plastic") || query.contains("container") || query.contains("bag")) {
            matchedCategory = findCategoryByCode(categories, "PLASTIC");
            tags.addAll(Arrays.asList("PET Plastic", "Recyclable Polymer", "Non-Biodegradable"));
        } else if (query.contains("can") || query.contains("metal") || query.contains("copper") || query.contains("iron") || query.contains("steel") || query.contains("aluminum")) {
            matchedCategory = findCategoryByCode(categories, "METAL");
            tags.addAll(Arrays.asList("Scrap Metal", "High Value", "Recyclable"));
        } else if (query.contains("glass") || query.contains("jar") || query.contains("mirror")) {
            matchedCategory = findCategoryByCode(categories, "GLASS");
            tags.addAll(Arrays.asList("Silica Glass", "Infinite Recyclability"));
        } else if (query.contains("table") || query.contains("chair") || query.contains("furniture") || query.contains("sofa") || query.contains("desk")) {
            matchedCategory = findCategoryByCode(categories, "FURNITURE");
            tags.addAll(Arrays.asList("Wood", "Bulky Item", "Upcyclable", "Donation Eligible"));
        } else {
            matchedCategory = findCategoryByCode(categories, "OTHER");
            tags.addAll(Arrays.asList("General Waste", "Requires Inspection"));
        }

        if (matchedCategory == null && !categories.isEmpty()) {
            matchedCategory = categories.get(0);
        }

        String itemTitle = capitalize(query.replaceAll("[^a-zA-Z0-9 ]", " ").trim());
        if (itemTitle.isEmpty()) {
            itemTitle = matchedCategory != null ? matchedCategory.getName() + " Item" : "Recyclable Item";
        }

        Double minVal = matchedCategory != null ? matchedCategory.getMinPricePerKg() : 10.0;
        Double maxVal = matchedCategory != null ? matchedCategory.getMaxPricePerKg() : 50.0;

        return new ClassificationResultResponse(
                matchedCategory != null ? matchedCategory.getCode() : "OTHER",
                matchedCategory != null ? matchedCategory.getName() : "General Waste",
                itemTitle,
                suggestedCondition,
                0.94,
                tags,
                minVal,
                maxVal
        );
    }

    private WasteCategory findCategoryByCode(List<WasteCategory> categories, String code) {
        return categories.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElse(null);
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
