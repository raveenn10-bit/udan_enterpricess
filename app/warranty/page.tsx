"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Calendar,
  Zap,
  Wrench,
  Clock,
  Printer,
  Copy,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Shield,
  FileText,
  BadgeCheck,
  Sparkles,
  Phone,
  MessageSquare,
} from "lucide-react";
import { SAMPLE_WARRANTIES, lookupWarranty, WarrantyRecord } from "@/data/warranties";
import { BUSINESS_CONFIG } from "@/data/business";

function WarrantySearchContent() {
  const searchParams = useSearchParams();
  const initialVinParam = searchParams.get("vin") || "";

  const [vinInput, setVinInput] = useState<string>(initialVinParam || "ZB-2026-T3-001");
  const [activeRecord, setActiveRecord] = useState<WarrantyRecord | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copiedVin, setCopiedVin] = useState<boolean>(false);

  useEffect(() => {
    // If param exists or default initial VIN
    const defaultSearch = initialVinParam || "ZB-2026-T3-001";
    const res = lookupWarranty(defaultSearch);
    if (res) {
      setActiveRecord(res);
      setHasSearched(true);
    }
  }, [initialVinParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vinInput.trim()) return;
    const res = lookupWarranty(vinInput.trim());
    setActiveRecord(res);
    setHasSearched(true);
  };

  const handleSampleVinClick = (sampleVin: string) => {
    setVinInput(sampleVin);
    const res = lookupWarranty(sampleVin);
    setActiveRecord(res);
    setHasSearched(true);
  };

  const handleCopyVin = (vin: string) => {
    navigator.clipboard.writeText(vin);
    setCopiedVin(true);
    setTimeout(() => setCopiedVin(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16">
      {/* VIN Lookup Bar Section */}
      <section className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block">
            Digital Certificate Verification
          </span>
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820] uppercase tracking-tight">
            CHECK CHASSIS / VIN WARRANTY STATUS
          </h2>
          <p className="text-xs text-[#667780] leading-relaxed">
            Enter the 14-character Zuboo VIN / Chassis Number found on your vehicle headstock stamp,
            invoice, or key tag.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value.toUpperCase())}
              placeholder="e.g. ZB-2026-T3-001"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-sm font-mono font-bold tracking-wider text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white uppercase transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Warranty</span>
          </button>
        </form>

        {/* Quick Sample VIN Selector Pills */}
        <div className="pt-2 border-t border-[#E0E8EC]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#667780] block mb-2">
            Try Demo Registered VINs (1-Click Test):
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {Object.keys(SAMPLE_WARRANTIES).map((vin) => {
              const rec = SAMPLE_WARRANTIES[vin];
              return (
                <button
                  key={vin}
                  type="button"
                  onClick={() => handleSampleVinClick(vin)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                    vinInput === vin
                      ? "bg-[#346C83] text-white border-[#346C83]"
                      : "bg-[#F7F9FA] text-[#111820] hover:bg-[#E8F1F5] border-[#E0E8EC]"
                  }`}
                >
                  <span>{vin}</span>
                  <span className="text-[10px] opacity-75 ml-1">({rec.modelId.toUpperCase()})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Result Display: Digital Warranty Certificate */}
      {hasSearched && (
        <section className="space-y-6 animate-in fade-in">
          {activeRecord ? (
            <div className="bg-white rounded-3xl border-2 border-[#346C83]/30 shadow-xl overflow-hidden print:border-none print:shadow-none">
              {/* Official Certificate Banner */}
              <div className="bg-[#111820] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#346C83] text-white flex items-center justify-center font-heading font-black text-xl shadow-inner">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#346C83] bg-white/10 px-2 py-0.5 rounded">
                        OFFICIAL DIGITAL CERTIFICATE
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        REF: ZB-WAR-{activeRecord.vin}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight mt-0.5">
                      ZUBOO MOTORS OFFICIAL WARRANTY
                    </h3>
                    <p className="text-xs text-slate-400">
                      Issued through Udan Enterprises Galle Dealership
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeRecord.status} Warranty</span>
                  </div>

                  <button
                    onClick={handlePrint}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors print:hidden"
                    title="Print or Save Certificate as PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Body */}
              <div className="p-6 sm:p-10 space-y-8">
                {/* Top Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC]">
                  {/* VIN Box */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                      VIN / Chassis Number
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono font-black text-lg text-[#111820]">
                        {activeRecord.vin}
                      </span>
                      <button
                        onClick={() => handleCopyVin(activeRecord.vin)}
                        className="text-[#346C83] hover:text-[#111820] text-xs"
                        title="Copy VIN"
                      >
                        {copiedVin ? (
                          <span className="text-[10px] font-bold text-emerald-600">Copied!</span>
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <span className="text-[10px] text-[#667780]">Factory Stamped</span>
                  </div>

                  {/* Registered Owner */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                      Registered Owner
                    </span>
                    <span className="font-heading font-bold text-base text-[#111820] block mt-1">
                      {activeRecord.customerName}
                    </span>
                    <span className="text-[11px] text-[#667780] font-mono">
                      Phone: {activeRecord.maskedPhone}
                    </span>
                  </div>

                  {/* Coverage Timeline */}
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                      Warranty Validity
                    </span>
                    <div className="flex items-center gap-1.5 font-heading font-bold text-sm text-[#111820] mt-1">
                      <Calendar className="w-3.5 h-3.5 text-[#346C83]" />
                      <span>{activeRecord.registeredDate}</span>
                      <span className="text-[#667780] font-normal">to</span>
                      <span className="text-emerald-700">{activeRecord.expiryDate}</span>
                    </div>
                    <span className="text-[10px] text-[#667780]">
                      Mileage Ceiling: {activeRecord.mileageLimit}
                    </span>
                  </div>
                </div>

                {/* Model and Main Spec Details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#E0E8EC]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#346C83]">
                      Vehicle Model Registered
                    </span>
                    <h4 className="font-heading font-black text-xl text-[#111820]">
                      {activeRecord.modelName}
                    </h4>
                    <span className="font-mono text-xs text-[#667780]">
                      Model Code: {activeRecord.modelCode}
                    </span>
                  </div>

                  <Link
                    href={`/bikes/${activeRecord.modelId}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#111820] bg-[#E8F1F5] hover:bg-[#d8e7ee] border border-[#E0E8EC] transition-colors print:hidden"
                  >
                    <span>View Model Specifications</span>
                    <ExternalLink className="w-3 h-3 text-[#346C83]" />
                  </Link>
                </div>

                {/* 3 Component Pillars Breakdown */}
                <div className="space-y-4">
                  <h4 className="font-heading font-black text-base text-[#111820] uppercase tracking-tight">
                    COMPONENT COVERAGE BREAKDOWN
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Motor Coverage */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#346C83]" />
                          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#111820]">
                            Electric Motor
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {activeRecord.motorCoverage.status}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-xs text-[#111820]">
                          {activeRecord.motorCoverage.spec}
                        </div>
                        <div className="text-[11px] text-[#346C83] font-semibold mt-0.5">
                          {activeRecord.motorCoverage.warrantyYears} Years / Full Parts & Labor
                        </div>
                      </div>

                      <p className="text-xs text-[#667780] leading-relaxed">
                        {activeRecord.motorCoverage.details}
                      </p>
                    </div>

                    {/* Battery Coverage */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-600" />
                          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#111820]">
                            Lithium Battery Pack
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {activeRecord.batteryCoverage.status}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-xs text-[#111820]">
                          {activeRecord.batteryCoverage.spec}
                        </div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          Health State: {activeRecord.batteryCoverage.healthPercentage}% Capacity
                        </div>
                      </div>

                      <p className="text-xs text-[#667780] leading-relaxed">
                        {activeRecord.batteryCoverage.details}
                      </p>
                    </div>

                    {/* Chassis Coverage */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-slate-700" />
                          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#111820]">
                            Chassis & Frame
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {activeRecord.chassisCoverage.status}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-xs text-[#111820]">
                          High-Tensile Alloy Frame
                        </div>
                        <div className="text-[11px] text-[#346C83] font-semibold mt-0.5">
                          {activeRecord.chassisCoverage.warrantyYears} Years Structural Warranty
                        </div>
                      </div>

                      <p className="text-xs text-[#667780] leading-relaxed">
                        {activeRecord.chassisCoverage.details}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service History Timeline */}
                <div className="space-y-4">
                  <h4 className="font-heading font-black text-base text-[#111820] uppercase tracking-tight">
                    AUTHORIZED SHOWROOM SERVICE HISTORY LOG
                  </h4>

                  <div className="space-y-3">
                    {activeRecord.serviceLogs.map((log, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#111820]">{log.serviceType}</span>
                            <span className="px-2 py-0.5 rounded bg-white text-[10px] font-mono text-[#346C83] border border-[#E0E8EC]">
                              {log.mileage}
                            </span>
                          </div>
                          <p className="text-[#667780]">{log.technicianNotes}</p>
                          <span className="text-[10px] text-slate-400 block">{log.center}</span>
                        </div>

                        <div className="font-mono text-xs font-semibold text-[#111820] shrink-0 sm:text-right">
                          {log.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificate Footer Stamp & Actions */}
                <div className="pt-6 border-t border-[#E0E8EC] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
                  <div className="flex items-center gap-2 text-xs text-[#667780]">
                    <BadgeCheck className="w-5 h-5 text-[#346C83]" />
                    <span>Cryptographically verified against Galle showroom records database.</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/service`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white text-xs font-heading font-bold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Book Next Routine Service</span>
                    </Link>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#111820] text-xs font-bold border border-[#E0E8EC] transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rose-200 p-8 sm:p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-black text-xl text-[#111820] uppercase">
                CHASSIS / VIN NOT FOUND
              </h3>
              <p className="text-xs text-[#667780] max-w-md mx-auto leading-relaxed">
                We could not locate a warranty record for <span className="font-mono font-bold text-[#111820]">"{vinInput}"</span> in the digital registry. Please double-check your chassis stamp or contact our Galle showroom hotline.
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <a
                  href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises,%20I%20need%20assistance%20verifying%20my%20Zuboo%20warranty%20chassis%20number."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire on WhatsApp</span>
                </a>
                <a
                  href="tel:+94784969652"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#111820] font-bold text-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Showroom</span>
                </a>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Section: Warranty Policy & Coverage Guidelines */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block">
            Customer Transparency
          </span>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-[#111820] uppercase tracking-tight">
            UDAN ENTERPRISES WARRANTY POLICY TERMS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E0E8EC] shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#111820] uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Items Fully Covered Under Warranty</span>
            </div>
            <ul className="space-y-2 text-xs text-[#667780]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346C83] mt-1.5 shrink-0" />
                <span>Brushless electric hub motors (internal stator windings, hall effect sensors, bearings).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346C83] mt-1.5 shrink-0" />
                <span>Lithium-ion battery packs with unexpected capacity degradation below 70% within 2 years.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346C83] mt-1.5 shrink-0" />
                <span>Smart Battery Management System (BMS) electronic controllers and cut-off relays.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346C83] mt-1.5 shrink-0" />
                <span>High-tensile alloy chassis frame and structural welds against metal fatigue (3 Years).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#346C83] mt-1.5 shrink-0" />
                <span>Digital LCD instrumentation console and factory electrical wiring harness.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E0E8EC] shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-heading font-bold text-sm text-[#111820] uppercase">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Standard Wear & Tear (Excluded Items)</span>
            </div>
            <ul className="space-y-2 text-xs text-[#667780]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>Consumable brake pads, disc rotors worn through friction, and hydraulic fluid top-ups.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>Tire punctures, rubber tread wear, and valve stems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>Cosmetic surface scratches, paint scuffs from accidents, or improper pressure washer usage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                <span>Damage resulting from non-genuine third-party chargers or submerged flood riding.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      <Navbar />

      <main className="pt-24 lg:pt-28 pb-20 space-y-12">
        {/* Editorial Top Title */}
        <section className="hairline-b bg-white">
          <div className="editorial-container py-12 lg:py-16">
            <div className="max-w-4xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#346C83]">
                <span className="w-6 h-0.5 bg-[#346C83]" />
                <span>DIGITAL REGISTRY • UDAN ENTERPRISES</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl tracking-tight text-[#111820] uppercase leading-none">
                DIGITAL WARRANTY <span className="text-[#346C83]">PORTAL</span>
              </h1>

              <p className="text-base sm:text-lg text-[#667780] leading-relaxed max-w-3xl">
                Verify your official Zuboo electric motorcycle warranty coverage, motor guarantee, and
                battery health logs. Every authorized vehicle sold at our Galle showroom is backed by
                genuine factory certification.
              </p>
            </div>
          </div>
        </section>

        {/* Content with Suspense boundary for useSearchParams */}
        <div className="editorial-container">
          <Suspense
            fallback={
              <div className="py-20 text-center text-xs text-[#667780]">
                Loading Digital Warranty Registry...
              </div>
            }
          >
            <WarrantySearchContent />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
