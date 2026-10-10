"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Wrench,
  BatteryCharging,
  ShieldCheck,
  Disc,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Zap,
  ShieldAlert,
  CloudRain,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  HelpCircle,
  Car,
} from "lucide-react";
import { SERVICE_PACKAGES, TROPICAL_BATTERY_GUIDE, ServicePackage } from "@/data/services";
import { BIKE_MODELS } from "@/data/bikes";
import { BUSINESS_CONFIG } from "@/data/business";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ServicePage() {
  // Service booking form states
  const [selectedPackageId, setSelectedPackageId] = useState<string>("routine-3m");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [vinOrModel, setVinOrModel] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10)
  );
  const [preferredTime, setPreferredTime] = useState<string>("Morning (10:00 AM - 12:00 PM)");
  const [serviceNotes, setServiceNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<any | null>(null);

  // Active battery guide category
  const [activeGuideTab, setActiveGuideTab] = useState<string>("charging");

  const selectedPkg =
    SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0];

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    const bookingId = `SRV-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking = {
      id: bookingId,
      customerName,
      phone,
      vinOrModel: vinOrModel || "Zuboo Electric Bike",
      servicePackage: selectedPkg.title,
      preferredDate,
      preferredTime,
      notes: serviceNotes,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    // Store in localStorage for Admin dashboard synchronization
    try {
      const existing = localStorage.getItem("udan_service_bookings");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newBooking);
      localStorage.setItem("udan_service_bookings", JSON.stringify(list));
    } catch (err) {
      console.warn("Local storage save notice:", err);
    }

    // Attempt Firebase sync
    try {
      await addDoc(collection(db, "service_bookings"), {
        ...newBooking,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.info("Firestore live sync offline/mock mode:", err);
    }

    setIsSubmitting(false);
    setBookingConfirmed(newBooking);
  };

  const getWhatsAppServiceBookingUrl = () => {
    if (!bookingConfirmed) return "#";
    const msg = `Hello Udan Enterprises (Galle Showroom), I booked a service appointment on your portal:\n- Booking ID: #${bookingConfirmed.id}\n- Name: ${bookingConfirmed.customerName}\n- Phone: ${bookingConfirmed.phone}\n- Vehicle/VIN: ${bookingConfirmed.vinOrModel}\n- Service: ${bookingConfirmed.servicePackage}\n- Date: ${bookingConfirmed.preferredDate} (${bookingConfirmed.preferredTime})\n- Notes: ${bookingConfirmed.notes || "None"}\n\nPlease confirm my service bay reservation.`;
    return `https://wa.me/94784969652?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      <Navbar />

      <main className="pt-24 lg:pt-28 pb-20 space-y-20">
        {/* Editorial Hero Header */}
        <section className="hairline-b bg-white">
          <div className="editorial-container py-12 lg:py-16">
            <div className="max-w-4xl space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#346C83]">
                <span className="w-6 h-0.5 bg-[#346C83]" />
                <span>PHASE 04 • OFFICIAL AFTER-SALES SERVICE & CUSTOMER PORTAL</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight text-[#111820] uppercase leading-none">
                AUTHORISED <span className="text-[#346C83]">ZUBOO</span> SERVICE CENTER
              </h1>

              <p className="text-base sm:text-lg text-[#667780] leading-relaxed max-w-3xl">
                Precision engineering requires certified care. At Udan Enterprises Galle, our factory-trained
                technicians provide digital BMS battery health testing, hydraulic braking calibration, and genuine
                Zuboo parts replacement to ensure your electric mobility remains flawless in Sri Lanka's tropical climate.
              </p>

              {/* Showroom Hub Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E0E8EC]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#346C83] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                      Dedicated Service Bays
                    </span>
                    <span className="text-xs text-[#667780]">Udugama Road, Kurunduwatta, Galle</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#346C83] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                      Service Hours
                    </span>
                    <span className="text-xs text-[#667780]">Mon - Sat: 8:30 AM - 5:30 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#346C83] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                      Direct Technician Hotline
                    </span>
                    <a
                      href="tel:+94784969652"
                      className="text-xs font-bold text-[#346C83] hover:underline"
                    >
                      078 496 9652 / WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Quick Action Buttons */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <a
                  href="#booking-bay"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Service Bay Online</span>
                </a>

                <Link
                  href="/warranty"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#111820] text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 border border-[#E0E8EC]"
                >
                  <ShieldCheck className="w-4 h-4 text-[#346C83]" />
                  <span>Digital Warranty & VIN Lookup</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="#battery-guide"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#667780] hover:text-[#111820] text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 border border-[#E0E8EC]"
                >
                  <BatteryCharging className="w-4 h-4 text-emerald-600" />
                  <span>Tropical Battery Care Guide</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Service Packages Catalog */}
        <section className="editorial-container space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block">
                Official Maintenance Schedule
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase tracking-tight">
                CERTIFIED SERVICE PACKAGES
              </h2>
            </div>
            <p className="text-xs text-[#667780] max-w-md">
              All services performed at our Galle Kurunduwatta showroom using computerized diagnostic scanners,
              genuine factory torque settings, and digital inspection certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  selectedPackageId === pkg.id
                    ? "border-[#346C83] shadow-md ring-2 ring-[#346C83]/20"
                    : "border-[#E0E8EC] hover:border-slate-300 shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    {pkg.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {pkg.badge}
                      </span>
                    )}
                    <span className="text-[11px] text-[#667780] font-medium ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{pkg.durationMinutes} mins</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-lg text-[#111820] leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-[#667780] mt-1">{pkg.subtitle}</p>
                  </div>

                  <div className="pt-2 pb-1 border-y border-[#E0E8EC]/80">
                    <span className="text-[11px] text-[#667780] uppercase block">Price</span>
                    <span className="font-heading font-black text-lg text-[#346C83]">
                      {pkg.formattedPrice}
                    </span>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                      Scope of Work:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pkg.checklist.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPackageId(pkg.id);
                      document.getElementById("booking-bay")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`w-full py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                      selectedPackageId === pkg.id
                        ? "bg-[#346C83] text-white"
                        : "bg-[#F7F9FA] hover:bg-[#E8F1F5] text-[#111820] border border-[#E0E8EC]"
                    }`}
                  >
                    <span>{selectedPackageId === pkg.id ? "Selected Package" : "Select & Book"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Online Service Booking Bay */}
        <section id="booking-bay" className="scroll-mt-28 editorial-container">
          <div className="bg-white rounded-3xl border border-[#E0E8EC] shadow-md p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form Left Side Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block">
                    Galle Kurunduwatta Bay Reservation
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820] uppercase tracking-tight">
                    ONLINE SERVICE BOOKING
                  </h2>
                  <p className="text-xs text-[#667780] leading-relaxed">
                    Reserve an express service slot to minimize downtime. Your bike will be serviced by our
                    certified technicians with dedicated diagnostic equipment on Udugama Road.
                  </p>
                </div>

                {/* Selected Package Callout */}
                <div className="p-4 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#346C83]">
                    Currently Selected Service:
                  </span>
                  <div className="font-heading font-bold text-sm text-[#111820]">
                    {selectedPkg.title}
                  </div>
                  <div className="text-xs text-[#667780] flex items-center justify-between">
                    <span>{selectedPkg.formattedPrice}</span>
                    <span>Approx. {selectedPkg.durationMinutes} Minutes</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#E8F1F5] border border-[#346C83]/20 space-y-2 text-xs text-[#111820]">
                  <div className="flex items-center gap-2 font-bold text-[#346C83]">
                    <Sparkles className="w-4 h-4" />
                    <span>Free Under Official Warranty</span>
                  </div>
                  <p className="text-[11px] text-[#667780] leading-relaxed">
                    Routine inspections and battery BMS calibration are 100% complimentary during your first
                    2-year official warranty period. Bring your Digital Warranty Card or VIN.
                  </p>
                </div>

                <div className="text-xs text-[#667780] space-y-1 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Same-day turnaround for routine checkups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Genuine Zuboo replacement brake pads & battery cells in stock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp service updates directly from the master technician</span>
                  </div>
                </div>
              </div>

              {/* Form Right Side */}
              <div className="lg:col-span-7">
                {!bookingConfirmed ? (
                  <form onSubmit={handleServiceSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                        Selected Service Package
                      </label>
                      <select
                        value={selectedPackageId}
                        onChange={(e) => setSelectedPackageId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs font-semibold text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white"
                      >
                        {SERVICE_PACKAGES.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.title} ({pkg.formattedPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Kavindu Perera"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Phone Number (Sri Lanka) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="07x xxxxxxx"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Zuboo Model / VIN Number
                        </label>
                        <input
                          type="text"
                          value={vinOrModel}
                          onChange={(e) => setVinOrModel(e.target.value)}
                          placeholder="e.g. Zuboo GT or ZB-2026-GT-042"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Preferred Appointment Date
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().slice(0, 10)}
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                        Preferred Time Slot
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-semibold"
                      >
                        <option value="Morning (8:30 AM - 10:30 AM)">Morning (8:30 AM - 10:30 AM)</option>
                        <option value="Morning (10:30 AM - 12:30 PM)">Morning (10:30 AM - 12:30 PM)</option>
                        <option value="Afternoon (1:30 PM - 3:30 PM)">Afternoon (1:30 PM - 3:30 PM)</option>
                        <option value="Late Afternoon (3:30 PM - 5:30 PM)">Late Afternoon (3:30 PM - 5:30 PM)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                        Specific Issue, Squeaks, or Symptoms (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={serviceNotes}
                        onChange={(e) => setServiceNotes(e.target.value)}
                        placeholder="e.g. Front brake disc makes a light squeak when coming to complete stop; battery capacity seems slightly lower after 3 months of riding."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>{isSubmitting ? "Processing Reservation..." : "Confirm Service Reservation"}</span>
                    </button>
                  </form>
                ) : (
                  <div className="bg-[#F7F9FA] rounded-2xl p-6 sm:p-8 border border-emerald-200 space-y-5 animate-in fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-heading font-black text-xl text-[#111820] uppercase">
                          SERVICE APPOINTMENT RESERVED!
                        </h3>
                        <p className="text-xs text-[#667780]">
                          Booking Reference: <span className="font-mono font-bold text-[#111820]">#{bookingConfirmed.id}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white border border-[#E0E8EC] text-xs">
                      <div>
                        <span className="text-[10px] text-[#667780] uppercase block">Customer Name</span>
                        <span className="font-bold text-[#111820]">{bookingConfirmed.customerName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#667780] uppercase block">Phone</span>
                        <span className="font-bold text-[#111820]">{bookingConfirmed.phone}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#667780] uppercase block">Service Package</span>
                        <span className="font-bold text-[#346C83]">{bookingConfirmed.servicePackage}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#667780] uppercase block">Appointment Slot</span>
                        <span className="font-bold text-[#111820]">
                          {bookingConfirmed.preferredDate} ({bookingConfirmed.preferredTime})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#667780] leading-relaxed">
                      Our Galle Kurunduwatta workshop team has logged your appointment. Click below to send an instant
                      dispatch notification directly to our WhatsApp service coordinator.
                    </p>

                    <div className="flex items-center gap-3 flex-wrap pt-2">
                      <a
                        href={getWhatsAppServiceBookingUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send WhatsApp Confirmation</span>
                      </a>

                      <button
                        onClick={() => setBookingConfirmed(null)}
                        className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#111820] font-bold text-xs border border-[#E0E8EC] transition-colors"
                      >
                        Book Another Service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Battery Health & Maintenance Guide for Sri Lanka's Tropical Climate */}
        <section id="battery-guide" className="scroll-mt-28 editorial-container space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block">
                Official Engineering Advisory
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase tracking-tight">
                LITHIUM BATTERY HEALTH GUIDE
              </h2>
            </div>
            <p className="text-xs text-[#667780] max-w-md">
              Formulated specifically for Sri Lanka's high ambient heat, coastal salt moisture, and monsoon rains in Galle.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E0E8EC]">
            {TROPICAL_BATTERY_GUIDE.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveGuideTab(cat.category)}
                className={`px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeGuideTab === cat.category
                    ? "bg-[#111820] text-white shadow-sm"
                    : "bg-white text-[#667780] hover:text-[#111820] hover:bg-[#E8F1F5] border border-[#E0E8EC]"
                }`}
              >
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          {(() => {
            const currentCat =
              TROPICAL_BATTERY_GUIDE.find((c) => c.category === activeGuideTab) ||
              TROPICAL_BATTERY_GUIDE[0];
            return (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white border border-[#E0E8EC] flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-heading font-black text-xl text-[#111820]">
                      {currentCat.title}
                    </h3>
                    <p className="text-xs text-[#667780] mt-1">{currentCat.summary}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#E8F1F5] text-[#346C83] text-xs font-extrabold uppercase tracking-wider">
                    {currentCat.tips.length} Key Rules
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {currentCat.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-[#E0E8EC] shadow-xs space-y-3 hover:border-[#346C83]/30 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-bold text-[#346C83]">
                          RULE {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                            tip.importance === "Critical"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : tip.importance === "Recommended"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          }`}
                        >
                          {tip.importance}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-base text-[#111820]">
                        {tip.title}
                      </h4>

                      <p className="text-xs text-[#667780] leading-relaxed">
                        {tip.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </section>

        {/* Section 5: Digital Warranty Promo Callout */}
        <section className="editorial-container">
          <div className="bg-[#111820] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#346C83] block">
                Zuboo Digital Registry
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
                LOOKUP YOUR VIN & DIGITAL WARRANTY
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every Zuboo electric bicycle and scooter delivered through Udan Enterprises Galle is registered
                with an official VIN certificate covering the high-torque motor, high-density lithium battery,
                and reinforced frame.
              </p>
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <Link
                  href="/warranty"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#346C83] hover:bg-[#28576b] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Open Digital Warranty Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises,%20I%20have%20a%20question%20regarding%20my%20Zuboo%20warranty."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-white/10"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Warranty Support</span>
                </a>
              </div>
            </div>

            {/* Decorative background mark */}
            <div className="absolute right-4 bottom-2 opacity-5 pointer-events-none text-9xl font-black font-heading uppercase text-white select-none">
              ZUBOO
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
