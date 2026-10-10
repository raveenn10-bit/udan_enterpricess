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

## 5. Accessing Test Ride Bookings in Firebase Console

When a customer submits a test ride request through the web modal, the details are automatically saved to your cloud database in Google Firebase.

### 5.1 How to View Your Bookings
1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Log in with your Google account.
3. Select the project: **`udan-enterprises-zuboo`**.
4. In the left sidebar, click **Firestore Database**.
5. Click on the collection named **`test_ride_bookings`**.
6. You will see every submission with:
   * `customerName`
   * `phoneNumber`
   * `bikeModelName`
   * `preferredDate`
   * `createdAt` timestamp

---

## 6. Production Deployment & Domain Setup

To make your website accessible to the public on your own custom domain (e.g., `www.udanenterprises.lk` or `www.zuboobikes.lk`):

### 6.1 Recommended Hosting: Vercel
Next.js is developed by Vercel, making it the fastest and most cost-effective hosting platform:
1. Create a free account at [vercel.com](https://vercel.com).
2. Connect your GitHub repository containing the `Udan Enterprices` project.
3. Click **Deploy**. Vercel will automatically detect Next.js 16 and deploy your site to global high-speed edge servers in under 2 minutes.
4. Under **Settings → Domains**, enter your custom domain (e.g., `udanenterprises.lk`) and follow the simple DNS record instructions.

---

## 7. Looking Ahead: Preview of Phase 02

With Phase 01 complete and operational, Harsh Apex Digital Solutions has architected your platform to seamlessly expand into **Phase 02**:

1. **Dedicated Model Pages (`/bikes/[slug]`):** Full-screen immersion pages for each of the 8 models with high-resolution photo galleries and detailed technical downloads.
2. **Sri Lankan Rupee (LKR) Loan & EMI Calculator:** An interactive financing slider allowing customers to calculate monthly installments and compare them with monthly petrol savings.
3. **Vehicle Comparison Matrix:** Side-by-side comparison of 2 or 3 Zuboo models.
4. **Staff Admin Dashboard (Phase 03):** Update stock and prices directly from your smartphone or tablet without touching any code.

---

## 8. Support & Technical Assistance

For technical support, code updates, or to commence Phase 02 development, contact:

* **Engineering Agency:** Harsh Apex Digital Solutions  
* **Lead Engineer:** Digital Solutions Architect  
* **Documentation Portal:** `/docs/`  
* **Codebase Repository:** `f:\Udan Enterprices`  
