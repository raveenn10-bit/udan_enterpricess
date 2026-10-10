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
// LOCAL STORAGE RESILIENT CACHE UTILITIES
// ==========================================

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function writeLocal<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`localStorage write failed for ${key}:`, e);
  }
}

// Track whether Firestore sync succeeded or has rules pending
export let isCloudFirestoreSynced = true;

// ==========================================
// 1. ADMIN PROFILES & RBAC
// ==========================================

export const INITIAL_OWNER_EMAIL = "pibida17udan4131@gmail.com";

export async function getAdminProfile(uid: string): Promise<AdminProfile | null> {
  // Check local cache first
  const cached = readLocal<Record<string, AdminProfile>>("udan_admin_profiles", {});
  if (cached[uid]) {
    return cached[uid];
  }

  try {
    const ref = doc(db, "admin_profiles", uid);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data() as AdminProfile;
      cached[uid] = data;
      writeLocal("udan_admin_profiles", cached);
      return data;
    }
  } catch (error) {
    console.warn("getAdminProfile notice:", error);
  }
  return null;
}

export async function ensureAdminProfile(uid: string, email: string): Promise<AdminProfile> {
  const existing = await getAdminProfile(uid);
  if (existing) {
    try {
      await updateDoc(doc(db, "admin_profiles", uid), {
        lastLoginAt: serverTimestamp(),
      });
    } catch (e) {}
    return existing;
  }

  // Check if this is the initial showroom owner
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
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  // Cache locally immediately
  const cached = readLocal<Record<string, AdminProfile>>("udan_admin_profiles", {});
  cached[uid] = newProfile;
  writeLocal("udan_admin_profiles", cached);

  // Sync to Cloud Firestore
  try {
    await setDoc(doc(db, "admin_profiles", uid), {
      ...newProfile,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
  } catch (error) {
    console.warn("ensureAdminProfile cloud write notice:", error);
  }

  return newProfile;
}

export async function getAllAdminProfiles(): Promise<AdminProfile[]> {
  const localMap = readLocal<Record<string, AdminProfile>>("udan_admin_profiles", {});
  let list = Object.values(localMap);

  try {
    const snap = await getDocs(collection(db, "admin_profiles"));
    if (!snap.empty) {
      const remoteList = snap.docs.map((d) => d.data() as AdminProfile);
      remoteList.forEach((p) => {
        localMap[p.uid] = p;
      });
      writeLocal("udan_admin_profiles", localMap);
      return remoteList;
    }
  } catch (err) {
    console.warn("getAllAdminProfiles notice:", err);
  }

  if (list.length === 0) {
    // Default showroom owner fallback
    list = [
      {
        uid: "owner-initial",
        email: INITIAL_OWNER_EMAIL,
        displayName: "Showroom Owner",
        role: "owner",
        permissions: ["all"],
        status: "active",
        createdAt: "2026-10-10",
      },
    ];
  }

  return list;
}

export async function updateAdminRole(uid: string, role: "owner" | "staff", permissions: string[]): Promise<void> {
  const localMap = readLocal<Record<string, AdminProfile>>("udan_admin_profiles", {});
  if (localMap[uid]) {
    localMap[uid].role = role;
    localMap[uid].permissions = permissions;
    writeLocal("udan_admin_profiles", localMap);
  }

  try {
    await updateDoc(doc(db, "admin_profiles", uid), {
      role,
      permissions,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("updateAdminRole cloud notice:", err);
  }
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
  const newLog: AuditLogItem = {
    id: `log-${Date.now()}`,
    action,
    actorUid,
    actorEmail,
    resource,
    summary,
    details: details || {},
    timestamp: new Date().toLocaleTimeString(),
  };

  const logs = readLocal<AuditLogItem[]>("udan_audit_logs", []);
  logs.unshift(newLog);
  writeLocal("udan_audit_logs", logs.slice(0, 100));

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
    console.warn("logAuditAction cloud notice:", err);
  }
}

export async function getAuditLogs(maxCount = 50): Promise<AuditLogItem[]> {
  const localLogs = readLocal<AuditLogItem[]>("udan_audit_logs", []);

  try {
    const q = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(maxCount));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const remoteLogs = snap.docs.map((d) => {
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
      writeLocal("udan_audit_logs", remoteLogs);
      return remoteLogs;
    }
  } catch (err) {
    console.warn("getAuditLogs cloud notice:", err);
  }

  return localLogs;
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
  const localProducts = readLocal<ProductItem[]>("udan_products_cache", []);

  try {
    const snap = await getDocs(collection(db, "products"));
    if (!snap.empty) {
      const remote = snap.docs.map((d) => d.data() as ProductItem);
      writeLocal("udan_products_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getProducts Firestore notice:", err);
  }

  if (localProducts.length > 0) {
    return localProducts;
  }

  const initial = ZUBOO_COLLECTION.map(mapStaticBikeToProduct);
  writeLocal("udan_products_cache", initial);
  return initial;
}

export async function saveProduct(product: ProductItem, isNew = false): Promise<void> {
  // 1. Update local cache
  const products = readLocal<ProductItem[]>("udan_products_cache", ZUBOO_COLLECTION.map(mapStaticBikeToProduct));
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = { ...product, updatedAt: new Date().toISOString() };
  } else {
    products.unshift({
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  writeLocal("udan_products_cache", products);

  // 2. Cloud Firestore sync
  try {
    const ref = doc(db, "products", product.id);
    const data = {
      ...product,
      updatedAt: serverTimestamp(),
      ...(isNew ? { createdAt: serverTimestamp() } : {}),
    };
    await setDoc(ref, data, { merge: true });
    isCloudFirestoreSynced = true;
  } catch (err) {
    console.warn("saveProduct cloud sync notice:", err);
    isCloudFirestoreSynced = false;
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  const products = readLocal<ProductItem[]>("udan_products_cache", []);
  writeLocal("udan_products_cache", products.filter((p) => p.id !== productId));

  try {
    await deleteDoc(doc(db, "products", productId));
  } catch (err) {
    console.warn("deleteProduct cloud notice:", err);
  }
}

// ==========================================
// 4. TEST RIDE BOOKINGS
// ==========================================

export async function getTestRideBookings(): Promise<TestRideBookingItem[]> {
  const local = readLocal<TestRideBookingItem[]>("udan_bookings_cache", []);

  try {
    const q = query(collection(db, "test_ride_bookings"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const remote = snap.docs.map((d) => {
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
      writeLocal("udan_bookings_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getTestRideBookings notice:", err);
  }

  return local;
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  internalNotes?: string
): Promise<void> {
  const bookings = readLocal<TestRideBookingItem[]>("udan_bookings_cache", []);
  const idx = bookings.findIndex((b) => b.id === bookingId);
  if (idx >= 0) {
    bookings[idx].status = status;
    if (internalNotes !== undefined) bookings[idx].internalNotes = internalNotes;
    writeLocal("udan_bookings_cache", bookings);
  }

  try {
    const ref = doc(db, "test_ride_bookings", bookingId);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp(),
    };
    if (internalNotes !== undefined) {
      updateData.internalNotes = internalNotes;
    }
    await updateDoc(ref, updateData);
  } catch (e) {
    console.warn("updateBookingStatus cloud notice:", e);
  }
}

// ==========================================
// 5. CUSTOMER INQUIRIES
// ==========================================

export async function getContactInquiries(): Promise<ContactInquiryItem[]> {
  const local = readLocal<ContactInquiryItem[]>("udan_inquiries_cache", []);

  try {
    const q = query(collection(db, "contact_inquiries"), orderBy("createdAt", "desc"), limit(100));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const remote = snap.docs.map((d) => {
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
      writeLocal("udan_inquiries_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getContactInquiries notice:", err);
  }

  return local;
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus,
  internalNotes?: string
): Promise<void> {
  const inquiries = readLocal<ContactInquiryItem[]>("udan_inquiries_cache", []);
  const idx = inquiries.findIndex((i) => i.id === inquiryId);
  if (idx >= 0) {
    inquiries[idx].status = status;
    if (internalNotes !== undefined) inquiries[idx].internalNotes = internalNotes;
    writeLocal("udan_inquiries_cache", inquiries);
  }

  try {
    const ref = doc(db, "contact_inquiries", inquiryId);
    const updateData: any = {
      status,
      updatedAt: serverTimestamp(),
    };
    if (internalNotes !== undefined) {
      updateData.internalNotes = internalNotes;
    }
    await updateDoc(ref, updateData);
  } catch (e) {
    console.warn("updateInquiryStatus cloud notice:", e);
  }
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
  const local = readLocal<OfferItem[]>("udan_offers_cache", []);

  try {
    const snap = await getDocs(collection(db, "offers"));
    if (!snap.empty) {
      const remote = snap.docs.map((d) => d.data() as OfferItem);
      writeLocal("udan_offers_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getOffers Firestore notice:", err);
  }

  if (local.length > 0) return local;
  writeLocal("udan_offers_cache", DEFAULT_OFFERS);
  return DEFAULT_OFFERS;
}

export async function saveOffer(offer: OfferItem): Promise<void> {
  const offers = readLocal<OfferItem[]>("udan_offers_cache", DEFAULT_OFFERS);
  const idx = offers.findIndex((o) => o.id === offer.id);
  if (idx >= 0) {
    offers[idx] = offer;
  } else {
    offers.unshift(offer);
  }
  writeLocal("udan_offers_cache", offers);

  try {
    const ref = doc(db, "offers", offer.id);
    await setDoc(ref, {
      ...offer,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    isCloudFirestoreSynced = true;
  } catch (err) {
    console.warn("saveOffer cloud sync notice:", err);
    isCloudFirestoreSynced = false;
  }
}

export async function deleteOffer(offerId: string): Promise<void> {
  const offers = readLocal<OfferItem[]>("udan_offers_cache", []);
  writeLocal("udan_offers_cache", offers.filter((o) => o.id !== offerId));

  try {
    await deleteDoc(doc(db, "offers", offerId));
  } catch (err) {
    console.warn("deleteOffer cloud notice:", err);
  }
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
  const cached = readLocal<ShowroomSettings>("udan_settings_cache", DEFAULT_SETTINGS);

  try {
    const ref = doc(db, "settings", "showroom");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const remote = snap.data() as ShowroomSettings;
      writeLocal("udan_settings_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getShowroomSettings Firestore notice:", err);
  }

  return cached;
}

export async function saveShowroomSettings(settings: ShowroomSettings): Promise<void> {
  // 1. Immediately persist locally
  writeLocal("udan_settings_cache", settings);

  // 2. Cloud Firestore sync
  try {
    const ref = doc(db, "settings", "showroom");
    await setDoc(ref, {
      ...settings,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    isCloudFirestoreSynced = true;
  } catch (err) {
    console.warn("saveShowroomSettings cloud notice:", err);
    isCloudFirestoreSynced = false;
  }
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
  const cached = readLocal<SiteContentHomepage>("udan_cms_cache", DEFAULT_HOMEPAGE_CONTENT);

  try {
    const ref = doc(db, "site_content", "homepage");
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const remote = snap.data() as SiteContentHomepage;
      writeLocal("udan_cms_cache", remote);
      return remote;
    }
  } catch (err) {
    console.warn("getHomepageContent Firestore notice:", err);
  }

  return cached;
}

export async function saveHomepageContent(content: SiteContentHomepage): Promise<void> {
  writeLocal("udan_cms_cache", content);

  try {
    const ref = doc(db, "site_content", "homepage");
    await setDoc(ref, {
      ...content,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    isCloudFirestoreSynced = true;
  } catch (err) {
    console.warn("saveHomepageContent cloud notice:", err);
    isCloudFirestoreSynced = false;
  }
}
