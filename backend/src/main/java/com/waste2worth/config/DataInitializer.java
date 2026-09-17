package com.waste2worth.config;

import com.waste2worth.entity.*;
import com.waste2worth.repository.*;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final WasteCategoryRepository wasteCategoryRepository;
    private final CollectorProfileRepository collectorProfileRepository;
    private final AchievementRepository achievementRepository;
    private final UserAchievementRepository userAchievementRepository;
    private final RewardRepository rewardRepository;
    private final WasteSubmissionRepository wasteSubmissionRepository;
    private final RecommendationRepository recommendationRepository;
    private final PickupRequestRepository pickupRequestRepository;
    private final PickupStatusHistoryRepository statusHistoryRepository;
    private final GreenPointTransactionRepository pointTransactionRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           WasteCategoryRepository wasteCategoryRepository,
                           CollectorProfileRepository collectorProfileRepository,
                           AchievementRepository achievementRepository,
                           UserAchievementRepository userAchievementRepository,
                           RewardRepository rewardRepository,
                           WasteSubmissionRepository wasteSubmissionRepository,
                           RecommendationRepository recommendationRepository,
                           PickupRequestRepository pickupRequestRepository,
                           PickupStatusHistoryRepository statusHistoryRepository,
                           GreenPointTransactionRepository pointTransactionRepository,
                           NotificationRepository notificationRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.wasteCategoryRepository = wasteCategoryRepository;
        this.collectorProfileRepository = collectorProfileRepository;
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
        this.rewardRepository = rewardRepository;
        this.wasteSubmissionRepository = wasteSubmissionRepository;
        this.recommendationRepository = recommendationRepository;
        this.pickupRequestRepository = pickupRequestRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.pointTransactionRepository = pointTransactionRepository;
        this.notificationRepository = notificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (wasteCategoryRepository.count() == 0) {
            initCategories();
        }
        if (userRepository.count() == 0) {
            initUsersAndProfiles();
        }
        if (achievementRepository.count() == 0) {
            initAchievements();
        }
        if (rewardRepository.count() == 0) {
            initRewards();
        }
        if (wasteSubmissionRepository.count() == 0) {
            initSampleSubmissionsAndPickups();
        }
    }

    private void initCategories() {
        wasteCategoryRepository.save(new WasteCategory("Paper & Cardboard", "PAPER", "Newspaper, cardboard boxes, magazines, office paper", "FileText", 10.0, 8.0, 12.0, 15, 1.8, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Plastics", "PLASTIC", "PET bottles, rigid containers, polymer packaging", "Package", 20.0, 15.0, 30.0, 20, 2.5, 1.0));
        wasteCategoryRepository.save(new WasteCategory("E-Waste", "EWASTE", "Old phones, laptops, cables, PCBs, small appliances", "Smartphone", 120.0, 50.0, 300.0, 60, 4.2, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Clothes & Textiles", "CLOTHES", "Wearable garments, shoes, fabrics for donation/upcycling", "Shirt", 35.0, 20.0, 50.0, 30, 2.1, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Books & Study Material", "BOOKS", "Textbooks, novels, storybooks for donation or reuse", "BookOpen", 25.0, 15.0, 40.0, 25, 1.5, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Scrap Metal", "METAL", "Aluminum cans, iron rods, copper wires, steel utensils", "Shield", 40.0, 25.0, 65.0, 25, 3.5, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Glass", "GLASS", "Intact glass bottles, jars, glassware", "GlassWater", 8.0, 5.0, 12.0, 10, 0.9, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Furniture", "FURNITURE", "Wooden desks, chairs, sofas suitable for upcycling", "Armchair", 150.0, 80.0, 400.0, 40, 3.0, 1.0));
        wasteCategoryRepository.save(new WasteCategory("Organic Waste", "ORGANIC", "Food scraps, garden waste for composting", "Leaf", 5.0, 2.0, 8.0, 10, 0.8, 1.0));
    }

    private void initUsersAndProfiles() {
        // Admin
        User admin = new User("Platform Admin", "admin@waste2worth.com", passwordEncoder.encode("admin123"), "+91 99999 00000", "Central HQ", "New Delhi", "110001", Role.ROLE_ADMIN);
        userRepository.save(admin);

        // Citizen User (Saloni)
        User citizen = new User("Saloni Sharma", "saloni@waste2worth.com", passwordEncoder.encode("user123"), "+91 98765 12345", "Flat 402, Green Park", "New Delhi", "110016", Role.ROLE_USER);
        citizen.setGreenPoints(824);
        citizen.setImpactScore(82);
        citizen.setTotalWasteDivertedKg(48.5);
        citizen.setTotalValueEarned(1280.0);
        citizen.setItemsReusedCount(12);
        citizen.setItemsDonatedCount(17);
        citizen.setItemsRecycledCount(24);
        userRepository.save(citizen);

        // Secondary Citizen User
        User citizen2 = new User("Aarav Patel", "aarav@waste2worth.com", passwordEncoder.encode("user123"), "+91 98123 45678", "C-12 Connaught Place", "New Delhi", "110001", Role.ROLE_USER);
        citizen2.setGreenPoints(610);
        citizen2.setImpactScore(65);
        citizen2.setTotalWasteDivertedKg(32.0);
        citizen2.setTotalValueEarned(890.0);
        userRepository.save(citizen2);

        // Collector / Recycler
        User collectorUser = new User("GreenCycle Recyclers", "collector@greencycle.com", passwordEncoder.encode("collector123"), "+91 98888 77777", "Plot 14, Okhla Industrial Area", "New Delhi", "110020", Role.ROLE_COLLECTOR);
        userRepository.save(collectorUser);

        CollectorProfile collectorProfile = new CollectorProfile(
                collectorUser,
                "GreenCycle Waste Hub",
                CollectorType.RECYCLER,
                VerificationStatus.VERIFIED,
                4.9,
                28.5355,
                77.2610,
                "Plot 14, Okhla Industrial Phase III",
                "New Delhi",
                "110020",
                "Paper, Plastic, E-Waste, Metal, Glass",
                "08:00 AM - 08:00 PM"
        );
        collectorProfileRepository.save(collectorProfile);

        // NGO Partner
        User ngoUser = new User("Goonj Hope Foundation", "ngo@hopefoundation.org", passwordEncoder.encode("ngo123"), "+91 97777 66666", "Sector 5, RK Puram", "New Delhi", "110022", Role.ROLE_COLLECTOR);
        userRepository.save(ngoUser);

        CollectorProfile ngoProfile = new CollectorProfile(
                ngoUser,
                "Goonj NGO Donation Center",
                CollectorType.NGO,
                VerificationStatus.VERIFIED,
                4.8,
                28.5600,
                77.1820,
                "Sector 5, RK Puram Community Hall",
                "New Delhi",
                "110022",
                "Clothes, Books, Furniture, Toys",
                "09:00 AM - 06:00 PM"
        );
        collectorProfileRepository.save(ngoProfile);
    }

    private void initAchievements() {
        achievementRepository.save(new Achievement("FIRST_RECYCLER", "🌱 First Recycler", "Completed your very first waste submission", "Sprout", 50, "RECYCLED_COUNT", 1.0));
        achievementRepository.save(new Achievement("BEGINNER_RECYCLER", "♻️ Recycling Beginner", "Diverted more than 10 KG of waste from landfills", "Recycle", 100, "TOTAL_KG", 10.0));
        achievementRepository.save(new Achievement("EWASTE_WARRIOR", "📱 E-Waste Warrior", "Safely recycled e-waste items", "Cpu", 150, "RECYCLED_COUNT", 3.0));
        achievementRepository.save(new Achievement("BOOK_SAVER", "📚 Book Saver", "Donated or reused educational books", "BookOpen", 100, "DONATED_COUNT", 5.0));
        achievementRepository.save(new Achievement("DONATION_HERO", "👕 Donation Hero", "Donated clothes or usable items to verified NGOs", "HeartHandshake", 150, "DONATED_COUNT", 10.0));
        achievementRepository.save(new Achievement("ECO_CHAMPION", "🌍 Eco Champion", "Achieved over 500 Green Points on the platform", "Trophy", 250, "POINTS", 500.0));
        achievementRepository.save(new Achievement("100KG_CLUB", "🏆 100 KG Club", "Diverted over 100 KG of recyclable material", "Award", 300, "TOTAL_KG", 100.0));
    }

    private void initRewards() {
        rewardRepository.save(new Reward("₹50 Eco Partner Coupon", "Get ₹50 off on sustainable eco-friendly merchandise partners", 500, "COUPON", "ECO50PARTNER", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60"));
        rewardRepository.save(new Reward("Plant a Tree in Your Name", "We sponsor 1 tree plantation drive with verified geo-location certificate", 300, "TREE_PLANTATION", "PLANT-TREE-NOW", "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&auto=format&fit=crop&q=60"));
        rewardRepository.save(new Reward("Official Eco Warrior Certificate", "Digital downloadable certificate signed by Waste2Worth Sustainability Board", 200, "CERTIFICATE", "CERT-WARRIOR-2026", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60"));
        rewardRepository.save(new Reward("₹100 Organic Store Voucher", "Redeem ₹100 on certified organic grocery and kitchen stores", 850, "GIFT_CARD", "ORGANIC100OFF", "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&auto=format&fit=crop&q=60"));
    }

    private void initSampleSubmissionsAndPickups() {
        User citizen = userRepository.findByEmail("saloni@waste2worth.com").orElse(null);
        CollectorProfile collector = collectorProfileRepository.findAll().get(0);
        WasteCategory ewaste = wasteCategoryRepository.findByCode("EWASTE").orElse(null);
        WasteCategory paper = wasteCategoryRepository.findByCode("PAPER").orElse(null);

        if (citizen != null && ewaste != null) {
            WasteSubmission sub1 = new WasteSubmission(citizen, ewaste, "Old Android Smartphone & Charger", "Used 3 year old phone, battery drains fast but screen intact", ItemCondition.FAIR, 1.5, "KG", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=60");
            sub1.setEstimatedValueMin(350.0);
            sub1.setEstimatedValueMax(500.0);
            sub1.setStatus("PICKUP_REQUESTED");
            wasteSubmissionRepository.save(sub1);

            Recommendation rec1 = new Recommendation();
            rec1.setWasteSubmission(sub1);
            rec1.setRecommendedAction(RecommendedAction.RECYCLE);
            rec1.setRationale("This e-waste item contains recyclable circuit elements and precious metals. Safe recycling prevents heavy metal contamination.");
            rec1.setEstimatedValueMin(350.0);
            rec1.setEstimatedValueMax(500.0);
            rec1.setGreenPointsReward(60);
            rec1.setEstimatedImpactScore(75);
            rec1.setNearbyCollectorId(collector.getId());
            rec1.setNearbyCollectorName(collector.getOrganizationName());
            rec1.setNearbyCollectorDistanceKm(2.4);
            recommendationRepository.save(rec1);

            PickupRequest pickup1 = new PickupRequest();
            pickup1.setWasteSubmission(sub1);
            pickup1.setUser(citizen);
            pickup1.setCollector(collector);
            pickup1.setPickupAddress(citizen.getAddress());
            pickup1.setCity(citizen.getCity());
            pickup1.setPincode(citizen.getPincode());
            pickup1.setPreferredDate("Tomorrow, 10:00 AM");
            pickup1.setPreferredTimeSlot("Morning Slot (10 AM - 1 PM)");
            pickup1.setStatus(PickupStatus.PICKUP_SCHEDULED);
            pickup1.setNotes("Ring bell upon arrival");
            pickupRequestRepository.save(pickup1);

            statusHistoryRepository.save(new PickupStatusHistory(pickup1, PickupStatus.REQUESTED, "USER", "Submission created"));
            statusHistoryRepository.save(new PickupStatusHistory(pickup1, PickupStatus.ASSIGNED, "SYSTEM", "Assigned to " + collector.getOrganizationName()));
            statusHistoryRepository.save(new PickupStatusHistory(pickup1, PickupStatus.ACCEPTED, "COLLECTOR", "Accepted by collector agent"));
            statusHistoryRepository.save(new PickupStatusHistory(pickup1, PickupStatus.PICKUP_SCHEDULED, "COLLECTOR", "Pickup scheduled for tomorrow 10:00 AM"));

            // Sub 2 (Paper)
            WasteSubmission sub2 = new WasteSubmission(citizen, paper, "Old Newspapers & Exam Guides", "Stacked old newspapers and college exam prep papers", ItemCondition.GOOD, 8.0, "KG", "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=60");
            sub2.setEstimatedValueMin(80.0);
            sub2.setEstimatedValueMax(120.0);
            sub2.setStatus("COMPLETED");
            wasteSubmissionRepository.save(sub2);

            Recommendation rec2 = new Recommendation();
            rec2.setWasteSubmission(sub2);
            rec2.setRecommendedAction(RecommendedAction.RECYCLE);
            rec2.setRationale("Clean paper pulp can be 100% recycled into recycled notebook paper and cardboard packaging.");
            rec2.setEstimatedValueMin(80.0);
            rec2.setEstimatedValueMax(120.0);
            rec2.setGreenPointsReward(40);
            rec2.setEstimatedImpactScore(50);
            rec2.setNearbyCollectorId(collector.getId());
            rec2.setNearbyCollectorName(collector.getOrganizationName());
            rec2.setNearbyCollectorDistanceKm(2.4);
            recommendationRepository.save(rec2);

            PickupRequest pickup2 = new PickupRequest();
            pickup2.setWasteSubmission(sub2);
            pickup2.setUser(citizen);
            pickup2.setCollector(collector);
            pickup2.setPickupAddress(citizen.getAddress());
            pickup2.setCity(citizen.getCity());
            pickup2.setPincode(citizen.getPincode());
            pickup2.setPreferredDate("2026-08-20");
            pickup2.setPreferredTimeSlot("Afternoon Slot");
            pickup2.setStatus(PickupStatus.COMPLETED);
            pickup2.setActualQuantityKg(8.5);
            pickup2.setVerifiedValue(100.0);
            pickup2.setEarnedGreenPoints(40);
            pickup2.setCompletedAt(LocalDateTime.now().minusDays(2));
            pickupRequestRepository.save(pickup2);

            // Give citizen badges
            Achievement badge = achievementRepository.findByBadgeKey("FIRST_RECYCLER").orElse(null);
            if (badge != null) {
                userAchievementRepository.save(new UserAchievement(citizen, badge));
            }
            Achievement badge2 = achievementRepository.findByBadgeKey("ECO_CHAMPION").orElse(null);
            if (badge2 != null) {
                userAchievementRepository.save(new UserAchievement(citizen, badge2));
            }

            // Initial Notifications
            notificationRepository.save(new Notification(citizen, "Welcome to Waste2Worth! 🌱", "Start identifying your unwanted items, calculate their value, and earn Green Points!", "SYSTEM"));
            notificationRepository.save(new Notification(citizen, "Pickup Scheduled 🚚", "Your pickup for Old Android Smartphone is scheduled for Tomorrow 10:00 AM.", "PICKUP_STATUS"));
        }
    }
}
