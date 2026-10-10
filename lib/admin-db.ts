import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ZUBOO_COLLECTION } from "@/data/bikes";
import { BUSINESS_CONFIG } from "@/data/business";
import {
  AdminProfile,
  ProductItem,
  TestRideBookingItem,
  ContactInquiryItem,
  OfferItem,
  ShowroomSettings,
  SiteContentHomepage,
  AuditLogItem,
  BookingStatus,
  InquiryStatus,
} from "@/types/admin";

// ==========================================
// 1. ADMIN PROFILES & RBAC
// ==========================================

export const INITIAL_OWNER_EMAIL = "pibida17udan4131@gmail.com";

export async function getAdminProfile(uid: string): Promise<AdminProfile | null> {
  try {
    const ref = doc(db, "admin_profiles", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as AdminProfile;
    }
    return null;
  } catch (error) {
    console.warn("getAdminProfile error:", error);
    return null;
  }
}

export async function ensureAdminProfile(uid: string, email: string): Promise<AdminProfile> {
  const existing = await getAdminProfile(uid);
  if (existing) {
    // Update lastLoginAt
    try {
      await updateDoc(doc(db, "admin_profiles", uid), {
        lastLoginAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn("Could not update lastLoginAt:", e);
    }
    return existing;
  }

  // Check if this is the initial owner or first registered user
  const isOwner = email.toLowerCase().trim() === INITIAL_OWNER_EMAIL.toLowerCase().trim();
  const newProfile: AdminProfile = {
    uid,
    email,
    displayName: isOwner ? "Showroom Owner" : "Showroom Staff",
    role: isOwner ? "owner" : "staff",
    permissions: isOwner
      ? ["all", "manage_bikes", "manage_offers", "view_leads", "manage_staff", "manage_settings", "manage_cms"]
      : ["view_leads", "manage_leads", "view_inventory"],
    status: "active",
    createdAt: serverTimestamp(),
    lastLoginAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, "admin_profiles", uid), newProfile);
  } catch (error) {
    console.warn("ensureAdminProfile write notice:", error);
  }

  return newProfile;
}

export async function getAllAdminProfiles(): Promise<AdminProfile[]> {
  try {
    const snap = await getDocs(collection(db, "admin_profiles"));
    return snap.docs.map((d) => d.data() as AdminProfile);
  } catch (err) {
    console.warn("getAllAdminProfiles error:", err);
    return [];
  }
}

export async function updateAdminRole(uid: string, role: "owner" | "staff", permissions: string[]): Promise<void> {
  await updateDoc(doc(db, "admin_profiles", uid), {
    role,
    permissions,
    updatedAt: serverTimestamp(),
  });
}

// ==========================================
// 2. AUDIT LOGS
// ==========================================

export async function logAuditAction(
  action: string,
  actorUid: string,
  actorEmail: string,
  resource: string,
  summary: string,
  details?: Record<string, any>
): Promise<void> {
  try {
    await addDoc(collection(db, "audit_logs"), {
      action,
      actorUid,
      actorEmail,
      resource,
      summary,
      details: details || {},
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.warn("logAuditAction notice:", err);
  }
}

export async function getAuditLogs(maxCount = 50): Promise<AuditLogItem[]> {
  try {
    const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(maxCount));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        action: data.action || "ACTION",
        actorUid: data.actorUid || "",
        actorEmail: data.actorEmail || "staff",
        resource: data.resource || "",
        summary: data.summary || "",
        details: data.details || {},
        timestamp: data.timestamp?.toDate ? data.timestamp.toDate().toLocaleString() : "Recent",
      };
    });
  } catch (err) {
    console.warn("getAuditLogs offline/mock mode:", err);
    return [];
  }
}

// ==========================================
// 3. PRODUCTS CRUD (BIKE FLEET)
// ==========================================

export function mapStaticBikeToProduct(b: (typeof ZUBOO_COLLECTION)[0]): ProductItem {
  return {
    id: b.id,
    slug: b.slug,
    name: b.name,
    modelCode: b.modelCode,
    badge: b.badge,
    category: b.category,
    tagline: b.tagline,
    description: b.description,
    priceLKR: b.advertisedPrice,
    previousPriceLKR: b.advertisedPrice + 25000,
    isPriceVerified: b.isPriceVerified,
    motorPower: b.motorPower,
    topSpeed: b.topSpeed,
    advertisedRange: b.advertisedRange,
    battery: b.battery,
    chargingTime: b.chargingTime || "6 - 8 hours",
    dimensions: b.dimensions || "1820 x 680 x 1120 mm",
    brakes: b.brakes,
    display: b.display,
    stockStatus: "In Showroom",
    showroomUnits: 3,
    isFeatured: !!b.isFeatured,
    isNewArrival: false,
    status: "published",
    mainImage: b.mainImage,
    gallery: b.gallery || [b.mainImage],
    colors: b.colors || [{ name: "Default", hex: "#111827" }],
    warranty: b.warranty,
    features: b.features,
    seoTitle: `${b.name} Electric Bike — Udan Enterprises Galle`,
    seoDescription: b.description.slice(0, 160),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getProducts(): Promise<ProductItem[]> {
  try {
    const snap = await getDocs(collection(db, "products"));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as ProductItem);
    }
  } catch (err) {
    console.warn("getProducts Firestore notice, loading default Zuboo collection:", err);
  }
  // Fallback to static Zuboo collection
  return ZUBOO_COLLECTION.map(mapStaticBikeToProduct);
}

