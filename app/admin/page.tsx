"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Users,
  Layers,
  Wrench,
  Search,
  Filter,
  Download,
  Plus,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Store,
  RefreshCw,
  LogOut,
  ChevronDown,
  Calendar,
  Save,
  Trash2,
  ArrowUpRight,
  ExternalLink,
  Edit3,
  X,
  Mail,
  LogIn,
  Loader2,
  UserCheck,
} from "lucide-react";
import { INITIAL_LEADS, TestRideLead, LeadStatus, generateWhatsAppLink, exportLeadsToCSV } from "@/data/leads";
import { INITIAL_INVENTORY, InventoryItem } from "@/data/inventory";
import { SERVICE_PACKAGES } from "@/data/services";
import { BUSINESS_CONFIG } from "@/data/business";
import { auth, db } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";


interface ServiceBookingRecord {
  id: string;
  customerName: string;
  phone: string;
  vinOrModel: string;
  servicePackage: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "In Bay" | "Completed";
  createdAt: string;
}

const DEFAULT_SERVICE_BOOKINGS: ServiceBookingRecord[] = [
  {
    id: "SRV-201",
    customerName: "Kavindu Perera",
    phone: "0771234821",
    vinOrModel: "ZB-2026-T3-001 (Zuboo T3)",
    servicePackage: "Routine 3-Month / 1,000 km Inspection",
    preferredDate: "2026-10-14",
    preferredTime: "Morning (10:00 AM)",
    notes: "Routine warranty checkup. Please verify front brake lever tightness.",
    status: "Confirmed",
    createdAt: "2026-10-09 09:30 AM",
  },
  {
    id: "SRV-202",
    customerName: "Nuwan Jayasuriya",
    phone: "0719876933",
    vinOrModel: "ZB-2026-GT-042 (Zuboo GT)",
    servicePackage: "Battery Health Diagnostics & BMS Calibration",
    preferredDate: "2026-10-15",
    preferredTime: "Afternoon (2:00 PM)",
    notes: "Routine coastal BMS diagnostic check before hill country touring.",
    status: "Pending",
    createdAt: "2026-10-10 08:15 AM",
  },
  {
    id: "SRV-203",
    customerName: "M. Farook",
    phone: "0763322119",
    vinOrModel: "Zuboo The Tank",
    servicePackage: "Hydraulic Brake Service & Caliper Overhaul",
    preferredDate: "2026-10-12",
    preferredTime: "Morning (11:30 AM)",
    notes: "Rear brake pad replacement and fluid top-up.",
    status: "In Bay",
    createdAt: "2026-10-08 04:00 PM",
  },
];

