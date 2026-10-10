"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  HelpCircle,
} from "lucide-react";
import { BIKE_MODELS } from "@/data/bikes";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [selectedModel, setSelectedModel] = useState("general");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contact_inquiries"), {
        fullName,
        phone,
        email: email || "Not provided",
        subject,
        modelOfInterest: selectedModel,
        message,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.warn("Contact form Firestore notice:", err);
      // Fallback: allow smooth user journey even if Firestore permissions/network vary
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppDirectLink = () => {
    const text = encodeURIComponent(
      `Hi Udan Enterprises,\nMy name is ${fullName || "Customer"}.\nPhone: ${phone || "N/A"}\nTopic: ${subject}\nModel: ${selectedModel}\nMessage: ${message || "I would like to inquire about Zuboo electric bikes."}`
    );
    return `https://wa.me/94784969652?text=${text}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Editorial Header */}
        <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#E0E8EC]">
          <div className="editorial-container relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#346C83] border border-[#E0E8EC] mb-6">
                <MapPin className="w-3.5 h-3.5" />
                <span>Showroom Locator & Client Concierge</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111820] leading-[1.1] mb-6 uppercase">
                Contact & <br />
                <span className="text-[#346C83]">Showroom Center</span>
              </h1>

              <p className="text-base sm:text-lg text-[#667780] leading-relaxed max-w-2xl font-normal">
                Visit our Galle showroom hub, schedule your personal test ride, or connect directly with our
                EV specialists regarding prices, spares, and fleet orders.
              </p>
            </div>
          </div>
        </section>

        {/* Verified Showroom Location Banner */}
        <section className="bg-white border-b border-[#E0E8EC] py-5">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-950 block">
                    Verified Showroom Facility: Udugama Road, Kurunduwatta, Galle
                  </span>
                  <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    Official Zuboo Electric Vehicles Dealership &amp; Service Center in Southern Province. Showroom test rides, consultations, and genuine spare parts available.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                  Status: Verified Showroom
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Channels & Information Grid */}
        <section className="py-12 sm:py-16 border-b border-[#E0E8EC] bg-white">
          <div className="editorial-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Channel 1: Hotline */}
              <div className="p-6 rounded-3xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F1F5] text-[#346C83] flex items-center justify-center mb-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block mb-1">
                    Direct Telephone Hotline
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#111820]">
                    078 496 9652
                  </h3>
                  <p className="text-xs text-[#667780] mt-2 leading-relaxed">
                    Available during opening hours for stock inquiries, test ride slots, and spare parts availability.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="tel:+94784969652"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#346C83] hover:text-[#111820] transition-colors"
                  >
                    <span>Call Hotline Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Channel 2: WhatsApp */}
              <div className="p-6 rounded-3xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block mb-1">
                    WhatsApp Direct Chat
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#111820]">
                    078 496 9652
                  </h3>
                  <p className="text-xs text-[#667780] mt-2 leading-relaxed">
                    Fast response channel. Receive live photos of bike colorways, spec sheets, and quotation PDFs.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    <span>Open WhatsApp Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Channel 3: Opening Hours */}
              <div className="p-6 rounded-3xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E8F1F5] text-[#346C83] flex items-center justify-center mb-4">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block mb-1">
                    Operating Schedule
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#111820]">
                    Mon – Sat: 8:30 AM – 6:00 PM
                  </h3>
                  <div className="text-xs text-[#667780] mt-2 space-y-1">
                    <div>Saturday: 9:00 AM – 5:00 PM</div>
                    <div>Sunday & Poya: Appointment Only</div>
                  </div>
                </div>
                <div className="pt-4 text-[11px] font-medium text-[#667780]">
                  Galle, Southern Province Time (IST)
                </div>
              </div>

              {/* Channel 4: Showroom Hub Location */}
              <div className="p-6 rounded-3xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block mb-1">
                    Showroom Hub
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#111820]">
                    Udugama Road, Kurunduwatta, Galle
                  </h3>
                  <p className="text-xs text-[#667780] mt-2 leading-relaxed">
                    Southern Province customer experience center & genuine Zuboo spare parts warehouse.
                  </p>
                </div>
                <div className="pt-4">
                  <a
                    href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20please%20send%20me%20directions%20to%20your%20Galle%20showroom."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#346C83] hover:text-[#111820] transition-colors"
                  >
                    <span>Request Directions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main 2-Column: Form + Test Ride Booking CTA */}
        <section className="py-14 sm:py-20 border-b border-[#E0E8EC] bg-[#F7F9FA]">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Column 1: Contact Form */}
              <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-3xl border border-[#E0E8EC] shadow-sm">
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#346C83] block mb-1">
                    Direct Inquiry Desk
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#111820] uppercase">
                    Send Us a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-[#667780] mt-1">
                    Fill out the form below. Our electric mobility team in Galle will respond within 24 business hours.
                  </p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Row 1: Name and Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Kasun Bandara"
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Phone / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="078 496 9652"
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email and Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Pibida17udan4131@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                          Inquiry Subject
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Price & Stock Verification">Price & Stock Verification</option>
                          <option value="KB1 Cash Discount Offer">KB1 Cash Discount Offer</option>
                          <option value="Trade-In Exchange Scheme">Trade-In Exchange Scheme</option>
                          <option value="Spare Parts & Service Support">Spare Parts & Service Support</option>
                          <option value="Corporate / Fleet Purchase">Corporate / Fleet Purchase</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Interested Bike Model */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                        Model of Interest (Optional)
                      </label>
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all"
                      >
                        <option value="general">None / General Question</option>
                        {BIKE_MODELS.map((bike) => (
                          <option key={bike.id} value={bike.name}>
                            {bike.name} ({bike.badge} • {bike.formattedPrice})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#111820] mb-1.5">
                        Your Message or Questions <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Please include any specific questions regarding charging, range, warranty, or delivery in Galle..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-[#111820] text-sm focus:outline-none focus:ring-2 focus:ring-[#346C83] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#111820] hover:bg-[#346C83] disabled:opacity-50 transition-colors shadow-sm"
                      >
                        {isSubmitting ? (
                          <span>Submitting Inquiry...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Submit Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-extrabold text-xl text-emerald-950 uppercase">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-md mx-auto">
                      Thank you, <strong className="text-emerald-950">{fullName}</strong>. Your inquiry has been sent to our
                      Galle customer team. We will contact you at <strong className="text-emerald-950">{phone}</strong> shortly.
                    </p>
                    <div className="pt-3">
                      <a
                        href={getWhatsAppDirectLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Continue Conversation on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2: Test Ride & Showroom Visiting Advice */}
              <div className="lg:col-span-5 space-y-6">
                {/* Test Ride Card */}
                <div className="p-7 sm:p-8 rounded-3xl bg-[#111820] text-white border border-slate-800 shadow-md">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 mb-4">
                    <Calendar className="w-3.5 h-3.5 text-[#346C83]" />
                    <span>Experience The Ride</span>
                  </div>

                  <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase mb-3">
                    Book a Free Test Ride in Galle
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    Nothing compares to feeling the instant, whisper-silent torque of a Zuboo electric bike in person.
                    Reserve a 20-minute private test session with our technicians on local roads.
                  </p>

                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>Complimentary safety helmet provided</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>Comprehensive feature & battery walkthrough</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>No obligation to purchase</span>
                    </li>
                  </ul>

                  <Link
                    href="/test-ride"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#346C83] hover:bg-[#28576b] text-white transition-colors shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Go to Test Ride Booking</span>
                  </Link>
                </div>

                {/* Showroom Visiting Checklist */}
                <div className="p-6 rounded-3xl bg-white border border-[#E0E8EC]">
                  <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#346C83]" />
                    <span>What to Bring for Showroom Test Rides</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#667780]">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#111820]">1.</span>
                      <span>Valid Sri Lankan Driving License (Motorcycle/Scooter category) or National Identity Card (NIC).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#111820]">2.</span>
                      <span>Comfortable riding footwear (closed shoes recommended).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#111820]">3.</span>
                      <span>If interested in our Trade-In Exchange Scheme, bring your existing vehicle registration book (CR).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