export async function saveProduct(product: ProductItem, isNew = false): Promise<void> {
  const ref = doc(db, "products", product.id);
  const data = {
    ...product,
    updatedAt: serverTimestamp(),
    ...(isNew ? { createdAt: serverTimestamp() } : {}),
  };
  await setDoc(ref, data, { merge: true });
}

export async function deleteProduct(productId: string): Promise<void> {
  await deleteDoc(doc(db, "products", productId));
}

// ==========================================
// 4. TEST RIDE BOOKINGS
// ==========================================

export async function getTestRideBookings(): Promise<TestRideBookingItem[]> {
  try {
    const q = query(collection(db, "test_ride_bookings"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          customerName: data.customerName || "Customer",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
          bikeModelId: data.bikeModelId || "t3",
          bikeModelName: data.bikeModelName || "Zuboo Model",
          preferredDate: data.preferredDate || "Anytime",
          preferredTimeSlot: data.preferredTimeSlot || "Showroom Hours",
          locationCity: data.locationCity || "Galle",
          notes: data.notes || "",
          internalNotes: data.internalNotes || "",
          status: (data.status || "pending") as BookingStatus,
          assignedStaff: data.assignedStaff || "",
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : "Recent",
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleString() : undefined,
        };
      });
    }
  } catch (err) {
    console.warn("getTestRideBookings Firestore notice:", err);
  }
  return [];
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  internalNotes?: string
): Promise<void> {
  const ref = doc(db, "test_ride_bookings", bookingId);
  const updateData: any = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (internalNotes !== undefined) {
    updateData.internalNotes = internalNotes;
  }
  await updateDoc(ref, updateData);
}

// ==========================================
// 5. CUSTOMER INQUIRIES
// ==========================================

export async function getContactInquiries(): Promise<ContactInquiryItem[]> {
  try {
    const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          fullName: data.fullName || "Inquirer",
          phone: data.phone || "",
          email: data.email || "",
          subject: data.subject || "General Inquiry",
          modelOfInterest: data.modelOfInterest || "General",
          message: data.message || "",
          sourcePage: data.sourcePage || "/contact",
          status: (data.status || "new") as InquiryStatus,
          internalNotes: data.internalNotes || "",
          assignedStaff: data.assignedStaff || "",
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : "Recent",
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toLocaleString() : undefined,
        };
      });
    }
  } catch (err) {
    console.warn("getContactInquiries Firestore notice:", err);
  }
  return [];
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus,
  internalNotes?: string
): Promise<void> {
  const ref = doc(db, "contact_inquiries", inquiryId);
  const updateData: any = {
    status,
    updatedAt: serverTimestamp(),
  };
  if (internalNotes !== undefined) {
    updateData.internalNotes = internalNotes;
  }
  await updateDoc(ref, updateData);
}

// ==========================================
// 6. OFFERS & PROMOTIONS
// ==========================================

export const DEFAULT_OFFERS: OfferItem[] = [
  {
    id: "kb1-cash-discount",
    title: "Zuboo KB1 Executive Commuter Special",
    badge: "Cash Discount Special",
    badgeColor: "bg-red-50 text-red-600 border-red-200",
    modelCode: "KB1-72V",
    associatedBikeId: "kb1",
    regularPriceLKR: 415000,
    promoPriceLKR: 382500,
    savingsLKR: 32500,
    description: "Instant cash reduction for immediate delivery in Galle Showroom.",
    highlights: [
      "Immediate cash discount of LKR 32,500 on confirmed bookings",
      "140mm high ground clearance suited for Sri Lankan road conditions",
      "Complimentary certified rider helmet & 1st-year service checkup",
      "One-key smart start & anti-theft hand brake lock system",
    ],
    image: "/media/bikes/kb1/main.webp",
    whatsAppText:
      "Hi Udan Enterprises, I would like to claim the Zuboo KB1 Cash Discount offer (Promo Price: LKR 382,500).",
    isActive: true,
    isPopular: true,
    displayPriority: 1,
    startDate: "2026-10-01",
    expiryDate: "2026-11-30",
    createdAt: new Date().toISOString(),
  },
  {
    id: "t3-launch-pack",
    title: "Zuboo T3 Urban Favorite Launch Pack",
    badge: "Urban Launch Pack",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    modelCode: "T3-1300W",
    associatedBikeId: "t3",
    regularPriceLKR: 420000,
    promoPriceLKR: 395000,
    savingsLKR: 25000,
    description: "Includes high-speed fast charger and waterproof bike cover.",
    highlights: [
      "Instant LKR 25,000 launch deduction for the first 15 buyers",
      "Up to 110 km advertised range on single full charge",
      "Free premium heavy-duty waterproof all-weather bike cover",
      "Priority 24-hour service bay guarantee at Kurunduwatta showroom",
    ],
    image: "/media/bikes/t3/main.webp",
    whatsAppText: "Hi Udan Enterprises, I am inquiring about the Zuboo T3 Urban Launch Pack (LKR 395,000).",
    isActive: true,
    isPopular: true,
    displayPriority: 2,
    startDate: "2026-10-01",
    expiryDate: "2026-11-15",
    createdAt: new Date().toISOString(),
  },
];

