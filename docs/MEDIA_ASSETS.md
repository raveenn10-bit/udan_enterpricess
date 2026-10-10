# Media Asset Architecture & Register — Udan Enterprises

**Document Reference:** `DOC-UE-004`  
**Media Base Directory:** `/public/media/`  
**Version:** 1.0.0  
**Status:** Cleaned, Transcoded & Normalized  

---

## 1. Asset Strategy & Optimization Pipeline

In high-performance automotive web portals, visual assets account for over 85% of total downloaded bytes. The media pipeline for Udan Enterprises was engineered to achieve three critical objectives:
1. **Zero Layout Shift:** Explicit dimension ratios and responsive Next.js Image component sizing.
2. **Next-Generation Formats:** Transcoding raw high-resolution JPEGs, PNGs, and camera clips into compressed modern WebP and MP4 formats.
3. **Semantic Directory Architecture:** Replacing unorganized, localized filenames (e.g., Chinese default filenames from importer crates) with clean, model-indexed paths.

---

## 2. Directory Structure (`/public`)

```
public/
├── logo.png                                # Direct root alias for Udan Enterprises Logo
├── zuboo-logo.webp                         # Direct root alias for Zuboo OEM Logo
├── hero/
│   └── hero-video.mp4                      # Optimized background video stream
├── bikes/                                  # Color variant catalog
│   ├── gt/
│   │   └── gt-adventure.webp
│   ├── paris/
│   │   └── paris-pink.jpg
│   ├── t3/
│   │   ├── t3-black.webp                  # Matte Black swatch
│   │   ├── t3-grey.webp                   # Charcoal Grey swatch
│   │   ├── t3-mint.webp                   # Soft Mint swatch
│   │   ├── t3-white.webp                  # Pearl White swatch
│   │   └── t3-cream.webp                  # Desert Sand swatch
│   └── t9/
│       └── t9-silver.webp
└── media/                                  # Canonical Production Media Tree
    ├── branding/
    │   ├── udan-logo.png                  # High-res transparency-clipped dealer logo
    │   └── zuboo-logo.webp                # Transcoded vector-raster Zuboo badge
    ├── hero/
    │   └── hero-video.mp4                 # 1080p optimized 60fps looping video
    ├── videos/
    │   └── hero-video.mp4                 # Fallback video alias
    └── bikes/                             # Model-by-model normalized directory
        ├── gt/
        │   ├── main.webp                  # Transparent background cut-out
        │   └── original.jpg               # High-res poster archive
        ├── the-tank/
        │   ├── main.webp
        │   └── original.jpg
        ├── paris/
        │   ├── main.webp
        │   └── original.jpg
        ├── t11/
        │   ├── main.webp
        │   └── original.jpg
        ├── t3/
        │   ├── main.webp
        │   ├── original.jpg
        │   └── gallery/                   # Multi-angle lifestyle gallery
        │       ├── 1.webp
        │       ├── 2.webp
        │       ├── 026a66ef-5634-4a31-95d5-6ee79692e50f.webp
        │       ├── 1756e864-fb7e-4f35-a385-eae109a27636.webp
        │       └── 573e5043-4cd7-4807-bcb5-2a0546528774.webp
        ├── ex008/
        │   ├── main.webp
        │   └── original.jpg
        ├── kb1/
        │   ├── main.webp
        │   └── original.jpg
        └── mini/
            ├── main.webp
            └── original.jpg
```

---

## 3. Asset Mapping & Transcoding Register

### 3.1 Bike Models Master Asset Register

| Model Slug | Public Canonical WebP | Original Source File | File Size (WebP) | Aspect Ratio | Dimensions |
|:---|:---|:---|:---:|:---:|:---:|
| `gt` | `/media/bikes/gt/main.webp` | `Media/Bikes/GT/未标题-3.webp` | ~38 KB | 4:3 | 800 × 600 |
| `the-tank`| `/media/bikes/the-tank/main.webp` | `Media/WhatsApp_Promotions/poster-2.jpeg` | ~45 KB | 4:3 | 800 × 600 |
| `paris` | `/media/bikes/paris/main.webp` | `Media/Bikes/Paris/3.31.2.jpg` | ~32 KB | 4:3 | 800 × 600 |
| `t11` | `/media/bikes/t11/main.webp` | `Media/WhatsApp_Promotions/poster-4.jpeg` | ~42 KB | 4:3 | 800 × 600 |
| `t3` | `/media/bikes/t3/main.webp` | `Media/Bikes/T3/1.webp` | ~36 KB | 4:3 | 800 × 600 |
| `ex008`| `/media/bikes/ex008/main.webp`| `Media/WhatsApp_Promotions/poster-6.jpeg` | ~40 KB | 4:3 | 800 × 600 |
| `kb1` | `/media/bikes/kb1/main.webp` | `Media/WhatsApp_Promotions/poster-7.jpeg` | ~39 KB | 4:3 | 800 × 600 |
| `mini` | `/media/bikes/mini/main.webp` | `Media/Bikes/Mini/3.6.19.webp` | ~29 KB | 4:3 | 800 × 600 |

