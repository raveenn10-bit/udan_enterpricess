# Development Roadmap — Udan Enterprises (Zuboo Electric)

**Document Reference:** `DOC-UE-006`  
**Current Phase:** Phase 01 (Completed) • Phase 02 (Ready for Execution)  
**Timeline Horizon:** 2026 - 2027  
**Strategic Target:** Sri Lanka's Preeminent Digital Electric Mobility Platform  

---

## 1. Five-Phase Master Roadmap

```
+-------------------------------------------------------------------------------------------------+
|                                     DEVELOPMENT ROADMAP                                         |
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   PHASE 01: CORE SHOWROOM PORTAL & LEAD ENGINE                  [ COMPLETED & VERIFIED ]        |
|   • Next.js 16 + Tailwind v4 + Minimal Editorial Design                                        |
|   • Master 8-Model Dataset + T3 Color Visualizer                                                |
|   • Test Ride Booking Engine + Firebase Firestore                                               |
|   • WhatsApp Direct Inquiries + Mobile Responsive Optimization                                  |
|                                                                                                 |
|   PHASE 02: DEDICATED MODEL PAGES & FINANCIAL TOOLS             [ READY FOR EXECUTION ]         |
|   • Dynamic `/bikes/[slug]` Editorial Showcase Pages                                            |
|   • Interactive Loan / EMI Financing Calculator (LKR)                                           |
|   • Side-by-Side Model Comparison Matrix                                                        |
|   • Downloadable Specification PDF Brochures                                                    |
|                                                                                                 |
|   PHASE 03: CMS ADMIN DASHBOARD & INVENTORY MANAGEMENT          [ PLANNED ]                     |
|   • Firebase Auth Protected Showroom Staff Portal                                               |
|   • Real-Time Stock Status (In Showroom / Pre-Order)                                            |
|   • Code-Free Price & Specification Editor                                                      |
|   • Test Ride Lead Pipeline (Kanban / Table)                                                    |
|                                                                                                 |
|   PHASE 04: AFTER-SALES SERVICE & CUSTOMER PORTAL               [ PLANNED ]                     |
|   • Digital Warranty Registration & Lookup by VIN                                               |
|   • Maintenance Service Appointment Scheduler                                                   |
|   • Battery Health Diagnostics & Care Knowledge Base                                            |
|                                                                                                 |
|   PHASE 05: TRILINGUAL LOCALIZATION & SPARE PARTS STORE          [ FUTURE ]                      |
|   • Full English, Sinhala (සිංහල) & Tamil (தமிழ்) i18n                                          |
|   • Multi-Showroom Inventory (Galle, Matara, Colombo)                                           |
|   • OEM Spare Parts & Accessories Online Ordering (PayHere Gateway)                             |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
```

---

## 2. Phase 01: Core Web Experience & Showcase (STATUS: COMPLETED)

### 2.1 Scope & Milestones Delivered
* [x] **Project Foundation:** Initialized Next.js 16 (App Router), React 19, TypeScript, PostCSS, and Tailwind CSS v4.
* [x] **Editorial Design System:** Enforced "Minimal Premium Automotive Editorial" styling tokens (`#F7F9FA`, `#E8F1F5`, `#111820`, `#667780`, `#346C83`, `#E0E8EC`).
* [x] **Typographic System:** Integrated Google Fonts (`Space Grotesk` display + `Inter` body).
* [x] **Hero Stage:** Full-screen responsive video background showcasing Zuboo electric models with mute/unmute and play/pause controls.
* [x] **Featured Models Section:** 3-column curated highlight grid featuring top showroom recommendations (GT, The Tank, Paris).
* [x] **8-Model Master Collection:** Complete catalog of all Zuboo models with category filter pills (Urban Commuters, Touring & Adventure, Sports Maxi, Retro Luxury) and instant search.
* [x] **T3 5-Colorway Visualizer:** Interactive color switcher dynamically rendering real-time photography of all 5 T3 colors.
* [x] **Engineering & Technology Breakdown:** Structured technical architecture diagram and 3 core value pillars.
* [x] **After-Sales & Maintenance Section:** 4-pillar warranty and service assurance card.
* [x] **Lead Capture & Test Ride Engine:** Interactive booking modal with validation, Firebase Firestore write pipeline, and WhatsApp handoff fallback.
* [x] **Footer & Newsletter:** Brand metadata, showroom location markers, social channels, and subscriber capture form.
* [x] **Performance & Quality Gate:** Turbopack production compilation clean; TypeScript type check verified (0 errors).

---

## 3. Phase 02: Dynamic Model Pages & Financial Tools (NEXT PHASE)