export async function getOffers(): Promise<OfferItem[]> {
  try {
    const snap = await getDocs(collection(db, "offers"));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as OfferItem);
    }
  } catch (err) {
    console.warn("getOffers Firestore notice:", err);
  }
  return DEFAULT_OFFERS;
}

export async function saveOffer(offer: OfferItem): Promise<void> {
  const ref = doc(db, "offers", offer.id);
  await setDoc(ref, {
    ...offer,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function deleteOffer(offerId: string): Promise<void> {
  await deleteDoc(doc(db, "offers", offerId));
}

// ==========================================
// 7. SHOWROOM SETTINGS
// ==========================================

export const DEFAULT_SETTINGS: ShowroomSettings = {
  showroomName: "Udan Enterprises",
  brandPartner: "Zuboo Electric Bikes",
  hotline: "078 496 9652",
  whatsappNumber: "94784969652",
  email: "Pibida17udan4131@gmail.com",
  address: "Udugama Road, Kurunduwatta, Galle",
  city: "Galle",
  googleMapsUrl: "https://maps.app.goo.gl/GyJCSSS7p6Bd18xM8",
  openingHours: "Mon - Sat: 8:30 AM - 6:00 PM | Sun: 9:00 AM - 2:00 PM",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  tiktokUrl: "https://tiktok.com",
  footerTagline: "JOIN US & CHARGE YOUR RIDE ⚡",
  defaultSeoTitle: "Udan Enterprises | Zuboo Electric Bikes Sri Lanka",
  defaultSeoDescription:
    "Experience premium electric mobility with Zuboo Electric Bikes at Udan Enterprises. Discover models, specifications, test ride bookings, and local service in Galle.",
};

export async function getShowroomSettings(): Promise<ShowroomSettings> {
  try {
    const ref = doc(db, "settings", "showroom");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as ShowroomSettings;
    }
  } catch (err) {
    console.warn("getShowroomSettings Firestore notice:", err);
  }
  return DEFAULT_SETTINGS;
}

export async function saveShowroomSettings(settings: ShowroomSettings): Promise<void> {
  const ref = doc(db, "settings", "showroom");
  await setDoc(ref, {
    ...settings,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ==========================================
// 8. SITE CONTENT (MINI CMS)
// ==========================================

export const DEFAULT_HOMEPAGE_CONTENT: SiteContentHomepage = {
  heroHeadline: "Sustainable Solutions for a Better Future",
  heroSubtitle:
    "Empowering businesses and communities to thrive in a low-carbon world through Zuboo high-torque electric motorcycles.",
  heroCtaText: "Explore Zuboo Fleet",
  announcementText: "⚡ Zero Petrol Dependency • Showroom Open Mon-Sat 8:30AM–6PM in Kurunduwatta, Galle ⚡",
  showcaseHeading: "EXCELLENT PRODUCTS",
  showcaseSubheading: "Official Zuboo showroom display • Kurunduwatta, Galle Dealership",
  techHeading: "ADVANCED ELECTRIC ENGINEERING",
  techDescription:
    "Precision BMS protection, high-efficiency waterproof hub motors, and aircraft-grade steel frames engineered for Sri Lankan roads.",
  aboutShowroomSnippet:
    "Located on Udugama Road, Kurunduwatta, Galle, Udan Enterprises is the southern hub for Zuboo electric vehicles, certified servicing, and genuine spare parts.",
};

export async function getHomepageContent(): Promise<SiteContentHomepage> {
  try {
    const ref = doc(db, "site_content", "homepage");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as SiteContentHomepage;
    }
  } catch (err) {
    console.warn("getHomepageContent Firestore notice:", err);
  }
  return DEFAULT_HOMEPAGE_CONTENT;
}

export async function saveHomepageContent(content: SiteContentHomepage): Promise<void> {
  const ref = doc(db, "site_content", "homepage");
  await setDoc(ref, {
    ...content,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}