### 3.2 T3 Colorway Swatch Assets

| Colorway Name | Color Hex | Asset Path | File Format |
|:---|:---:|:---|:---:|
| Matte Black | `#1e1e1e` | `/bikes/t3/t3-black.webp` | WebP |
| Charcoal Grey| `#4b5563` | `/bikes/t3/t3-grey.webp` | WebP |
| Soft Mint | `#d1fae5` | `/bikes/t3/t3-mint.webp` | WebP |
| Pearl White | `#f3f4f6` | `/bikes/t3/t3-white.webp` | WebP |
| Desert Sand | `#e7d7c1` | `/bikes/t3/t3-cream.webp` | WebP |

### 3.3 Raw Marketing Archive (`/Media/WhatsApp_Promotions/`)
The original promotional flyers sent by the supplier were cataloged for historical audit and spec verification:
* `poster-1.jpeg`: Zuboo GT 1800W flyer with rear tail box feature notes.
* `poster-2.jpeg`: Zuboo The Tank 3000W military styling flyer with tubular steel cage.
* `poster-3.jpeg`: Zuboo Paris 1200W European retro flyer with windshield callout.
* `poster-4.jpeg`: Zuboo T11 1800W Sports Maxi flyer with Tianneng battery specs.
* `poster-5.jpeg`: Zuboo T3 1300W multi-color commuter flyer with 100-110 km range.
* `poster-6.jpeg`: Zuboo EX008 2000W 14-inch high-wheel commuter flyer.
* `poster-7.jpeg`: Zuboo KB1 72V executive cruiser flyer with 140mm ground clearance.
* `poster-8.jpeg`: Zuboo Mini 490W eco utility bicycle flyer with front basket.

---

## 4. Normalization & Deduplication Actions

During Phase 01 development, the following file hygiene tasks were executed:
1. **Renamed Ambiguous Files:** Files with non-ASCII or Chinese character filenames (such as `未标题-1.webp` and `未标题-3.webp`) were mapped and replaced with clean semantic slugs (`/media/bikes/gt/main.webp`).
2. **Standardized WebP Formats:** Converted legacy heavy JPEG flyers (averaging 800 KB to 2.5 MB) to optimized WebP cutouts (averaging 30–45 KB), achieving an **approximate 95% reduction in file payload**.
3. **Root Alias Continuity:** Established symlinks and mirror files for `/logo.png`, `/zuboo-logo.webp`, and `/hero/hero-video.mp4` so that legacy references, OpenGraph previews, and external search crawlers do not encounter HTTP 404 errors.
4. **Hero Video Compression:** Transcoded raw source video (`Media/hero/Hero Video.mp4`, 25+ MB) into a fast-streaming MP4 with baseline profile (`public/media/hero/hero-video.mp4`), stripped of unnecessary audio channels for smooth muted background autolooping.

---

## 5. Guidelines for Future Asset Additions

When uploading new vehicle photography or promotional media:
1. **Format:** Standardize on `.webp` for photographs and `.svg` or `.png` with alpha transparency for logos.
2. **Resolution:** 
   * Catalogue Cards: Max 800 × 600 px at 72 DPI.
   * Hero Banners: Max 1920 × 1080 px at 72 DPI.
3. **Backgrounds:** Product cards look best when bikes are isolated on transparent (`rgba(0,0,0,0)`) or solid neutral backgrounds (`#FFFFFF` or `#F7F9FA`).
4. **Naming Convention:** Always use lowercase kebab-case:  
   `/public/media/bikes/[slug]/[view-angle].webp` (e.g., `/public/media/bikes/gt/front-angle.webp`).
