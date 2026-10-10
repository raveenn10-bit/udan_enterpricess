"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Tag,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  Repeat,
  ShieldCheck,
  Percent,
  Truck,
  HelpCircle,
} from "lucide-react";
import { useDynamicOffers, useShowroomSettings, useDynamicProducts } from "@/lib/site-data";

interface OfferItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  modelCode: string;
  regularPrice?: string;
  promoPrice: string;
  savings?: string;
  image: string;
  highlights: string[];
  specs: {
    motor: string;
    range: string;
    battery: string;
  };
  whatsAppText: string;
  isPopular?: boolean;
}

const CURRENT_OFFERS: OfferItem[] = [
  {
    id: "kb1-cash-discount",
    badge: "Cash Discount Special",
    badgeColor: "bg-red-50 text-red-600 border-red-200",
    title: "Zuboo KB1 Executive Commuter",
    modelCode: "KB1-72V",
    regularPrice: "LKR 415,000",
    promoPrice: "LKR 382,500",
    savings: "Save LKR 32,500",
    image: "/media/bikes/kb1/main.webp",
    highlights: [
      "Immediate cash discount of LKR 32,500 on confirmed bookings",
      "140mm high ground clearance suited for Sri Lankan road conditions",
      "Complimentary certified rider helmet & 1st-year service checkup",
      "One-key smart start & anti-theft hand brake lock system",
    ],
    specs: {
      motor: "High-Efficiency Torque",
      range: "80 - 100 km",
      battery: "72V 32Ah Power Pack",
    },
    whatsAppText:
      "Hi Udan Enterprises, I would like to claim the Zuboo KB1 Cash Discount offer (Promo Price: LKR 382,500). Please verify current showroom stock in Galle.",
    isPopular: true,
  },
  {
    id: "t3-launch-pack",
    badge: "Urban Launch Pack",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    title: "Zuboo T3 Urban Favorite",
    modelCode: "T3-1300W",
    regularPrice: "LKR 420,000",
    promoPrice: "LKR 395,000",
    savings: "Save LKR 25,000 Value",
    image: "/media/bikes/t3/main.webp",
    highlights: [
      "Free heavy-duty rear tail carrier rack & pillion luggage backrest",
      "USB mobile fast charger & anti-theft security alarm included",
      "Up to 110 km range per single charge in eco mode",
      "Choice of 5 premium body finishes (Matte Black, Mint, Cream, etc.)",
    ],
    specs: {
      motor: "1300W High Torque",
      range: "100 - 110 km",
      battery: "72V 32Ah High Capacity",
    },
    whatsAppText:
      "Hi Udan Enterprises, I would like to inquire about the Zuboo T3 Urban Launch Pack (LKR 395,000) with free rack and accessories.",
    isPopular: true,
  },
  {
    id: "paris-festive",
    badge: "Festive Luxury Incentive",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Zuboo Paris Retro Classic",
    modelCode: "PARIS-1200W",
    promoPrice: "LKR 330,000",
    savings: "Seasonal Special",
    image: "/media/bikes/paris/main.webp",
    highlights: [
      "Complimentary aerodynamic clear front windscreen",
      "Vintage chrome styling accents and matching rearview mirrors",
      "Luxury contoured two-tone seat with pillion backrest support",
      "Ultra-quiet direct hub drive ideal for city commuting",
    ],
    specs: {
      motor: "1200W Smooth Acceleration",
      range: "≥ 80 km",
      battery: "72V 23Ah",
    },
    whatsAppText:
      "Hi Udan Enterprises, I am interested in the Zuboo Paris Retro Luxury Festive offer (LKR 330,000). Please share color options available at Galle.",
  },
  {
    id: "tank-all-terrain",
    badge: "All-Terrain Launch Allotment",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "Zuboo The Tank 3000W",
    modelCode: "TANK-3000W",
    promoPrice: "LKR 515,000",
    savings: "Limited Showroom Batch",
    image: "/media/bikes/the-tank/main.webp",
    highlights: [
      "Twin circular front halo spotlights with protective steel cage",
      "Perimeter steel crash bars with integrated footrest winglets",
      "Heavy-duty lockable rear touring trunk included at no extra charge",
      "Extreme 3000W instant climb torque for steep gradients",
    ],
    specs: {
      motor: "3000W Peak Performance",
      range: "≥ 80 km",
      battery: "72V High Discharge Pack",
    },
    whatsAppText:
      "Hi Udan Enterprises, I would like to verify stock and pricing for Zuboo The Tank 3000W (LKR 515,000).",
  },
  {
    id: "mini-starter",
    badge: "Starter Special",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    title: "Zuboo Mini Compact Commuter",
    modelCode: "MINI-490W",
    promoPrice: "LKR 195,000",
    savings: "Under LKR 200,000",
    image: "/media/bikes/mini/main.webp",
    highlights: [
      "Sub-200k accessible electric mobility entry point",
      "Heavy-duty woven front grocery and shopping basket included",
      "Ultra-lightweight step-through frame suitable for all riders",
      "Extremely low electricity consumption (~LKR 30 per charge)",
    ],
    specs: {
      motor: "490W Eco Motor",
      range: "> 32 km",
      battery: "48V 12Ah Lead-acid",
    },
    whatsAppText:
      "Hi Udan Enterprises, I am inquiring about the Zuboo Mini Starter Special at LKR 195,000.",
  },
  {
    id: "gt-touring-bundle",
    badge: "Touring Package",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    title: "Zuboo GT 1800W Dual-Sport",
    modelCode: "GT-1800W",
    promoPrice: "LKR 445,000",
    savings: "Touring Box Bundle",
    image: "/media/bikes/gt/main.webp",
    highlights: [
      "Heavy-duty iron carrier rack with tail storage box included",
      "Double airbag rear shock absorption system for passenger comfort",
      "Dual hydraulic disc brakes and 3-speed electronic selector",
      "High-output LED projector lighting system",
    ],
    specs: {
      motor: "1800W High Torque",
      range: "≥ 100 km",
      battery: "72V 32Ah High Capacity",
    },
    whatsAppText:
      "Hi Udan Enterprises, I would like to inquire about the Zuboo GT Touring Package (LKR 445,000) and test ride availability.",
  },
];

