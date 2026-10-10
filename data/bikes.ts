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
  category: string;
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
  suspension?: string;
  display: string;
  tires?: string;
  warranty: {
    batteryAndMotor: string;
    chassis: string;
    isVerified: boolean;
  };
  features: string[];
  mainImage: string;
  originalPoster?: string;
  gallery?: string[];
  colors?: BikeColor[];
  isFeatured?: boolean;
  provisionalNotes: string[];
}

export const ZUBOO_COLLECTION: BikeModel[] = [
  {
    id: "gt",
    slug: "gt",
    name: "Zuboo GT",
    modelCode: "GT-1800W",
    badge: "Featured • Touring",
    category: "Touring & Adventure",
    tagline: "Heavy-Duty Dual-Sport Utility",
    description: "Built for endurance and long-distance touring, featuring high-strength chassis, rear tail carrier rack with storage box, and double airbag rear shock absorption.",
    advertisedPrice: 445000,
    formattedPrice: "LKR 445,000",
    isPriceVerified: false,
    motorPower: "1800W High Torque",
    topSpeed: "55 - 60 km/h (Estimated)",
    advertisedRange: "≥ 100 km",
    battery: "72V 32Ah High Capacity",
    chargingTime: "6 - 10 hours",
    dimensions: "1790 × 770 × 1165 mm",
    brakes: "Dual Hydraulic Disc Brakes",
    suspension: "Long-travel front hydraulic fork & double airbag rear shock absorbers",
    display: "Digital LCD Meter",
    tires: "3.00-10 Tubeless Highway / Urban",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Heavy-duty iron carrier rack with tail storage box",
      "Double airbag rear shock absorption system",
      "Three-speed electronic gear adjustment",
      "High-output LED projector lighting system",
      "Anti-theft alarm security system"
    ],
    mainImage: "/media/bikes/gt/main.webp",
    gallery: [
      "/bikes/gt/gt.webp",
      "/media/bikes/gt/gallery/gt-1.webp",
      "/media/bikes/gt/gallery/gt-2.webp",
      "/media/bikes/gt/gallery/gt-3.webp",
      "/media/bikes/gt/gallery/gt-4.webp",
      "/media/bikes/gt/gallery/gt-5.webp",
      "/media/bikes/gt/gallery/gt-6.webp",
      "/media/bikes/gt/gallery/gt-7.webp"
    ],
    colors: [
      { name: "Pearl White", hex: "#f3f4f6", image: "/media/bikes/gt/gallery/gt-1.webp" },
      { name: "Black & Solar Orange", hex: "#f97316", image: "/media/bikes/gt/gallery/gt-2.webp" },
      { name: "Metallic Silver", hex: "#9ca3af", image: "/media/bikes/gt/gallery/gt-7.webp" }
    ],
    isFeatured: true,
    provisionalNotes: [
      "Price and warranty transcribed from promotional poster; pending showroom verification.",
      "Speed rating estimated based on 1800W motor specification."
    ]
  },
  {
    id: "the-tank",
    slug: "the-tank",
    name: "Zuboo The Tank",
    modelCode: "TANK-3000W",
    badge: "Featured • High Power",
    category: "Touring & Adventure",
    tagline: "Extreme 3000W All-Terrain Dominance",
    description: "Rugged military-aesthetic electric scooter with twin circular projector lamps, reinforced steel perimeter crash bars, and 3000W instant climb torque.",
    advertisedPrice: 515000,
    formattedPrice: "LKR 515,000",
    isPriceVerified: false,
    motorPower: "3000W Peak Performance",
    topSpeed: "65 - 75 km/h (Estimated)",
    advertisedRange: "≥ 80 km",
    battery: "72V 32Ah High Discharge Pack",
    chargingTime: "6 - 8 hours",
    dimensions: "1850 × 760 × 1150 mm (Estimated)",
    brakes: "High-Performance Dual Hydraulic Disc Brakes",
    suspension: "Heavy-duty inverted front telescopic fork & dual reinforced gas-assist rear shocks",
    display: "High-Contrast Digital LCD Dashboard",
    tires: "3.00-10 All-Terrain Deep-Tread Tubeless",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Twin circular front halo spotlights with protective cage",
      "Perimeter steel crash bars with footrest winglets",
      "Lockable rear touring trunk included",
      "Deep tread all-terrain pattern tires",
      "Heavy-duty long travel front hydraulic suspension"
    ],
    mainImage: "/media/bikes/the-tank/main.webp",
    gallery: [
      "/bikes/tank/tank.webp",
      "/media/bikes/the-tank/gallery/tank-1.webp",
      "/media/bikes/the-tank/gallery/tank-2.webp",
      "/media/bikes/the-tank/gallery/tank-3.webp",
      "/media/bikes/the-tank/gallery/tank-4.webp",
      "/media/bikes/the-tank/gallery/tank-5.webp",
      "/media/bikes/the-tank/gallery/tank-6.webp",
      "/media/bikes/the-tank/gallery/tank-7.webp",
      "/media/bikes/the-tank/gallery/tank-8.webp",
      "/media/bikes/the-tank/gallery/tank-9.webp"
    ],
    isFeatured: true,
    provisionalNotes: [
      "Exact battery chemistry and dimensions to be verified with showroom.",
      "Limited-time promotional market pricing noted on poster."
    ]
  },
  {
    id: "paris",
    slug: "paris",
    name: "Zuboo Paris",
    modelCode: "PARIS-1200W",
    badge: "Featured • Retro Luxury",
    category: "Retro Classic",
    tagline: "Timeless European Elegance & Grace",
    description: "Classic Vespa-inspired vintage silhouette with soft pastel finish, round chrome headlight, protective front windscreen, and ergonomic cushioned backrest.",
    advertisedPrice: 330000,
    formattedPrice: "LKR 330,000",
    isPriceVerified: false,
    motorPower: "1200W Smooth Acceleration",
    topSpeed: "60 km/h",
    advertisedRange: "≥ 80 km",
    battery: "72V 23Ah",
    chargingTime: "4 - 6 hours",
    dimensions: "1760 × 690 × 1100 mm",
    brakes: "Front & Rear Hydraulic Disc Brakes",
    suspension: "Dual front hydraulic shocks & rear spring-damper comfort unit",
    display: "Elegant Circular LED Digital Meter",
    tires: "3.0-10 White-Wall Classic Tires",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Aerodynamic clear front windscreen",
      "Luxury contoured two-tone seat with pillion backrest",
      "USB mobile phone charging port",
      "Whisper-silent direct hub motor drive",
      "Vintage chrome styling accents and mirrors"
    ],
    mainImage: "/media/bikes/paris/main.webp",
    gallery: [
      "/bikes/paris/paris.webp",
      "/media/bikes/paris/gallery/paris-1.webp",
      "/media/bikes/paris/gallery/paris-2.webp",
      "/media/bikes/paris/gallery/paris-3.webp",
      "/media/bikes/paris/gallery/paris-4.webp",
      "/media/bikes/paris/gallery/paris-5.webp"
    ],
    isFeatured: true,
    provisionalNotes: [
      "Promotional price of Rs 330,000 marked as promotional; confirm showroom retail list."
    ]
  },
  {
    id: "t11",
    slug: "t11",
    name: "Zuboo T11",
    modelCode: "T11-1800W",
    badge: "Sports Maxi",
    category: "Sports Maxi",
    tagline: "Urban Aerodynamic Sports Cruiser",
    description: "Sharp angular front fairing with integrated dual matrix headlights, sporty cockpit windscreen, and Tianneng 72V 32Ah high-durability power pack.",
    advertisedPrice: 455000,
    formattedPrice: "LKR 455,000",
    isPriceVerified: false,
    motorPower: "1800W High Efficiency",
    topSpeed: "60 km/h",
    advertisedRange: "≥ 80 km",
    battery: "72V 32Ah Tianneng Lead-acid",
    chargingTime: "6 - 8 hours",
    dimensions: "1810 × 750 × 1120 mm",
    brakes: "Front & Rear Hydraulic Disc Brakes",
    suspension: "Sport-tuned front telescopic dampers & heavy-duty rear hydraulic shocks",
    display: "High-Definition Full-Color TFT Meter",
    tires: "3.0-10 10-Inch Alloy Wheel Tubeless",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Full color TFT digital instrumentation",
      "Integrated passenger backrest and rack",
      "USB mobile device fast charger",
      "Multi-angle matrix LED daytime running lights",
      "Safety climbing assist mode"
    ],
    mainImage: "/media/bikes/t11/main.webp",
    gallery: [
      "/bikes/t11/t11.webp",
      "/media/bikes/t11/gallery/t11-1.webp",
      "/media/bikes/t11/gallery/t11-2.webp",
      "/media/bikes/t11/gallery/t11-3.webp",
      "/media/bikes/t11/gallery/t11-4.webp"
    ],
    provisionalNotes: [
      "Battery type specified as Tianneng Lead-acid on original promo poster."
    ]
  },
  {
    id: "t16",
    slug: "t16",
    name: "Zuboo T16",
    modelCode: "T16-1500W",
    badge: "Heavy Duty • Sport Commuter",
    category: "Sports Maxi",
    tagline: "High-Performance Trail & Urban Heavy-Duty Commuter",
    description: "Engineered with high-strength steel framing, 12-tube controller, front 90/90-12 and rear 3.5-10 P-425 tires, dual hydraulic disc brakes, and full TFT digital dashboard for long-range city and commercial transit.",
    advertisedPrice: 465000,
    formattedPrice: "LKR 465,000",
    isPriceVerified: true,
    motorPower: "1500W High Output (2000W Peak)",
    topSpeed: "65 km/h",
    advertisedRange: "≥ 90 km",
    battery: "72V 32Ah / 20Ah High Capacity",
    chargingTime: "5 - 7 hours",
    dimensions: "1915 × 725 × 1240 mm",
    brakes: "Front & Rear Hydraulic Disc Brakes",
    suspension: "Long-travel front hydraulic suspension fork & dual heavy-duty rear shock absorbers",
    display: "Trail-Riding TFT Digital Dashboard",
    tires: "Front 90/90-12 P-425, Rear 3.5-10 P-425 Tubeless",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km",
      chassis: "3 Years",
      isVerified: true,
    },
    features: [
      "Heavy-duty perimeter steel crash cage with footrest winglets",
      "Reinforced rear cargo rack with lockable top trunk box",
      "Dual LED projector headlights with illuminated Zuboo Cheetah logo",
      "Trail-riding full TFT digital instrument console",
      "12-Tube intelligent sine-wave power controller",
      "Front 90/90-12 & Rear 3.5-10 heavy-duty puncture-resistant tires",
      "Dual hydraulic front and rear disc braking system"
    ],
    mainImage: "/bikes/t16/t16.webp",
    gallery: [
      "/bikes/t16/t16.webp",
      "/media/bikes/t16/gallery/t16-1.webp",
      "/media/bikes/t16/gallery/t16-2.webp",
      "/media/bikes/t16/gallery/t16-3.webp",
      "/media/bikes/t16/gallery/t16-4.webp",
      "/media/bikes/t16/gallery/t16-5.webp",
      "/media/bikes/t16/gallery/t16-6.webp"
    ],
    colors: [
      { name: "Gunmetal Grey", hex: "#374151", image: "/media/bikes/t16/gallery/t16-1.webp" },
      { name: "Pearl White", hex: "#F3F4F6", image: "/media/bikes/t16/gallery/t16-2.webp" },
      { name: "Chameleon Purple", hex: "#581c87", image: "/media/bikes/t16/gallery/t16-3.webp" }
    ],
    isFeatured: true,
    provisionalNotes: [
      "Official factory specifications verified from Zuboo OEM manufacturing data sheet.",
      "Dual hydraulic disc brakes and 12-tube controller configuration."
    ]
  },
  {
    id: "t3",
    slug: "t3",
    name: "Zuboo T3",
    modelCode: "T3-1300W",
    badge: "Urban Favorite",
    category: "Commuters",
    tagline: "Everyday Urban Agility & Multi-Color Style",
    description: "Featuring iconic dual round headlights, clean modern bodywork, robust luggage backrest, and five stylish color variations.",
    advertisedPrice: 395000,
    formattedPrice: "LKR 395,000",
    isPriceVerified: false,
    motorPower: "1300W High Torque",
    topSpeed: "60 km/h",
    advertisedRange: "100 - 110 km",
    battery: "72V 32Ah High Capacity",
    chargingTime: "4 - 6 hours",
    dimensions: "1775 × 705 × 1095 mm",
    brakes: "Front Disc / Rear Drum Brake",
    suspension: "Hydraulic front suspension & dual rear comfort coil springs",
    display: "TFT Digital Meter with Battery Gauge",
    tires: "3.0-10 10-Inch Alloy Wheel Tubeless",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Dual projector round LED headlights",
      "USB mobile phone charging port",
      "Rear pillion support backrest",
      "Front disc brake with responsive rear drum",
      "Available in 5 custom colorways"
    ],
    mainImage: "/bikes/t3/t3-white.webp",
    gallery: [
      "/bikes/t3/t3-white.webp",
      "/bikes/t3/t3-gold.webp",
      "/bikes/t3/t3-grey.webp",
      "/bikes/t3/t3-blue.webp"
    ],
    colors: [
      { name: "Pearl White", hex: "#f3f4f6", image: "/bikes/t3/t3-white.webp" },
      { name: "Champagne Gold", hex: "#c5a880", image: "/bikes/t3/t3-gold.webp" },
      { name: "Titanium Grey", hex: "#5a5f64", image: "/bikes/t3/t3-grey.webp" },
      { name: "Ocean Teal", hex: "#3b6d7a", image: "/bikes/t3/t3-blue.webp" },
    ],
    provisionalNotes: [
      "Range of 100-110 km advertised under optimal test conditions; real world varies."
    ]
  },
  {
    id: "ex008",
    slug: "ex008",
    name: "Zuboo EX008",
    modelCode: "EX008-2000W",
    badge: "Maxi Sport",
    category: "Sports Maxi",
    tagline: "Dynamic High-Wheel Highway Commuter",
    description: "Sport motorcycle styling with large 14-inch tubeless highway tires, 2000W high-output motor, and aggressive aerodynamic fairings with racing accents.",
    advertisedPrice: 495000,
    formattedPrice: "LKR 495,000",
    isPriceVerified: false,
    motorPower: "2000W High Speed",
    topSpeed: "60 km/h (Advertised)",
    advertisedRange: "≥ 80 km",
    battery: "72V 32Ah High Output",
    chargingTime: "6 - 8 hours",
    dimensions: "1795 × 735 × 1120 mm",
    brakes: "Front & Rear Hydraulic Disc Brakes",
    suspension: "Long-travel front hydraulic forks & dual sport rear shock absorbers",
    display: "Digital LED Cockpit Meter",
    tires: "90/90-14 Large Tubeless Highway Tires",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "Large 14-inch tubeless road wheels for superior stability",
      "High power 2000W motor with punchy acceleration",
      "Front and rear responsive dual disc brakes",
      "Sport touring windshield and ergonomic handlebar reach",
      "Integrated USB mobile charging socket"
    ],
    mainImage: "/media/bikes/ex008/main.webp",
    gallery: [
      "/bikes/ex008/ex008.webp",
      "/media/bikes/ex008/main.webp",
      "/bikes/ex008/3.31.1.webp"
    ],
    provisionalNotes: [
      "Battery capacity specification to be verified on physical spec plate."
    ]
  },
  {
    id: "kb1",
    slug: "kb1",
    name: "Zuboo KB1",
    modelCode: "KB1-72V",
    badge: "Executive Cruiser",
    category: "Commuters",
    tagline: "Comfort Touring With 140mm Ground Clearance",
    description: "Sleek executive electric scooter with wide footboard, luxury ruby red metallic finish, generous 140mm ground clearance, and 3-speed selector.",
    advertisedPrice: 382500,
    formattedPrice: "LKR 382,500",
    isPriceVerified: false,
    motorPower: "High-Efficiency Torque Motor (1500W Peak)",
    topSpeed: "50 - 70 km/h",
    advertisedRange: "80 - 100 km",
    battery: "72V 32Ah",
    chargingTime: "5 - 7 hours",
    dimensions: "1880 × 710 × 1070 mm",
    brakes: "Front & Rear Disc Brakes",
    suspension: "140mm High Ground Clearance Hydraulic Suspension System",
    display: "TFT Digital Meter",
    tires: "3.0-10 Heavy Duty Alloy Tubeless",
    warranty: {
      batteryAndMotor: "2 Years or 20,000 km (Advertised)",
      chassis: "3 Years (Advertised)",
      isVerified: false,
    },
    features: [
      "140mm high ground clearance suited for Sri Lankan roads",
      "One-key smart start and anti-theft hand brake lock",
      "Aluminum alloy wheel design with disc brakes",
      "Three-speed electronic power curve adjustment",
      "Platinum single kickstand & sturdy center stand"
    ],
    mainImage: "/media/bikes/kb1/main.webp",
    gallery: [
      "/bikes/kb1/kb1.webp",
      "/media/bikes/kb1/main.webp"
    ],
    provisionalNotes: [
      "Motor wattage marked as variable; confirm rated vs peak watt."
    ]
  },
  {
    id: "mini",
    slug: "mini",
    name: "Zuboo Mini",
    modelCode: "MINI-490W",
    badge: "Compact Utility",
    category: "Commuters",
    tagline: "Lightweight Urban Freedom With Front Basket",
    description: "Charming, ultra-lightweight electric bicycle in fresh pastel mint, complete with deep front cargo basket, pedal assist, and spring shock absorbers.",
    advertisedPrice: 195000,
    formattedPrice: "LKR 195,000",
    isPriceVerified: false,
    motorPower: "490W Eco Motor",
    topSpeed: "30 km/h",
    advertisedRange: "> 32 km",
    battery: "48V 12Ah Lead-acid",
    chargingTime: "4 - 6 hours",
    dimensions: "1420 × 630 × 1040 mm",
    brakes: "Front 80 / Rear 110 Drum Brakes",
    suspension: "Front hydraulic fork & dual rear coil springs",
    display: "LED Battery Indicator & Speedometer",
    tires: "14 × 2.125 City Commuter E-Bike Tires",
    warranty: {
      batteryAndMotor: "1 Year (Advertised)",
      chassis: "1 Year",
      isVerified: false,
    },
    features: [
      "Heavy-duty woven front grocery and shopping basket",
      "Compact step-through frame suitable for all riders",
      "Rear pillion seat with grab support",
      "Dual spring rear shock absorbers",
      "Eco low-speed safe cruising mode"
    ],
    mainImage: "/media/bikes/mini/main.webp",
    gallery: [
      "/bikes/mini/mini.webp",
      "/media/bikes/mini/main.webp"
    ],
    provisionalNotes: [
      "Entry-level lightweight model. 1 year warranty as per promotional poster."
    ]
  }
];

export const FEATURED_MODELS = ZUBOO_COLLECTION.filter((b) => b.isFeatured);
export const BIKE_MODELS = ZUBOO_COLLECTION;

export function getAllBikes(): BikeModel[] {
  return ZUBOO_COLLECTION;
}

export function getAllBikeSlugs(): string[] {
  return ZUBOO_COLLECTION.map((b) => b.slug);
}

export function getBikeBySlug(slug: string): BikeModel | undefined {
  return ZUBOO_COLLECTION.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
}

export function getRelatedBikes(currentSlug: string, count: number = 3): BikeModel[] {
  const current = getBikeBySlug(currentSlug);
  if (!current) return ZUBOO_COLLECTION.slice(0, count);

  const sameCategory = ZUBOO_COLLECTION.filter(
    (b) => b.slug !== currentSlug && b.category === current.category
  );
  const otherCategories = ZUBOO_COLLECTION.filter(
    (b) => b.slug !== currentSlug && b.category !== current.category
  );

  return [...sameCategory, ...otherCategories].slice(0, count);
}
