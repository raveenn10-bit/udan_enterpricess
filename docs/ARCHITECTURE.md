# Technical Architecture & Systems Engineering

**Document Reference:** `DOC-UE-005`  
**Application Stack:** Next.js 16 (App Router) • React 19 • Tailwind CSS v4 • TypeScript 7  
**Animation & Interaction:** GSAP 3.15 • Lenis 1.3  
**Backend as a Service:** Google Firebase 13 (Firestore & Authentication)  
**Author:** Harsh Apex Digital Solutions  

---

## 1. Architectural Philosophy

The Udan Enterprises web platform is built upon a high-performance modern web stack designed to combine **editorial design elegance** with **instant page responsiveness** and **robust cloud data collection**.

```
+---------------------------------------------------------------------------------------+
|                                CLIENT BROWSER RUNTIME                                 |
+---------------------------------------------------------------------------------------+
        |                                       |                               |
        v                                       v                               v
+-----------------------+               +-----------------------+       +---------------+
|     UI LAYER          |               |   ANIMATION LAYER     |       | SMOOTH SCROLL |
| Next.js 16 App Router |               | GSAP 3.15             |       | Lenis 1.3     |
| React 19 Client Tree  |               | ScrollTrigger Plugins |       | RAF Hook      |
+-----------------------+               +-----------------------+       +---------------+
        |                                       |                               |
        +---------------------------------------+-------------------------------+
                                                |
                                                v
                                +-------------------------------+
                                |     DATA & STATE ENGINE       |
                                | TypeScript 7 / data/bikes.ts  |
                                +-------------------------------+
                                                |
                                                v
                                +-------------------------------+
                                |  BACKEND AS A SERVICE (BaaS)  |
                                | Google Firebase 13            |
                                | • Firestore (Bookings/Leads)  |
                                | • Auth (Admin Roadmap)        |
                                +-------------------------------+
```

---

## 2. Core Technology Stack

| Layer | Technology | Version | Key Responsibility |
|:---|:---|:---|:---|
| **Framework** | Next.js App Router | `16.4.0` | Server-Side Rendering (SSR), Static Generation (SSG), routing, bundling with Turbopack. |
| **View Library**| React | `19.3.0` | Declarative UI rendering, hooks, hydration, client-state management. |
| **Language** | TypeScript | `7.0.2` | Static typing, interface enforcement, type-safe API boundaries. |
| **Styling** | Tailwind CSS v4 | `4.3.3` | Utility-first CSS via `@tailwindcss/postcss`, CSS variables, responsive modifiers. |
| **CSS Compiler**| PostCSS | `8.5.29` | CSS post-processing with `@tailwindcss/postcss` and `autoprefixer`. |
| **Motion** | GSAP (GreenSock) | `3.15.0` | Scroll-triggered entrance animations, stagger effects, timeline controls. |
| **Smooth Scroll**| Lenis | `1.3.26` | Inertial momentum scrolling, unified scroll physics across macOS/Windows/iOS/Android. |
| **Icons** | Lucide React | `1.54.0` | Tree-shakable SVG micro-icons with consistent 24px stroke grid. |
| **Database** | Google Firebase Firestore | `13.0.0` | Cloud document persistence for test-ride bookings and newsletter subscribers. |

---

## 3. Directory & Module Organization

The codebase follows the strict standard Next.js App Router convention:

```
f:\Udan Enterprices\
├── app/
│   ├── globals.css                 # Tailwind v4 import, CSS variables, typography rules
│   ├── layout.tsx                  # Root layout, Google Fonts injector, SmoothScroll wrapper
│   └── page.tsx                    # Master single-page showroom controller
├── components/
│   ├── Navbar.tsx                  # Sticky header with glass backdrop blur and mobile drawer
│   ├── HeroSection.tsx             # Video hero stage with volume/pause toggles & CTA
│   ├── FeaturedModels.tsx          # 3-card showroom highlight grid with provisional flags
│   ├── AllBikesCatalogue.tsx       # 8-model catalog with category filters and live search
│   ├── WhyElectric.tsx             # Engineering specifications & technical diagram card
│   ├── MaintenanceService.tsx      # After-sales warranty pillars & service appointment CTA
│   ├── ContactBar.tsx              # Galle showroom address, phone hotline & WhatsApp strip
│   ├── Footer.tsx                  # Brand mark, quick links, newsletter capture form
│   ├── TestRideModal.tsx           # Modal dialog with Firestore booking submission & WhatsApp redirect
│   └── SmoothScroll.tsx            # Lenis animation frame loop controller
├── data/
│   └── bikes.ts                    # Strongly typed master dataset of all 8 Zuboo models
├── lib/
│   ├── firebase.ts                 # Firebase app initialization and Firestore singleton
│   ├── gsap.ts                     # GSAP and ScrollTrigger SSR-safe registration
│   └── utils.ts                    # Classnames merger (`clsx` + `tailwind-merge`)
├── public/                         # Static WebP images, logos, video files
├── docs/                           # Architectural, design, and operational manuals
├── next.config.mjs                 # Next.js compiler settings and image domains
├── postcss.config.mjs              # PostCSS plugins setup
├── tsconfig.json                   # Strict TypeScript compiler options and path aliases
└── package.json                    # Dependency and script manifests
```

