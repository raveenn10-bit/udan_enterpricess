import { Timestamp } from "firebase/firestore";

export type AdminRole = "owner" | "staff";

export interface AdminProfile {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  permissions: string[];
  status: "active" | "suspended";
  createdAt: any;
  lastLoginAt?: any;
}

export type BikeStockStatus = "In Showroom" | "Low Stock" | "Out of Stock" | "Pre-Order";
export type BikePublishStatus = "published" | "draft" | "archived";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductItem {
  id: string; // slug e.g. "gt", "the-tank", "paris"
  slug: string;
  name: string;
  modelCode: string;
  badge: string;
  category: string;
  tagline: string;
  description: string;
  priceLKR: number;
  previousPriceLKR?: number;
  isPriceVerified: boolean;
  motorPower: string;
  topSpeed: string;
  advertisedRange: string;
  battery: string;
  chargingTime?: string;
  dimensions?: string;
  brakes: string;
  display: string;
  stockStatus: BikeStockStatus;
  showroomUnits: number;
  isFeatured: boolean;
  isNewArrival?: boolean;
  status: BikePublishStatus;
  mainImage: string;
  gallery: string[];
  colors: ProductColor[];
  warranty: {
    batteryAndMotor: string;
    chassis: string;
    isVerified: boolean;
  };
  features: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: any;
  updatedAt: any;
}

export type BookingStatus = "pending" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface TestRideBookingItem {
  id: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  bikeModelId: string;
  bikeModelName: string;
  preferredDate: string;
  preferredTimeSlot?: string;
  locationCity?: string;
  notes?: string;
  internalNotes?: string;
  status: BookingStatus;
  assignedStaff?: string;
  createdAt: any;
  updatedAt?: any;
}

export type InquiryStatus = "new" | "contacted" | "interested" | "follow_up" | "converted" | "closed";

export interface ContactInquiryItem {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  subject?: string;
  modelOfInterest?: string;
  message: string;
  sourcePage?: string;
  status: InquiryStatus;
  internalNotes?: string;
  assignedStaff?: string;
  createdAt: any;
  updatedAt?: any;
}

export interface OfferItem {
  id: string;
  title: string;
  badge: string;
  badgeColor?: string;
  modelCode?: string;
  associatedBikeId?: string;
  regularPriceLKR?: number;
  promoPriceLKR: number;
  savingsLKR?: number;
  description?: string;
  highlights: string[];
  image: string;
  whatsAppText?: string;
  isActive: boolean;
  isPopular?: boolean;
  displayPriority: number;
  startDate?: string;
  expiryDate?: string;
  createdAt: any;
  updatedAt?: any;
}

export interface ShowroomSettings {
  showroomName: string;
  brandPartner: string;
  hotline: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  googleMapsUrl: string;
  openingHours: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  footerTagline: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  updatedAt?: any;
}

export interface SiteContentHomepage {
  heroHeadline: string;
  heroSubtitle: string;
  heroCtaText: string;
  announcementText: string;
  showcaseHeading: string;
  showcaseSubheading: string;
  techHeading: string;
  techDescription: string;
  aboutShowroomSnippet: string;
  updatedAt?: any;
}

export interface AuditLogItem {
  id: string;
  action: string;
  actorUid: string;
  actorEmail: string;
  resource: string;
  summary: string;
  details?: Record<string, any>;
  timestamp: any;
}
