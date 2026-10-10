"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BikeModel } from "@/data/bikes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestRideModal from "@/components/TestRideModal";
import LoanCalculator from "@/components/LoanCalculator";
import {
  Zap,
  Battery,
  Gauge,
  Shield,
  ShieldCheck,
  Calendar,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Info,
  Clock,
  Sliders,
  Eye,
  Phone,
  Sparkles,
  Layers,
  CircleDot,
  Wrench,
  AlertTriangle,
} from "lucide-react";

interface BikeDetailViewProps {
  bike: BikeModel;
  relatedBikes: BikeModel[];
}

export default function BikeDetailView({ bike, relatedBikes }: BikeDetailViewProps) {
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  const [selectedColorImage, setSelectedColorImage] = useState<string>(
    bike.colors?.[0]?.image || bike.mainImage
  );
  const [selectedColorName, setSelectedColorName] = useState<string>(
    bike.colors?.[0]?.name || "Default Finish"
  );

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hi Udan Enterprises, I would like to inquire about the ${bike.name} (${bike.modelCode}) advertised at ${bike.formattedPrice}.\n\nCould you please confirm showroom availability and test ride scheduling at your Galle location?`
    );
  };

  const whatsAppUrl = `https://wa.me/94784969652?text=${getWhatsAppMessage()}`;

  const specRows = [
    {
      label: "Motor Power & Type",
      value: bike.motorPower,
      icon: Zap,
      detail: "Brushless DC high-torque hub motor with electronic controller",
    },
    {
      label: "Battery Pack & Voltage",
      value: bike.battery,
      icon: Battery,
      detail: "High-density pack with intelligent BMS thermal management",
    },
    {
      label: "Top Speed",
      value: bike.topSpeed,
      icon: Gauge,
      detail: "Multi-speed electronic mode selector with speed governor",
    },
    {
      label: "Advertised Single-Charge Range",
      value: bike.advertisedRange,
      icon: CircleDot,
      detail: "Tested under uniform test parameters; real-world conditions vary",
    },
    {
      label: "Dimensions (L × W × H)",
      value: bike.dimensions || "1780 × 720 × 1100 mm (Approx.)",
      icon: Sliders,
      detail: "Ergonomic chassis geometry engineered for island urban roads",
    },
    {
      label: "Braking System",
      value: bike.brakes,
      icon: Shield,
      detail: "High-response braking with electronic motor cut-off assist",
    },
    {
      label: "Suspension Architecture",
      value: bike.suspension || "Front hydraulic telescopic fork & dual rear shock absorbers",
      icon: Layers,
      detail: "Dual-stage damping for high pothole impact absorption",
    },
    {
      label: "Tires & Road Contact",
      value: bike.tires || "Heavy-duty tubeless tires with alloy rims",
      icon: CircleDot,
      detail: "Puncture-resistant tubeless road tread pattern",
    },
    {
      label: "Cockpit Instrument Display",
      value: bike.display,
      icon: Eye,
      detail: "High-contrast digital readout showing speed, battery SOC & mode",
    },
    {
      label: "Charging Duration",
      value: bike.chargingTime || "4 - 8 hours (Standard 230V domestic wall outlet)",
      icon: Clock,
      detail: "Smart charger with auto-cutoff against overvoltage and surges",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820]">
      {/* Sticky Editorial Navbar */}
      <Navbar onOpenTestRide={() => setTestRideModalOpen(true)} />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-[#E0E8EC] py-3.5">
          <div className="editorial-container">
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667780]">
              <Link href="/" className="hover:text-[#111820] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#667780]/60" />
              <Link href="/bikes" className="hover:text-[#111820] transition-colors">
                Bikes Fleet
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#667780]/60" />
              <span className="text-[#346C83]">{bike.name}</span>
            </nav>
          </div>
        </div>

        {/* Provisional Status Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 py-2.5 px-4 text-center">
          <div className="editorial-container flex flex-wrap items-center justify-center gap-2 text-xs text-amber-950 font-medium">
            <Info className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              <strong>Showroom Advisory:</strong> Specifications &amp; price ({bike.formattedPrice}) are provisional transcriptions from promotional materials and will be confirmed upon showroom inspection in Galle.
            </span>
          </div>
        </div>

        {/* High-Impact Model Hero Section */}
        <section className="py-10 lg:py-16 bg-white border-b border-[#E0E8EC]">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Visual Showcase & Color Picker */}
              <div className="lg:col-span-7 flex flex-col items-center">
                {/* Main Hero Image Canvas */}
                <div className="relative w-full aspect-[4/3] max-w-[620px] rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] p-6 sm:p-10 flex items-center justify-center overflow-hidden shadow-sm group">
                  {/* Subtle pedestal glow */}
                  <div className="absolute inset-0 bg-radial-gradient from-[#346C83]/5 via-transparent to-transparent pointer-events-none" />

                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={selectedColorImage}
                      alt={`${bike.name} - ${selectedColorName}`}
                      fill
                      priority
                      className="object-contain drop-shadow-md"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                  </div>

                  {/* Watermark / Model code */}
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono tracking-widest text-[#667780]/60 uppercase">
                    {bike.modelCode}
                  </div>
                </div>

                {/* Interactive Color Switcher (e.g. for T3) */}
                {bike.colors && bike.colors.length > 0 && (
                  <div className="mt-5 w-full max-w-[620px] p-3 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#667780] uppercase tracking-wider text-[10px]">
                        Colorway:
                      </span>
                      <span className="font-semibold text-[#111820]">{selectedColorName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {bike.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedColorImage(c.image);
                            setSelectedColorName(c.name);
                          }}
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            selectedColorImage === c.image
                              ? "border-[#346C83] ring-2 ring-[#346C83]/30 scale-110"
                              : "border-slate-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          aria-label={`Select ${c.name} color`}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Model Details, Pricing & Call-to-Actions */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                {/* Category & Badge */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-[#346C83] bg-[#E8F1F5] border border-[#346C83]/20">
                    {bike.category}
                  </span>
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#667780] bg-[#F7F9FA] border border-[#E0E8EC]">
                    {bike.modelCode}
                  </span>
                </div>

                {/* Model Title */}
                <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820] leading-[1.08]">
                  {bike.name}
                </h1>

                {/* Tagline */}
                <p className="mt-2 text-base sm:text-lg font-medium text-[#346C83]">
                  {bike.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-xs sm:text-sm text-[#667780] leading-relaxed">
                  {bike.description}
                </p>

                {/* Price Display Card with Provisional Indicator */}
                <div className="mt-6 p-5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#667780]">
                      Advertised Promotional Price
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      <span>Provisional</span>
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111820] tracking-tight">
                      {bike.formattedPrice}
                    </span>
                    <span className="text-xs text-[#667780] font-medium">
                      (Pending Showroom Arrival Confirmation)
                    </span>
                  </div>

                  <p className="text-[11px] text-[#667780] mt-2 leading-relaxed border-t border-[#E0E8EC] pt-2">
                    * Final retail price may adjust depending on Sri Lanka customs tariffs, freight, and optional battery chemistry configurations. Contact our Galle showroom for reserved priority quotas.
                  </p>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {/* Book Test Ride Button */}
                  <button
                    type="button"
                    onClick={() => setTestRideModalOpen(true)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#111820] hover:bg-[#346C83] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book a Test Ride</span>
                  </button>

                  {/* Direct WhatsApp Button */}
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold uppercase tracking-wider border border-[#25D366]/30 transition-all duration-200"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                {/* Showroom Hotline Strip */}
                <div className="mt-4 flex items-center justify-between text-xs text-[#667780] px-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Official Galle Showroom Inspection</span>
                  </span>
                  <a
                    href="tel:0784969652"
                    className="font-bold text-[#111820] hover:text-[#346C83] flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Hotline: 078 496 9652</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Stat Automotive Metrics Ribbon */}
        <section className="bg-[#111820] text-white py-8 border-b border-[#111820]">
          <div className="editorial-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="pt-4 md:pt-0 md:px-4">
                <span className="text-[10px] uppercase font-bold text-[#346C83] tracking-widest block mb-1">
                  Motor Power
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                  {bike.motorPower.split(" ")[0]}
                </span>
                <span className="text-xs text-[#A0B0B8] block mt-0.5">
                  High-Torque Hub Unit
                </span>
              </div>

              <div className="pt-4 md:pt-0 md:px-4">
                <span className="text-[10px] uppercase font-bold text-[#346C83] tracking-widest block mb-1">
                  Advertised Range
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-emerald-400">
                  {bike.advertisedRange}
                </span>
                <span className="text-xs text-[#A0B0B8] block mt-0.5">
                  Single Full Charge
                </span>
              </div>

              <div className="pt-4 md:pt-0 md:px-4">
                <span className="text-[10px] uppercase font-bold text-[#346C83] tracking-widest block mb-1">
                  Top Speed
                </span>
                <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
                  {bike.topSpeed.split(" ")[0]} km/h
                </span>
                <span className="text-xs text-[#A0B0B8] block mt-0.5">
                  Electronic Speed Governed
                </span>
              </div>

              <div className="pt-4 md:pt-0 md:px-4">
                <span className="text-[10px] uppercase font-bold text-[#346C83] tracking-widest block mb-1">
                  Battery Setup
                </span>
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight truncate block">
                  {bike.battery.split(" ")[0]}
                </span>
                <span className="text-xs text-[#A0B0B8] block mt-0.5">
                  230V Standard Wall Charge
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Full Technical Specifications Table */}
        <section id="specifications" className="py-16 lg:py-20 bg-[#F7F9FA] border-b border-[#E0E8EC]">
          <div className="editorial-container">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-2">
                <span className="w-6 h-0.5 bg-[#346C83]" />
                <span>PRECISION ENGINEERING SPECIFICATIONS</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111820]">
                TECHNICAL DATA SHEET
              </h2>
              <p className="mt-2 text-sm text-[#667780]">
                Comprehensive factory specifications for the {bike.name} ({bike.modelCode}).
                All parameters represent advertised engineering benchmarks.
              </p>
            </div>

            {/* Specifications Table */}
            <div className="bg-white rounded-xl border border-[#E0E8EC] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#111820] text-white uppercase text-[10px] tracking-wider">
                      <th className="py-4 px-6 font-bold w-1/3">Specification Parameter</th>
                      <th className="py-4 px-6 font-bold w-1/3">Factory Rated Value</th>
                      <th className="py-4 px-6 font-bold w-1/3 hidden md:table-cell">Engineering Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E8EC]">
                    {specRows.map((row, idx) => {
                      const Icon = row.icon;
                      return (
                        <tr
                          key={row.label}
                          className={idx % 2 === 0 ? "bg-white" : "bg-[#F7F9FA]"}
                        >
                          <td className="py-4 px-6 font-medium text-[#111820] flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#E8F1F5] text-[#346C83] shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-xs sm:text-sm">{row.label}</span>
                          </td>
                          <td className="py-4 px-6 font-bold text-[#111820] text-xs sm:text-sm">
                            {row.value}
                          </td>
                          <td className="py-4 px-6 text-xs text-[#667780] hidden md:table-cell">
                            {row.detail}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Model Features Highlights List */}
            <div className="mt-12 bg-white rounded-xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-[#111820] mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#346C83]" />
                <span>Standard Features &amp; Factory Equipment</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bike.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-[#111820] font-medium leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Warranty Breakdown Section */}
        <section className="py-16 lg:py-20 bg-white border-b border-[#E0E8EC]">
          <div className="editorial-container">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-2">
                <span className="w-6 h-0.5 bg-[#346C83]" />
                <span>OFFICIAL WARRANTY ASSURANCE</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111820]">
                WARRANTY &amp; AFTER-SALES SUPPORT
              </h2>
              <p className="mt-2 text-sm text-[#667780]">
                Every Zuboo motorcycle is backed by factory limited warranties and comprehensive dealership technical servicing at Udan Enterprises Galle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Motor & Battery Warranty Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83] mb-5">
                    <Battery className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#346C83]">
                    Powertrain Protection
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#111820] mt-1">
                    Motor &amp; Battery Warranty
                  </h3>
                  <div className="mt-4 inline-block px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm">
                    {bike.warranty.batteryAndMotor}
                  </div>
                  <p className="text-xs sm:text-sm text-[#667780] mt-4 leading-relaxed">
                    Covers manufacturing defects in the brushless hub motor core, electronic controller unit, and high-capacity battery pack assembly. Maintained by certified technicians using OEM diagnostic equipment.
                  </p>
                </div>

                <ul className="mt-6 pt-6 border-t border-[#E0E8EC] space-y-2 text-xs text-[#111820]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full electrical diagnostic check during scheduled service</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct replacement support for battery cell irregularities</span>
                  </li>
                </ul>
              </div>

              {/* Chassis & Structural Warranty Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83] mb-5">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#346C83]">
                    Frame Integrity
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[#111820] mt-1">
                    Chassis &amp; Frame Warranty
                  </h3>
                  <div className="mt-4 inline-block px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#346C83] font-bold text-sm">
                    {bike.warranty.chassis}
                  </div>
                  <p className="text-xs sm:text-sm text-[#667780] mt-4 leading-relaxed">
                    Guarantees high-tensile steel frame weld points, structural load carrier brackets, and swingarm integrity against fatigue fractures and material defects under regular operation on Sri Lankan roadways.
                  </p>
                </div>

                <ul className="mt-6 pt-6 border-t border-[#E0E8EC] space-y-2 text-xs text-[#111820]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Genuine Zuboo replacement hardware stocked locally in Galle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trained EV mechanics with dedicated tools and spare inventory</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Provisional Details & Transparency Note */}
            <div className="mt-8 p-5 rounded-xl bg-[#E8F1F5]/70 border border-[#346C83]/20 flex items-start gap-4">
              <Info className="w-5 h-5 text-[#346C83] mt-0.5 shrink-0" />
              <div className="text-xs text-[#111820]">
                <h4 className="font-bold uppercase tracking-wider text-[#346C83] mb-1">
                  Provisional Transparency Statement
                </h4>
                <p className="text-[#667780] leading-relaxed">
                  {bike.provisionalNotes.join(" ")}
                  {" "}Udan Enterprises encourages all prospective buyers to visit our showroom in Galle for personal test rides, physical verification of chassis plates, and confirmed handover delivery schedules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Loan & EMI Calculator for this specific model */}
        <section className="py-16 bg-white border-t border-[#E0E8EC]">
          <div className="editorial-container space-y-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-2">
                <span className="w-6 h-0.5 bg-[#346C83]" />
                <span>FINANCIAL ESTIMATOR</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#111820]">
                CALCULATE LEASING FOR {bike.name.toUpperCase()}
              </h2>
              <p className="text-xs sm:text-sm text-[#667780] mt-1">
                Customize down payment, tenure, and bank rates to see your estimated monthly installment and fuel savings.
              </p>
            </div>
            <LoanCalculator initialModelSlug={bike.slug} />
          </div>
        </section>

        {/* Related Models Grid / Carousel */}
        {relatedBikes && relatedBikes.length > 0 && (
          <section className="py-16 lg:py-20 bg-[#F7F9FA]">
            <div className="editorial-container">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-2">
                    <span className="w-6 h-0.5 bg-[#346C83]" />
                    <span>ALTERNATIVE ZUBOO OPTIONS</span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#111820]">
                    RELATED ELECTRIC MODELS
                  </h2>
                </div>
                <Link
                  href="/bikes"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#346C83] hover:text-[#111820] transition-colors"
                >
                  <span>View All 8 Models</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBikes.map((rel) => (
                  <div
                    key={rel.id}
                    className="p-5 rounded-xl bg-white border border-[#E0E8EC] hover:border-[#346C83]/60 transition-all flex flex-col justify-between shadow-sm group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#346C83] bg-[#E8F1F5] px-2 py-0.5 rounded">
                          {rel.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#667780]">
                          {rel.modelCode}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-bold text-[#111820] group-hover:text-[#346C83] transition-colors">
                        <Link href={`/bikes/${rel.slug}`}>{rel.name}</Link>
                      </h3>
                      <p className="text-[11px] text-[#667780] line-clamp-1 mt-0.5">
                        {rel.tagline}
                      </p>

                      <div className="relative h-40 w-full my-4 bg-[#F7F9FA] rounded-lg border border-[#E0E8EC] p-3 flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={rel.mainImage}
                            alt={rel.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E0E8EC] text-[11px]">
                        <div>
                          <span className="text-[#667780] block text-[10px]">Motor</span>
                          <span className="font-bold text-[#111820]">{rel.motorPower.split(" ")[0]}</span>
                        </div>
                        <div>
                          <span className="text-[#667780] block text-[10px]">Range</span>
                          <span className="font-bold text-emerald-700">{rel.advertisedRange}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-baseline justify-between">
                        <span className="font-heading text-base font-bold text-[#111820]">
                          {rel.formattedPrice}
                        </span>
                        <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
                          Provisional
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-[#E0E8EC]">
                      <Link
                        href={`/bikes/${rel.slug}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#111820] hover:bg-[#346C83] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <span>Explore Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Floating Mobile Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E0E8EC] p-3 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[10px] text-[#667780] uppercase font-bold block leading-none">
              Provisional Price
            </span>
            <span className="font-heading text-sm font-extrabold text-[#111820]">
              {bike.formattedPrice}
            </span>
          </div>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30"
            title="WhatsApp Inquiry"
            aria-label="WhatsApp Inquiry"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
          </a>

          <button
            type="button"
            onClick={() => setTestRideModalOpen(true)}
            className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#111820] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Test Ride</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Test Ride Modal */}
      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        preSelectedModelId={bike.id}
      />

    </div>
  );
}
