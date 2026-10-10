export interface WarrantyRecord {
  vin: string;
  modelId: string;
  modelName: string;
  modelCode: string;
  modelImage: string;
  customerName: string;
  maskedPhone: string;
  registeredDate: string;
  expiryDate: string;
  status: "Active" | "Expired" | "Pending Verification" | "Extended";
  mileageLimit: string;
  motorCoverage: {
    spec: string;
    warrantyYears: number;
    status: "Covered" | "Expired";
    details: string;
  };
  batteryCoverage: {
    spec: string;
    warrantyYears: number;
    status: "Covered" | "Expired";
    healthPercentage: number;
    details: string;
  };
  chassisCoverage: {
    warrantyYears: number;
    status: "Covered" | "Expired";
    details: string;
  };
  serviceLogs: {
    date: string;
    mileage: string;
    serviceType: string;
    center: string;
    technicianNotes: string;
  }[];
}

export const SAMPLE_WARRANTIES: Record<string, WarrantyRecord> = {
  "ZB-2026-T3-001": {
    vin: "ZB-2026-T3-001",
    modelId: "t3",
    modelName: "Zuboo T3 Urban Commuter",
    modelCode: "T3-1200W",
    modelImage: "/media/bikes/t3/main.webp",
    customerName: "Kavindu Perera",
    maskedPhone: "077 ••• •821",
    registeredDate: "2025-11-15",
    expiryDate: "2027-11-15",
    status: "Active",
    mileageLimit: "20,000 km",
    motorCoverage: {
      spec: "1200W High Efficiency Hub Motor",
      warrantyYears: 2,
      status: "Covered",
      details: "Full coverage on stator, rotor, hall sensors, and motor hub casing against manufacturing defects.",
    },
    batteryCoverage: {
      spec: "72V 20Ah Lithium-ion Pack",
      warrantyYears: 2,
      status: "Covered",
      healthPercentage: 99,
      details: "Protected against capacity degradation below 70%, BMS controller lock, and internal cell failure.",
    },
    chassisCoverage: {
      warrantyYears: 3,
      status: "Covered",
      details: "High-tensile alloy frame structural integrity against fatigue fracture or weld faults.",
    },
    serviceLogs: [
      {
        date: "2025-11-15",
        mileage: "0 km",
        serviceType: "Pre-Delivery Inspection (PDI)",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "100-point safety check passed. BMS calibrated, firmware verified, tire pressures set to 32 PSI.",
      },
      {
        date: "2026-02-14",
        mileage: "1,120 km",
        serviceType: "1st 1,000 km Routine Service",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "Routine brake bleed performed, throttle calibration verified. Battery internal resistance optimal.",
      },
    ],
  },
  "ZB-2026-GT-042": {
    vin: "ZB-2026-GT-042",
    modelId: "gt",
    modelName: "Zuboo GT Touring & Dual-Sport",
    modelCode: "GT-1800W",
    modelImage: "/media/bikes/gt/main.webp",
    customerName: "Nuwan Jayasuriya",
    maskedPhone: "071 ••• •933",
    registeredDate: "2026-01-10",
    expiryDate: "2028-01-10",
    status: "Active",
    mileageLimit: "20,000 km",
    motorCoverage: {
      spec: "1800W High Torque Touring Motor",
      warrantyYears: 2,
      status: "Covered",
      details: "Covers thermal cutoff sensors, high-torque winding, and waterproof cable harness.",
    },
    batteryCoverage: {
      spec: "72V 32Ah High Capacity Touring Pack",
      warrantyYears: 2,
      status: "Covered",
      healthPercentage: 100,
      details: "Guaranteed cell balancing and fast-charge longevity under tropical conditions.",
    },
    chassisCoverage: {
      warrantyYears: 3,
      status: "Covered",
      details: "Reinforced carrier rack, dual rear airbag shock mounts, and heavy-duty frame.",
    },
    serviceLogs: [
      {
        date: "2026-01-10",
        mileage: "0 km",
        serviceType: "Pre-Delivery Inspection (PDI)",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "Touring tail box installed, airbag dampers pressurized to 2.8 bar. Customer orientation completed.",
      },
    ],
  },
  "ZB-2026-TK-088": {
    vin: "ZB-2026-TK-088",
    modelId: "the-tank",
    modelName: "Zuboo The Tank (3000W All-Terrain)",
    modelCode: "TANK-3000W",
    modelImage: "/media/bikes/the-tank/main.webp",
    customerName: "Dinesh Weerasinghe",
    maskedPhone: "076 ••• •109",
    registeredDate: "2026-02-01",
    expiryDate: "2028-02-01",
    status: "Active",
    mileageLimit: "25,000 km",
    motorCoverage: {
      spec: "3000W Peak Performance Powertrain",
      warrantyYears: 2,
      status: "Covered",
      details: "Covers high-power stator magnets, phase wires, and electronic controller unit.",
    },
    batteryCoverage: {
      spec: "72V 32Ah High-Discharge Pack",
      warrantyYears: 2,
      status: "Covered",
      healthPercentage: 100,
      details: "Heavy discharge thermal protection and smart BMS cell temperature monitoring.",
    },
    chassisCoverage: {
      warrantyYears: 3,
      status: "Covered",
      details: "Tubular steel perimeter crash bar cage and reinforced front steering column.",
    },
    serviceLogs: [
      {
        date: "2026-02-01",
        mileage: "0 km",
        serviceType: "Pre-Delivery Inspection (PDI)",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "Crash cage torqued to 45Nm, dual circular LED projectors aligned.",
      },
    ],
  },
  "ZB-2025-PR-015": {
    vin: "ZB-2025-PR-015",
    modelId: "paris",
    modelName: "Zuboo Paris Retro Classic",
    modelCode: "PARIS-1200W",
    modelImage: "/media/bikes/paris/main.webp",
    customerName: "Chamari Bandara",
    maskedPhone: "077 ••• •543",
    registeredDate: "2025-08-20",
    expiryDate: "2027-08-20",
    status: "Active",
    mileageLimit: "20,000 km",
    motorCoverage: {
      spec: "1200W Smooth Acceleration Motor",
      warrantyYears: 2,
      status: "Covered",
      details: "Quiet commuter brushless hub motor with ceramic bearings.",
    },
    batteryCoverage: {
      spec: "60V 24Ah Lithium-ion Pack",
      warrantyYears: 2,
      status: "Covered",
      healthPercentage: 97,
      details: "Deep cycle life guarantee with automated temperature regulation.",
    },
    chassisCoverage: {
      warrantyYears: 3,
      status: "Covered",
      details: "Curved retro chassis and polished chrome rack components.",
    },
    serviceLogs: [
      {
        date: "2025-08-20",
        mileage: "0 km",
        serviceType: "Pre-Delivery Inspection (PDI)",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "Retro chrome trim protected with anti-salt seal coat for coastal Galle climate.",
      },
      {
        date: "2025-11-28",
        mileage: "1,450 km",
        serviceType: "Routine 3-Month Inspection",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "All electronics tested. Battery capacity measured at 98.4% nominal. Brakes aligned.",
      },
    ],
  },
  "ZB-2026-T11-033": {
    vin: "ZB-2026-T11-033",
    modelId: "t11",
    modelName: "Zuboo T11 Sport Aerodynamic",
    modelCode: "T11-1500W",
    modelImage: "/media/bikes/t11/main.webp",
    customerName: "Sameera Liyanage",
    maskedPhone: "075 ••• •912",
    registeredDate: "2026-01-25",
    expiryDate: "2028-01-25",
    status: "Active",
    mileageLimit: "20,000 km",
    motorCoverage: {
      spec: "1500W Dynamic Sports Motor",
      warrantyYears: 2,
      status: "Covered",
      details: "Fast-response brushless motor with electronic sport speed modes.",
    },
    batteryCoverage: {
      spec: "72V 24Ah High Density Pack",
      warrantyYears: 2,
      status: "Covered",
      healthPercentage: 100,
      details: "Aero-vented cell casing with over-voltage and surge protection.",
    },
    chassisCoverage: {
      warrantyYears: 3,
      status: "Covered",
      details: "Aerodynamic wind-tunnel styled lightweight composite frame.",
    },
    serviceLogs: [
      {
        date: "2026-01-25",
        mileage: "0 km",
        serviceType: "Pre-Delivery Inspection (PDI)",
        center: "Udan Enterprises Galle Showroom",
        technicianNotes: "Factory sport suspension preload configured for rider preference.",
      },
    ],
  },
};

export function lookupWarranty(vinQuery: string): WarrantyRecord | null {
  if (!vinQuery) return null;
  const clean = vinQuery.trim().toUpperCase();
  // Exact match first
  if (SAMPLE_WARRANTIES[clean]) {
    return SAMPLE_WARRANTIES[clean];
  }
  // Loose match by suffix or model name
  const foundKey = Object.keys(SAMPLE_WARRANTIES).find(
    (key) => key.includes(clean) || clean.includes(key)
  );
  return foundKey ? SAMPLE_WARRANTIES[foundKey] : null;
}
