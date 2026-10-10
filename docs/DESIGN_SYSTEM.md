# Design System Specification — Minimal Premium Automotive Editorial

**Document Reference:** `DOC-UE-002`  
**Brand Identity:** Udan Enterprises • Zuboo Electric Mobility  
**Design Archetype:** Minimal Premium Automotive Editorial  
**Version:** 1.0.0  
**Target Environment:** Web & Mobile (Next.js 16 / Tailwind CSS v4)  

---

## 1. Design Philosophy & Creative Vision

The **"Minimal Premium Automotive Editorial"** design system is formulated to elevate electric two-wheelers in Sri Lanka from commodity utility gadgets into coveted, forward-thinking automotive lifestyle products. 

Automotive design systems often default to aggressive high-saturation gamer palettes (fluorescent greens or jarring neons) or cluttered marketplace catalog grids. The Udan Enterprises design system rejects these tropes in favor of an **architectural, editorial aesthetic**:

* **Quiet Confidence:** Generous whitespace, razor-thin borders, and low-saturation backgrounds allow the motorcycles' physical contours and engineering specifications to command focus.
* **Typographic Rigor:** A deliberate dual-type hierarchy pairing the geometric structure of *Space Grotesk* with the neutral readability of *Inter*.
* **Precision Hairlines:** 1px hairline dividers create an editorial rhythm reminiscent of high-end automotive periodicals and Swiss graphic design.
* **Tactile Interactions:** Subtle micro-interactions, silky smooth scrolling (Lenis), and purposeful entrance transitions (GSAP).

---

## 2. Color Palette & Semantic Tokens

The color palette is derived from automotive paint tones, raw metal, cold ceramic glass, and refined oceanic coastal hues native to Galle, Sri Lanka.

```
+-------------------------------------------------------------------------------+
|                        EDITORIAL COLOR SPECIFICATIONS                         |
+-------------------+-------------------+-------------------+-------------------+
| Primary Bg        | Secondary Tint    | Obsidian Dark     | Titanium Gray     |
| #F7F9FA           | #E8F1F5           | #111820           | #667780           |
+-------------------+-------------------+-------------------+-------------------+
| Oceanic Slate     | Precision Border  | Pure Surface      | Zuboo Crimson     |
| #346C83           | #E0E8EC           | #FFFFFF           | #D32F2F           |
+-------------------+-------------------+-------------------+-------------------+
```

### 2.1 Color Tokens Table

| Token Name | Hex Code | RGB | HSL | Semantic Usage |
|:---|:---|:---|:---|:---|
| `--bg-primary` | `#F7F9FA` | `rgb(247, 249, 250)` | `hsl(200, 20%, 97%)` | Primary canvas background; soft, glare-free off-white. |
| `--bg-secondary` | `#E8F1F5` | `rgb(232, 241, 245)` | `hsl(198, 38%, 94%)` | Secondary section background, badge backgrounds, pill hover states. |
| `--text-primary` | `#111820` | `rgb(17, 24, 32)` | `hsl(212, 31%, 10%)` | High-contrast body text, primary headlines, high-emphasis UI controls. |
| `--text-secondary` | `#667780` | `rgb(102, 119, 128)` | `hsl(201, 11%, 45%)` | Secondary copy, metadata, spec descriptions, inactive tabs. |
| `--accent-blue` | `#346C83` | `rgb(52, 108, 131)` | `hsl(197, 43%, 36%)` | Primary brand accent, interactive links, focused inputs, active chips. |
| `--border-color` | `#E0E8EC` | `rgb(224, 232, 236)` | `hsl(200, 24%, 90%)` | Editorial hairlines, card borders, subtle table separators. |
| `--white` | `#FFFFFF` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | Card surface stages, modal containers, crisp contrast cards. |
| `--dark-section` | `#111820` | `rgb(17, 24, 32)` | `hsl(212, 31%, 10%)` | Dark mode callouts, high-torque spec cards, contrast sections. |
| `--zuboo-red` | `#D32F2F` | `rgb(211, 47, 47)` | `hsl(0, 65%, 51%)` | Zuboo OEM identity badge, warning indicators, select pulse pings. |

