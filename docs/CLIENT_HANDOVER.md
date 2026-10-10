# Client Handover & Operational Guide — Udan Enterprises

**Document Reference:** `DOC-UE-008`  
**Prepared For:** Management & Showroom Staff, Udan Enterprises (Galle, Sri Lanka)  
**Prepared By:** Harsh Apex Digital Solutions  
**Version:** 1.0.0 (Phase 01 Handover)  
**Date:** October 2026  

---

## 1. Welcome to Your New Digital Showroom

Congratulations! **Udan Enterprises** is now equipped with a state-of-the-art digital showroom and customer acquisition platform for **Zuboo Electric Bikes**. 

Developed by **Harsh Apex Digital Solutions**, this web application has been engineered to automotive industry standards using the **"Minimal Premium Automotive Editorial"** design system. It combines editorial sophistication with lightning-fast performance, interactive vehicle exploration, and direct WhatsApp lead conversion.

This manual serves as your complete operational guide for managing incoming inquiries, verifying physical showroom inventory, updating retail pricing, and preparing for Phase 02.

---

## 2. Showroom Verification Checklist (Galle Showroom)

As noted throughout your digital platform, all vehicle prices and technical specifications are currently flagged as **provisional** (`isPriceVerified: false`). These values were transcribed from preliminary importer promotional posters.

Before running major advertising campaigns or finalizing customer leasing agreements, your showroom team in Galle must inspect your physical crate inventory and complete the following verification audit:

```
+-----------------------------------------------------------------------------------------+
|                         SHOWROOM VEHICLE VERIFICATION CHECKLIST                         |
+-------------+-----------------------+--------------------+------------------+-----------+
| Model Name  | Frame / VIN Plate     | Battery Pack Code  | Motor Wattage    | Verified? |
+-------------+-----------------------+--------------------+------------------+-----------+
| Zuboo GT    | Head tube metal badge | 72V 32Ah Tianneng? | 1800W Stamped?   | [ ] Done  |
| The Tank    | Head tube metal badge | 72V High Discharge | 3000W Stamped?   | [ ] Done  |
| Zuboo Paris | Head tube metal badge | 72V 23Ah Pack      | 1200W Stamped?   | [ ] Done  |
| Zuboo T11   | Head tube metal badge | Tianneng Lead-acid | 1800W Stamped?   | [ ] Done  |
| Zuboo T3    | Head tube metal badge | 72V 32Ah Pack      | 1300W Stamped?   | [ ] Done  |
| Zuboo EX008 | Head tube metal badge | 72V Pack           | 2000W Stamped?   | [ ] Done  |
| Zuboo KB1   | Head tube metal badge | 72V 32Ah Pack      | Rated Wattage?   | [ ] Done  |
| Zuboo Mini  | Head tube metal badge | 48V 12Ah Lead-acid | 490W Eco Hub?    | [ ] Done  |
+-------------+-----------------------+--------------------+------------------+-----------+
```

### 2.1 Four Critical Verification Questions to Confirm:
1. **Battery Chemistry:** Are the batteries Tianneng Graphene Lead-Acid, Standard AGM, or Lithium-ion? (This affects warranty duration and charging advice).
2. **Standard Equipment vs. Optional Accessories:** Is the rear luggage trunk / tail box on the **Zuboo GT** and **Zuboo The Tank** included free in the base price, or is it an optional accessory?
3. **Charger Compatibility:** Does every bike ship with a standard Sri Lankan 3-pin fused plug (Type G, 230V)?
4. **Final Showroom Retail Price (LKR):** Have import duties, VAT, port clearance, and local assembly costs been accounted for in the advertised price?

---

## 3. How to Update Vehicle Prices & Specifications

All vehicle data is housed in a single, well-organized configuration file:  
`f:\Udan Enterprices\data\bikes.ts`

You or your technical administrator can update prices, mark models as verified, or change specs in under 60 seconds without altering any complex code.

### 3.1 Step-by-Step Price Update Example

Suppose the retail price of the **Zuboo T3** changes from **Rs 395,000** to **Rs 410,000** following showroom verification:

1. Open `data/bikes.ts` in any code editor (VS Code, Notepad++, etc.).
2. Locate the model object with `id: "t3"`.
3. Locate lines 203–204:
   ```typescript
   // BEFORE:
   advertisedPrice: 395000,
   formattedPrice: "LKR 395,000",
   isPriceVerified: false,
   ```
4. Update the values to:
   ```typescript
   // AFTER:
   advertisedPrice: 410000,
   formattedPrice: "LKR 410,000",
   isPriceVerified: true,  // Set to true once verified!
   ```
5. Save the file. The website updates automatically across the Master Catalogue, Featured Highlights, and WhatsApp Inquiry links!

---

## 4. Managing WhatsApp Inquiries & Test Ride Leads

### 4.1 Inbound WhatsApp Inquiries
Every bike card features an **"Inquire"** button that connects directly to your showroom WhatsApp hotline:  
`https://wa.me/94784969652` *(Udan Enterprises active WhatsApp Hotline configured across all pages)*.

