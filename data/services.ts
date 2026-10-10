export interface ServicePackage {
  id: string;
  title: string;
  subtitle: string;
  priceLKR: number;
  formattedPrice: string;
  isFreeUnderWarranty: boolean;
  durationMinutes: number;
  badge?: string;
  checklist: string[];
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "routine-3m",
    title: "Routine 3-Month / 1,000 km Inspection",
    subtitle: "Recommended periodic checkup for optimal reliability and warranty compliance",
    priceLKR: 0,
    formattedPrice: "LKR 0 (Free Under Warranty)",
    isFreeUnderWarranty: true,
    durationMinutes: 45,
    badge: "Complimentary",
    checklist: [
      "Lithium battery voltage balancing & BMS health report",
      "Front & rear hydraulic brake pad wear and lever pressure check",
      "Tire tread inspection and precision pressure adjustment (30-32 PSI)",
      "Steering head bearing play and fork seal inspection",
      "Electronics, lighting, display console & horn diagnostics",
      "Fastener torque check on swingarm and motor axle bolts",
    ],
  },
  {
    id: "battery-diag",
    title: "Battery Health Diagnostics & BMS Calibration",
    subtitle: "In-depth cell balance testing, resistance analysis & BMS reset",
    priceLKR: 2500,
    formattedPrice: "LKR 2,500 / Free with Warranty",
    isFreeUnderWarranty: true,
    durationMinutes: 60,
    badge: "Recommended",
    checklist: [
      "Individual cell group voltage delta measurement (< 0.05V threshold)",
      "BMS low-voltage and over-temperature safety cut-off test",
      "Charger output voltage and current curve verification",
      "Terminal corrosion cleaning and anti-oxidation coating application",
      "Tropical thermal resistance baseline check",
      "Full digital State-of-Health (SOH) printed certificate",
    ],
  },
  {
    id: "brake-system",
    title: "Hydraulic Brake Service & Caliper Overhaul",
    subtitle: "Fluid bleed, sintered pad replacement & regenerative EBS alignment",
    priceLKR: 3500,
    formattedPrice: "LKR 3,500 + Parts",
    isFreeUnderWarranty: false,
    durationMinutes: 50,
    checklist: [
      "DOT4 hydraulic fluid flush and pressure bleed",
      "Ceramic/sintered brake pad inspection and replacement if required",
      "Rotor disc trueing and surface de-glazing",
      "Electronic regenerative braking switch sync calibration",
      "Emergency high-friction stop test",
    ],
  },
  {
    id: "tire-service",
    title: "Tubeless Tire Health, Anti-Puncture Seal & Balancing",
    subtitle: "Wheel alignment, tubeless sealant top-up & valve replacement",
    priceLKR: 1800,
    formattedPrice: "LKR 1,800 + Sealant",
    isFreeUnderWarranty: false,
    durationMinutes: 30,
    checklist: [
      "Rim bead leak and tire carcass puncture scan",
      "Fresh high-grade tire sealant injection (60ml per wheel)",
      "Wheel hub spin balance and trueness check",
      "Brass tubeless valve core renewal",
      "Wet-weather tropical asphalt grip recommendation",
    ],
  },
  {
    id: "electrical-safety",
    title: "Electrical Wiring, Controller & Projector Lamp Tuning",
    subtitle: "Moisture seal testing, throttle hall sensor check & security alarm tune",
    priceLKR: 2200,
    formattedPrice: "LKR 2,200",
    isFreeUnderWarranty: false,
    durationMinutes: 40,
    checklist: [
      "Main harness IP67 waterproof connector silicone greasing",
      "Twist throttle hall sensor voltage curve verification",
      "High-output LED projector aim and cutoff beam alignment",
      "Anti-theft alarm vibration sensor sensitivity calibration",
      "USB phone charger port voltage output stabilization",
    ],
  },
  {
    id: "full-super-tune",
    title: "Annual Comprehensive Super-Tune & Reconditioning",
    subtitle: "Complete bumper-to-bumper strip-down inspection and road readiness certificate",
    priceLKR: 6500,
    formattedPrice: "LKR 6,500",
    isFreeUnderWarranty: false,
    durationMinutes: 120,
    badge: "Most Thorough",
    checklist: [
      "Full 120-point mechanical & electrical master inspection",
      "Complete battery pack deep diagnostic & thermal profile test",
      "Dual hydraulic suspension fluid condition & seal replacement",
      "Full chassis weld inspection and anti-salt anti-rust underbody coat",
      "Road test by senior Zuboo-certified Galle master technician",
      "Official Showroom Certificate of Roadworthiness issued",
    ],
  },
];

export interface BatteryTipCategory {
  category: string;
  iconName: string;
  title: string;
  summary: string;
  tips: {
    title: string;
    description: string;
    importance: "Critical" | "Recommended" | "Good Practice";
  }[];
}

