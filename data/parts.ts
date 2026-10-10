export interface SparePart {
  id: string;
  code: string;
  name: string;
  category: "batteries" | "tires" | "electronics" | "accessories";
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  description: string;
  specifications: Record<string, string>;
  compatibleModels: string[];
  inStock: boolean;
  warranty: string;
  image: string;
  featured?: boolean;
}

export const SPARE_PARTS_CATALOG: SparePart[] = [
  {
    id: "charger-72v-fast",
    code: "ZB-CHG-72V5A",
    name: "Zuboo 72V 5A Smart Fast Lithium Charger",
    category: "batteries",
    categoryLabel: "Batteries & Chargers",
    price: 18500,
    formattedPrice: "LKR 18,500",
    description:
      "Factory-original fast charger engineered with an intelligent microprocessor, automated temperature regulation, dual ball-bearing cooling fan, and auto-cutoff protection against overcharging.",
    specifications: {
      "Input Voltage": "220V - 240V AC 50Hz (Standard Sri Lanka Socket)",
      "Output Voltage": "72V - 84V DC",
      "Charging Current": "5.0A High-Speed Output",
      "Safety Certifications": "CE, RoHS, Over-voltage, Reverse Polarity Protection",
      "Cooling": "High-Efficiency Silent Internal Fan",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo T11", "Zuboo T3", "Zuboo EX008", "Zuboo KB1"],
    inStock: true,
    warranty: "1 Year Showroom Warranty",
    image: "/design/smart-dashboard.webp",
    featured: true,
  },
  {
    id: "charger-60v-fast",
    code: "ZB-CHG-60V4A",
    name: "Zuboo 60V 4A Compact Lithium Smart Charger",
    category: "batteries",
    categoryLabel: "Batteries & Chargers",
    price: 16500,
    formattedPrice: "LKR 16,500",
    description:
      "Compact aluminum-housed smart charger with active pulse trickle-charge logic to extend battery lifespan. Ideal for everyday home and office charging.",
    specifications: {
      "Input Voltage": "220V - 240V AC",
      "Output Voltage": "60V - 70V DC",
      "Charging Current": "4.0A Constant Current",
      "Protection": "Short-circuit & Over-heat Cutoff",
    },
    compatibleModels: ["Zuboo Paris", "Zuboo T3 (60V edition)"],
    inStock: true,
    warranty: "1 Year Showroom Warranty",
    image: "/design/smart-dashboard.webp",
  },
  {
    id: "battery-72v-32ah-tianneng",
    code: "ZB-BAT-72V32A-TN",
    name: "Genuine Tianneng 72V 32Ah Deep Cycle Power Pack",
    category: "batteries",
    categoryLabel: "Batteries & Chargers",
    price: 165000,
    formattedPrice: "LKR 165,000",
    description:
      "OEM factory replacement battery set manufactured by Tianneng, certified for deep discharge resilience, high continuous power draw, and superior performance on hilly terrain.",
    specifications: {
      "Nominal Voltage": "72V (6 × 12V High-Density Modules)",
      "Capacity": "32Ah (2.3 kWh Energy Storage)",
      "Cycle Life": "Up to 800+ Full Charge-Discharge Cycles",
      "Chemistry": "Heavy-Duty Deep Cycle Graphene-Enhanced VRLA",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo T11", "Zuboo T3", "Zuboo KB1"],
    inStock: true,
    warranty: "2 Years or 20,000 km Warranty",
    image: "/design/rear-wheel.webp",
    featured: true,
  },
  {
    id: "battery-72v-30ah-lithium",
    code: "ZB-BAT-72V30A-LI",
    name: "Premium 72V 30Ah Removable Lithium-Ion Pack with Smart BMS",
    category: "batteries",
    categoryLabel: "Batteries & Chargers",
    price: 245000,
    formattedPrice: "LKR 245,000",
    description:
      "Lightweight lithium iron chemistry pack reducing overall bike weight by 22 kg. Equipped with Bluetooth Smart BMS for real-time cell balancing, health monitoring, and rapid charging support.",
    specifications: {
      "Nominal Voltage": "72V Nominal (84V Peak)",
      "Capacity": "30Ah (2.16 kWh)",
      "Weight": "Approx. 13.5 kg (Removable with ergonomic handle)",
      "Cycle Life": "2,000+ Cycles (Over 5 years typical daily use)",
      "BMS": "60A Continuous Smart BMS with Cell Balancing",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo T11", "Zuboo EX008"],
    inStock: true,
    warranty: "3 Years Comprehensive Warranty",
    image: "/design/blueprint-bike.webp",
    featured: true,
  },
  {
    id: "tire-300-10-tubeless",
    code: "ZB-WHL-30010-AT",
    name: "3.00-10 All-Terrain Tubeless Tire (Reinforced Tread)",
    category: "tires",
    categoryLabel: "Tires & Brakes",
    price: 8500,
    formattedPrice: "LKR 8,500",
    description:
      "Heavy-duty 4-ply carcass tubeless tire designed specifically for Sri Lankan asphalt, wet monsoon conditions, and rough coastal roads around Galle and Southern Province.",
    specifications: {
      "Size": "3.00 - 10 Tubeless",
      "Ply Rating": "4PR / 6PR Reinforced Sidewall",
      "Load Index": "55J (Max 218 kg per tire)",
      "Tread Pattern": "All-Weather Hydro-Channel Grooves",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo Paris", "Zuboo T11", "Zuboo T3", "Zuboo KB1"],
    inStock: true,
    warranty: "6 Months Defect Warranty",
    image: "/design/rear-wheel.webp",
    featured: true,
  },
  {
    id: "tire-9090-14-highway",
    code: "ZB-WHL-909014-EX",
    name: "90/90-14 High-Speed Tubeless Highway Tire (EX008)",
    category: "tires",
    categoryLabel: "Tires & Brakes",
    price: 12500,
    formattedPrice: "LKR 12,500",
    description:
      "Large-diameter sport highway tire for Zuboo EX008. Provides maximum road contact, sharp high-speed cornering stability, and reduced rolling resistance.",
    specifications: {
      "Size": "90/90 - 14 M/C Tubeless",
      "Speed Rating": "Up to 100 km/h Stability",
      "Rim Compatibility": "14-Inch Alloy Sport Wheel",
    },
    compatibleModels: ["Zuboo EX008"],
    inStock: true,
    warranty: "6 Months Defect Warranty",
    image: "/design/bike-front.webp",
  },
  {
    id: "brake-pads-ceramic-dual",
    code: "ZB-BRK-CP-01",
    name: "High-Endurance Ceramic Disc Brake Pads Set (Front & Rear)",
    category: "tires",
    categoryLabel: "Tires & Brakes",
    price: 3800,
    formattedPrice: "LKR 3,800",
    description:
      "Premium heat-resistant ceramic compound disc pads offering immediate stopping power, minimal rotor wear, and noise-free braking in dust and rain.",
    specifications: {
      "Compound": "Copper-Ceramic Matrix with Anti-Squeal Backing Plate",
      "Heat Tolerance": "Up to 500°C High-Friction Fade Resistance",
      "Quantity": "Pair (1 Front Set + 1 Rear Set)",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo Paris", "Zuboo T11", "Zuboo EX008", "Zuboo KB1"],
    inStock: true,
    warranty: "Official Wear Guarantee",
    image: "/design/rear-wheel.webp",
  },
  {
    id: "smart-key-fob-system",
    code: "ZB-ELC-KEY-02",
    name: "Genuine Zuboo Smart Key Fob & Anti-Theft Alarm System",
    category: "electronics",
    categoryLabel: "Electronics & Smart Keys",
    price: 6500,
    formattedPrice: "LKR 6,500",
    description:
      "Includes two wireless keyless-entry fobs, motion vibration alarm module, and wheel-lock immobilizer. One-key push button start and panic beacon.",
    specifications: {
      "Frequency": "433.92 MHz Encrypted Rolling Code",
      "Operating Range": "Up to 50 meters line-of-sight",
      "Siren Volume": "115 dB High-Decibel Theft Deterrent",
      "Features": "Keyless Start, Remote Trunk Release, Vibration Lock",
    },
    compatibleModels: ["All Zuboo Models (GT, Tank, Paris, T11, T3, EX008, KB1, Mini)"],
    inStock: true,
    warranty: "1 Year Replacement Warranty",
    image: "/design/smart-dashboard.webp",
    featured: true,
  },
  {
    id: "display-tft-meter",
    code: "ZB-ELC-MTR-TFT",
    name: "Full-Color TFT Cockpit Digital Instrument Cluster",
    category: "electronics",
    categoryLabel: "Electronics & Smart Keys",
    price: 18000,
    formattedPrice: "LKR 18,000",
    description:
      "Ultra-crisp anti-glare TFT digital dashboard displaying live speedometer, battery voltage percentage, power consumption wattmeter, odometer, and trip meter.",
    specifications: {
      "Display Type": "5-Inch High-Contrast Color TFT LCD with Sunlight Filter",
      "Connectors": "Weatherproof Sealed Multi-pin Harness",
      "Metrics": "Speed (km/h), ODO, Trip, Battery Voltage, Gear 1-2-3, Turn Signals",
    },
    compatibleModels: ["Zuboo T11", "Zuboo T3", "Zuboo KB1"],
    inStock: true,
    warranty: "1 Year Showroom Warranty",
    image: "/design/smart-dashboard.webp",
  },
  {
    id: "helmet-sls-certified",
    code: "ZB-ACC-HLM-SLS",
    name: "DOT & SLS Certified Aerodynamic Safety Helmet",
    category: "accessories",
    categoryLabel: "Accessories & Gear",
    price: 14500,
    formattedPrice: "LKR 14,500",
    description:
      "Comfortable open-face helmet certified under Sri Lanka Standards (SLS) and US DOT. Features high-impact ABS outer shell, removable washable anti-bacterial liner, and scratch-resistant UV-filtering visor.",
    specifications: {
      "Safety Certification": "SLS 517 & US DOT Approved for Sri Lankan Roads",
      "Shell Material": "High-Impact Virgin ABS with Multi-Density EPS",
      "Visor": "Quick-Release Anti-Scratch Optical Grade Polycarbonate",
      "Sizes Available": "Medium (57-58cm), Large (59-60cm), XL (61-62cm)",
    },
    compatibleModels: ["All Riders & Models"],
    inStock: true,
    warranty: "Lifetime Shell Integrity Warranty",
    image: "/design/rider-bridge.webp",
    featured: true,
  },
  {
    id: "bike-cover-all-weather",
    code: "ZB-ACC-CVR-HD",
    name: "Heavy-Duty All-Weather Waterproof Bike Cover",
    category: "accessories",
    categoryLabel: "Accessories & Gear",
    price: 4800,
    formattedPrice: "LKR 4,800",
    description:
      "Tear-proof 210D Oxford fabric with silver PU coating to reflect intense Sri Lankan tropical sun rays, protect against torrential coastal rain, dust, and coastal sea-breeze corrosion.",
    specifications: {
      "Material": "210D Ripstop Oxford with Silver Heat-Reflective Coating",
      "Waterproofing": "100% Waterproof Sealed Seams (3000mm hydrostatic head)",
      "Security": "Front and Rear Anti-Theft Lock Holes + Windproof Buckle Straps",
      "Dimensions": "2000 × 900 × 1200 mm (Universal fit with trunk)",
    },
    compatibleModels: ["All Zuboo Models with or without Rear Box"],
    inStock: true,
    warranty: "1 Year Material Warranty",
    image: "/design/hero-scooter.webp",
  },
  {
    id: "rear-storage-trunk-28l",
    code: "ZB-ACC-TRK-28L",
    name: "Quick-Release Lockable Rear Tail Storage Trunk (28L)",
    category: "accessories",
    categoryLabel: "Accessories & Gear",
    price: 15500,
    formattedPrice: "LKR 15,500",
    description:
      "Spacious aerodynamic hard case trunk with dual safety keys, red safety reflector band, and universal quick-mounting plate. Fits a full helmet, charger, and daily groceries.",
    specifications: {
      "Volume": "28 Liters (Holds standard full-face or open-face helmet)",
      "Material": "Reinforced High-Elasticity Polypropylene (PP)",
      "Mounting": "Universal Heavy-Duty Steel Baseplate & Stainless Screws",
    },
    compatibleModels: ["Zuboo GT", "Zuboo The Tank", "Zuboo T11", "Zuboo KB1"],
    inStock: true,
    warranty: "1 Year Warranty",
    image: "/design/bike-z3.webp",
  },
  {
    id: "mini-front-cargo-basket",
    code: "ZB-ACC-BSK-MINI",
    name: "Heavy-Duty Deep Front Utility Cargo Basket",
    category: "accessories",
    categoryLabel: "Accessories & Gear",
    price: 5500,
    formattedPrice: "LKR 5,500",
    description:
      "Thickened steel wire woven front basket specifically designed for the Zuboo Mini e-bike, featuring rust-resistant vinyl coating and reinforced bottom bracket.",
    specifications: {
      "Capacity": "Up to 15 kg payload",
      "Dimensions": "320 × 260 × 240 mm",
      "Coating": "Anti-Corrosion Matte Black Vinyl Finish",
    },
    compatibleModels: ["Zuboo Mini"],
    inStock: true,
    warranty: "1 Year Showroom Warranty",
    image: "/design/bike-x1.webp",
  },
];

export function getPartById(id: string): SparePart | undefined {
  return SPARE_PARTS_CATALOG.find((p) => p.id === id);
}

export function getPartsByCategory(category: string): SparePart[] {
  if (category === "all") return SPARE_PARTS_CATALOG;
  return SPARE_PARTS_CATALOG.filter((p) => p.category === category);
}