const ANALYZED_CAMPAIGN_PACKAGES = [
  {
    id: "campaign-1",
    tag: "Campaign 01",
    title: "KB1 Executive Cash Rebate",
    model: "Zuboo KB1 (72V 32Ah)",
    benefit: "LKR 32,500 Direct Discount",
    price: "LKR 382,500",
    freeIncluded: "Certified Helmet + 1st Year Free Service",
    warranty: "2 Years / 20,000 km",
    terms: "Showroom booking deposit required",
  },
  {
    id: "campaign-2",
    tag: "Campaign 02",
    title: "T3 Urban Flagship Touring Pack",
    model: "Zuboo T3 (2000W)",
    benefit: "LKR 25,000 Added Value",
    price: "LKR 395,000",
    freeIncluded: "Heavy-Duty Tail Rack + Pillion Backrest",
    warranty: "3 Years Chassis + 2 Years Powertrain",
    terms: "Available in Matte Black, White, Mint",
  },
  {
    id: "campaign-3",
    tag: "Campaign 03",
    title: "GT 1800W Dual-Sport Bundle",
    model: "Zuboo GT (1800W High Torque)",
    benefit: "Touring Top-Box Included Free",
    price: "LKR 445,000",
    freeIncluded: "Iron Tail Carrier + Lockable Luggage Box",
    warranty: "2 Years Motor & Battery Warranty",
    terms: "Rough terrain dual-airbag suspension",
  },
  {
    id: "campaign-4",
    tag: "Campaign 04",
    title: "The Tank 3000W All-Terrain Batch",
    model: "Zuboo The Tank (3000W Peak)",
    benefit: "Extreme High-Power Commercial Allotment",
    price: "LKR 515,000",
    freeIncluded: "Lockable Rear Trunk + Steel Crash Guard",
    warranty: "2 Years Full Heavy-Duty Coverage",
    terms: "Limited import batch in Galle",
  },
  {
    id: "campaign-5",
    tag: "Campaign 05",
    title: "Paris European Vintage Special",
    model: "Zuboo Paris (1200W Classic)",
    benefit: "Complimentary Windscreen & Chrome Kit",
    price: "LKR 330,000",
    freeIncluded: "Aerodynamic Windscreen + Luxury Seat",
    warranty: "2 Years Battery & Motor Coverage",
    terms: "Retro lifestyle edition",
  },
  {
    id: "campaign-6",
    tag: "Campaign 06",
    title: "Mini Step-Through Urban Entry",
    model: "Zuboo Mini (City Commuter)",
    benefit: "Sub-200K Accessible Electric Entry",
    price: "LKR 195,000",
    freeIncluded: "Woven Front Grocery Basket",
    warranty: "1 Year Official Showroom Warranty",
    terms: "Ultra-low ~Rs 30 per charge cost",
  },
  {
    id: "campaign-7",
    tag: "Campaign 07",
    title: "Petrol-to-Electric Trade-In Rebate",
    model: "All Zuboo Models Eligible",
    benefit: "Up to LKR 75,000 Old Bike Valuation",
    price: "+ LKR 15,000 EV Subsidy Bonus",
    freeIncluded: "Free On-Site Evaluation & Instant Transfer",
    warranty: "Full Standard Vehicle Warranty",
    terms: "Valid on running 2-wheelers (Bajaj, Honda, TVS)",
  },
  {
    id: "campaign-8",
    tag: "Campaign 08",
    title: "Showroom Seasonal Rider Gear Kit",
    model: "Complimentary with Any Model",
    benefit: "Full Protection Gear Package",
    price: "Free with Vehicle Purchase",
    freeIncluded: "Safety Helmet + Raincoat + 72V Fast Charger",
    warranty: "Manufacturer Spares Guarantee",
    terms: "Delivered on vehicle handover in Galle",
  },
];

