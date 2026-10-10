"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Menu,
  X,
  MessageSquare,
  Calculator,
  Wrench,
  ChevronDown,
  ChevronRight,
  Layers,
  Zap,
  Gauge,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
  MapPin,
  Info,
  Lock,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BrandBounceText from "@/components/BrandBounceText";
import { useTranslation } from "@/lib/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavbarProps {
  onOpenTestRide?: () => void;
}

export default function Navbar({ onOpenTestRide }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);

    // Subtle GSAP entrance animation for header elements
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -18,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      }
    }, headerRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Dropdown hover helpers with seamless 180ms grace buffer
  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileAccordion(mobileAccordion === key ? null : key);
  };

  // Subcategories Data
  const bikesSubcategories = [
    {
      title: "All 8 Zuboo Models",
      href: "/bikes",
      badge: "8 Models",
      badgeColor: "bg-orange-100 text-[#FF5E14] border-orange-200",
      subtitle: "Complete showroom lineup & specifications",
      icon: Layers,
    },
    {
      title: "City Commuters",
      href: "/bikes",
      badge: "Eco City",
      badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
      subtitle: "Zuboo Mini & KB1 • High efficiency daily transit",
      icon: Zap,
    },
    {
      title: "Sport & Touring",
      href: "/bikes",
      badge: "GT & T-Series",
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
      subtitle: "Zuboo GT, T3 & T11 • Long-distance performance",
      icon: Gauge,
    },
    {
      title: "Utility Cargo",
      href: "/bikes",
      badge: "3000W Peak",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      subtitle: "The Tank 3000W • Heavy payload hauler",
      icon: ShieldCheck,
    },
    {
      title: "Retro Vintage",
      href: "/bikes",
      badge: "Classic 1200W",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      subtitle: "Zuboo Paris 1200W • European luxury cruiser",
      icon: Sparkles,
    },
    {
      title: "Model Comparison",
      href: "/bikes",
      badge: "Compare",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      subtitle: "Side-by-side battery, speed & range specs",
      icon: SlidersHorizontal,
    },
  ];

  const servicesSubcategories = [
    {
      title: "EMI Loan Calculator",
      href: "/calculator",
      badge: "LKR Plan",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
      subtitle: "Low monthly payment estimates in LKR",
      icon: Calculator,
    },
    {
      title: "Genuine Spare Parts",
      href: "/parts",
      badge: "OEM Spares",
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
      subtitle: "100% OEM batteries, motors & brake pads",
      icon: Wrench,
    },
    {
      title: "Service Bay Booking",
      href: "/service",
      badge: "Galle Bay",
      badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
      subtitle: "Kurunduwatta Galle service & diagnostics",
      icon: Calendar,
    },
    {
      title: "Digital Warranty Lookup",
      href: "/warranty",
      badge: "VIN Active",
      badgeColor: "bg-teal-100 text-teal-700 border-teal-200",
      subtitle: "Verify your VIN & battery warranty status",
      icon: ShieldCheck,
    },
  ];

  const aboutSubcategories = [
    {
      title: "About Udan Enterprises",
      href: "/about",
      badge: "Our Story",
      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
      subtitle: "Authorized dealership history & green vision",
      icon: Info,
      isTestRide: false,
    },
    {
      title: "Kurunduwatta Galle Showroom",
      href: "/contact",
      badge: "Galle Hub",
      badgeColor: "bg-orange-100 text-[#FF5E14] border-orange-200",
      subtitle: "Visit our Galle physical showroom & test track",
      icon: MapPin,
      isTestRide: false,
    },
    {
      title: "Free Test Ride",
      href: "/test-ride",
      badge: "Experience",
      badgeColor: "bg-red-100 text-red-600 border-red-200",
      subtitle: "Book your hands-on test drive experience",
      icon: Sparkles,
      isTestRide: true,
    },
    {
      title: "Staff CMS Admin",
      href: "/admin",
      badge: "Staff Only",
      badgeColor: "bg-slate-100 text-slate-600 border-slate-200",
      subtitle: "Dealership inventory & inquiry portal",
      icon: Lock,
      isTestRide: false,
    },
  ];

  return (
    <header
      ref={headerRef}
      className={`main-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl py-2.5 border-b border-slate-200/80 shadow-md shadow-slate-900/5"
          : "bg-white/80 backdrop-blur-xl py-3.5 border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* ================================================================= */}
          {/* 1. LEFT: Brand Logo (Udan Enterprises + Zuboo Logo)               */}
          {/* ================================================================= */}
          <div className="shrink-0 flex items-center mr-4">
            <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group select-none">
              <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0">
                <Image
                  src="/media/branding/udan-logo.png"
                  alt="Udan Enterprises"
                  fill
                  priority
                  sizes="48px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center">
                <BrandBounceText sizeClassName="text-base sm:text-lg" className="animate-bounce-subtle" />
                <span className="text-[9px] sm:text-[10px] tracking-wider text-slate-500 uppercase font-bold mt-1 whitespace-nowrap">
                  Authorized Zuboo Dealership • Galle
                </span>
              </div>
              <div className="hidden sm:block h-7 w-px bg-slate-300/80 mx-2" />
              <div className="hidden sm:block relative h-7 sm:h-8 w-20 sm:w-24 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/zuboo-logo.webp"
                  alt="Zuboo Electric Bikes"
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* ================================================================= */}
          {/* 2. CENTER: Perfectly Centered Main Navigation with Dropdowns     */}
          {/* ================================================================= */}
          <div className="hidden xl:flex flex-1 justify-center items-center px-2" ref={navRef}>
            <nav className="flex items-center gap-1.5 lg:gap-2.5 text-[12px] font-bold uppercase tracking-wider text-slate-700">
              {/* Category 1: OVERVIEW */}
              <Link
                href="/"
                className="px-3.5 py-2 rounded-lg text-slate-700 hover:text-[#FF5E14] hover:bg-slate-50/90 transition-colors whitespace-nowrap"
              >
                {t.nav_overview || "Overview"}
              </Link>

              {/* Category 2: BIKES FLEET ▾ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("bikes")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "bikes" ? null : "bikes")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                    activeDropdown === "bikes"
                      ? "text-[#FF5E14] bg-orange-50/70"
                      : "text-slate-700 hover:text-[#FF5E14] hover:bg-slate-50/90"
                  }`}
                  aria-expanded={activeDropdown === "bikes"}
                >
                  <span className="whitespace-nowrap">{t.nav_bikes || "Bikes Fleet"}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "bikes" ? "rotate-180 text-[#FF5E14]" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Bikes Mega Dropdown Card */}
                <div
                  className={`absolute top-full pt-2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-out z-50 ${
                    activeDropdown === "bikes"
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 translate-y-1.5 pointer-events-none invisible"
                  }`}
                >
                  <div className="w-[580px] bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 p-3 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 mb-1.5 flex items-center justify-between border-b border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5E14] whitespace-nowrap">
                        Zuboo Electric Fleet Lineup
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        Southern Province Official
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {bikesSubcategories.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="p-2 rounded-lg bg-orange-50 text-[#FF5E14] group-hover/item:bg-[#FF5E14] group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FF5E14] transition-colors whitespace-nowrap">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase rounded border ${item.badgeColor} whitespace-nowrap`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap font-normal mt-0.5 leading-snug">
                              {item.subtitle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
                      <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                        3-Year Battery & Motor Warranty Included
                      </span>
                      <Link
                        href="/bikes"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[#FF5E14] font-bold text-[11px] hover:underline flex items-center gap-1 whitespace-nowrap"
                      >
                        <span>View Catalog</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category 3: SERVICES & FINANCE ▾ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("services")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "services" ? null : "services")
                  }
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                    activeDropdown === "services"
                      ? "text-[#FF5E14] bg-orange-50/70"
                      : "text-slate-700 hover:text-[#FF5E14] hover:bg-slate-50/90"
                  }`}
                  aria-expanded={activeDropdown === "services"}
                >
                  <span className="whitespace-nowrap">Services & Finance</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "services"
                        ? "rotate-180 text-[#FF5E14]"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                {/* Services Dropdown Card */}
                <div
                  className={`absolute top-full pt-2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-out z-50 ${
                    activeDropdown === "services"
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 translate-y-1.5 pointer-events-none invisible"
                  }`}
                >
                  <div className="w-[390px] bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 p-3 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 mb-1.5 flex items-center justify-between border-b border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#346C83] whitespace-nowrap">
                        Ownership & Support
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        Kurunduwatta Galle
                      </span>
                    </div>

                    <div className="space-y-1">
                      {servicesSubcategories.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                        >
                          <div className="p-2 rounded-lg bg-blue-50 text-[#346C83] group-hover/item:bg-[#346C83] group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FF5E14] transition-colors whitespace-nowrap">
                                {item.title}
                              </span>
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase rounded border ${item.badgeColor} whitespace-nowrap`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap font-normal mt-0.5 leading-snug">
                              {item.subtitle}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
                      <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                        Quick LKR Repayment Estimates
                      </span>
                      <Link
                        href="/calculator"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[#346C83] font-bold text-[11px] hover:underline flex items-center gap-1 whitespace-nowrap"
                      >
                        <span>Calculate EMI</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category 4: OFFERS */}
              <Link
                href="/offers"
                className="px-3.5 py-2 rounded-lg text-slate-700 hover:text-[#FF5E14] hover:bg-slate-50/90 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{t.nav_offers || "Offers"}</span>
                <span className="px-1.5 py-0.5 text-[8.5px] font-black uppercase rounded bg-red-100 text-red-600 border border-red-200 tracking-wider whitespace-nowrap animate-pulse">
                  {t.nav_deals_badge || "DEALS"}
                </span>
              </Link>

              {/* Category 5: ABOUT & SHOWROOM ▾ */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(activeDropdown === "about" ? null : "about")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
                    activeDropdown === "about"
                      ? "text-[#FF5E14] bg-orange-50/70"
                      : "text-slate-700 hover:text-[#FF5E14] hover:bg-slate-50/90"
                  }`}
                  aria-expanded={activeDropdown === "about"}
                >
                  <span className="whitespace-nowrap">About & Showroom</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "about" ? "rotate-180 text-[#FF5E14]" : "text-slate-400"
                    }`}
                  />
                </button>

                {/* About Dropdown Card */}
                <div
                  className={`absolute top-full pt-2 left-1/2 -translate-x-1/2 transition-all duration-200 ease-out z-50 ${
                    activeDropdown === "about"
                      ? "opacity-100 translate-y-0 pointer-events-auto visible"
                      : "opacity-0 translate-y-1.5 pointer-events-none invisible"
                  }`}
                >
                  <div className="w-[390px] bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 p-3 ring-1 ring-black/5">
                    <div className="px-3 py-1.5 mb-1.5 flex items-center justify-between border-b border-slate-100">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5E14] whitespace-nowrap">
                        Dealership Information
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                        Southern Province
                      </span>
                    </div>

                    <div className="space-y-1">
                      {aboutSubcategories.map((item) => {
                        if (item.isTestRide && onOpenTestRide) {
                          return (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => {
                                setActiveDropdown(null);
                                onOpenTestRide();
                              }}
                              className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item text-left"
                            >
                              <div className="p-2 rounded-lg bg-orange-50 text-[#FF5E14] group-hover/item:bg-[#FF5E14] group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FF5E14] transition-colors whitespace-nowrap">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase rounded border ${item.badgeColor} whitespace-nowrap`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-500 whitespace-nowrap font-normal mt-0.5 leading-snug">
                                  {item.subtitle}
                                </span>
                              </div>
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="p-2 rounded-lg bg-orange-50 text-[#FF5E14] group-hover/item:bg-[#FF5E14] group-hover/item:text-white transition-colors shrink-0 mt-0.5">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 group-hover/item:text-[#FF5E14] transition-colors whitespace-nowrap">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span
                                    className={`px-1.5 py-0.5 text-[8.5px] font-extrabold uppercase rounded border ${item.badgeColor} whitespace-nowrap`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 whitespace-nowrap font-normal mt-0.5 leading-snug">
                                {item.subtitle}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between px-3 text-xs">
                      <span className="text-[11px] font-medium text-slate-500 whitespace-nowrap">
                        Kurunduwatta Galle Physical Showroom
                      </span>
                      <Link
                        href="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="text-[#FF5E14] font-bold text-[11px] hover:underline flex items-center gap-1 whitespace-nowrap"
                      >
                        <span>Visit Us</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* ================================================================= */}
          {/* 3. RIGHT: Language Switcher + Inquire + Test Ride Button          */}
          {/* ================================================================= */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0 ml-4">
            <LanguageSwitcher />

            <a
              href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#111820] bg-[#E8F1F5] hover:bg-[#d8e7ee] transition-all border border-[#E0E8EC] whitespace-nowrap active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#346C83] shrink-0" />
              <span className="whitespace-nowrap">{t.nav_inquire || "Inquire"}</span>
            </a>

            {onOpenTestRide ? (
              <button
                type="button"
                onClick={onOpenTestRide}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04D09] transition-all shadow-md shadow-orange-500/20 whitespace-nowrap active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{t.nav_test_ride || "Test Ride"}</span>
              </button>
            ) : (
              <Link
                href="/test-ride"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E04D09] transition-all shadow-md shadow-orange-500/20 whitespace-nowrap active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{t.nav_test_ride || "Test Ride"}</span>
              </Link>
            )}
          </div>

          {/* ================================================================= */}
          {/* 4. MOBILE CONTROLS: Language + Menu Button                        */}
          {/* ================================================================= */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] p-2 flex items-center justify-center text-slate-800 hover:text-[#FF5E14] rounded-lg border border-slate-200/80 bg-white/80 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 5. MOBILE DRAWER: Smooth Accordions with 44px+ Touch Targets        */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-2xl px-4 sm:px-6 py-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5 text-sm font-semibold text-slate-900">
            {/* Mobile Category 1: OVERVIEW */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3.5 flex items-center rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap font-bold text-xs uppercase tracking-wider text-slate-800 border border-transparent hover:border-slate-200"
            >
              {t.nav_overview || "Overview"}
            </Link>

            {/* Mobile Category 2: BIKES FLEET Accordion */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/60">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("bikes")}
                className="w-full min-h-[44px] px-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Layers className="w-4 h-4 text-[#FF5E14] shrink-0" />
                  <span className="whitespace-nowrap">{t.nav_bikes || "Bikes Fleet"}</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-orange-100 text-[#FF5E14] px-1.5 py-0.5 rounded font-black whitespace-nowrap">
                    8 Models
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      mobileAccordion === "bikes" ? "rotate-180 text-[#FF5E14]" : ""
                    }`}
                  />
                </div>
              </button>

              {mobileAccordion === "bikes" && (
                <div className="border-t border-slate-200/70 bg-white p-2 space-y-1">
                  {bikesSubcategories.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[44px] px-3 py-2 flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <sub.icon className="w-4 h-4 text-[#FF5E14] shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                            {sub.title}
                          </span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {sub.subtitle}
                          </span>
                        </div>
                      </div>
                      {sub.badge && (
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${sub.badgeColor} whitespace-nowrap shrink-0`}
                        >
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Category 3: SERVICES & FINANCE Accordion */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/60">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("services")}
                className="w-full min-h-[44px] px-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Wrench className="w-4 h-4 text-[#346C83] shrink-0" />
                  <span className="whitespace-nowrap">Services & Finance</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileAccordion === "services" ? "rotate-180 text-[#346C83]" : ""
                  }`}
                />
              </button>

              {mobileAccordion === "services" && (
                <div className="border-t border-slate-200/70 bg-white p-2 space-y-1">
                  {servicesSubcategories.map((sub) => (
                    <Link
                      key={sub.title}
                      href={sub.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="min-h-[44px] px-3 py-2 flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <sub.icon className="w-4 h-4 text-[#346C83] shrink-0" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                            {sub.title}
                          </span>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">
                            {sub.subtitle}
                          </span>
                        </div>
                      </div>
                      {sub.badge && (
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${sub.badgeColor} whitespace-nowrap shrink-0`}
                        >
                          {sub.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Category 4: OFFERS */}
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[44px] px-3.5 flex items-center justify-between rounded-xl hover:bg-slate-50 transition-colors font-bold text-xs uppercase tracking-wider text-slate-800 border border-transparent hover:border-slate-200"
            >
              <span className="whitespace-nowrap">{t.nav_offers || "Offers"}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-red-100 text-red-600 border border-red-200 whitespace-nowrap animate-pulse">
                {t.nav_deals_badge || "DEALS"}
              </span>
            </Link>

            {/* Mobile Category 5: ABOUT & SHOWROOM Accordion */}
            <div className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/60">
              <button
                type="button"
                onClick={() => toggleMobileAccordion("about")}
                className="w-full min-h-[44px] px-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="whitespace-nowrap">About & Showroom</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileAccordion === "about" ? "rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>

              {mobileAccordion === "about" && (
                <div className="border-t border-slate-200/70 bg-white p-2 space-y-1">
                  {aboutSubcategories.map((sub) => {
                    if (sub.isTestRide && onOpenTestRide) {
                      return (
                        <button
                          key={sub.title}
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            onOpenTestRide();
                          }}
                          className="w-full min-h-[44px] px-3 py-2 flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <sub.icon className="w-4 h-4 text-emerald-600 shrink-0" />
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                                {sub.title}
                              </span>
                              <span className="text-[10px] text-slate-500 whitespace-nowrap">
                                {sub.subtitle}
                              </span>
                            </div>
                          </div>
                          {sub.badge && (
                            <span
                              className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${sub.badgeColor} whitespace-nowrap shrink-0`}
                            >
                              {sub.badge}
                            </span>
                          )}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="min-h-[44px] px-3 py-2 flex items-center justify-between rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <sub.icon className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 whitespace-nowrap">
                              {sub.title}
                            </span>
                            <span className="text-[10px] text-slate-500 whitespace-nowrap">
                              {sub.subtitle}
                            </span>
                          </div>
                        </div>
                        {sub.badge && (
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${sub.badgeColor} whitespace-nowrap shrink-0`}
                          >
                            {sub.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile CTAs */}
            <div className="pt-3 mt-1.5 border-t border-slate-200/80 flex flex-col gap-2">
              <a
                href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#E8F1F5] text-[#111820] text-xs font-bold uppercase tracking-wider whitespace-nowrap active:scale-98 transition-transform"
              >
                <MessageSquare className="w-4 h-4 text-[#346C83]" />
                <span className="whitespace-nowrap">{t.nav_inquire || "WhatsApp Inquiry"}</span>
              </a>

              {onOpenTestRide ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTestRide();
                  }}
                  className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#FF5E14] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap active:scale-98 transition-transform shadow-md shadow-orange-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="whitespace-nowrap">{t.nav_test_ride || "Book Test Ride"}</span>
                </button>
              ) : (
                <Link
                  href="/test-ride"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#FF5E14] text-white text-xs font-bold uppercase tracking-wider whitespace-nowrap active:scale-98 transition-transform shadow-md shadow-orange-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span className="whitespace-nowrap">{t.nav_test_ride || "Book Test Ride"}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
