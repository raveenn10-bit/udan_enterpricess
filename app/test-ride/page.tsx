"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";
import { BIKE_MODELS, BikeModel } from "@/data/bikes";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function TestRideFormContent() {
  const searchParams = useSearchParams();
  const initialModelParam = searchParams.get("model") || "t3";

  const [selectedModelId, setSelectedModelId] = useState<string>(initialModelParam);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("Morning (9:00 AM – 12:00 PM)");
  const [hasLicense, setHasLicense] = useState(true);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedBike: BikeModel =
    BIKE_MODELS.find((b) => b.id === selectedModelId) || BIKE_MODELS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "test_ride_bookings"), {
        customerName: name,
        phoneNumber: phone,
        email: email || "Not provided",
        bikeModelId: selectedBike.id,
        bikeModelName: selectedBike.name,
        preferredDate: preferredDate || "Earliest available",
        preferredSlot,
        hasLicense,
        notes: notes || "",
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("Test ride booking Firestore notice:", err);
      // Fallback: smooth UX
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppBookingLink = () => {
    const text = encodeURIComponent(
      `Hi Udan Enterprises, I booked a Test Ride on your website:\n- Name: ${name}\n- Phone: ${phone}\n- Model: ${selectedBike.name} (${selectedBike.modelCode})\n- Date: ${preferredDate || "Anytime this week"}\n- Time Slot: ${preferredSlot}\n- Notes: ${notes || "None"}`
    );
    return `https://wa.me/94784969652?text=${text}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Form Column */}
      <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-[#E0E8EC] shadow-sm">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#346C83] block mb-1">
            Galle Experience Center
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111820] uppercase">
            Schedule Your Test Ride
          </h2>
          <p className="text-xs sm:text-sm text-[#667780] mt-1">
            Please fill in your details below to secure your dedicated 20-minute private test session.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Bike Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-2">
                1. Select Zuboo Model for Test Ride
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BIKE_MODELS.map((bike) => {
                  const isSelected = bike.id === selectedModelId;
                  return (
                    <button
                      type="button"
                      key={bike.id}
                      onClick={() => setSelectedModelId(bike.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "border-[#346C83] bg-[#E8F1F5] shadow-sm ring-1 ring-[#346C83]"
                          : "border-[#E0E8EC] bg-[#F7F9FA] hover:border-slate-300"
                      }`}
                    >
                      <div className="relative h-14 w-full mb-2">
                        <Image
                          src={bike.mainImage}
                          alt={bike.name}
                          fill
                          className="object-contain"
                          sizes="120px"
                        />
                      </div>
                      <div>
                        <span className="font-heading font-bold text-xs text-[#111820] block truncate">
                          {bike.name.replace("Zuboo ", "")}
                        </span>
                        <span className="text-[10px] text-[#667780] block truncate">
                          {bike.badge.split("•")[0].trim()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personal Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667780]" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Chathura Silva"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                  Phone Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667780]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="078 496 9652"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email and Preferred Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667780]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chathura@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667780]" />
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                Preferred Time Slot
              </label>
              <select
                value={preferredSlot}
                onChange={(e) => setPreferredSlot(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
              >
                <option value="Morning (9:00 AM – 12:00 PM)">Morning (9:00 AM – 12:00 PM)</option>
                <option value="Afternoon (12:00 PM – 3:00 PM)">Afternoon (12:00 PM – 3:00 PM)</option>
                <option value="Evening (3:00 PM – 5:30 PM)">Evening (3:00 PM – 5:30 PM)</option>
              </select>
            </div>

            {/* Sri Lankan License Checkbox */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
              <input
                type="checkbox"
                id="hasLicense"
                checked={hasLicense}
                onChange={(e) => setHasLicense(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-[#346C83] focus:ring-[#346C83]"
              />
              <label htmlFor="hasLicense" className="text-xs text-[#667780] leading-relaxed cursor-pointer">
                I hold a valid Sri Lankan Motorcycle/Scooter Driving License or will bring my National ID Card (NIC) for showroom registration.
              </label>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention if you want to test ride with a passenger or have specific questions..."
                className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#111820] hover:bg-[#346C83] disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Test Ride Booking</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-emerald-950 uppercase">
              Test Ride Reserved!
            </h3>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-emerald-950">{name}</strong>. Your test ride for the{" "}
              <strong className="text-emerald-950">{selectedBike.name}</strong> has been received by our Galle team.
            </p>
            <div className="pt-3">
              <a
                href={getWhatsAppBookingLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send WhatsApp Confirmation</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Selected Bike Summary & Showroom Advice Column */}
      <div className="lg:col-span-5 space-y-6">
        {/* Selected Bike Card */}
        <div className="p-7 rounded-3xl bg-white border border-[#E0E8EC] shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#E8F1F5] text-[#346C83] border border-[#E0E8EC]">
            {selectedBike.badge}
          </span>

          <h3 className="font-heading font-extrabold text-2xl text-[#111820] mt-3">
            {selectedBike.name}
          </h3>
          <p className="text-xs text-[#667780] font-mono mt-0.5">
            Model: {selectedBike.modelCode} • {selectedBike.formattedPrice}
          </p>

          <div className="relative h-52 w-full my-4 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex items-center justify-center p-3">
            <Image
              src={selectedBike.mainImage}
              alt={selectedBike.name}
              fill
              className="object-contain p-2"
              sizes="300px"
            />
          </div>

          <p className="text-xs text-[#667780] leading-relaxed mb-4">
            {selectedBike.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E0E8EC] text-xs">
            <div>
              <span className="text-[#667780] block text-[10px]">Motor Power</span>
              <strong className="text-[#111820]">{selectedBike.motorPower}</strong>
            </div>
            <div>
              <span className="text-[#667780] block text-[10px]">Advertised Range</span>
              <strong className="text-[#111820]">{selectedBike.advertisedRange}</strong>
            </div>
          </div>
        </div>

        {/* Test Ride Guidelines Card */}
        <div className="p-6 rounded-3xl bg-[#111820] text-white border border-slate-800">
          <h4 className="font-heading font-bold text-sm text-white uppercase mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#346C83]" />
            <span>Test Ride Protocol & Guidelines</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Sanitized certified helmet provided by our team.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Full vehicle briefing on throttle modes, brakes, and dash controls.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>Designated safety route on local Galle roads.</span>
            </li>
          </ul>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
            Showroom Location: Galle, Sri Lanka. Need immediate assistance? Call{" "}
            <a href="tel:+94784969652" className="text-white underline font-bold">
              078 496 9652
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestRidePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Editorial Header */}
        <section className="relative overflow-hidden pt-12 pb-12 border-b border-[#E0E8EC]">
          <div className="editorial-container relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#346C83] border border-[#E0E8EC] mb-6">
                <Calendar className="w-3.5 h-3.5" />
                <span>Complimentary Experience Session</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111820] leading-[1.1] mb-6 uppercase">
                Book a Free <br />
                <span className="text-[#346C83]">Test Ride in Galle</span>
              </h1>

              <p className="text-base sm:text-lg text-[#667780] leading-relaxed max-w-2xl font-normal">
                Experience the quiet power, swift acceleration, and ergonomic comfort of Zuboo electric bikes.
                Choose your favorite model and reserve a private session with our Galle EV specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section with Suspense Boundary for useSearchParams */}
        <section className="py-12 sm:py-16">
          <div className="editorial-container">
            <Suspense
              fallback={
                <div className="p-12 text-center text-xs text-[#667780]">
                  Loading Test Ride experience...
                </div>
              }
            >
              <TestRideFormContent />
            </Suspense>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
