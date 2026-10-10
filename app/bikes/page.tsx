"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestRideModal from "@/components/TestRideModal";
import AllBikesCatalogue from "@/components/AllBikesCatalogue";
import { ZUBOO_COLLECTION, BikeModel } from "@/data/bikes";
import {
  Zap,
  Battery,
  Gauge,
  Shield,
  ArrowRight,
  Calendar,
  MessageSquare,
  Sparkles,
  Info,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Layers,
  Award,
} from "lucide-react";

export default function BikesCataloguePage() {
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);
  const [selectedBikeId, setSelectedBikeId] = useState<string>("t3");
  const [activeComparisonCategory, setActiveComparisonCategory] = useState<string>("all");

  const handleOpenTestRide = (modelId: string = "t3") => {
    setSelectedBikeId(modelId);
    setTestRideModalOpen(true);
  };

  const filteredComparisonBikes = ZUBOO_COLLECTION.filter((bike) => {
    if (activeComparisonCategory === "all") return true;
    if (activeComparisonCategory === "commuters")
      return ["mini", "t3", "kb1"].includes(bike.slug);
    if (activeComparisonCategory === "touring")
      return ["gt", "the-tank"].includes(bike.slug);
    if (activeComparisonCategory === "sports")
      return ["t11", "ex008"].includes(bike.slug);
    if (activeComparisonCategory === "retro")
      return bike.slug === "paris";
    return true;
  });

  const getWhatsAppLink = (bike: BikeModel) => {
    const text = encodeURIComponent(
      `Hi Udan Enterprises, I would like to inquire about the ${bike.name} (${bike.modelCode}) advertised at ${bike.formattedPrice}.`
    );
    return `https://wa.me/94784969652?text=${text}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820]">
      {/* Sticky Editorial Navbar */}
      <Navbar onOpenTestRide={() => handleOpenTestRide("t3")} />

      <main className="flex-1 pt-24 lg:pt-28">
        {/* Editorial Breadcrumbs & Hero Header */}
        <section className="bg-white border-b border-[#E0E8EC] py-12 lg:py-16">
          <div className="editorial-container">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#667780] mb-6">
              <Link href="/" className="hover:text-[#111820] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#667780]/60" />
              <span className="text-[#346C83]">Zuboo Collection</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#346C83] bg-[#E8F1F5] border border-[#346C83]/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#346C83]" />
                <span>Authorized Zuboo Dealership • Udugama Road, Kurunduwatta, Galle, Sri Lanka</span>
              </div>

              <h1 className="font-collection text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111820] leading-[1.08]">
                THE 2026 ZUBOO <br className="hidden sm:block" />
                <span className="text-[#346C83]">ELECTRIC MOTORCYCLE</span> FLEET
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#667780] leading-relaxed max-w-2xl font-normal">
                Engineered for daily urban reliability, zero petrol dependency, and island-wide endurance.
                Explore all 8 Zuboo electric models with full technical specifications, verified range ratings,
                and direct test-ride reservations.
              </p>

              {/* Quick Spec Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#E0E8EC]">
                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="text-[10px] uppercase font-bold text-[#667780] tracking-wider block">
                    Models Available
                  </span>
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#111820]">
                    8 Distinct Models
                  </span>
                  <span className="text-[11px] text-[#346C83] block mt-0.5 font-medium">
                    Commuters to Tourers
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="text-[10px] uppercase font-bold text-[#667780] tracking-wider block">
                    Maximum Range
                  </span>
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#111820]">
                    Up to 110 km
                  </span>
                  <span className="text-[11px] text-[#346C83] block mt-0.5 font-medium">
                    Per Single Charge
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="text-[10px] uppercase font-bold text-[#667780] tracking-wider block">
                    Running Cost
                  </span>
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#111820]">
                    ~LKR 1.20 / km
                  </span>
                  <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
                    90% Savings vs Petrol
                  </span>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="text-[10px] uppercase font-bold text-[#667780] tracking-wider block">
                    Factory Warranty
                  </span>
                  <span className="font-heading text-xl sm:text-2xl font-bold text-[#111820]">
                    Up to 3 Years
                  </span>
                  <span className="text-[11px] text-[#346C83] block mt-0.5 font-medium">
                    Chassis & Motor Support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Provisional Specs & Price Transparency Notice */}
        <section className="bg-[#E8F1F5]/60 border-b border-[#E0E8EC] py-3.5">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-[#111820]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#346C83] shrink-0" />
                <span>
                  <strong className="font-semibold text-[#111820]">Provisional Showcase Notice:</strong> All listed prices (LKR 195,000 – LKR 515,000) and specifications are transcribed from official factory promotional literature. Exact retail pricing and battery configurations are subject to final showroom arrival confirmation.
                </span>
              </div>
              <button
                onClick={() => handleOpenTestRide("t3")}
                className="inline-flex items-center gap-1 font-bold text-[#346C83] hover:text-[#111820] underline text-xs shrink-0"
              >
                <span>Reserve Showroom Inspection</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* Full AllBikesCatalogue Section with Category Filters and Instant Search */}
        <AllBikesCatalogue onSelectModelForTestRide={handleOpenTestRide} showSearch={true} />

        {/* Comparison Highlights Section */}
        <section id="comparison" className="py-20 lg:py-24 bg-[#F7F9FA] border-t border-[#E0E8EC]">
          <div className="editorial-container">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
                  <span className="w-6 h-0.5 bg-[#346C83]" />
                  <span>TECHNICAL MATRIX</span>
                </div>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111820]">
                  COMPARISON HIGHLIGHTS
                </h2>
                <p className="mt-2 text-[#667780] text-sm max-w-xl">
                  Evaluate key performance metrics, battery specs, braking systems, and advertised prices across the entire Zuboo lineup.
                </p>
              </div>

              {/* Category Filter for Comparison Matrix */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: "All 8 Models" },
                  { id: "commuters", label: "Commuters" },
                  { id: "touring", label: "Touring & Adventure" },
                  { id: "sports", label: "Sports Maxi" },
                  { id: "retro", label: "Retro Classic" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveComparisonCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                      activeComparisonCategory === tab.id
                        ? "bg-[#111820] text-white"
                        : "bg-white text-[#667780] hover:text-[#111820] border border-[#E0E8EC]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Comparison Table */}
            <div className="hidden lg:block overflow-x-auto bg-white rounded-xl border border-[#E0E8EC] shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#111820] text-white text-[11px] uppercase tracking-wider">
                    <th className="py-4 px-5 font-bold">Model</th>
                    <th className="py-4 px-4 font-bold">Category</th>
                    <th className="py-4 px-4 font-bold">Motor Power</th>
                    <th className="py-4 px-4 font-bold">Advertised Range</th>
                    <th className="py-4 px-4 font-bold">Top Speed</th>
                    <th className="py-4 px-4 font-bold">Battery Pack</th>
                    <th className="py-4 px-4 font-bold">Braking</th>
                    <th className="py-4 px-4 font-bold">Price (Provisional)</th>
                    <th className="py-4 px-5 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0E8EC]">
                  {filteredComparisonBikes.map((bike) => (
                    <tr
                      key={bike.id}
                      className="hover:bg-[#F7F9FA] transition-colors group"
                    >
                      {/* Model & Thumbnail */}
                      <td className="py-4 px-5 font-medium text-[#111820]">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 bg-[#F7F9FA] rounded border border-[#E0E8EC] shrink-0 p-1 flex items-center justify-center">
                            <Image
                              src={bike.mainImage}
                              alt={bike.name}
                              fill
                              className="object-contain"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/bikes/${bike.slug}`}
                              className="font-heading font-bold text-sm text-[#111820] group-hover:text-[#346C83] transition-colors block"
                            >
                              {bike.name}
                            </Link>
                            <span className="text-[10px] text-[#667780] font-mono">
                              {bike.modelCode}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[#346C83] bg-[#E8F1F5]">
                          {bike.category}
                        </span>
                      </td>

                      {/* Motor */}
                      <td className="py-4 px-4 font-semibold text-[#111820]">
                        {bike.motorPower}
                      </td>

                      {/* Range */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {bike.advertisedRange}
                        </span>
                      </td>

                      {/* Top Speed */}
                      <td className="py-4 px-4 font-semibold text-[#111820]">
                        {bike.topSpeed}
                      </td>

                      {/* Battery */}
                      <td className="py-4 px-4 text-[#667780] max-w-[160px] truncate" title={bike.battery}>
                        {bike.battery}
                      </td>

                      {/* Brakes */}
                      <td className="py-4 px-4 text-[#667780] max-w-[140px] truncate" title={bike.brakes}>
                        {bike.brakes}
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-heading font-bold text-sm text-[#111820]">
                            {bike.formattedPrice}
                          </span>
                          <span className="text-[9px] text-amber-800 font-semibold">
                            Provisional
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/bikes/${bike.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#111820] hover:bg-[#346C83] text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                          >
                            <span>Specs</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleOpenTestRide(bike.id)}
                            className="p-1.5 rounded bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#346C83] transition-colors border border-[#E0E8EC]"
                            title="Book Test Ride"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Comparison Cards */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComparisonBikes.map((bike) => (
                <div
                  key={bike.id}
                  className="p-4 rounded-xl bg-white border border-[#E0E8EC] shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#E0E8EC]">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-[#F7F9FA] rounded border border-[#E0E8EC] shrink-0 p-1 flex items-center justify-center">
                        <Image
                          src={bike.mainImage}
                          alt={bike.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-base text-[#111820]">
                          <Link href={`/bikes/${bike.slug}`}>{bike.name}</Link>
                        </h4>
                        <span className="text-[10px] text-[#346C83] font-bold uppercase tracking-wider">
                          {bike.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-heading font-bold text-base text-[#111820] block">
                        {bike.formattedPrice}
                      </span>
                      <span className="text-[9px] text-amber-800 font-semibold block">
                        Provisional
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 my-3 text-[11px]">
                    <div>
                      <span className="text-[#667780] block text-[10px]">Motor Power</span>
                      <span className="font-bold text-[#111820]">{bike.motorPower}</span>
                    </div>
                    <div>
                      <span className="text-[#667780] block text-[10px]">Advertised Range</span>
                      <span className="font-bold text-emerald-700">{bike.advertisedRange}</span>
                    </div>
                    <div>
                      <span className="text-[#667780] block text-[10px]">Top Speed</span>
                      <span className="font-bold text-[#111820]">{bike.topSpeed}</span>
                    </div>
                    <div>
                      <span className="text-[#667780] block text-[10px]">Battery Spec</span>
                      <span className="font-bold text-[#111820] truncate block">{bike.battery}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#E0E8EC]">
                    <Link
                      href={`/bikes/${bike.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-md bg-[#111820] text-white text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenTestRide(bike.id)}
                      className="inline-flex items-center gap-1 py-2 px-3 rounded-md bg-[#E8F1F5] text-[#346C83] text-xs font-bold uppercase tracking-wider border border-[#E0E8EC]"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Test Ride</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Model Highlights Badges Box */}
            <div className="mt-12 p-6 rounded-xl bg-white border border-[#E0E8EC] shadow-sm">
              <h3 className="font-heading text-lg font-bold text-[#111820] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#346C83]" />
                <span>Lineup Performance Superlatives</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="font-bold text-[#346C83] uppercase text-[10px] tracking-wider block">
                    Highest Torque & Power
                  </span>
                  <p className="font-bold text-sm text-[#111820] mt-1">Zuboo The Tank (3000W)</p>
                  <p className="text-[#667780] text-[11px] mt-0.5">
                    Reinforced steel perimeter bars and double projector halo lighting.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="font-bold text-[#346C83] uppercase text-[10px] tracking-wider block">
                    Longest Distance Touring
                  </span>
                  <p className="font-bold text-sm text-[#111820] mt-1">Zuboo T3 (110 km) & GT (100 km)</p>
                  <p className="text-[#667780] text-[11px] mt-0.5">
                    High capacity 72V 32Ah packs with dual rear airbag suspension systems.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="font-bold text-[#346C83] uppercase text-[10px] tracking-wider block">
                    Highway Stability
                  </span>
                  <p className="font-bold text-sm text-[#111820] mt-1">Zuboo EX008 (14&quot; Wheels)</p>
                  <p className="text-[#667780] text-[11px] mt-0.5">
                    Large 14-inch tubeless road wheels and 2000W high-speed motor.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F9FA] border border-[#E0E8EC]">
                  <span className="font-bold text-[#346C83] uppercase text-[10px] tracking-wider block">
                    Most Accessible Commuter
                  </span>
                  <p className="font-bold text-sm text-[#111820] mt-1">Zuboo Mini (LKR 195,000)</p>
                  <p className="text-[#667780] text-[11px] mt-0.5">
                    Ultra-light step-through frame with integrated heavy-duty woven front basket.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Zuboo Electric Mobility in Sri Lanka */}
        <section className="py-16 bg-[#111820] text-white">
          <div className="editorial-container">
            <div className="max-w-3xl mb-12">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#346C83] block mb-2">
                THE ECONOMIC & ECOLOGICAL ADVANTAGE
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                WHY SWITCH TO ZUBOO ELECTRIC IN GALLE?
              </h2>
              <p className="text-[#A0B0B8] text-sm sm:text-base mt-3 leading-relaxed">
                With fluctuating fuel prices and recurring pump queues, electric two-wheelers represent
                the most reliable, economical, and future-proof transport investment in Sri Lanka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <TrendingDown className="w-8 h-8 text-[#346C83] mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">Massive Operating Cost Reduction</h3>
                <p className="text-xs sm:text-sm text-[#A0B0B8] leading-relaxed">
                  A full 72V charge costs less than LKR 120 in domestic electricity, yielding up to 100 km.
                  That is under LKR 1.20 per kilometer versus LKR 12.00+ for traditional petrol scooters.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Shield className="w-8 h-8 text-[#346C83] mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">Official Dealership & Parts Support</h3>
                <p className="text-xs sm:text-sm text-[#A0B0B8] leading-relaxed">
                  Udan Enterprises provides genuine Zuboo replacement controllers, motors, batteries,
                  and tires directly at our Galle service center, backed by 1-3 year warranty terms.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-[#346C83] mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">Zero Standard Wall Socket Hassle</h3>
                <p className="text-xs sm:text-sm text-[#A0B0B8] leading-relaxed">
                  No specialized EV charging station required. Every Zuboo bike plugs directly into any
                  standard 230V Sri Lankan 3-pin domestic outlet with intelligent auto-cutoff protection.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Test Ride Modal */}
      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        preSelectedModelId={selectedBikeId}
      />
    </div>
  );
}
