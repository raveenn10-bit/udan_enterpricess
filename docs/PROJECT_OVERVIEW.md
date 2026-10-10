# Project Overview — Udan Enterprises (Zuboo Electric Mobility)

**Document Reference:** `DOC-UE-001`  
**Project Name:** Udan Enterprises Zuboo Electric Bikes Digital Showroom  
**Version:** 1.0.0 (Phase 01 Final)  
**Date:** October 2026  
**Client:** Udan Enterprises (Galle, Southern Province, Sri Lanka)  
**Lead Developer:** Harsh Apex Digital Solutions  

---

## 1. Executive Summary

**Udan Enterprises** is an authorized dealership and regional mobility partner for **Zuboo Electric Bikes** based in Galle, Southern Province, Sri Lanka. In response to Sri Lanka's escalating fossil fuel costs, economic challenges, and environmental commitments, Udan Enterprises has undertaken the mission of accelerating the transition to clean, zero-emission electric transportation.

**Harsh Apex Digital Solutions** was commissioned to design, engineer, and deploy an industry-leading digital showroom and customer acquisition platform. The solution replaces generic retail web designs with a bespoke **"Minimal Premium Automotive Editorial"** aesthetic—positioning Zuboo as a technologically superior, design-forward, and cost-effective alternative to conventional petrol motorcycles.

This document details the business background, operational scope, stakeholder roles, technical architecture foundations, model portfolio, and formal completion status of **Phase 01**.

---

## 2. Business Background & Problem Statement

### 2.1 The Sri Lankan Mobility Crisis
Between 2022 and 2026, Sri Lanka experienced severe macroeconomic shifts that heavily impacted urban commuting:
* **Escalating Fuel Costs:** Petrol prices fluctuated violently, drastically increasing monthly commuter overheads for daily workers, small business owners, and logistics delivery operators.
* **Import Restrictions & Vehicle Inflation:** Internal combustion engine (ICE) two-wheelers saw inflated acquisition and maintenance prices.
* **Environmental Degradation:** High particulate matter and noise pollution affected coastal tourism hubs such as Galle, Unawatuna, and Matara.

### 2.2 The Zuboo Electric Value Proposition
Zuboo electric motorcycles and utility bikes provide a high-efficiency solution:
* **Operating Cost Reduction:** Electricity charging costs in Sri Lanka equate to less than 15-20% of petrol fuel per kilometer.
* **Low Mechanical Overhead:** Direct hub-motor and brushless drivetrains eliminate engine oil, spark plugs, carburetors, transmission belts, and exhaust servicing.
* **Quiet, Zero-Emission Riding:** Tailored for both serene coastal environments and bustling urban lanes.
* **Standard Wall Charging:** All Zuboo models support charging from standard domestic 230V 3-pin household sockets without requiring specialized commercial charging infrastructure.

### 2.3 The Digital Challenge
Prior to this project, marketing was conducted primarily via promotional WhatsApp flyers and localized word-of-mouth. Information was fragmented, pricing was volatile, and technical specifications were uncataloged. Udan Enterprises required a centralized, authoritative digital presence to:
1. Establish brand authority as an authorized Zuboo dealer.
2. Present accurate, verified model specifications.
3. Streamline test ride bookings and customer leads.
4. Provide direct communication channels (WhatsApp & showroom hotline).

---

## 3. Stakeholder Roles & Governance

```
+--------------------------------------------------------------------+
|                         PROJECT ECOSYSTEM                          |
+--------------------------------------------------------------------+
                                |
        +-----------------------+-----------------------+
        |                                               |
        v                                               v
+-------------------------------+               +-------------------------------+
|       UDAN ENTERPRISES        |               |   HARSH APEX DIGITAL SOLUTIONS|
|       (Client / Dealer)       |               |     (Engineering Agency)      |
+-------------------------------+               +-------------------------------+
| • Showroom Operations (Galle) |               | • Web Architecture & Next.js |
| • Vehicle Stock & Pricing     |               | • UI/UX Design System         |
| • Warranty Fulfillment        |               | • Cloud & Firebase Integration|
| • Customer Test Rides         |               | • Performance & SEO Tuning    |
+-------------------------------+               +-------------------------------+
                                |
                                v
                +-------------------------------+
                |       ZUBOO AUTOMOTIVE        |
                |     (OEM Manufacturer)        |
                +-------------------------------+
                | • Vehicle Manufacturing       |
                | • Technical Spec Sheets       |
                | • OEM Parts & Warranty Backing|
                +-------------------------------+
```

### 3.1 Client: Udan Enterprises
* **Location:** Galle, Southern Province, Sri Lanka.
* **Role:** Vehicle importer, regional distributor, physical showroom operator, and after-sales service provider.
* **Key Contacts:** Showroom Management & Sales Consultation Desk.
* **Responsibilities:** Verifying physical stock, confirming final consumer pricing, managing incoming test ride inquiries, conducting customer handovers, and honoring warranty guarantees.