When a customer clicks the button, WhatsApp opens automatically with a pre-written message, for example:
> *"Hi Udan Enterprises, I would like to inquire about the Zuboo GT (GT-1800W) advertised at LKR 445,000."*

### 4.2 Best Practices for Showroom Sales Staff
* **Response Time:** Aim to respond within **15 minutes** during showroom hours (8:30 AM – 6:30 PM).
* **Qualifying the Customer:**
  1. Ask for their daily commuting distance (e.g., Galle to Matara, or Galle Fort city errands).
  2. Clarify their primary requirement: cargo/luggage, maximum passenger comfort, or lowest purchase price.
  3. Offer them a free test ride at your Galle showroom.

---

## 5. Live Admin Dashboard, Mini CMS & Lead Management System

Your digital platform is now equipped with a custom-engineered **Admin Dashboard & Content Management System** accessible at:  
👉 **`https://yourdomain.com/admin/login`** (or `/admin`)

### 5.1 Showroom Owner Login Credentials
* **Login URL:** `/admin/login`
* **Authorized Owner Email:** `pibida17udan4131@gmail.com`
* **Default Security Password:** `Pibi@2003`
* **Access Level:** Showroom Owner (Full Administrative Privileges & RBAC Master)

### 5.2 Dashboard Features & Capabilities

```
+-----------------------------------------------------------------------------------------+
|                    UDAN ENTERPRISES — DASHBOARD MODULES OVERVIEW                        |
+----------------------+------------------------------------------------------------------+
| Module               | Features & Actions                                               |
+----------------------+------------------------------------------------------------------+
| 1. Overview          | Real-time stats (Total Bikes, Published, Out-of-Stock, Leads)    |
| 2. Bike Fleet CRUD   | Add models, update prices (LKR), edit specs, draft/publish       |
| 3. Test Ride Bookings| Pipeline (Pending -> Contacted -> Confirmed -> Done), WhatsApp   |
| 4. Inquiries CRM     | Lead tracking, follow-up status, direct WhatsApp chat, CSV export|
| 5. Offers & Deals    | Create promotional discounts, cash rebates, active toggles       |
| 6. Media Library     | Curated transparent PNGs & WebP cutouts (Zero-cost Spark plan)   |
| 7. Homepage CMS      | Edit Hero headline, subtitle, announcement ticker, section copy  |
| 8. Showroom Settings | Update Hotline (078 496 9652), WhatsApp, Google Maps URL, hours  |
| 9. SEO Management    | Configure meta title and search descriptions                     |
| 10. Staff RBAC       | Grant or revoke Staff permissions (Owner only)                   |
| 11. Audit Trail      | Immutable activity log tracking all changes with timestamps      |
+----------------------+------------------------------------------------------------------+
```

### 5.3 Step-by-Step Guide: Updating Bike Prices via Dashboard
1. Log in at `/admin/login` with your credentials.
2. Click **Bike Fleet CRUD** in the sidebar.
3. Click the **Edit (Pencil)** icon next to any model (e.g. *Zuboo T3* or *Zuboo GT*).
4. Update the **Advertised Price (LKR)** or **Stock Status** (In Showroom, Low Stock, Out of Stock).
5. Click **Save Changes**. The update is written directly to Cloud Firestore and reflected across the showroom catalogue!

### 5.4 Step-by-Step Guide: Managing Incoming Test Ride Bookings
1. Click **Test Ride Bookings** in the sidebar.
2. Review new customer submissions with phone number, selected bike, and preferred date.
3. Click the green **WhatsApp** button to immediately open a pre-filled chat with the customer.
4. Update the booking status dropdown from **Pending** to **Contacted** or **Confirmed**.
5. When exporting records for monthly reviews, click **Export CSV**.

---

## 6. Cloud Firestore Security Rules (Production Certified)

All customer inquiries and vehicle data are protected under strict Cloud Firestore Security Rules (`firestore.rules`):
* **Public Access:** Can only read published bikes and active offers; can submit new inquiries and bookings.
* **Staff Access:** Can view and manage test ride leads and customer inquiries.
* **Owner Access:** Full control over bike pricing, CMS, showroom settings, staff roles, and audit trail.
* **Audit Trail Immutability:** Audit records can never be edited or deleted by anyone.

---

## 7. Production Deployment & Domain Setup

To deploy your updated web application:
1. Connect this GitHub repository (`https://github.com/raveenn10-bit/udan_enterpricess.git`) to [Vercel](https://vercel.com).
2. All Firebase environment variables and Spark plan configurations are pre-wired.
3. Once deployed, link your custom domain (e.g., `www.udanenterprises.lk`).

---

## 8. Support & Technical Assistance

* **Showroom Dealership:** Udan Enterprises — Zuboo Electric Bikes  
* **Location:** Udugama Road, Kurunduwatta, Galle, Sri Lanka  
* **Direct Hotline:** 078 496 9652  
* **WhatsApp Hotline:** +94 78 496 9652  
* **Engineering Lead:** Senior Full-Stack Architect  