---

## 4. Frontend Engineering & Component Architecture

### 4.1 Page Hydration & Rendering Strategy
`app/page.tsx` operates as a `"use client"` coordinate component that manages top-level modal state (`testRideModalOpen` and `selectedBikeForModal`).

```typescript
// app/page.tsx architecture flow:
export default function HomePage() {
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  const [selectedBikeForModal, setSelectedBikeForModal] = useState<string>("t3");
  // Handler functions passed down to action buttons:
  // onSelectModelForTestRide(bikeId) -> opens modal with preselected bike
}
```

### 4.2 Lenis Smooth Scroll Integration (`components/SmoothScroll.tsx`)
Lenis normalizes mouse wheel and touchpad acceleration curves, eliminating jarring jumps:

```typescript
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### 4.3 GSAP & ScrollTrigger Initialization (`lib/gsap.ts`)
To prevent server-side evaluation errors during Next.js build prerendering, GSAP plugins are conditionally registered only when executing in the browser (`typeof window !== "undefined"`):

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

---

## 5. Firebase Backend & Data Persistence

### 5.1 Firebase Architecture (`lib/firebase.ts`)
The Firebase SDK is initialized using a safe singleton pattern that prevents duplicate app instance creation across Next.js Hot Module Replacement (HMR) reloads:

```typescript
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAnOAmGW5K5Oma-I6ODV0jzShfVxNiqwU",
  authDomain: "udan-enterprises-zuboo.firebaseapp.com",
  projectId: "udan-enterprises-zuboo",
  storageBucket: "udan-enterprises-zuboo.firebasestorage.app",
  messagingSenderId: "895480239204",
  appId: "1:895480239204:web:853a4895f0b4304c7abb71"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig };
```

### 5.2 Firestore Data Schema

#### 1. Collection: `test_ride_bookings`
Stores inbound test-ride bookings generated via the web modal:

```json
{
  "customerName": "Kasun Perera",
  "phoneNumber": "0778899123",
  "bikeModelId": "t3",
  "bikeModelName": "Zuboo T3",
  "preferredDate": "2026-10-15",
  "notes": "Looking for installment plans",
  "status": "pending",
  "createdAt": "ServerTimestamp"
}
```

#### 2. Collection: `newsletter_subscribers`
Captures lead email addresses from the global footer:

```json
{
  "email": "customer@example.lk",
  "subscribedAt": "ServerTimestamp"
}
```

### 5.3 Resilient Client-Side Fallback
In scenarios where internet connectivity is erratic or Firestore rules are pending administrative configuration, form submission logic in `TestRideModal.tsx` and `Footer.tsx` captures errors gracefully, logs a non-blocking console warning, and immediately transitions the user to a **Direct WhatsApp Confirmation Action**. This ensures zero lost leads even under adverse network conditions.

---

## 6. Type Safety & Data Modeling (`data/bikes.ts`)

Every vehicle is bounded by the strict `BikeModel` interface:

```typescript
export interface BikeColor {
  name: string;
  hex: string;
  image: string;
}

export interface BikeModel {
  id: string;
  slug: string;
  name: string;
  modelCode: string;
  badge: string;
  tagline: string;
  description: string;
  advertisedPrice: number;
  formattedPrice: string;
  isPriceVerified: boolean;
  motorPower: string;
  topSpeed: string;
  advertisedRange: string;
  battery: string;
  chargingTime?: string;
  dimensions?: string;
  brakes: string;
  display: string;
  tires?: string;
  warranty: {
    batteryAndMotor: string;
    chassis: string;
    isVerified: boolean;
  };
  features: string[];
  mainImage: string;
  originalPoster: string;
  colors?: BikeColor[];
  isFeatured?: boolean;
  provisionalNotes: string[];
}
```

---

## 7. Performance & Security Best Practices

1. **Turbopack Compiler:** Next.js 16 leverages Turbopack for ultra-fast Hot Module Replacement and production bundling.
2. **Next.js Image Optimization:** Automatic WebP/AVIF content negotiation, responsive `srcset` generation, and native lazy loading.
3. **Google Fonts via `next/font`:** Preloads `Inter` and `Space_Grotesk` at build time without render-blocking third-party network requests.
4. **Content Security:** No direct SQL or executable database credentials in frontend bundles; Firebase is accessed strictly via scoped client tokens governed by Firestore Security Rules.