### 2.2 Global CSS Custom Properties (`app/globals.css`)

```css
:root {
  --bg-primary: #F7F9FA;
  --bg-secondary: #E8F1F5;
  --text-primary: #111820;
  --text-secondary: #667780;
  --accent-blue: #346C83;
  --border-color: #E0E8EC;
  --white: #FFFFFF;
  --dark-section: #111820;
  --zuboo-red: #D32F2F;
}
```

---

## 3. Typography Architecture

The platform uses two carefully paired typefaces loaded via `next/font/google` for optimal performance and zero Cumulative Layout Shift (CLS).

### 3.1 Type Families

1. **Space Grotesk (`var(--font-space-grotesk)`)**
   * **Role:** Editorial Display, Section Headings (`h1`–`h4`), Hero Statements, Numerical Callouts, Model Code badges.
   * **Attributes:** Sharp geometric terminals, wide posture, technical automotive character.
   * **Tracking:** Tight letter-spacing (`-0.03em` to `-0.02em`).
   * **Weights:** Medium (500), Bold (700).

2. **Inter (`var(--font-inter)`)**
   * **Role:** Body copy, micro-labels, technical spec tables, form controls, footer links.
   * **Attributes:** High x-height, neutral open counters, supreme legibility across small mobile screens.
   * **Tracking:** Normal (`0em`) to Wide (`+0.05em`) for uppercase micro-labels.
   * **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700).

### 3.2 Typographic Hierarchy Scale

| Element | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Tracking | Text Transform |
|:---|:---|:---|:---|:---|:---|:---|
| **Display H1** | Space Grotesk | `72px / 40px` | Bold (700) | `1.04` | `-0.03em` | Uppercase |
| **Section H2** | Space Grotesk | `48px / 30px` | Bold (700) | `1.15` | `-0.03em` | Uppercase |
| **Subheading H3** | Space Grotesk | `28px / 22px` | Bold (700) | `1.25` | `-0.02em` | Normal / Uppercase |
| **Model Card Title** | Space Grotesk | `22px / 18px` | Bold (700) | `1.30` | `-0.02em` | Normal |
| **Editorial Lead** | Inter | `18px / 16px` | Regular (400) | `1.60` | Normal | Normal |
| **Standard Body** | Inter | `14px / 14px` | Regular (400) | `1.60` | Normal | Normal |
| **Caption / Spec** | Inter | `12px / 11px` | Medium (500) | `1.50` | `+0.01em` | Normal |
| **Micro Badge / Eyebrow**| Space Grotesk | `11px / 10px` | Bold (700) | `1.20` | `+0.08em` | Uppercase |

---

## 4. Grid, Spacing & Container Tokens

### 4.1 Editorial Container
The layout anchors to a maximum width container ensuring optical alignment across wide ultra-widescreen monitors:

```css
.editorial-container {
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;   /* 24px on mobile */
  padding-right: 1.5rem;
}

@media (min-width: 1024px) {
  .editorial-container {
    padding-left: 3rem;   /* 48px on desktop */
    padding-right: 3rem;
  }
}
```

### 4.2 Spacing Rhythm
* **Section Padding:** `py-20 lg:py-28` (80px to 112px vertical breathing room).
* **Grid Gaps:**
  * Master Catalog: `gap-6` (24px) across 4 columns (`lg:grid-cols-4`).
  * Featured Showcase: `gap-8` (32px) across 3 columns (`lg:grid-cols-3`).
  * Technology Breakdown: `gap-12` (48px) across 2 columns (`lg:grid-cols-12`).