export const TROPICAL_BATTERY_GUIDE: BatteryTipCategory[] = [
  {
    category: "charging",
    iconName: "Zap",
    title: "Charging in Sri Lanka's Climate",
    summary: "Managing high tropical ambient temperatures and humidity in the Southern Province",
    tips: [
      {
        title: "The 30-Minute Cool-Down Rule",
        description: "Never plug in your Zuboo electric bike immediately after a ride under hot midday sun or after climbing steep Galle/Udugama inclines. Let the battery cool down in a shaded area for at least 20-30 minutes before initiating charging.",
        importance: "Critical",
      },
      {
        title: "Charge in Well-Ventilated, Shaded Areas",
        description: "Always charge your electric scooter indoors or under a shaded porch with good air circulation. Never leave the charger or bike baking in direct sunlight during charging.",
        importance: "Critical",
      },
      {
        title: "The 20% - 85% Commute Sweet Spot",
        description: "For daily commuting around Galle and Southern Province, keeping the battery between 20% and 85% extends cycle life from ~800 cycles to over 1,500 cycles. Only charge to 100% when planning a long touring journey (such as Galle to Matara or Colombo).",
        importance: "Recommended",
      },
      {
        title: "Use Only the Genuine Zuboo Smart Charger",
        description: "Third-party chargers often lack proper voltage cutoffs and temperature sensing, which can overcharge cells or damage the Smart BMS. Always use the original Zuboo charger supplied by Udan Enterprises.",
        importance: "Critical",
      },
    ],
  },
  {
    category: "coastal",
    iconName: "ShieldAlert",
    title: "Coastal Salt-Air & High Humidity Protection",
    summary: "Preventing corrosion and electrical moisture issues near Galle and coastal roads",
    tips: [
      {
        title: "Anti-Corrosion Terminal Care",
        description: "Galle's oceanic air carries salt particles that accelerate terminal oxidation. Have Udan Enterprises technicians apply dielectric grease to charging ports and battery contact pins during routine service.",
        importance: "Recommended",
      },
      {
        title: "Rinse After Coastal Highway Rides",
        description: "If riding near the Galle Marine Drive or Matara coastal roads during windy spray conditions, wipe the chassis and exterior battery compartment with a slightly damp fresh-water cloth. Never pressure-wash directly at electrical seals.",
        importance: "Good Practice",
      },
      {
        title: "Keep the Charging Port Flap Closed",
        description: "Ensure the rubberized waterproof port cover is firmly snapped shut before every ride, especially when rain clouds gather.",
        importance: "Critical",
      },
    ],
  },
  {
    category: "monsoon",
    iconName: "CloudRain",
    title: "Monsoon & Heavy Rain Protocol",
    summary: "Navigating Sri Lanka's southwest monsoon rains safely",
    tips: [
      {
        title: "Avoid Deep Water Puddles (Half-Hub Rule)",
        description: "Zuboo motors and wiring are IP67 weather-sealed against heavy tropical downpours. However, never ride through standing water deeper than half the rear wheel hub motor axle.",
        importance: "Critical",
      },
      {
        title: "Dry Before Indoor Charging",
        description: "If you have ridden through heavy monsoon rain, dry the exterior bodywork and charging socket area with a clean towel before connecting the charger.",
        importance: "Recommended",
      },
      {
        title: "Allow Electronic EBS Braking Distance",
        description: "Wet tropical asphalt has lower friction. Engage the progressive regenerative braking earlier and smoothly apply both front and rear brakes.",
        importance: "Good Practice",
      },
    ],
  },
  {
    category: "storage",
    iconName: "Calendar",
    title: "Storage & Extended Inactivity",
    summary: "Preserving cell vitality when traveling or leaving the bike idle",
    tips: [
      {
        title: "Store at 50% - 60% State of Charge",
        description: "If leaving Sri Lanka or not riding for more than 2 weeks, do not leave the battery at 0% (risk of deep sleep voltage drop) or 100% (elevated internal chemical stress). 50%-60% is optimal.",
        importance: "Critical",
      },
      {
        title: "Monthly Maintenance Top-Up",
        description: "Even while idle, the Smart BMS and anti-theft alarm draw a micro-current. Top up the battery for 1 hour every 30 days to keep cells balanced.",
        importance: "Recommended",
      },
      {
        title: "Disconnect Main Breaker Switch",
        description: "Most Zuboo models feature an under-seat master electrical breaker. Flip this OFF if storing the vehicle for extended periods.",
        importance: "Good Practice",
      },
    ],
  },
  {
    category: "warnings",
    iconName: "AlertTriangle",
    title: "Battery Warning Signs & Emergency Steps",
    summary: "Identifying warning indicators and how to respond immediately",
    tips: [
      {
        title: "Excessive Heat During Charging",
        description: "If the battery pack or charger becomes too hot to comfortably hold (exceeding ~55°C), unplug the charger immediately and contact Udan Enterprises Galle at 078 496 9652.",
        importance: "Critical",
      },
      {
        title: "Sudden Range Drop or Voltage Cut",
        description: "If your battery display drops rapidly from 40% to 0% under light acceleration, one cell group may be unbalanced. Bring the bike to the Galle Kurunduwatta showroom for computerized BMS recalibration.",
        importance: "Recommended",
      },
      {
        title: "Unusual Odors or Swelling",
        description: "Stop using the battery immediately if any chemical odor or physical swelling is observed. Keep in a non-flammable area and call our showroom hotline immediately.",
        importance: "Critical",
      },
    ],
  },
];
