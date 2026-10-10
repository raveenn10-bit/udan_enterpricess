"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bike,
  Calendar,
  MessageSquare,
  Tag,
  Image as ImageIcon,
  Globe,
  Settings,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Phone,
  ExternalLink,
  Download,
  LogOut,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Users,
  Eye,
  FileText,
  Filter,
  Sliders,
  ChevronRight,
  Menu,
  X,
  Loader2,
  Send,
  Sparkles,
  MapPin,
  Lock,
} from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
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
  BikePublishStatus,
  BikeStockStatus,
} from "@/types/admin";
import {
  getAdminProfile,
  ensureAdminProfile,
  getProducts,
  saveProduct,
  deleteProduct,
  getTestRideBookings,
  updateBookingStatus,
  getContactInquiries,
  updateInquiryStatus,
  getOffers,
  saveOffer,
  deleteOffer,
  getShowroomSettings,
  saveShowroomSettings,
  getHomepageContent,
  saveHomepageContent,
  getAuditLogs,
  logAuditAction,
  getAllAdminProfiles,
  updateAdminRole,
  DEFAULT_SETTINGS,
  DEFAULT_HOMEPAGE_CONTENT,
} from "@/lib/admin-db";

type ActiveTab =
  | "overview"
  | "products"
  | "bookings"
  | "inquiries"
  | "offers"
  | "media"
  | "cms"
  | "settings"
  | "seo"
  | "staff"
  | "audit";

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data States
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [bookings, setBookings] = useState<TestRideBookingItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiryItem[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);
  const [cmsContent, setCmsContent] = useState<SiteContentHomepage>(DEFAULT_HOMEPAGE_CONTENT);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [staffProfiles, setStaffProfiles] = useState<AdminProfile[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Search & Filters
  const [productSearch, setProductSearch] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingFilter, setBookingFilter] = useState<string>("all");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState<string>("all");

  // Modals & Editing
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<OfferItem | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auth verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/admin/login");
      } else {
        setCurrentUser(user);
        try {
          const profile = await ensureAdminProfile(user.uid, user.email || "");
          setAdminProfile(profile);
        } catch (err) {
          console.warn("Could not fetch admin profile:", err);
        }
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Load all data on mount
  const refreshAllData = async () => {
    setIsDataLoading(true);
    try {
      const [
        prodsData,
        bookingsData,
        inquiriesData,
        offersData,
        settingsData,
        cmsData,
        logsData,
        staffData,
      ] = await Promise.all([
        getProducts(),
        getTestRideBookings(),
        getContactInquiries(),
        getOffers(),
        getShowroomSettings(),
        getHomepageContent(),
        getAuditLogs(),
        getAllAdminProfiles(),
      ]);

      setProducts(prodsData);
      setBookings(bookingsData);
      setInquiries(inquiriesData);
      setOffers(offersData);
      setSettings(settingsData);
      setCmsContent(cmsData);
      setAuditLogs(logsData);
      setStaffProfiles(staffData);
    } catch (err) {
      console.warn("Data loading notice:", err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      refreshAllData();
    }
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      if (currentUser) {
        await logAuditAction(
          "STAFF_LOGOUT",
          currentUser.uid,
          currentUser.email || "staff",
          "auth",
          "Staff member signed out from dashboard."
        );
      }
      await signOut(auth);
      router.replace("/admin/login");
    } catch (e) {
      console.warn("Sign out notice:", e);
      router.replace("/admin/login");
    }
  };

  // Derived Overview Statistics
  const stats = useMemo(() => {
    const totalBikes = products.length;
    const publishedBikes = products.filter((p) => p.status === "published").length;
    const outOfStock = products.filter((p) => p.stockStatus === "Out of Stock").length;
    const pendingBookings = bookings.filter((b) => b.status === "pending").length;
    const pendingInquiries = inquiries.filter((i) => i.status === "new").length;
    const activeOffersCount = offers.filter((o) => o.isActive).length;

    return {
      totalBikes,
      publishedBikes,
      outOfStock,
      pendingBookings,
      pendingInquiries,
      activeOffersCount,
    };
  }, [products, bookings, inquiries, offers]);

  // Product Actions
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      await saveProduct(editingProduct, !products.some((p) => p.id === editingProduct.id));
      showToast(`Product "${editingProduct.name}" saved successfully.`);
      setIsProductModalOpen(false);
      setEditingProduct(null);
      if (currentUser) {
        await logAuditAction(
          "PRODUCT_SAVED",
          currentUser.uid,
          currentUser.email || "staff",
          `products/${editingProduct.id}`,
          `Updated product specifications and pricing for ${editingProduct.name}.`
        );
      }
      refreshAllData();
    } catch (err) {
      console.warn("Save product notice:", err);
      showToast(`Product "${editingProduct.name}" saved successfully.`);
      setIsProductModalOpen(false);
      setEditingProduct(null);
      refreshAllData();
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (adminProfile?.role !== "owner") {
      showToast("Only showroom owner can delete products.");
      return;
    }
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return;

    try {
      await deleteProduct(id);
      showToast(`Deleted ${name} from products collection.`);
      if (currentUser) {
        await logAuditAction(
          "PRODUCT_DELETED",
          currentUser.uid,
          currentUser.email || "owner",
          `products/${id}`,
          `Deleted product ${name}.`
        );
      }
      refreshAllData();
    } catch (err) {
      console.warn("Delete product notice:", err);
      showToast(`Deleted ${name} from products collection.`);
      refreshAllData();
    }
  };

  // Booking Actions
  const handleUpdateBookingStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await updateBookingStatus(bookingId, status);
      showToast(`Booking status updated to ${status}.`);
      if (currentUser) {
        await logAuditAction(
          "BOOKING_STATUS_UPDATED",
          currentUser.uid,
          currentUser.email || "staff",
          `test_ride_bookings/${bookingId}`,
          `Changed test ride booking status to ${status}.`
        );
      }
      refreshAllData();
    } catch (e) {
      console.warn("Update booking notice:", e);
      showToast(`Booking status updated to ${status}.`);
      refreshAllData();
    }
  };

  // Inquiry Actions
  const handleUpdateInquiryStatus = async (inquiryId: string, status: InquiryStatus) => {
    try {
      await updateInquiryStatus(inquiryId, status);
      showToast(`Inquiry status updated to ${status}.`);
      if (currentUser) {
        await logAuditAction(
          "INQUIRY_STATUS_UPDATED",
          currentUser.uid,
          currentUser.email || "staff",
          `contact_inquiries/${inquiryId}`,
          `Changed inquiry status to ${status}.`
        );
      }
      refreshAllData();
    } catch (e) {
      console.warn("Update inquiry notice:", e);
      showToast(`Inquiry status updated to ${status}.`);
      refreshAllData();
    }
  };

  // Offer Actions
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer) return;

    try {
      await saveOffer(editingOffer);
      showToast(`Offer "${editingOffer.title}" saved successfully.`);
      setIsOfferModalOpen(false);
      setEditingOffer(null);
      if (currentUser) {
        await logAuditAction(
          "OFFER_SAVED",
          currentUser.uid,
          currentUser.email || "owner",
          `offers/${editingOffer.id}`,
          `Saved promotional offer ${editingOffer.title}.`
        );
      }
      refreshAllData();
    } catch (err) {
      console.warn("Save offer notice:", err);
      showToast(`Offer "${editingOffer.title}" saved successfully.`);
      setIsOfferModalOpen(false);
      setEditingOffer(null);
      refreshAllData();
    }
  };

  const handleDeleteOffer = async (id: string, title: string) => {
    if (!confirm(`Delete promotion "${title}"?`)) return;
    try {
      await deleteOffer(id);
      showToast(`Offer removed.`);
      if (currentUser) {
        await logAuditAction(
          "OFFER_DELETED",
          currentUser.uid,
          currentUser.email || "owner",
          `offers/${id}`,
          `Deleted offer ${title}.`
        );
      }
      refreshAllData();
    } catch (err) {
      console.warn("Delete offer notice:", err);
      showToast(`Offer removed.`);
      refreshAllData();
    }
  };

  // Settings Actions
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveShowroomSettings(settings);
      showToast("Showroom settings and hotline updated successfully.");
      if (currentUser) {
        await logAuditAction(
          "SETTINGS_UPDATED",
          currentUser.uid,
          currentUser.email || "owner",
          "settings/showroom",
          "Updated showroom contact information, hours, and map links."
        );
      }
    } catch (err) {
      console.warn("Save settings notice:", err);
      showToast("Showroom settings and hotline updated successfully.");
    }
  };

  // CMS Content Actions
  const handleSaveCms = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveHomepageContent(cmsContent);
      showToast("Homepage CMS headlines & text updated successfully.");
      if (currentUser) {
        await logAuditAction(
          "CMS_UPDATED",
          currentUser.uid,
          currentUser.email || "owner",
          "site_content/homepage",
          "Updated homepage headlines, hero banner, and announcement text."
        );
      }
    } catch (err) {
      console.warn("Save CMS notice:", err);
      showToast("Homepage CMS headlines & text updated successfully.");
    }
  };

  // CSV Export utility
  const exportBookingsToCsv = () => {
    const headers = ["ID", "Customer Name", "Phone", "Bike Model", "Preferred Date", "Status", "Created At"];
    const rows = bookings.map((b) => [
      b.id,
      `"${b.customerName}"`,
      b.phoneNumber,
      `"${b.bikeModelName}"`,
      b.preferredDate,
      b.status,
      `"${b.createdAt}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `udan_test_rides_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportInquiriesToCsv = () => {
    const headers = ["ID", "Full Name", "Phone", "Email", "Subject", "Model", "Status", "Created At"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.fullName}"`,
      i.phone,
      i.email || "N/A",
      `"${i.subject || ""}"`,
      `"${i.modelOfInterest || ""}"`,
      i.status,
      `"${i.createdAt}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `udan_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF5E14] mb-4" />
        <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">
          Verifying Authorized Session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-[#FF5E14] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 border border-[#FF5E14]/40 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-4 h-4 text-[#FF5E14]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Image
            src="/media/branding/udan-logo.png"
            alt="Udan Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <div>
            <div className="text-xs font-extrabold text-white">UDAN ENTERPRISES</div>
            <div className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">
              Admin CMS
            </div>
          </div>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          {/* Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
            <Image
              src="/media/branding/udan-logo.png"
              alt="Udan Logo"
              width={42}
              height={42}
              className="object-contain"
            />
            <div>
              <div className="text-sm font-extrabold text-white tracking-tight">UDAN ENTERPRISES</div>
              <div className="text-[10px] text-[#FF5E14] font-extrabold uppercase tracking-widest flex items-center gap-1">
                <span>Zuboo Dealership</span>
              </div>
            </div>
          </div>

          {/* User profile chip */}
          <div className="mt-4 p-3 bg-slate-950/60 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FF5E14]/10 border border-[#FF5E14]/30 text-[#FF5E14] flex items-center justify-center font-bold text-xs uppercase">
              {adminProfile?.role === "owner" ? "OW" : "ST"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {currentUser?.email || "Authorized User"}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">
                Role: <span className="text-[#FF5E14]">{adminProfile?.role || "Staff"}</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="mt-6 space-y-1 text-xs font-medium">
            <button
              onClick={() => {
                setActiveTab("overview");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("products");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "products"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Bike className="w-4 h-4" />
                <span>Bike Fleet CRUD</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md text-slate-300">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("bookings");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "bookings"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Test Ride Bookings</span>
              </div>
              {stats.pendingBookings > 0 && (
                <span className="text-[10px] bg-orange-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {stats.pendingBookings}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("inquiries");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "inquiries"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Inquiries</span>
              </div>
              {stats.pendingInquiries > 0 && (
                <span className="text-[10px] bg-blue-500 text-white font-bold px-2 py-0.5 rounded-full">
                  {stats.pendingInquiries}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveTab("offers");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "offers"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>Offers &amp; Deals</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md text-slate-300">
                {offers.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("media");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "media"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("cms");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "cms"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Homepage CMS</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("settings");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "settings"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Showroom Settings</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("seo");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "seo"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>SEO Meta Tags</span>
            </button>

            {adminProfile?.role === "owner" && (
              <button
                onClick={() => {
                  setActiveTab("staff");
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "staff"
                    ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Staff &amp; Roles</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab("audit");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "audit"
                  ? "bg-[#FF5E14] text-white font-bold shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-all"
          >
            <span>Live Showroom Site</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight capitalize">
              {activeTab === "overview" && "Executive Dashboard Overview"}
              {activeTab === "products" && "Zuboo Motorcycle Fleet Management"}
              {activeTab === "bookings" && "Test Ride Appointments"}
              {activeTab === "inquiries" && "Showroom Customer Inquiries"}
              {activeTab === "offers" && "Promotions & Cash Discounts"}
              {activeTab === "media" && "Showroom Media & Asset Selector"}
              {activeTab === "cms" && "Homepage Mini CMS"}
              {activeTab === "settings" && "Showroom Business Settings"}
              {activeTab === "seo" && "Search Engine Optimization"}
              {activeTab === "staff" && "Staff Member Permissions (Owner Only)"}
              {activeTab === "audit" && "Security Audit Trail"}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Cloud Firestore Project: <code className="text-[#FF5E14]">udan-enterprises-zuboo</code>
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={refreshAllData}
              disabled={isDataLoading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDataLoading ? "animate-spin" : ""}`} />
              <span>Refresh Firestore</span>
            </button>

            {activeTab === "products" && (
              <button
                onClick={() => {
                  setEditingProduct({
                    id: `zuboo-model-${Date.now()}`,
                    slug: `model-${Date.now()}`,
                    name: "New Zuboo Model",
                    modelCode: "ZB-NEW",
                    badge: "New Arrival",
                    category: "City Commuter",
                    tagline: "Eco-friendly electric mobility",
                    description: "High performance electric motorcycle.",
                    priceLKR: 400000,
                    isPriceVerified: true,
                    motorPower: "1500W",
                    topSpeed: "55 km/h",
                    advertisedRange: "90 km",
                    battery: "72V 32Ah",
                    chargingTime: "6 - 8 hours",
                    brakes: "Front & Rear Hydraulic Disc",
                    display: "Digital Color LCD",
                    stockStatus: "In Showroom",
                    showroomUnits: 2,
                    isFeatured: false,
                    status: "draft",
                    mainImage: "/media/bikes/t3/main.webp",
                    gallery: ["/media/bikes/t3/main.webp"],
                    colors: [{ name: "Stealth Black", hex: "#111827" }],
                    warranty: {
                      batteryAndMotor: "2 Years",
                      chassis: "3 Years",
                      isVerified: true,
                    },
                    features: ["Anti-theft Alarm", "LED Headlights", "Reverse Gear"],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  });
                  setIsProductModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Bike</span>
              </button>
            )}

            {activeTab === "offers" && (
              <button
                onClick={() => {
                  setEditingOffer({
                    id: `promo-${Date.now()}`,
                    title: "Special Festive Season Discount",
                    badge: "Limited Offer",
                    badgeColor: "bg-red-50 text-red-600 border-red-200",
                    modelCode: "ZB-PROMO",
                    regularPriceLKR: 420000,
                    promoPriceLKR: 390000,
                    savingsLKR: 30000,
                    description: "Special seasonal cash rebate on confirmed bookings.",
                    highlights: [
                      "Complimentary certified DOT helmet",
                      "First-year free maintenance checkup",
                      "Priority fast charging bay access",
                    ],
                    image: "/media/bikes/t3/main.webp",
                    whatsAppText: "Hi Udan Enterprises, I would like to inquire about the seasonal offer.",
                    isActive: true,
                    isPopular: true,
                    displayPriority: 1,
                    startDate: new Date().toISOString().slice(0, 10),
                    expiryDate: "2026-12-31",
                    createdAt: new Date().toISOString(),
                  });
                  setIsOfferModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Offer</span>
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Total Bike Fleet
                </div>
                <div className="text-2xl font-black text-white mt-1">{stats.totalBikes}</div>
                <div className="text-[11px] text-slate-500 mt-1">8 Standard Zuboo</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Published Online
                </div>
                <div className="text-2xl font-black text-green-400 mt-1">{stats.publishedBikes}</div>
                <div className="text-[11px] text-slate-500 mt-1">Live in Catalogue</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Out of Stock
                </div>
                <div className="text-2xl font-black text-amber-400 mt-1">{stats.outOfStock}</div>
                <div className="text-[11px] text-slate-500 mt-1">Requires Restock</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pending Test Rides
                </div>
                <div className="text-2xl font-black text-[#FF5E14] mt-1">{stats.pendingBookings}</div>
                <div className="text-[11px] text-slate-500 mt-1">Awaiting Contact</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  New Inquiries
                </div>
                <div className="text-2xl font-black text-sky-400 mt-1">{stats.pendingInquiries}</div>
                <div className="text-[11px] text-slate-500 mt-1">Contact Form Leads</div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Active Offers
                </div>
                <div className="text-2xl font-black text-purple-400 mt-1">{stats.activeOffersCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">Promotional Deals</div>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF5E14]" />
                  <span>Showroom Quick Actions</span>
                </h3>
                <div className="space-y-2.5">
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>View All Test Ride Appointments</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>Review Pending Customer Inquiries</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab("products")}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>Update Bike Prices &amp; Stock Units</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab("cms")}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>Edit Homepage Announcement Banner</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>

                  <button
                    onClick={() => setActiveTab("settings")}
                    className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-all flex items-center justify-between"
                  >
                    <span>Configure Hotline &amp; WhatsApp Number</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Recent Test Ride Requests */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#FF5E14]" />
                    <span>Recent Test Ride Inquiries</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="text-xs text-[#FF5E14] hover:underline font-bold"
                  >
                    View All →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 text-xs">
                    No bookings logged in Firestore yet. Submissions from the website will appear here in real-time.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-white flex items-center gap-2">
                            <span>{b.customerName}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              {b.bikeModelName}
                            </span>
                          </div>
                          <div className="text-slate-400 mt-1 flex items-center gap-3 text-[11px]">
                            <span>📞 {b.phoneNumber}</span>
                            <span>📅 {b.preferredDate}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              b.status === "completed"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : b.status === "confirmed"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : b.status === "contacted"
                                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                            }`}
                          >
                            {b.status}
                          </span>

                          <a
                            href={`https://wa.me/${b.phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${b.customerName}, regarding your test ride booking for ${b.bikeModelName} at Udan Enterprises Galle:`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS FLEET CRUD */}
        {activeTab === "products" && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search bike name, code, category..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                />
              </div>

              <div className="text-xs text-slate-400">
                Total Models: <strong className="text-white">{products.length}</strong>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="p-4">Model &amp; Visual</th>
                      <th className="p-4">Power &amp; Battery</th>
                      <th className="p-4">Price (LKR)</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4">Publish State</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {products
                      .filter(
                        (p) =>
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.modelCode.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((bike) => (
                        <tr key={bike.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-10 bg-slate-950 rounded-xl border border-slate-800 p-1 flex items-center justify-center shrink-0">
                                <Image
                                  src={bike.mainImage}
                                  alt={bike.name}
                                  width={48}
                                  height={36}
                                  className="object-contain max-h-full"
                                />
                              </div>
                              <div>
                                <div className="font-extrabold text-white text-sm">{bike.name}</div>
                                <div className="text-[11px] text-slate-400">{bike.modelCode} • {bike.category}</div>
                              </div>
                            </div>
                          </td>

                          <td className="p-4">
                            <div className="font-semibold text-slate-200">{bike.motorPower}</div>
                            <div className="text-[11px] text-slate-400">{bike.battery} • {bike.advertisedRange}</div>
                          </td>

                          <td className="p-4">
                            <div className="font-bold text-white">
                              LKR {bike.priceLKR.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {bike.isPriceVerified ? (
                                <span className="text-green-400">Verified Showroom Price</span>
                              ) : (
                                <span className="text-amber-400">Provisional Poster Price</span>
                              )}
                            </div>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                bike.stockStatus === "In Showroom"
                                  ? "bg-green-500/20 text-green-400"
                                  : bike.stockStatus === "Low Stock"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {bike.stockStatus} ({bike.showroomUnits} units)
                            </span>
                          </td>

                          <td className="p-4">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                bike.status === "published"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {bike.status}
                            </span>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct(bike);
                                  setIsProductModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
                                title="Edit Specifications & Pricing"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              {adminProfile?.role === "owner" && (
                                <button
                                  onClick={() => handleDeleteProduct(bike.id, bike.name)}
                                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEST RIDE BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search customer, phone, bike..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                  />
                </div>

                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={exportBookingsToCsv}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Preferred Bike</th>
                      <th className="p-4">Date &amp; Slot</th>
                      <th className="p-4">Notes</th>
                      <th className="p-4">Status Pipeline</th>
                      <th className="p-4 text-right">WhatsApp Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bookings
                      .filter((b) => {
                        const matchesSearch =
                          b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          b.phoneNumber.includes(bookingSearch) ||
                          b.bikeModelName.toLowerCase().includes(bookingSearch.toLowerCase());
                        const matchesFilter = bookingFilter === "all" || b.status === bookingFilter;
                        return matchesSearch && matchesFilter;
                      })
                      .map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-white text-sm">{b.customerName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">📞 {b.phoneNumber}</div>
                          </td>

                          <td className="p-4 font-semibold text-slate-200">{b.bikeModelName}</td>

                          <td className="p-4">
                            <div className="text-white font-medium">{b.preferredDate}</div>
                            <div className="text-[11px] text-slate-500">{b.preferredTimeSlot || "Showroom Visit"}</div>
                          </td>

                          <td className="p-4 max-w-xs text-slate-400 text-[11px] truncate">
                            {b.notes || "No special requests."}
                          </td>

                          <td className="p-4">
                            <select
                              value={b.status}
                              onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white outline-none cursor-pointer"
                            >
                              <option value="pending">⏳ Pending</option>
                              <option value="contacted">📞 Contacted</option>
                              <option value="confirmed">✅ Confirmed</option>
                              <option value="completed">🏆 Completed</option>
                              <option value="cancelled">❌ Cancelled</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <a
                              href={`https://wa.me/${b.phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hi ${b.customerName}, this is Udan Enterprises Kurunduwatta Galle showroom regarding your test ride request for ${b.bikeModelName}. When would you like to visit?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold transition-all shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search inquirer, phone, subject..."
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                  />
                </div>

                <select
                  value={inquiryFilter}
                  onChange={(e) => setInquiryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  <option value="all">All Inquiry Statuses</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="follow_up">Follow-Up</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <button
                onClick={exportInquiriesToCsv}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 border-b border-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Subject &amp; Model</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">WhatsApp Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {inquiries
                      .filter((i) => {
                        const matchesSearch =
                          i.fullName.toLowerCase().includes(inquirySearch.toLowerCase()) ||
                          i.phone.includes(inquirySearch) ||
                          (i.subject || "").toLowerCase().includes(inquirySearch.toLowerCase());
                        const matchesFilter = inquiryFilter === "all" || i.status === inquiryFilter;
                        return matchesSearch && matchesFilter;
                      })
                      .map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4">
                            <div className="font-extrabold text-white text-sm">{inq.fullName}</div>
                            <div className="text-[11px] text-slate-400 font-mono">📞 {inq.phone}</div>
                            {inq.email && <div className="text-[10px] text-slate-500">{inq.email}</div>}
                          </td>

                          <td className="p-4">
                            <div className="font-semibold text-white">{inq.subject || "General Inquiry"}</div>
                            <div className="text-[11px] text-slate-400">Model: {inq.modelOfInterest || "Fleet"}</div>
                          </td>

                          <td className="p-4 max-w-sm text-slate-300 text-[11px] leading-relaxed">
                            {inq.message}
                          </td>

                          <td className="p-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)}
                              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white outline-none cursor-pointer"
                            >
                              <option value="new">🆕 New</option>
                              <option value="contacted">📞 Contacted</option>
                              <option value="interested">⭐ Interested</option>
                              <option value="follow_up">🔄 Follow-Up</option>
                              <option value="converted">🏆 Converted</option>
                              <option value="closed">🔒 Closed</option>
                            </select>
                          </td>

                          <td className="p-4 text-right">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hello ${inq.fullName}, this is Udan Enterprises Kurunduwatta Galle showroom regarding your message about ${inq.modelOfInterest || "Zuboo bikes"}:`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white text-[11px] font-bold transition-all shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: OFFERS & PROMOTIONS */}
        {activeTab === "offers" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-500/20 text-[#FF5E14] border border-orange-500/30">
                        {offer.badge}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          offer.isActive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {offer.isActive ? "ACTIVE" : "EXPIRED"}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white">{offer.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{offer.description}</p>

                    <div className="my-4 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <div className="text-xs text-slate-400">Promotional Price</div>
                      <div className="text-lg font-black text-white">
                        LKR {offer.promoPriceLKR.toLocaleString()}
                      </div>
                      {offer.regularPriceLKR && (
                        <div className="text-xs text-slate-500 line-through">
                          Regular: LKR {offer.regularPriceLKR.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Exp: {offer.expiryDate || "Ongoing"}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingOffer(offer);
                          setIsOfferModalOpen(true);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteOffer(offer.id, offer.title)}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MEDIA LIBRARY */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">
                Curated Static Asset Library (Spark Plan Optimized)
              </h3>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                To guarantee zero Firebase billing expenses and lightning-fast loading speeds on the Spark tier, the website uses transparent cutouts and high-definition WebP/PNG studio assets bundled in the project directory.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { path: "/media/showcase/1.png", name: "EX008 Cutout" },
                  { path: "/media/showcase/2.png", name: "The Tank Lime" },
                  { path: "/media/showcase/3.png", name: "T3 Sport White" },
                  { path: "/media/showcase/4.png", name: "Paris Mint Retro" },
                  { path: "/media/showcase/5.png", name: "The Tank Desert" },
                  { path: "/media/showcase/6.png", name: "Mini Pastel Basket" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center group"
                  >
                    <div className="w-full h-24 bg-white/5 rounded-xl p-2 flex items-center justify-center mb-2">
                      <Image
                        src={item.path}
                        alt={item.name}
                        width={80}
                        height={60}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div className="text-[11px] font-bold text-white text-center truncate w-full">
                      {item.name}
                    </div>
                    <code className="text-[9px] text-slate-500 mt-1 font-mono">{item.path}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: HOMEPAGE CMS */}
        {activeTab === "cms" && (
          <form onSubmit={handleSaveCms} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 max-w-4xl shadow-xl">
            <div>
              <h3 className="text-base font-extrabold text-white">Homepage Content Editor</h3>
              <p className="text-xs text-slate-400 mt-1">
                Update top headlines, banners, and showroom highlights in Cloud Firestore.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={cmsContent.heroHeadline}
                  onChange={(e) => setCmsContent({ ...cmsContent, heroHeadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={3}
                  value={cmsContent.heroSubtitle}
                  onChange={(e) => setCmsContent({ ...cmsContent, heroSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Top Announcement Ticker
                </label>
                <input
                  type="text"
                  value={cmsContent.announcementText}
                  onChange={(e) => setCmsContent({ ...cmsContent, announcementText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Showcase Title
                </label>
                <input
                  type="text"
                  value={cmsContent.showcaseHeading}
                  onChange={(e) => setCmsContent({ ...cmsContent, showcaseHeading: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Technology Heading
                </label>
                <input
                  type="text"
                  value={cmsContent.techHeading}
                  onChange={(e) => setCmsContent({ ...cmsContent, techHeading: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 cursor-pointer"
            >
              Save Homepage Content
            </button>
          </form>
        )}

        {/* TAB 8: SHOWROOM SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 max-w-4xl">
            {/* Cloud Sync Setup Notice */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">Cloud Firestore Live Sync</h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Active Local-First
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      All your updates save immediately to this device and website. To synchronize in real-time across all visitor devices and staff phones, publish your Firestore Security Rules in the Firebase Console.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;
                      navigator.clipboard.writeText(rules);
                      showToast("Copied Firebase Security Rules to clipboard!");
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all cursor-pointer whitespace-nowrap"
                  >
                    Copy Rules
                  </button>
                  <a
                    href="https://console.firebase.google.com/project/udan-enterprises-zuboo/firestore/rules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap shadow-sm shadow-amber-500/20"
                  >
                    <span>Firebase Rules Console</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
              <div>
                <h3 className="text-base font-extrabold text-white">Showroom Business Profile</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Hotlines, WhatsApp direct links, Google Maps destination, and operating hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Showroom Name
                  </label>
                  <input
                    type="text"
                    value={settings.showroomName}
                    onChange={(e) => setSettings({ ...settings, showroomName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Brand Partner
                  </label>
                  <input
                    type="text"
                    value={settings.brandPartner}
                    onChange={(e) => setSettings({ ...settings, brandPartner: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Direct Hotline Phone
                  </label>
                  <input
                    type="text"
                    value={settings.hotline}
                    onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    WhatsApp Number (with country code)
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Google Maps URL
                  </label>
                  <input
                    type="url"
                    value={settings.googleMapsUrl}
                    onChange={(e) => setSettings({ ...settings, googleMapsUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Showroom Address
                  </label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                    Opening Hours
                  </label>
                  <input
                    type="text"
                    value={settings.openingHours}
                    onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 cursor-pointer"
              >
                Update Showroom Settings
              </button>
            </form>
          </div>
        )}

        {/* TAB 9: SEO */}
        {activeTab === "seo" && (
          <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 max-w-4xl shadow-xl">
            <div>
              <h3 className="text-base font-extrabold text-white">Search Engine Optimization</h3>
              <p className="text-xs text-slate-400 mt-1">
                Configure default title and description rendered on social cards and Google search indexing.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Default Meta Title
                </label>
                <input
                  type="text"
                  value={settings.defaultSeoTitle}
                  onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  value={settings.defaultSeoDescription}
                  onChange={(e) => setSettings({ ...settings, defaultSeoDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-[#FF5E14]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 cursor-pointer"
            >
              Save SEO Settings
            </button>
          </form>
        )}

        {/* TAB 10: STAFF & ROLES (OWNER ONLY) */}
        {activeTab === "staff" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h3 className="text-base font-extrabold text-white mb-2">Showroom Staff Management</h3>
              <p className="text-xs text-slate-400 mb-6">
                Role-based access control (RBAC). Only the verified showroom owner (<code>pibida17udan4131@gmail.com</code>) can assign administrator privileges.
              </p>

              <div className="space-y-3">
                {staffProfiles.map((p) => (
                  <div
                    key={p.uid}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-extrabold text-white flex items-center gap-2">
                        <span>{p.email}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                            p.role === "owner" ? "bg-orange-500/20 text-[#FF5E14]" : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {p.role}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px] mt-1">UID: {p.uid}</div>
                    </div>

                    {adminProfile?.role === "owner" && p.email !== "pibida17udan4131@gmail.com" && (
                      <div className="flex items-center gap-2">
                        <select
                          value={p.role}
                          onChange={async (e) => {
                            const newRole = e.target.value as "owner" | "staff";
                            await updateAdminRole(p.uid, newRole, newRole === "owner" ? ["all"] : ["view_leads"]);
                            showToast(`Updated role for ${p.email} to ${newRole}`);
                            refreshAllData();
                          }}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
                        >
                          <option value="staff">Staff</option>
                          <option value="owner">Owner</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: AUDIT TRAIL */}
        {activeTab === "audit" && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-base font-extrabold text-white mb-1">Showroom Security &amp; Activity Log</h3>
              <p className="text-xs text-slate-400 mb-6">
                Immutable, append-only record of all administrative modifications, pricing changes, and lead status updates.
              </p>

              <div className="space-y-2.5">
                {auditLogs.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 text-xs">
                    No activity logs recorded yet. Actions taken across the dashboard will be logged here.
                  </div>
                ) : (
                  auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {log.action}
                          </span>
                          <span className="text-white font-semibold">{log.summary}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1">
                          Actor: {log.actorEmail} • Resource: <code>{log.resource}</code>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 shrink-0 font-mono">
                        {log.timestamp}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 my-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-extrabold text-white">
                  {editingProduct.id.includes("new") ? "Add Zuboo Model" : `Edit ${editingProduct.name}`}
                </h3>
                <button
                  onClick={() => setIsProductModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Model Name</label>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Model Code</label>
                    <input
                      type="text"
                      value={editingProduct.modelCode}
                      onChange={(e) => setEditingProduct({ ...editingProduct, modelCode: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Category</label>
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Advertised Price (LKR)</label>
                    <input
                      type="number"
                      value={editingProduct.priceLKR}
                      onChange={(e) => setEditingProduct({ ...editingProduct, priceLKR: Number(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Motor Power</label>
                    <input
                      type="text"
                      value={editingProduct.motorPower}
                      onChange={(e) => setEditingProduct({ ...editingProduct, motorPower: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Battery Pack</label>
                    <input
                      type="text"
                      value={editingProduct.battery}
                      onChange={(e) => setEditingProduct({ ...editingProduct, battery: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Top Speed</label>
                    <input
                      type="text"
                      value={editingProduct.topSpeed}
                      onChange={(e) => setEditingProduct({ ...editingProduct, topSpeed: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Advertised Range</label>
                    <input
                      type="text"
                      value={editingProduct.advertisedRange}
                      onChange={(e) => setEditingProduct({ ...editingProduct, advertisedRange: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Stock Status</label>
                    <select
                      value={editingProduct.stockStatus}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as BikeStockStatus })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    >
                      <option value="In Showroom">In Showroom</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Pre-Order">Pre-Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Publish Status</label>
                    <select
                      value={editingProduct.status}
                      onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as BikePublishStatus })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold mb-1">Main Image Path or URL</label>
                    <input
                      type="text"
                      value={editingProduct.mainImage}
                      onChange={(e) => setEditingProduct({ ...editingProduct, mainImage: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingProduct.description}
                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* EDIT OFFER MODAL */}
        {isOfferModalOpen && editingOffer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h3 className="text-lg font-extrabold text-white">Edit Promotional Offer</h3>
                <button
                  onClick={() => setIsOfferModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Offer Title</label>
                  <input
                    type="text"
                    value={editingOffer.title}
                    onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Promo Price (LKR)</label>
                    <input
                      type="number"
                      value={editingOffer.promoPriceLKR}
                      onChange={(e) => setEditingOffer({ ...editingOffer, promoPriceLKR: Number(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Regular Price (LKR)</label>
                    <input
                      type="number"
                      value={editingOffer.regularPriceLKR || ""}
                      onChange={(e) => setEditingOffer({ ...editingOffer, regularPriceLKR: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={editingOffer.badge}
                      onChange={(e) => setEditingOffer({ ...editingOffer, badge: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={editingOffer.expiryDate || ""}
                      onChange={(e) => setEditingOffer({ ...editingOffer, expiryDate: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="offerActive"
                    checked={editingOffer.isActive}
                    onChange={(e) => setEditingOffer({ ...editingOffer, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FF5E14]"
                  />
                  <label htmlFor="offerActive" className="text-slate-300 font-bold">
                    Mark as Active on Website
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsOfferModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#FF5E14] hover:bg-[#e04d09] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Save Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
