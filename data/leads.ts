export type LeadStatus = "New" | "Contacted" | "Test Ride Completed" | "Converted" | "Cancelled";

export interface TestRideLead {
  id: string;
  customerName: string;
  phoneNumber: string;
  bikeModelId: string;
  bikeModelName: string;
  preferredDate: string;
  preferredTimeSlot?: string;
  locationCity?: string;
  notes: string;
  status: LeadStatus;
  createdAt: string;
}

export const INITIAL_LEADS: TestRideLead[] = [
  {
    id: "LEAD-101",
    customerName: "Kasun Malinda",
    phoneNumber: "0771234567",
    bikeModelId: "the-tank",
    bikeModelName: "Zuboo The Tank (3000W)",
    preferredDate: "2026-10-12",
    preferredTimeSlot: "Morning (9:30 AM)",
    locationCity: "Galle Fort",
    notes: "Interested in hill climbing torque and steel crash guards. Wants to test ride near Rumassala hill.",
    status: "New",
    createdAt: "2026-10-10 08:30 AM",
  },
  {
    id: "LEAD-102",
    customerName: "Dr. Anura Senanayake",
    phoneNumber: "0719876543",
    bikeModelId: "gt",
    bikeModelName: "Zuboo GT (1800W)",
    preferredDate: "2026-10-11",
    preferredTimeSlot: "Evening (4:00 PM)",
    locationCity: "Karapitiya, Galle",
    notes: "Requires daily hospital commute and weekend touring. Inquired about rear tail storage box capacity.",
    status: "Contacted",
    createdAt: "2026-10-09 02:15 PM",
  },
  {
    id: "LEAD-103",
    customerName: "Dilshan Priyadarshana",
    phoneNumber: "0765544332",
    bikeModelId: "t3",
    bikeModelName: "Zuboo T3 (1200W)",
    preferredDate: "2026-10-09",
    preferredTimeSlot: "Morning (11:00 AM)",
    locationCity: "Kurunduwatta, Galle",
    notes: "Visited showroom. Completed 5 km test ride along Udugama Road. Very satisfied with battery display and smooth braking.",
    status: "Test Ride Completed",
    createdAt: "2026-10-08 10:00 AM",
  },
  {
    id: "LEAD-104",
    customerName: "Harshani Jayakody",
    phoneNumber: "0783322114",
    bikeModelId: "paris",
    bikeModelName: "Zuboo Paris (1200W)",
    preferredDate: "2026-10-08",
    preferredTimeSlot: "Afternoon (2:30 PM)",
    locationCity: "Unawatuna",
    notes: "Customer paid deposit for Vintage Cream White model. Delivery scheduled with PDI checklist.",
    status: "Converted",
    createdAt: "2026-10-07 04:45 PM",
  },
  {
    id: "LEAD-105",
    customerName: "Sanjeewa Kumara",
    phoneNumber: "0704455667",
    bikeModelId: "t11",
    bikeModelName: "Zuboo T11 (1500W)",
    preferredDate: "2026-10-13",
    preferredTimeSlot: "Morning (10:00 AM)",
    locationCity: "Hikkaduwa",
    notes: "Commutes between Hikkaduwa and Galle daily. Wants to compare acceleration between T11 and GT.",
    status: "New",
    createdAt: "2026-10-10 09:15 AM",
  },
  {
    id: "LEAD-106",
    customerName: "Menaka Warnakulasuriya",
    phoneNumber: "0778899001",
    bikeModelId: "mini",
    bikeModelName: "Zuboo Mini (400W)",
    preferredDate: "2026-10-10",
    preferredTimeSlot: "Afternoon (3:00 PM)",
    locationCity: "Galle Bazaar",
    notes: "Looking for lightweight step-through bike with front basket for market shopping. Called showroom.",
    status: "Contacted",
    createdAt: "2026-10-09 11:20 AM",
  },
  {
    id: "LEAD-107",
    customerName: "Rohan De Silva",
    phoneNumber: "0723344556",
    bikeModelId: "kb1",
    bikeModelName: "Zuboo KB1 (800W)",
    preferredDate: "2026-10-07",
    preferredTimeSlot: "Morning (9:00 AM)",
    locationCity: "Weligama",
    notes: "Test ride completed at Kurunduwatta showroom. Inquired about seasonal promotional discount.",
    status: "Test Ride Completed",
    createdAt: "2026-10-06 01:10 PM",
  },
  {
    id: "LEAD-108",
    customerName: "Tharindu Wickramasinghe",
    phoneNumber: "0751122334",
    bikeModelId: "ex008",
    bikeModelName: "Zuboo EX-008 (1000W)",
    preferredDate: "2026-10-14",
    preferredTimeSlot: "Afternoon (1:30 PM)",
    locationCity: "Ahangama",
    notes: "Pre-order reservation confirmed. Awaiting shipment arrival notification.",
    status: "Converted",
    createdAt: "2026-10-05 03:00 PM",
  },
];

export function generateWhatsAppLink(lead: TestRideLead): string {
  // Format phone number safely for Sri Lanka (convert 07x to 947x)
  let cleanPhone = lead.phoneNumber.replace(/[\s\-\+]/g, "");
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "94" + cleanPhone.substring(1);
  } else if (!cleanPhone.startsWith("94")) {
    cleanPhone = "94" + cleanPhone;
  }

  const message = `Hello ${lead.customerName}, this is Udan Enterprises (Official Zuboo Showroom, Galle). Regarding your test ride inquiry for the ${lead.bikeModelName} scheduled for ${lead.preferredDate} (${lead.preferredTimeSlot || "Morning"}): Our team is ready to welcome you at our Kurunduwatta showroom. Please let us know if this time suits you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function exportLeadsToCSV(leads: TestRideLead[]): void {
  const headers = [
    "Lead ID",
    "Customer Name",
    "Phone Number",
    "Bike Model",
    "Preferred Date",
    "Preferred Time Slot",
    "Location",
    "Status",
    "Created Date",
    "Notes",
  ];

  const rows = leads.map((lead) => [
    `"${lead.id}"`,
    `"${lead.customerName.replace(/"/g, '""')}"`,
    `"${lead.phoneNumber}"`,
    `"${lead.bikeModelName.replace(/"/g, '""')}"`,
    `"${lead.preferredDate}"`,
    `"${lead.preferredTimeSlot || ""}"`,
    `"${lead.locationCity || ""}"`,
    `"${lead.status}"`,
    `"${lead.createdAt}"`,
    `"${lead.notes.replace(/"/g, '""').replace(/\n/g, " ")}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `udan_enterprises_test_ride_leads_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