### 4.3 Hairline Divider Classes
Instead of thick box shadows, sections are bounded by crisp 1px borders:
* `.hairline-t`: `border-top: 1px solid var(--border-color);`
* `.hairline-b`: `border-bottom: 1px solid var(--border-color);`
* `.hairline-l`: `border-left: 1px solid var(--border-color);`
* `.hairline-r`: `border-right: 1px solid var(--border-color);`

---

## 5. Component & UI Element Specifications

### 5.1 Button Hierarchy

#### 1. Primary Solid Action
* **Background:** Obsidian Dark `#111820`
* **Text:** Pure White `#FFFFFF`
* **Border:** None / Transparent
* **Hover State:** Background `#346C83` (Oceanic Slate Blue)
* **Active State:** `transform: scale(0.98)`
* **Usage:** "Explore Collection", "Confirm Test Ride Request", "Book Test Ride".

```html
<button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#111820] hover:bg-[#346C83] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm active:scale-98">
  Primary Action
</button>
```

#### 2. Secondary Tinted Action
* **Background:** Light Tint `#E8F1F5`
* **Text:** Obsidian Dark `#111820`
* **Border:** 1px solid `#E0E8EC`
* **Hover State:** Background `#d8e7ee`
* **Usage:** "Inquire on WhatsApp", secondary filter buttons.

```html
<a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-[#111820] bg-[#E8F1F5] hover:bg-[#d8e7ee] transition-colors border border-[#E0E8EC]">
  Secondary Action
</a>
```

#### 3. Ghost / Outline Button
* **Background:** White `#FFFFFF`
* **Text:** `#111820`
* **Border:** 1px solid `#E0E8EC`
* **Hover State:** Border `#111820`
* **Usage:** "Book a Test Ride" (Hero alternate), filter tags.

---

### 5.2 Card Surfaces

#### 1. Editorial Product Card
* **Surface Background:** Warm Gray `#F7F9FA`
* **Inner Stage Background:** Pure White `#FFFFFF` with 1px border `#E0E8EC`
* **Border:** 1px solid `#E0E8EC`
* **Corner Radius:** 12px (`rounded-xl` or `rounded-2xl`)
* **Hover Micro-interaction:** Border shifts to `#346C83/50`, inner motorcycle image scales `scale-105` over 300ms ease-out.

#### 2. Technical Callout Card (Dark Obsidian Variant)
* **Surface Background:** Obsidian `#111820`
* **Text:** High-contrast White `#FFFFFF` & Slate Gray `#94A3B8`
* **Border:** 1px solid rgba(255, 255, 255, 0.1)
* **Accent Highlights:** Emerald `#10B981`, Sky `#38BDF8`, Amber `#F59E0B`
* **Usage:** Core battery/motor/TFT architecture section (`WhyElectric.tsx`).

---

### 5.3 Interactive Swatches & Filter Pills

* **Category Filter Pills:**
  * Active: Background `#111820`, Text `#FFFFFF`.
  * Inactive: Background `#F7F9FA`, Text `#667780`, Border `#E0E8EC`.
* **Color Swatches (e.g., Zuboo T3):**
  * 16px circular swatches (`w-4 h-4 rounded-full`).
  * Inactive: 1px border `#CBD5E1`.
  * Active: 2px border `#346C83`, `scale-125` transformation.

---

## 6. Motion & Animation Standards

1. **Scroll Smoothing:**
   * Handled by **Lenis** (`SmoothScroll.tsx`) with damping factor `1.0` and smooth touch interpolation.
2. **GSAP ScrollTrigger:**
   * Entrance animations trigger at `top 75%` to `top 80%` viewport intersection.
   * Standard motion curve: `duration: 0.8`, `ease: "power2.out"`.
   * Staggered sequence: `stagger: 0.12` to `0.15` across grid child cards.
3. **Hardware Acceleration:**
   * All transforms use GPU-accelerated CSS properties (`transform: translateY()`, `opacity`, `scale`).
   * Avoid animating layout geometry (`height`, `width`, `padding`) to preserve 60+ FPS on mobile devices.
