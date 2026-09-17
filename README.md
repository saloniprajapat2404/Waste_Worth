# ♻️ Waste2Worth — Smart Waste-to-Value Platform

**Waste2Worth** is a production-style full-stack web application built with **Spring Boot 3 (Java 25)** and **React + Vite (Tailwind CSS)**. It solves a real-world problem: helping citizens discover the hidden value of their unwanted items and guiding them to **Reuse, Donate, Recycle, or Dispose** responsibly.

---

## 🌟 Key Features

- **Hero Background Slideshow**: Smooth cross-fade slideshow of high-end 16:9 sustainability visuals.
- **Smart Waste Finder ("What do you have?")**: Multi-modal waste evaluation supporting image upload and manual selection.
- **4-Tier Recommendation Engine**: Intelligently ranks options based on sustainability priority: **Reuse > Donate > Recycle > Responsible Disposal**.
- **Doorstep Pickups**: Multi-stage pickup status workflow (`REQUESTED` → `ASSIGNED` → `ACCEPTED` → `PICKUP_SCHEDULED` → `COLLECTED` → `VERIFIED` → `COMPLETED`).
- **Nearby Recyclers & NGOs**: Interactive map finding nearby certified recyclers and NGO donation centers.
- **Green Points & Rewards**: Earn points for diverting waste and redeem partner coupons and eco-certificates.
- **Leaderboard**: Top Monthly Green Champions ranking.
- **Collector & Admin Portals**: Dedicated partner dashboard and admin control panel with Recharts analytics.

---

## 🛠 Tech Stack

- **Backend**: Java 25, Spring Boot 3.2.5, Spring Security, JWT, Spring Data JPA, H2/MySQL
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, Lucide Icons, Recharts, Leaflet OpenStreetMap

---

## 🚀 Getting Started

### Backend
```bash
cd backend
mvn spring-boot:run
```
Backend runs on `http://localhost:8080` (Swagger UI: `http://localhost:8080/swagger-ui.html`).

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`.