### 3.2 Developer: Harsh Apex Digital Solutions
* **Role:** Technology Architect, UI/UX Engineering Firm, and Digital Product Lead.
* **Responsibilities:** Full-stack development, design system implementation, responsive performance optimization, Firebase BaaS architecture, test-driven validation, and client training.

---

## 4. Product Line: Zuboo Electric Models

The platform catalogs the complete **8-model Zuboo portfolio**, catering to commuter, sports, touring, and commercial utility demographics:

| Model Name | Internal Code | Category Archetype | Motor Rating | Battery Pack | Advertised Range | Top Speed | Provisional Price (LKR) |
|:---|:---|:---|:---|:---|:---|:---|:---|
| **Zuboo GT** | `GT-1800W` | Heavy-Duty Dual-Sport Utility | 1800W High Torque | 72V 32Ah High Capacity | ≥ 100 km | 55 - 60 km/h | Rs 445,000 |
| **Zuboo The Tank** | `TANK-3000W` | Extreme 3000W All-Terrain | 3000W Peak Performance | 72V High Discharge | ≥ 80 km | 65 - 75 km/h | Rs 515,000 |
| **Zuboo Paris** | `PARIS-1200W` | Retro European Luxury | 1200W Smooth Acceleration| 72V 23Ah Lithium/LA | ≥ 80 km | 60 km/h | Rs 330,000 |
| **Zuboo T11** | `T11-1800W` | Urban Aerodynamic Sports Maxi | 1800W Sports Motor | 72V 32Ah Tianneng | ≥ 80 km | 60 km/h | Rs 455,000 |
| **Zuboo T3** | `T3-1300W` | Everyday Urban Agility | 1300W High Torque | 72V 32Ah Pack | 100 - 110 km | 60 km/h | Rs 395,000 |
| **Zuboo EX008** | `EX008-2000W`| Dynamic High-Wheel Commuter | 2000W High Speed | 72V Long-Life Pack | ≥ 80 km | 60 km/h | Rs 495,000 |
| **Zuboo KB1** | `KB1-72V` | High-Clearance Executive | High-Efficiency Torque | 72V 32Ah Pack | 80 - 100 km | 50 - 70 km/h | Rs 382,500 |
| **Zuboo Mini** | `MINI-490W` | Compact Utility Bicycle | 490W Eco Commuter | 48V 12Ah Lead-acid | > 32 km | 30 km/h | Rs 195,000 |

*Note: All prices are flagged with `isPriceVerified: false` pending final showroom verification.*

---

## 5. Scope of Work & Phase 01 Status

### 5.1 Objectives of Phase 01
Phase 01 focused on establishing a production-grade, highly engaging web showroom capable of showcasing the vehicles and capturing high-intent leads:

1. **Digital Showroom Portal:**
   * High-impact Hero section featuring full-motion Zuboo running footage with custom video controls.
   * "Minimal Premium Automotive Editorial" design system enforcing high readability and brand elegance.
   * Top 3 Featured Showroom Highlights (GT, The Tank, Paris) with instant spec breakdowns.
   * Interactive 8-Model Master Catalogue featuring category filters (Commuters, Touring, Sports, Retro) and real-time live search.
   * Interactive 5-color visualizer for the popular Zuboo T3 model (Matte Black, Charcoal Grey, Soft Mint, Pearl White, Desert Sand).
   * Core Technology & Specifications breakdown (battery management, hub motor dynamics, digital displays).
   * Maintenance and after-sales service assurance module.

2. **Lead Generation & Customer Acquisition:**
   * Interactive Test Ride Booking modal collecting customer name, phone number, model preference, and target date.
   * Automated cloud persistence to Google Firebase Firestore (`test_ride_bookings` collection).
   * Direct WhatsApp integration generating pre-formatted chat inquiries for each individual bike model.
   * Newsletter subscription capture persisting to Firebase (`newsletter_subscribers` collection).

3. **Performance & Engineering Integrity:**
   * Built on Next.js 16 (App Router) with React 19 and Tailwind CSS v4.
   * Lenis smooth scrolling and GSAP scroll-triggered entrance animations.
   * 100% TypeScript type safety with strict schema contracts.
   * Zero compilation errors on Turbopack build.

### 5.2 Phase 01 Completion Sign-Off
* **Status:** **COMPLETE & VERIFIED**
* **Build Artifact:** Next.js Static & Server Renderable Web App
* **Codebase Health:** Clean TypeScript build (`npx tsc --noEmit` returns 0 errors)
* **Lead Ingestion:** Firebase Firestore active with real-time fallbacks
* **Asset Optimization:** WebP image transcoding complete across all bike assets
