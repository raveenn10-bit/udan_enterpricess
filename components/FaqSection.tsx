"use client";

import { useState, useId } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MapPin,
  DollarSign,
  TrendingUp,
  BatteryCharging,
  ShieldCheck,
  Calendar,
  Phone,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

type FaqCategory =
  | "All"
  | "General"
  | "Pricing & Savings"
  | "Charging & Battery"
  | "Warranty & Showroom";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Pricing & Savings" | "Charging & Battery" | "Warranty & Showroom";
  secondaryCategories?: FaqCategory[];
  icon: typeof HelpCircle;
  highlightBadge: string;
  keyMetric?: { label: string; value: string };
  actionLink?: {
    label: string;
    href: string;
    isExternal?: boolean;
    icon?: typeof Phone;
  };
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "showroom-location-faq",
    question: "Where is the official Zuboo electric bike showroom located in Sri Lanka?",
    answer:
      "The official Zuboo electric bike and scooter dealership is operated by Udan Enterprises, located on Udugama Road, Kurunduwatta, Pinnaduwa, Galle (just 3 minutes from the Pinnaduwa Southern Expressway E01 Interchange). Contact: 078 496 9652.",
    category: "General",
    secondaryCategories: ["Warranty & Showroom"],
    icon: MapPin,
    highlightBadge: "Galle Southern Province Dealership",
    keyMetric: {
      label: "Highway Access",
      value: "3 Min from Pinnaduwa E01 Interchange",
    },
    actionLink: {
      label: "Get Directions & Contact",
      href: "#showroom-location",
      icon: MapPin,
    },
  },
  {
    id: "pricing-faq",
    question: "What are the prices of Zuboo electric bikes in Sri Lanka in 2026?",
    answer:
      "Prices for official Zuboo electric bikes in Sri Lanka range from LKR 195,000 for the compact Zuboo Mini up to LKR 525,000 for the heavy-duty Zuboo The Tank (3000W) and Zuboo T16 (1500W). All models include high-capacity chargers, factory warranties, and complete showroom inspection.",
    category: "Pricing & Savings",
    icon: DollarSign,
    highlightBadge: "2026 Official Dealership Pricing",
    keyMetric: {
      label: "Price Spectrum",
      value: "LKR 195,000 – LKR 525,000",
    },
    actionLink: {
      label: "Explore All 9 Models",
      href: "#models",
      icon: ArrowRight,
    },
  },
  {
    id: "savings-faq",
    question: "How much money can I save riding a Zuboo electric bike compared to a petrol motorcycle?",
    answer:
      "Operating a Zuboo electric bike costs approximately LKR 1.20 to LKR 1.50 per kilometer in Sri Lanka, compared to LKR 14.00 to LKR 16.00 per kilometer for a petrol motorcycle. Daily commuters save over 90% on fuel expenses, totaling more than LKR 150,000 to LKR 220,000 in savings annually.",
    category: "Pricing & Savings",
    icon: TrendingUp,
    highlightBadge: "90%+ Operational Cost Reduction",
    keyMetric: {
      label: "Running Cost",
      value: "LKR 1.20 - 1.50 / km (vs LKR 16 / km Petrol)",
    },
    actionLink: {
      label: "Calculate Your Monthly Savings",
      href: "/calculator",
      icon: Zap,
    },
  },
  {
    id: "charging-faq",
    question: "How do I charge a Zuboo electric bike, and how long does it take?",
    answer:
      "All Zuboo electric bikes plug directly into a standard 230V domestic wall socket found in any Sri Lankan home or office. A full recharge takes 4 to 7 hours and consumes approximately 2 to 3 units of electricity (costing around LKR 120 - 180 per full charge).",
    category: "Charging & Battery",
    icon: BatteryCharging,
    highlightBadge: "Standard 230V Domestic Wall Socket",
    keyMetric: {
      label: "Full Charge Cost",
      value: "LKR 120 - 180 (2-3 CEB Units)",
    },
    actionLink: {
      label: "View Battery & Motor Tech",
      href: "#why-zuboo",
      icon: BatteryCharging,
    },
  },
  {
    id: "warranty-faq",
    question: "What warranty coverage is provided with Zuboo electric bikes in Sri Lanka?",
    answer:
      "Every Zuboo model purchased from Udan Enterprises includes an official 2-year or 20,000 km warranty covering the high-torque motor and battery pack, alongside a 3-year structural chassis warranty. Certified technician support and genuine replacement parts are stocked on-site at our Galle workshop.",
    category: "Warranty & Showroom",
    icon: ShieldCheck,
    highlightBadge: "Official Udan Enterprises Warranty",
    keyMetric: {
      label: "Coverage Terms",
      value: "2-Yr / 20,000 km Battery & Motor + 3-Yr Chassis",
    },
    actionLink: {
      label: "Showroom Warranty Details",
      href: "/warranty",
      icon: ShieldCheck,
    },
  },
  {
    id: "test-ride-faq",
    question: "Can I book a free test ride before buying?",
    answer:
      "Yes. Udan Enterprises offers 100% free, no-obligation test rides for all 9 Zuboo models (T16, GT, The Tank, Paris, T11, T3, Mini, EX008, KB1) at our Pinnaduwa, Galle dealership. Bookings can be made online or directly via WhatsApp at 078 496 9652.",
    category: "General",
    secondaryCategories: ["Warranty & Showroom"],
    icon: Calendar,
    highlightBadge: "100% Free · All 9 Models Ready",
    keyMetric: {
      label: "Fleet Available",
      value: "9 Flagship Models at Galle Dealership",
    },
    actionLink: {
      label: "Book Test Ride Online",
      href: "#showroom-location",
      icon: Calendar,
    },
  },
];