export default function OffersPage() {
  const { offers: dynamicOffers } = useDynamicOffers();
  const { settings } = useShowroomSettings();
  const { products: dynamicBikes } = useDynamicProducts();

  const rawPhone = settings.whatsappNumber || "0784969652";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappIntl = cleanPhone.startsWith("0") ? `94${cleanPhone.slice(1)}` : cleanPhone;

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${whatsappIntl}?text=${encodeURIComponent(message)}`;
  };

  // Merge dynamic offers with fallback
  const displayOffers: OfferItem[] = (dynamicOffers && dynamicOffers.length > 0)
    ? dynamicOffers.map((o) => {
        const bike = dynamicBikes.find((b) => b.id === o.associatedBikeId || b.slug === o.associatedBikeId);
        return {
          id: o.id,
          badge: o.badge || "Special Offer",
          badgeColor: o.badgeColor || "bg-red-50 text-red-600 border-red-200",
          title: o.title,
          modelCode: o.modelCode || (bike ? bike.modelCode : "Zuboo Special"),
          regularPrice: o.regularPriceLKR ? `LKR ${o.regularPriceLKR.toLocaleString()}` : undefined,
          promoPrice: `LKR ${o.promoPriceLKR.toLocaleString()}`,
          savings: o.savingsLKR ? `Save LKR ${o.savingsLKR.toLocaleString()}` : undefined,
          image: o.image || (bike ? bike.mainImage : "/bikes/t3/t3.webp"),
          highlights: o.highlights && o.highlights.length > 0 ? o.highlights : [
            "Official factory warranty included",
            "Showroom test ride inspection available in Galle",
            "Genuine Zuboo battery pack and intelligent controller",
          ],
          specs: {
            motor: bike ? bike.motorPower : "High-Efficiency Torque",
            range: bike ? bike.advertisedRange : "80 - 100 km",
            battery: bike ? bike.battery : "72V Power Pack",
          },
          whatsAppText: o.whatsAppText || `Hi ${settings.showroomName || "Udan Enterprises"}, I would like to inquire about the ${o.title} offer (Promo Price: LKR ${o.promoPriceLKR.toLocaleString()}).`,
          isPopular: o.isPopular,
        };
      })
    : CURRENT_OFFERS;

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Editorial Header */}
        <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#E0E8EC]">
          <div className="editorial-container relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 mb-6">
                <Percent className="w-3.5 h-3.5" />
                <span>Advertised Promotions & Incentives</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111820] leading-[1.1] mb-6 uppercase">
                Special Offers & <br />
                <span className="text-[#346C83]">Promotional Savings</span>
              </h1>

              <p className="text-base sm:text-lg text-[#667780] leading-relaxed max-w-2xl font-normal">
                Take advantage of limited-allotment introductory pricing, instant cash discounts, free accessory
                bundles, and our official petrol-to-electric exchange program at our {settings.city || "Galle"} showroom.
              </p>
            </div>
          </div>
        </section>

        {/* Mandatory Transparency Disclaimer Banner */}
        <section className="bg-amber-50/70 border-b border-amber-200/80 py-5">
          <div className="editorial-container">
            <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-amber-100/60 border border-amber-300/80 text-amber-950 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold uppercase tracking-wider block text-amber-900 text-xs">
                  Provisional Pricing & Offer Transparency Notice
                </strong>
                <p className="leading-relaxed text-amber-900/90 text-xs sm:text-[13px]">
                  All prices, cash discounts (such as the KB1 promotion), free accessory packages, and battery specifications
                  displayed on this page are transcribed from active marketing campaigns and are provisional. Final retail
                  pricing, live inventory status, and on-road documentation costs must be verified directly with our {settings.city || "Galle"}
                  {" "}showroom sales team prior to payment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Special Offers Grid */}
        <section className="py-14 sm:py-20 border-b border-[#E0E8EC] bg-white">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#346C83] block mb-1">
                  Active Campaigns
                </span>
                <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase">
                  Current Advertised Models & Incentives
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#667780] max-w-md">
                Click any WhatsApp inquiry button to verify live stock and reserve your promotional deal directly with our sales team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#F7F9FA] ${
                    offer.isPopular
                      ? "border-[#346C83] shadow-md shadow-[#346C83]/5 ring-1 ring-[#346C83]/20"
                      : "border-[#E0E8EC] hover:border-slate-400/80"
                  }`}
                >
                  <div className="p-6 sm:p-7">
                    {/* Badge and Title */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${offer.badgeColor}`}
                      >
                        {offer.badge}
                      </span>
                      {offer.savings && (
                        <span className="text-[11px] font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                          {offer.savings}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-extrabold text-xl text-[#111820]">
                      {offer.title}
                    </h3>
                    <span className="text-xs text-[#667780] font-mono block mt-0.5">
                      Model Code: {offer.modelCode}
                    </span>

                    {/* Image Stage */}
                    <div className="relative h-48 w-full my-5 rounded-2xl bg-white border border-[#E0E8EC] overflow-hidden flex items-center justify-center p-3 group">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Pricing */}
                    <div className="p-3.5 rounded-2xl bg-white border border-[#E0E8EC] mb-5 flex items-baseline justify-between">
                      <div>
                        {offer.regularPrice && (
                          <span className="text-xs line-through text-[#667780] block font-medium">
                            Regular: {offer.regularPrice}
                          </span>
                        )}
                        <div className="font-heading font-black text-xl text-[#111820]">
                          {offer.promoPrice}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#346C83] font-bold uppercase tracking-wider bg-[#E8F1F5] px-2 py-1 rounded">
                        Provisional
                      </span>
                    </div>

                    {/* Specs 3-row */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E0E8EC] text-[11px] mb-5">
                      <div>
                        <span className="text-[#667780] block text-[10px]">Motor</span>
                        <strong className="text-[#111820] font-bold">{offer.specs.motor.split(" ")[0]}</strong>
                      </div>
                      <div>
                        <span className="text-[#667780] block text-[10px]">Range</span>
                        <strong className="text-[#111820] font-bold">{offer.specs.range}</strong>
                      </div>
                      <div>
                        <span className="text-[#667780] block text-[10px]">Battery</span>
                        <strong className="text-[#111820] font-bold">{offer.specs.battery.split(" ")[0]}</strong>
                      </div>
                    </div>

                    {/* Highlights bullet list */}
                    <ul className="space-y-2 text-xs text-[#667780]">
                      {offer.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0">
                    <a
                      href={getWhatsAppLink(offer.whatsAppText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#111820] hover:bg-[#346C83] transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>Claim via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trade-In Exchange & Fleet Schemes */}
        <section className="py-14 sm:py-20 border-b border-[#E0E8EC] bg-[#F7F9FA]">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Scheme 1: Petrol Trade-In */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E0E8EC] shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4">
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Petrol-To-Electric Exchange Program</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-[#111820] uppercase mb-3">
                    Trade In Your Petrol Bike. Drive Away in a Zuboo.
                  </h3>

                  <p className="text-sm text-[#667780] leading-relaxed mb-6">
                    Say farewell to volatile fuel prices, high engine oil costs, and constant carburetor tuning.
                    Bring your running petrol motorcycle or scooter to our Galle showroom for a swift physical evaluation.
                    Apply its appraised market value as an immediate down payment credit on any brand-new Zuboo EV model.
                  </p>

                  <div className="space-y-2.5 text-xs text-[#667780] mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Transparent fair-market valuation performed on-site in Galle</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Instant balance deduction against your chosen Zuboo electric bike</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Smooth ownership transfer and registration paperwork assistance</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(
                    "Hi Udan Enterprises, I would like to inquire about the Petrol-to-Electric Trade-In Exchange Program. I have a petrol bike I want to evaluate."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire About Trade-In Valuation</span>
                </a>
              </div>

              {/* Scheme 2: Corporate & Fleet Incentive */}
              <div className="p-8 sm:p-10 rounded-3xl bg-[#111820] text-white border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 mb-4">
                    <Truck className="w-3.5 h-3.5 text-[#346C83]" />
                    <span>Fleet & Commercial Operators</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white uppercase mb-3">
                    Corporate Fleet & Commercial Delivery Packages
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Designed for couriers, hoteliers, restaurant delivery services, and commercial fleets in Southern Province.
                    Dramatically lower your company&apos;s daily logistics overhead with zero-emission Zuboo delivery models,
                    volume price incentives, and dedicated spare parts priority.
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-300 mb-8">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>Volume tiered purchase discounts for 3+ units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>Heavy-duty tail cargo racks and delivery box integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                      <span>Priority turnaround at our Galle after-sales workshop</span>
                    </div>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink(
                    "Hi Udan Enterprises, I am inquiring on behalf of a company regarding your Corporate & Fleet Delivery Packages for Zuboo electric bikes."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-[#111820] bg-white hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#346C83]" />
                  <span>Request Corporate Fleet Quote</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Analyzed Promotional Campaign Packages & Value Matrix */}
        <section className="py-14 sm:py-20 border-b border-[#E0E8EC] bg-white">
          <div className="editorial-container">
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E14] block mb-1">
                Synthesized Campaign Register
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase tracking-tight">
                Verified Campaign Packages &amp; Value Matrix
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#667780] leading-relaxed">
                Comprehensive breakdown of verified promotional incentives transcribed from showroom bulletins.
                All offers include genuine factory spare parts support and certified showroom technicians in Kurunduwatta, Galle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {ANALYZED_CAMPAIGN_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] hover:border-[#FF5E14] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5E14] bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                        {pkg.tag}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        Galle Stock
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#111820] mb-1 group-hover:text-[#FF5E14] transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mb-4">
                      {pkg.model}
                    </p>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/80 mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Promo Price</span>
                        <span className="text-sm font-black text-[#111820]">{pkg.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Key Benefit</span>
                        <span className="text-xs font-bold text-emerald-700">{pkg.benefit}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs mb-5">
                      <div className="flex items-start gap-1.5 text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E14] shrink-0 mt-0.5" />
                        <span className="text-[11px]"><strong>Free:</strong> {pkg.freeIncluded}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-[11px]"><strong>Warranty:</strong> {pkg.warranty}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 italic pt-1">
                        * {pkg.terms}
                      </div>
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(
                      `Hello Udan Enterprises, I would like to inquire about ${pkg.title} (${pkg.model}) with ${pkg.benefit} at ${pkg.price}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-900 group-hover:bg-[#FF5E14] text-white text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions regarding Offers */}
        <section className="py-14 sm:py-20 border-b border-[#E0E8EC] bg-[#F7F9FA]">
          <div className="editorial-container">
            <div className="max-w-2xl mb-12">
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820] uppercase">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#667780]">
                Everything you need to know about our promotional campaigns and showroom policies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-2">
                  How do I lock in an advertised promotional price?
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Due to high demand and limited stock batches in Sri Lanka, click the WhatsApp button next to the desired offer
                  or call our showroom hotline at 078 496 9652. Our team will verify current stock availability and assist you
                  with reserving the unit.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-2">
                  What does the advertised warranty include?
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Promotional posters specify up to a 2-year / 20,000 km warranty on the battery and hub motor, alongside a 3-year
                  chassis warranty on selected models. Exact terms are verified upon showroom inspection and detailed in your official warranty booklet.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-2">
                  Can I test ride an offer model before purchasing?
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Yes, absolutely. We encourage every customer to book a free test ride to experience the real-world ergonomics,
                  acceleration, and braking before making a commitment.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-2">
                  Are spare parts included under the promotion?
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Each vehicle comes fully assembled with genuine original components. Routine wear-and-tear items (brake pads, tires)
                  are kept in stock at our Galle service center at fair, official OEM replacement rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Bottom Banner */}
        <section className="py-16 bg-[#111820] text-white">
          <div className="editorial-container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase text-white">
                Don&apos;t Miss Out on Limited Allotment Savings
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Promotional allocations are assigned on a first-come, first-served basis. Connect with our Galle showroom today.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  href="/test-ride"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#346C83] hover:bg-[#28576b] text-white transition-all shadow-md flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Test Ride</span>
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>Showroom Location & Contact</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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