### 3.1 Objectives
To transition from a single-page showroom to deep, individual vehicle immersion pages that answer complex buyer questions and accelerate purchasing decisions.

### 3.2 Key Deliverables & Specifications

#### 1. Dynamic Model Detail Routes (`/bikes/[slug]`)
* Create individual pages for each of the 8 models using Next.js App Router dynamic segment `app/bikes/[slug]/page.tsx`.
* **Static Generation:** Leverage `generateStaticParams()` to pre-render all 8 bike routes at build time for sub-100ms page transitions.
* **Rich Gallery Carousel:** Multi-angle photography (front, cockpit, rear carrier, battery compartment, wheels).
* **Comprehensive Specification Grid:** Tabular breakdown of electrical, mechanical, chassis, dimensions, and warranty terms.

#### 2. Sri Lankan Rupee (LKR) Loan / EMI Financing Calculator
* **Target Audience:** Commuters calculating petrol savings vs. monthly vehicle financing.
* **Interactive Controls:**
  * Down Payment Slider (e.g., 20% to 50% of vehicle price).
  * Repayment Tenure Selector (12, 24, 36, 48 months).
  * Annual Interest Rate input (benchmarked against local banks: Commercial Bank, HNB, Sampath Bank).
* **Instant Calculation Output:**
  * Estimated Monthly Installment (Rs / month).
  * Monthly Petrol Cost Savings Comparison (e.g., "Saves ~Rs 18,500/month on petrol!").

#### 3. Side-by-Side Model Comparison Tool
* Allows prospective buyers to select 2 or 3 models (e.g., Zuboo GT vs. Zuboo The Tank vs. Zuboo T11) and view a synchronized comparison of:
  * Motor wattage
  * Battery capacity & range
  * Top speed & curb weight
  * Brake hardware & suspension travel
  * Advertised price comparison

#### 4. Downloadable Specification PDF Brochures
* Client-side dynamic PDF generation (or pre-rendered PDF download) allowing buyers to save branded spec sheets to their phones for offline viewing or bank loan submissions.

---

## 4. Phase 03: Inventory & CMS Admin Dashboard

### 4.1 Objectives
Empower Udan Enterprises showroom managers in Galle to update pricing, vehicle availability, and review inbound leads without touching code or requiring developer intervention.

### 4.2 Key Deliverables
1. **Firebase Authentication Portal:**
   * Secure email/password login restricted to authorized showroom personnel (`/admin/login`).
2. **Real-Time Stock Status Management:**
   * Flag models as: `In Showroom (Ready for Delivery)`, `In Transit (Arriving Soon)`, or `Pre-Order Only`.
3. **Live Price & Specification Updater:**
   * Update LKR retail prices, promotional discounts, and warranty terms directly in Firestore; frontend reflects changes instantly via Firestore real-time listeners or on-demand revalidation.
4. **Lead Pipeline & Test Ride Manager:**
   * Admin dashboard displaying inbound test ride bookings in table or Kanban view.
   * Actions: Mark as Contacted, Confirm Date, Mark Completed, Add Sales Notes.
   * One-click direct WhatsApp dialer to customer.

---

## 5. Phase 04: Customer Portal & Service Management

### 5.1 Objectives
Establish long-term customer loyalty and streamline routine maintenance for Zuboo owners in the Southern Province.

### 5.2 Key Deliverables
1. **Digital Warranty Registry:**
   * Customers enter their vehicle chassis/frame VIN and motor serial number to verify their active warranty duration and battery health history.
2. **Service Appointment Scheduler:**
   * Online booking for 1,000 km first checkup, periodic brake inspections, and BMS diagnostic scans at the Galle workshop.
3. **EV Care & Battery Knowledge Base:**
   * Interactive guides on maximizing lithium/lead-acid battery life, rainy season riding advice, and standard home-charging electrical safety.

---

## 6. Phase 05: Multi-Showroom Expansion & Localization

### 6.1 Objectives
Expand the platform's reach across Sri Lanka with full local language accessibility and e-commerce parts fulfillment.

### 6.2 Key Deliverables
1. **Trilingual Localization (i18n):**
   * Next.js internationalized routing supporting:
     * English (Default)
     * Sinhala (සිංහල)
     * Tamil (தமிழ்)
2. **Multi-Showroom Geolocation:**
   * Showroom locator with interactive Google Maps for Galle Flagship, Matara branch, and upcoming Western Province hubs.
3. **OEM Genuine Spare Parts & Accessories Store:**
   * Integrated shopping cart for tires, replacement mirrors, tail boxes, high-speed smart chargers, and protective helmets.
   * Integration with Sri Lankan online payment gateways (PayHere, WebXpay, Genie).