export default function AdminPage() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authMode, setAuthMode] = useState<"firebase" | "pin">("firebase");
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"leads" | "inventory" | "service">("leads");

  // Leads State
  const [leads, setLeads] = useState<TestRideLead[]>(INITIAL_LEADS);
  const [leadFilter, setLeadFilter] = useState<string>("All");
  const [leadSearch, setLeadSearch] = useState<string>("");
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState<boolean>(false);
  const [newLeadForm, setNewLeadForm] = useState({
    customerName: "",
    phoneNumber: "",
    bikeModelId: "t3",
    bikeModelName: "Zuboo T3 (1200W)",
    preferredDate: new Date().toISOString().slice(0, 10),
    preferredTimeSlot: "Morning (10:00 AM)",
    locationCity: "Galle",
    notes: "Walk-in showroom visitor",
  });

  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [inventorySearch, setInventorySearch] = useState<string>("");
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Service Bookings State
  const [serviceBookings, setServiceBookings] = useState<ServiceBookingRecord[]>(DEFAULT_SERVICE_BOOKINGS);

  // Sync / Load on mount from localStorage & Firebase Auth
  useEffect(() => {
    // 1. Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("udan_admin_auth", "true");
        if (user.email) {
          localStorage.setItem("udan_admin_email", user.email);
        }
      } else {
        const savedAuth = localStorage.getItem("udan_admin_auth");
        if (savedAuth !== "true") {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      }
    });

    const savedAuth = localStorage.getItem("udan_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }

    const savedLeads = localStorage.getItem("udan_admin_leads");
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.warn("Could not parse saved leads:", e);
      }
    }

    const savedInventory = localStorage.getItem("udan_admin_inventory");
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (e) {
        console.warn("Could not parse saved inventory:", e);
      }
    }

    const savedService = localStorage.getItem("udan_service_bookings");
    if (savedService) {
      try {
        const parsed = JSON.parse(savedService);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setServiceBookings((prev) => {
            const combined = [...parsed, ...prev.filter((p) => !parsed.some((x: ServiceBookingRecord) => x.id === p.id))];
            return combined;
          });
        }
      } catch (e) {
        console.warn("Could not parse saved service bookings:", e);
      }
    }

    // Try fetching from Firebase Firestore if available
    const fetchFirestoreBookings = async () => {
      try {
        const q = query(collection(db, "test_ride_bookings"), orderBy("createdAt", "desc"), limit(20));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const remoteLeads: TestRideLead[] = [];
          snap.forEach((doc) => {
            const data = doc.data();
            remoteLeads.push({
              id: doc.id.substring(0, 8).toUpperCase(),
              customerName: data.customerName || "Inquiry",
              phoneNumber: data.phoneNumber || "",
              bikeModelId: data.bikeModelId || "general",
              bikeModelName: data.bikeModelName || "Zuboo Model",
              preferredDate: data.preferredDate || "Earliest",
              preferredTimeSlot: "Showroom Visit",
              locationCity: "Galle Region",
              notes: data.notes || "",
              status: (data.status === "completed" ? "Test Ride Completed" : "New") as LeadStatus,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : "Recent",
            });
          });
          if (remoteLeads.length > 0) {
            setLeads((prev) => {
              const ids = new Set(prev.map((l) => l.id));
              const merged = [...remoteLeads.filter((r) => !ids.has(r.id)), ...prev];
              localStorage.setItem("udan_admin_leads", JSON.stringify(merged));
              return merged;
            });
          }
        }
      } catch (err) {
        console.info("Firestore live sync offline/mock mode:", err);
      }
    };

    fetchFirestoreBookings();

    return () => {
      unsubscribe();
    };
  }, []);

  const triggerToast = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => {
      setStatusNotification(null);
    }, 3500);
  };

  // Firebase Auth Login Handler
  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsAuthLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        authEmail.trim(),
        authPassword
      );
      setCurrentUser(userCredential.user);
      setIsAuthenticated(true);
      localStorage.setItem("udan_admin_auth", "true");
      if (userCredential.user.email) {
        localStorage.setItem("udan_admin_email", userCredential.user.email);
      }
      triggerToast(`Welcome back, ${userCredential.user.email || "Admin"}! Firebase authentication confirmed.`);
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      let message = "Firebase sign-in failed. Please verify email and password.";
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        message = "Incorrect email or password. Please verify the user added in Firebase Authentication.";
      } else if (err.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      } else if (err.code === "auth/too-many-requests") {
        message = "Access temporarily limited. Try again shortly or use the emergency showroom PIN.";
      } else if (err.code === "auth/network-request-failed") {
        message = "Network error connecting to Firebase. You can switch to emergency PIN (4131) bypass.";
      } else if (err.message) {
        message = err.message;
      }
      setLoginError(message);
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Emergency PIN Bypass Login Handler
  const handlePinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "4131" || pinInput === "udan2026" || pinInput === "4131#") {
      setIsAuthenticated(true);
      localStorage.setItem("udan_admin_auth", "true");
      localStorage.setItem("udan_admin_email", "showroom-staff@udan.lk");
      setLoginError("");
      triggerToast("Welcome back! Showroom staff PIN bypass verified.");
    } else {
      setLoginError("Invalid staff PIN. Use demo showroom PIN: 4131 or sign in with Firebase.");
    }
  };

  // Logout Handler (signs out from Firebase Auth and clears storage)
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign out error:", err);
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("udan_admin_auth");
    localStorage.removeItem("udan_admin_email");
    setPinInput("");
    setAuthPassword("");
    triggerToast("Signed out from Showroom CMS.");
  };


  // Leads Actions
  const handleUpdateLeadStatus = (leadId: string, newStatus: LeadStatus) => {
    const updated = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    setLeads(updated);
    localStorage.setItem("udan_admin_leads", JSON.stringify(updated));
    triggerToast(`Lead #${leadId} updated to "${newStatus}"`);
  };

  const handleDeleteLead = (leadId: string) => {
    if (confirm(`Are you sure you want to remove lead #${leadId}?`)) {
      const updated = leads.filter((l) => l.id !== leadId);
      setLeads(updated);
      localStorage.setItem("udan_admin_leads", JSON.stringify(updated));
      triggerToast(`Lead #${leadId} removed.`);
    }
  };

  const handleAddWalkInLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.customerName || !newLeadForm.phoneNumber) {
      alert("Please provide customer name and phone number.");
      return;
    }

    const createdLead: TestRideLead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      customerName: newLeadForm.customerName,
      phoneNumber: newLeadForm.phoneNumber,
      bikeModelId: newLeadForm.bikeModelId,
      bikeModelName: newLeadForm.bikeModelName,
      preferredDate: newLeadForm.preferredDate,
      preferredTimeSlot: newLeadForm.preferredTimeSlot,
      locationCity: newLeadForm.locationCity,
      notes: newLeadForm.notes,
      status: "New",
      createdAt: new Date().toLocaleString(),
    };

    const updated = [createdLead, ...leads];
    setLeads(updated);
    localStorage.setItem("udan_admin_leads", JSON.stringify(updated));
    setIsAddLeadModalOpen(false);
    setNewLeadForm({
      customerName: "",
      phoneNumber: "",
      bikeModelId: "t3",
      bikeModelName: "Zuboo T3 (1200W)",
      preferredDate: new Date().toISOString().slice(0, 10),
      preferredTimeSlot: "Morning (10:00 AM)",
      locationCity: "Galle",
      notes: "Walk-in showroom visitor",
    });
    triggerToast(`New walk-in lead added for ${createdLead.customerName}`);
  };

  // Inventory Actions
  const handleUpdateStockStatus = (
    itemId: string,
    newStatus: "In Showroom" | "Pre-Order" | "Low Stock" | "Out of Stock"
  ) => {
    const updated = inventory.map((item) =>
      item.id === itemId
        ? {
            ...item,
            stockStatus: newStatus,
            lastUpdated: new Date().toISOString().slice(0, 10),
          }
        : item
    );
    setInventory(updated);
    localStorage.setItem("udan_admin_inventory", JSON.stringify(updated));
    triggerToast(`Stock status for ${itemId.toUpperCase()} set to "${newStatus}"`);
  };

  const handleUpdatePrice = (itemId: string, newPrice: number) => {
    const updated = inventory.map((item) =>
      item.id === itemId
        ? {
            ...item,
            provisionalPriceLKR: newPrice,
            lastUpdated: new Date().toISOString().slice(0, 10),
          }
        : item
    );
    setInventory(updated);
    localStorage.setItem("udan_admin_inventory", JSON.stringify(updated));
  };

  const handleUpdateDeliveryTime = (itemId: string, newDelivery: string) => {
    const updated = inventory.map((item) =>
      item.id === itemId
        ? {
            ...item,
            deliveryTime: newDelivery,
            lastUpdated: new Date().toISOString().slice(0, 10),
          }
        : item
    );
    setInventory(updated);
    localStorage.setItem("udan_admin_inventory", JSON.stringify(updated));
  };

  const handleUpdateFloorUnits = (itemId: string, delta: number) => {
    const updated = inventory.map((item) => {
      if (item.id === itemId) {
        const count = Math.max(0, item.showroomUnits + delta);
        return {
          ...item,
          showroomUnits: count,
          stockStatus:
            count === 0
              ? ("Pre-Order" as const)
              : count === 1
              ? ("Low Stock" as const)
              : ("In Showroom" as const),
          lastUpdated: new Date().toISOString().slice(0, 10),
        };
      }
      return item;
    });
    setInventory(updated);
    localStorage.setItem("udan_admin_inventory", JSON.stringify(updated));
  };

  const handleResetInventory = () => {
    if (confirm("Reset inventory to factory catalogue defaults?")) {
      setInventory(INITIAL_INVENTORY);
      localStorage.removeItem("udan_admin_inventory");
      triggerToast("Inventory reset to factory default specifications.");
    }
  };

  // Service Bookings Action
  const handleUpdateServiceStatus = (
    bookingId: string,
    newStatus: "Pending" | "Confirmed" | "In Bay" | "Completed"
  ) => {
    const updated = serviceBookings.map((b) =>
      b.id === bookingId ? { ...b, status: newStatus } : b
    );
    setServiceBookings(updated);
    localStorage.setItem("udan_service_bookings", JSON.stringify(updated));
    triggerToast(`Service Booking #${bookingId} marked as ${newStatus}`);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesFilter = leadFilter === "All" || lead.status === leadFilter;
    const matchesSearch =
      lead.customerName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phoneNumber.includes(leadSearch) ||
      lead.bikeModelName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      (lead.locationCity && lead.locationCity.toLowerCase().includes(leadSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Filtered Inventory
  const filteredInventory = inventory.filter((item) => {
    return (
      item.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.modelCode.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      item.category.toLowerCase().includes(inventorySearch.toLowerCase())
    );
  });

  // KPIs
  const totalLeadsCount = leads.length;
  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const completedRidesCount = leads.filter((l) => l.status === "Test Ride Completed").length;
  const convertedLeadsCount = leads.filter((l) => l.status === "Converted").length;
  const showroomUnitsTotal = inventory.reduce((acc, curr) => acc + curr.showroomUnits, 0);

  // If NOT authenticated, render the Showroom Staff Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F7F9FA] text-[#111820] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 selection:bg-[#346C83] selection:text-white">
        <div className="max-w-md w-full mx-auto space-y-8 my-auto">
          {/* Brand header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-sm border border-[#E0E8EC] mb-2">
              <div className="relative h-12 w-12">
                <Image
                  src="/media/branding/udan-logo.png"
                  alt="Udan Enterprises"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="font-heading font-black text-2xl tracking-tight text-[#111820] uppercase">
              UDAN ENTERPRISES
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#667780] font-semibold">
              Showroom CMS & Inventory Management System
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E0E8EC] p-8 space-y-6">
            {/* Header / Mode Switcher */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E0E8EC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83]">
                  {authMode === "firebase" ? <Mail className="w-5 h-5" /> : <KeyRound className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wide">
                    {authMode === "firebase" ? "Firebase Admin Login" : "Staff PIN Verification"}
                  </h2>
                  <p className="text-xs text-[#667780]">
                    {authMode === "firebase" ? "Official Firebase Credentials" : "Offline Showroom Terminal PIN"}
                  </p>
                </div>
              </div>
            </div>

            {/* Auth Mode Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode("firebase");
                  setLoginError("");
                }}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  authMode === "firebase"
                    ? "bg-[#111820] text-white shadow-xs"
                    : "text-[#667780] hover:text-[#111820]"
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Firebase Auth</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode("pin");
                  setLoginError("");
                }}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  authMode === "pin"
                    ? "bg-[#111820] text-white shadow-xs"
                    : "text-[#667780] hover:text-[#111820]"
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>PIN Bypass (4131)</span>
              </button>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* MODE 1: Firebase Email & Password Form */}
            {authMode === "firebase" ? (
              <form onSubmit={handleFirebaseLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      autoFocus
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="admin@udan.lk"
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-xs font-medium focus:outline-none focus:border-[#346C83] focus:bg-white transition-all pl-10"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-xs font-medium focus:outline-none focus:border-[#346C83] focus:bg-white transition-all pl-10"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#E8F1F5]/80 border border-[#346C83]/20 text-[11px] text-[#111820] space-y-1">
                  <div className="font-bold text-[#346C83] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Firebase Authentication Connected</span>
                  </div>
                  <p className="text-[#667780]">
                    Sign in with the user credentials added in your Firebase Console project.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                >
                  {isAuthLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Firebase Account...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Log In with Firebase</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* MODE 2: Emergency PIN Bypass Form */
              <form onSubmit={handlePinLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                    Showroom Staff PIN / Code
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      inputMode="numeric"
                      autoFocus
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                      placeholder="Enter 4-digit PIN (e.g. 4131)"
                      className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] font-mono text-center text-lg tracking-widest focus:outline-none focus:border-[#346C83] focus:bg-white transition-all shadow-inner"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#E8F1F5]/80 border border-[#346C83]/20 flex items-start gap-2.5 text-xs text-[#111820]">
                  <ShieldCheck className="w-4 h-4 text-[#346C83] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#346C83] block">Showroom Demo PIN: 4131</span>
                    <span className="text-[11px] text-[#667780]">
                      Emergency showroom terminal bypass registered for Udan Enterprises Galle staff.
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Verify PIN & Enter Dashboard</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center border-t border-[#E0E8EC]">
              <Link
                href="/"
                className="text-xs text-[#667780] hover:text-[#111820] transition-colors inline-flex items-center gap-1 font-medium"
              >
                <span>Return to Public Website</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="text-center text-[11px] text-[#667780] space-y-1">
            <p>Udan Enterprises • Official Zuboo Electric Mobility Dealership</p>
            <p>Udugama Road, Kurunduwatta, Galle • Hotline: 078 496 9652</p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Showroom CMS Admin Dashboard
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Toast Notification */}
      {statusNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111820] text-white px-5 py-3 rounded-xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0E8EC] shadow-xs">
        <div className="editorial-container py-3.5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            {/* Showroom Brand Info */}
            <div className="flex items-center gap-3.5">
              <div className="relative h-9 w-9">
                <Image
                  src="/media/branding/udan-logo.png"
                  alt="Udan Enterprises"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-sm text-[#111820] tracking-tight uppercase">
                    UDAN ENTERPRISES
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#E8F1F5] text-[#346C83] text-[10px] font-extrabold uppercase tracking-wider border border-[#346C83]/20">
                    CMS Admin v3.2
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    <span>{currentUser ? "Firebase Auth" : "Staff Verified"}</span>
                  </span>
                </div>
                <p className="text-[11px] text-[#667780]">
                  Galle Kurunduwatta Showroom • Operator:{" "}
                  <span className="font-bold text-[#111820]">
                    {currentUser?.email || (typeof window !== "undefined" && localStorage.getItem("udan_admin_email")) || "Showroom Staff"}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Links & Staff Logout */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href="/"
                target="_blank"

                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111820] bg-[#F7F9FA] hover:bg-[#E8F1F5] border border-[#E0E8EC] transition-colors"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3 h-3 text-[#667780]" />
              </Link>
              <Link
                href="/service"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111820] bg-[#F7F9FA] hover:bg-[#E8F1F5] border border-[#E0E8EC] transition-colors"
              >
                <Wrench className="w-3 h-3 text-[#346C83]" />
                <span>Service Portal</span>
              </Link>
              <Link
                href="/warranty"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#111820] bg-[#F7F9FA] hover:bg-[#E8F1F5] border border-[#E0E8EC] transition-colors"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Warranty Lookup</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors ml-1"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="editorial-container py-8 space-y-8">
        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-xs">
            <div className="flex items-center justify-between text-[#667780] mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
              <Users className="w-4 h-4 text-[#346C83]" />
            </div>
            <div className="text-2xl font-black font-heading text-[#111820]">{totalLeadsCount}</div>
            <p className="text-[11px] text-[#667780] mt-1">Across Southern Province</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-xs">
            <div className="flex items-center justify-between text-[#667780] mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">New Actionable</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <div className="text-2xl font-black font-heading text-blue-600">{newLeadsCount}</div>
            <p className="text-[11px] text-[#667780] mt-1">Awaiting showroom call</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-xs">
            <div className="flex items-center justify-between text-[#667780] mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Rides Completed</span>
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black font-heading text-teal-700">{completedRidesCount}</div>
            <p className="text-[11px] text-[#667780] mt-1">Galle trial track</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-xs">
            <div className="flex items-center justify-between text-[#667780] mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Converted Sales</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black font-heading text-emerald-600">{convertedLeadsCount}</div>
            <p className="text-[11px] text-[#667780] mt-1">
              {totalLeadsCount > 0 ? `${Math.round((convertedLeadsCount / totalLeadsCount) * 100)}% Conversion` : "Active"}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-xs sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-[#667780] mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Showroom Units</span>
              <Store className="w-4 h-4 text-[#111820]" />
            </div>
            <div className="text-2xl font-black font-heading text-[#111820]">{showroomUnitsTotal} Units</div>
            <p className="text-[11px] text-[#667780] mt-1">8 Zuboo models ready</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-between border-b border-[#E0E8EC] pb-2 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === "leads"
                  ? "bg-[#111820] text-white shadow-sm"
                  : "bg-white text-[#667780] hover:text-[#111820] hover:bg-[#E8F1F5] border border-[#E0E8EC]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Test Ride Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === "inventory"
                  ? "bg-[#111820] text-white shadow-sm"
                  : "bg-white text-[#667780] hover:text-[#111820] hover:bg-[#E8F1F5] border border-[#E0E8EC]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inventory & Stock (8 Models)</span>
            </button>

            <button
              onClick={() => setActiveTab("service")}
              className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-150 flex items-center gap-2 ${
                activeTab === "service"
                  ? "bg-[#111820] text-white shadow-sm"
                  : "bg-white text-[#667780] hover:text-[#111820] hover:bg-[#E8F1F5] border border-[#E0E8EC]"
              }`}
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Service Bay Bookings ({serviceBookings.length})</span>
            </button>
          </div>

          {/* Tab Specific Quick CTA */}
          {activeTab === "leads" && (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => exportLeadsToCSV(filteredLeads)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#111820] bg-white border border-[#E0E8EC] hover:bg-[#E8F1F5] transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-[#346C83]" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setIsAddLeadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#346C83] hover:bg-[#275365] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Walk-In Lead</span>
              </button>
            </div>
          )}

          {activeTab === "inventory" && (
            <button
              onClick={handleResetInventory}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#667780] bg-white border border-[#E0E8EC] hover:text-rose-600 hover:border-rose-200 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Factory Defaults</span>
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* TAB 1: TEST RIDE LEADS MANAGER                          */}
        {/* ======================================================== */}
        {activeTab === "leads" && (
          <div className="space-y-5">
            {/* Filter and Search Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#E0E8EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Status Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
                {["All", "New", "Contacted", "Test Ride Completed", "Converted"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setLeadFilter(status)}
                    className={`px-3 py-1.5 rounded-lg font-semibold tracking-tight transition-colors whitespace-nowrap ${
                      leadFilter === status
                        ? "bg-[#111820] text-white"
                        : "bg-[#F7F9FA] text-[#667780] hover:bg-[#E8F1F5] hover:text-[#111820]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Search name, phone, model..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] placeholder-slate-400 focus:outline-none focus:border-[#346C83] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-[#E0E8EC] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F9FA] border-b border-[#E0E8EC] text-[#667780] font-heading uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">ID / Customer</th>
                      <th className="py-3.5 px-4 font-bold">Model Requested</th>
                      <th className="py-3.5 px-4 font-bold">Preferred Slot</th>
                      <th className="py-3.5 px-4 font-bold">Showroom Notes</th>
                      <th className="py-3.5 px-4 font-bold">Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Quick Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E8EC]">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#667780]">
                          No test ride inquiries matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const waUrl = generateWhatsAppLink(lead);
                        return (
                          <tr key={lead.id} className="hover:bg-[#F7F9FA]/70 transition-colors">
                            {/* Customer info */}
                            <td className="py-4 px-4 align-top">
                              <div className="font-heading font-bold text-sm text-[#111820]">
                                {lead.customerName}
                              </div>
                              <div className="font-mono text-[11px] text-[#346C83] font-semibold">
                                {lead.phoneNumber}
                              </div>
                              <div className="text-[10px] text-[#667780] mt-0.5">
                                #{lead.id} • {lead.locationCity || "Galle"}
                              </div>
                            </td>

                            {/* Model */}
                            <td className="py-4 px-4 align-top">
                              <span className="inline-block px-2.5 py-1 rounded-md bg-[#E8F1F5] text-[#111820] font-bold text-[11px]">
                                {lead.bikeModelName}
                              </span>
                            </td>

                            {/* Date / Time */}
                            <td className="py-4 px-4 align-top text-slate-700">
                              <div className="flex items-center gap-1.5 font-medium">
                                <Calendar className="w-3.5 h-3.5 text-[#346C83]" />
                                <span>{lead.preferredDate}</span>
                              </div>
                              <div className="text-[11px] text-[#667780] mt-0.5">
                                {lead.preferredTimeSlot || "Morning"}
                              </div>
                            </td>

                            {/* Notes */}
                            <td className="py-4 px-4 align-top text-[#667780] max-w-xs">
                              <p className="line-clamp-2 text-[11px]">{lead.notes || "—"}</p>
                              <span className="text-[9px] text-slate-400 block mt-1">
                                {lead.createdAt}
                              </span>
                            </td>

                            {/* Status Selector */}
                            <td className="py-4 px-4 align-top">
                              <div className="relative inline-block">
                                <select
                                  value={lead.status}
                                  onChange={(e) =>
                                    handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)
                                  }
                                  className={`appearance-none px-3 py-1.5 pr-7 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer focus:outline-none ${
                                    lead.status === "New"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : lead.status === "Contacted"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : lead.status === "Test Ride Completed"
                                      ? "bg-purple-50 text-purple-700 border-purple-200"
                                      : lead.status === "Converted"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : "bg-slate-100 text-slate-600 border-slate-200"
                                  }`}
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Test Ride Completed">Test Ride Completed</option>
                                  <option value="Converted">Converted</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                                <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70" />
                              </div>
                            </td>

                            {/* Quick Contact Buttons */}
                            <td className="py-4 px-4 align-top text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Send WhatsApp Invitation / Confirmation"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-colors shadow-xs"
                                >
                                  <MessageSquare className="w-3 h-3" />
                                  <span>WhatsApp</span>
                                </a>

                                <a
                                  href={`tel:${lead.phoneNumber}`}
                                  title="Call Customer"
                                  className="p-1.5 rounded-lg bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#111820] transition-colors border border-[#E0E8EC]"
                                >
                                  <Phone className="w-3.5 h-3.5 text-[#346C83]" />
                                </a>

                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  title="Delete Lead"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: INVENTORY & STOCK MANAGEMENT (8 ZUBOO MODELS)     */}
        {/* ======================================================== */}
        {activeTab === "inventory" && (
          <div className="space-y-5">
            {/* Inventory Controls */}
            <div className="bg-white p-4 rounded-2xl border border-[#E0E8EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wide">
                  Showroom Fleet Management (All 8 Zuboo Models)
                </h3>
                <p className="text-xs text-[#667780]">
                  Live updates for stock statuses, provisional LKR prices, and delivery times
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Filter models..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] placeholder-slate-400 focus:outline-none focus:border-[#346C83] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Inventory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#E0E8EC] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#346C83]/40 transition-all"
                >
                  {/* Card Header & Spec */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#346C83] block">
                          {item.category}
                        </span>
                        <h4 className="font-heading font-black text-lg text-[#111820] leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[10px] text-[#667780] font-semibold">
                          Code: {item.modelCode}
                        </span>
                      </div>

                      {/* Stock Status Badge / Pill */}
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shrink-0 ${
                          item.stockStatus === "In Showroom"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.stockStatus === "Low Stock"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : item.stockStatus === "Pre-Order"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {item.stockStatus}
                      </span>
                    </div>

                    {/* Key Technical Highlights */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                      <div>
                        <span className="text-[9px] text-[#667780] uppercase block">Motor</span>
                        <span className="font-bold text-[#111820]">{item.motorPower}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#667780] uppercase block">Battery</span>
                        <span className="font-bold text-[#111820]">{item.battery}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#667780] uppercase block">Top Speed</span>
                        <span className="font-bold text-[#111820]">{item.topSpeed}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#667780] uppercase block">Range</span>
                        <span className="font-bold text-[#111820]">{item.advertisedRange}</span>
                      </div>
                    </div>

                    {/* Stock Status Selector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667780] mb-1">
                        Stock Status Toggle
                      </label>
                      <select
                        value={item.stockStatus}
                        onChange={(e) =>
                          handleUpdateStockStatus(
                            item.id,
                            e.target.value as "In Showroom" | "Pre-Order" | "Low Stock" | "Out of Stock"
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl text-xs font-bold border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] focus:outline-none focus:border-[#346C83]"
                      >
                        <option value="In Showroom">In Showroom (Ready)</option>
                        <option value="Low Stock">Low Stock (&lt; 2 units)</option>
                        <option value="Pre-Order">Pre-Order (Batch in Transit)</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>

                    {/* Provisional LKR Price Editor */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667780] mb-1">
                        Provisional Retail Price (LKR)
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#667780]">LKR</span>
                        <input
                          type="number"
                          step={5000}
                          value={item.provisionalPriceLKR}
                          onChange={(e) => handleUpdatePrice(item.id, Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#E0E8EC] bg-[#F7F9FA] text-xs font-mono font-bold text-[#111820] focus:outline-none focus:border-[#346C83]"
                        />
                      </div>
                      <div className="text-[10px] text-[#667780] mt-1">
                        Displayed as: <span className="font-bold text-[#346C83]">LKR {item.provisionalPriceLKR.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Floor Units Counter */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667780] mb-1">
                        Showroom Floor Units
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateFloorUnits(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-[#E8F1F5] hover:bg-[#d8e7ee] text-xs font-black text-[#111820] flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="font-heading font-black text-sm text-[#111820] w-6 text-center">
                          {item.showroomUnits}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateFloorUnits(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-[#E8F1F5] hover:bg-[#d8e7ee] text-xs font-black text-[#111820] flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                        <span className="text-[11px] text-[#667780] ml-1">
                          {item.showroomUnits > 0 ? "on Galle floor" : "none in bay"}
                        </span>
                      </div>
                    </div>

                    {/* Delivery Time Editor */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#667780] mb-1">
                        Delivery Timeframe
                      </label>
                      <input
                        type="text"
                        value={item.deliveryTime}
                        onChange={(e) => handleUpdateDeliveryTime(item.id, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#E0E8EC] bg-[#F7F9FA] text-[11px] text-[#111820] focus:outline-none focus:border-[#346C83]"
                        placeholder="e.g. Immediate / 5 days"
                      />
                    </div>
                  </div>

                  {/* Card Footer / Action */}
                  <div className="p-3 bg-[#F7F9FA] border-t border-[#E0E8EC] flex items-center justify-between text-[10px]">
                    <span className="text-[#667780]">Updated: {item.lastUpdated}</span>
                    <Link
                      href={`/bikes/${item.slug}`}
                      target="_blank"
                      className="text-[#346C83] hover:text-[#111820] font-bold flex items-center gap-1"
                    >
                      <span>Public Page</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: SERVICE BAY BOOKINGS TRACKER                     */}
        {/* ======================================================== */}
        {activeTab === "service" && (
          <div className="space-y-5">
            <div className="bg-white p-4 rounded-2xl border border-[#E0E8EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wide">
                  Galle Kurunduwatta After-Sales Service Bays
                </h3>
                <p className="text-xs text-[#667780]">
                  Appointments scheduled for routine maintenance, battery diagnostics, and brake services
                </p>
              </div>

              <Link
                href="/service"
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#346C83] hover:bg-[#275365] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Customer Booking Form</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E0E8EC] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7F9FA] border-b border-[#E0E8EC] text-[#667780] font-heading uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Booking ID / Customer</th>
                      <th className="py-3.5 px-4 font-bold">Vehicle / VIN</th>
                      <th className="py-3.5 px-4 font-bold">Service Package</th>
                      <th className="py-3.5 px-4 font-bold">Scheduled Slot</th>
                      <th className="py-3.5 px-4 font-bold">Notes</th>
                      <th className="py-3.5 px-4 font-bold">Bay Status</th>
                      <th className="py-3.5 px-4 font-bold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E8EC]">
                    {serviceBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-[#F7F9FA]/70 transition-colors">
                        <td className="py-4 px-4 align-top">
                          <div className="font-heading font-bold text-sm text-[#111820]">
                            {b.customerName}
                          </div>
                          <div className="font-mono text-[11px] text-[#346C83] font-semibold">
                            {b.phone}
                          </div>
                          <div className="text-[10px] text-[#667780] mt-0.5">#{b.id}</div>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <span className="font-semibold text-[#111820] block">{b.vinOrModel}</span>
                          <span className="text-[10px] text-[#667780]">Galle Registration</span>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <span className="inline-block px-2 py-1 rounded bg-[#E8F1F5] text-[#346C83] font-bold text-[11px]">
                            {b.servicePackage}
                          </span>
                        </td>

                        <td className="py-4 px-4 align-top text-slate-700">
                          <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-[#346C83]" />
                            <span>{b.preferredDate}</span>
                          </div>
                          <div className="text-[11px] text-[#667780] mt-0.5">{b.preferredTime}</div>
                        </td>

                        <td className="py-4 px-4 align-top text-[#667780] max-w-xs">
                          <p className="line-clamp-2 text-[11px]">{b.notes || "Standard checkup"}</p>
                        </td>

                        <td className="py-4 px-4 align-top">
                          <div className="relative inline-block">
                            <select
                              value={b.status}
                              onChange={(e) =>
                                handleUpdateServiceStatus(
                                  b.id,
                                  e.target.value as "Pending" | "Confirmed" | "In Bay" | "Completed"
                                )
                              }
                              className={`appearance-none px-3 py-1.5 pr-7 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer focus:outline-none ${
                                b.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : b.status === "Confirmed"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : b.status === "In Bay"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Bay">In Service Bay</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-70" />
                          </div>
                        </td>

                        <td className="py-4 px-4 align-top text-right">
                          <a
                            href={`https://wa.me/94${b.phone.replace(/^0/, "")}?text=${encodeURIComponent(
                              `Hello ${b.customerName}, this is Udan Enterprises Galle regarding your scheduled service booking (#${b.id}) for ${b.servicePackage} on ${b.preferredDate} (${b.preferredTime}). Our certified technician team is ready for your vehicle.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
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
      </main>

      {/* Add Walk-In Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E0E8EC] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0E8EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8F1F5] text-[#346C83] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111820] uppercase">
                    Add Walk-In / Phone Lead
                  </h3>
                  <p className="text-[11px] text-[#667780]">Galle Showroom Direct Entry</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWalkInLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newLeadForm.customerName}
                  onChange={(e) =>
                    setNewLeadForm({ ...newLeadForm, customerName: e.target.value })
                  }
                  placeholder="e.g. Ruwan Wickramasinghe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newLeadForm.phoneNumber}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, phoneNumber: e.target.value })
                    }
                    placeholder="07x xxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                    City / Town
                  </label>
                  <input
                    type="text"
                    value={newLeadForm.locationCity}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, locationCity: e.target.value })
                    }
                    placeholder="e.g. Galle, Hikkaduwa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                  Interested Zuboo Model
                </label>
                <select
                  value={newLeadForm.bikeModelId}
                  onChange={(e) => {
                    const selId = e.target.value;
                    const item = inventory.find((i) => i.id === selId);
                    setNewLeadForm({
                      ...newLeadForm,
                      bikeModelId: selId,
                      bikeModelName: item ? `${item.name} (${item.motorPower})` : selId,
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-semibold"
                >
                  {inventory.map((bike) => (
                    <option key={bike.id} value={bike.id}>
                      {bike.name} ({bike.motorPower} - {bike.stockStatus})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={newLeadForm.preferredDate}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, preferredDate: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                    Time Window
                  </label>
                  <select
                    value={newLeadForm.preferredTimeSlot}
                    onChange={(e) =>
                      setNewLeadForm({ ...newLeadForm, preferredTimeSlot: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                  >
                    <option value="Morning (9:30 AM)">Morning (9:30 AM)</option>
                    <option value="Morning (11:00 AM)">Morning (11:00 AM)</option>
                    <option value="Afternoon (2:30 PM)">Afternoon (2:30 PM)</option>
                    <option value="Evening (4:30 PM)">Evening (4:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#111820] uppercase tracking-wider mb-1">
                  Showroom Staff Notes
                </label>
                <textarea
                  rows={2}
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                  placeholder="e.g. Came with family, tested step-through frame, interested in monthly leasing."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#111820] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#346C83] hover:bg-[#275365] text-white font-heading font-bold uppercase tracking-wider shadow-sm"
                >
                  Save Lead to System
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