const CATEGORIES: { label: FaqCategory; count: number }[] = [
  { label: "All", count: FAQ_DATA.length },
  {
    label: "General",
    count: FAQ_DATA.filter(
      (item) => item.category === "General" || item.secondaryCategories?.includes("General")
    ).length,
  },
  {
    label: "Pricing & Savings",
    count: FAQ_DATA.filter((item) => item.category === "Pricing & Savings").length,
  },
  {
    label: "Charging & Battery",
    count: FAQ_DATA.filter((item) => item.category === "Charging & Battery").length,
  },
  {
    label: "Warranty & Showroom",
    count: FAQ_DATA.filter(
      (item) =>
        item.category === "Warranty & Showroom" ||
        item.secondaryCategories?.includes("Warranty & Showroom")
    ).length,
  },
];

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>("All");
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id]);
  const baseId = useId();

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (selectedCategory === "All") return true;
    return (
      item.category === selectedCategory ||
      item.secondaryCategories?.includes(selectedCategory)
    );
  });

  // JSON-LD Structured Data Schema for Google AEO, Featured Snippets, and AI Engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Zuboo Electric Bikes Sri Lanka - Frequently Asked Questions & AEO Knowledge Hub",
    description:
      "Authoritative answers on Zuboo electric bike showroom location in Galle, 2026 prices, fuel cost savings, 230V home charging times, warranties, and free test rides by Udan Enterprises.",
    publisher: {
      "@type": "Organization",
      name: "Udan Enterprises",
      url: "https://zubooudan.com",
      telephone: "+94784969652",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Udugama Road, Kurunduwatta, Pinnaduwa",
        addressLocality: "Galle",
        addressRegion: "Southern Province",
        addressCountry: "LK",
      },
    },
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      data-scroll-section
      className="reveal-section py-20 lg:py-28 bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 border-b border-slate-200 relative overflow-hidden"
      aria-labelledby="faq-main-heading"
    >
      {/* Embedded JSON-LD FAQPage Schema for Search & AI Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Decorative ambient background glows */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5E14] text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5E14]" />
            <span>AEO &amp; GEO Verified Knowledge Base</span>
          </div>

          <h2
            id="faq-main-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-manrope leading-[1.15]"
          >
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Direct, verified answers regarding official Zuboo electric bikes in Sri Lanka,
            dealership location in Pinnaduwa, 2026 pricing, charging, and fuel savings.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setSelectedCategory(cat.label)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm shadow-slate-900/10 scale-102"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIds.includes(faq.id);
            const headerId = `${baseId}-header-${faq.id}`;
            const contentId = `${baseId}-content-${faq.id}`;
            const IconComponent = faq.icon;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#FF5E14]/40 shadow-lg shadow-orange-500/5 ring-1 ring-[#FF5E14]/20"
                    : "bg-white/90 hover:bg-white border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  id={headerId}
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E14] focus-visible:ring-offset-2 transition-colors"
                >
                  <div className="flex items-start gap-3.5 sm:gap-4 flex-1">
                    {/* Icon container */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-orange-50 text-[#FF5E14]"
                          : "bg-slate-100 text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    <div className="space-y-1">
                      {/* Category & Badge pill */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {faq.highlightBadge}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-manrope leading-snug pt-0.5">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Accordion Toggle Indicator */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#FF5E14] text-white border-[#FF5E14] rotate-180 shadow-xs"
                        : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                    }`}
                    aria-hidden="true"
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Smooth Animated Content Expansion using CSS Grid */}
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-slate-100/80">
                      {/* Direct Authoritative Answer */}
                      <div className="mt-4 p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-slate-800 text-sm sm:text-base leading-relaxed">
                        <p className="font-normal text-slate-800">{faq.answer}</p>

                        {/* Micro-metric fact callout */}
                        {faq.keyMetric && (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Key Fact / Metric:
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                              {faq.keyMetric.value}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action / Deep link button */}
                      {faq.actionLink && (
                        <div className="mt-4 flex items-center justify-end">
                          <Link
                            href={faq.actionLink.href}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#FF5E14] hover:text-orange-700 hover:underline transition-colors group"
                          >
                            <span>{faq.actionLink.label}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help Desk & Direct Hotline Box */}
        <div className="max-w-4xl mx-auto mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5 max-w-lg">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-widest">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Personalized Guidance?</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black font-manrope text-white">
                Have questions regarding Zuboo models or test rides?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our Pinnaduwa Galle showroom staff is ready to help with specs, financing,
                registrations, and test ride bookings across the Southern Province.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises%2C%20I%20have%20a%20question%20about%20Zuboo%20electric%20bikes."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 078 496 9652</span>
              </a>

              <a
                href="tel:0784969652"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
