"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Menu, X, MessageSquare, Calculator, Wrench } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslation } from "@/lib/i18n";

interface NavbarProps {
  onOpenTestRide?: () => void;
}

export default function Navbar({ onOpenTestRide }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl py-2.5 border-b border-slate-200/60 shadow-sm"
          : "bg-white/75 backdrop-blur-xl py-3.5 border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Mark with Big Logos */}
          <Link href="/" className="flex items-center gap-3.5 group mr-6">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0">
              <Image
                src="/media/branding/udan-logo.png"
                alt="Udan Enterprises"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base sm:text-lg tracking-tight text-slate-900 leading-none uppercase">
                UDAN <span className="text-[#FF5E14]">ENTERPRISES</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider text-slate-500 uppercase font-bold mt-1">
                Authorized Zuboo Dealership • Galle
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-300 mx-3" />
            <div className="hidden sm:block relative h-8 sm:h-10 w-24 sm:w-32 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image
                src="/zuboo-logo.webp"
                alt="Zuboo Electric Bikes"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-[#667780]">
            <Link href="/" className="hover:text-[#111820] transition-colors">
              {t.nav_overview}
            </Link>
            <Link href="/bikes" className="hover:text-[#111820] transition-colors">
              {t.nav_bikes}
            </Link>
            <Link
              href="/calculator"
              className="hover:text-[#111820] text-[#346C83] flex items-center gap-1 transition-colors font-extrabold"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.nav_calculator}</span>
            </Link>
            <Link
              href="/parts"
              className="hover:text-[#111820] flex items-center gap-1 transition-colors"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.nav_parts}</span>
            </Link>
            <Link
              href="/offers"
              className="hover:text-[#111820] transition-colors flex items-center gap-1.5"
            >
              <span>{t.nav_offers}</span>
              <span className="px-1.5 py-0.2 text-[8px] font-black uppercase rounded bg-red-100 text-red-600 border border-red-200">
                {t.nav_deals_badge}
              </span>
            </Link>
            <Link
              href="/service"
              className="hover:text-[#111820] flex items-center gap-1 transition-colors"
            >
              <span>Service</span>
            </Link>
            <Link
              href="/warranty"
              className="hover:text-[#111820] flex items-center gap-1 transition-colors"
            >
              <span>Warranty</span>
            </Link>
            <Link href="/about" className="hover:text-[#111820] transition-colors">
              {t.nav_about}
            </Link>
            <Link href="/contact" className="hover:text-[#111820] transition-colors">
              {t.nav_showroom}
            </Link>
          </nav>

          {/* Right Action Elements: Language Switcher + Inquire + Test Ride */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Trilingual Language Selector */}
            <LanguageSwitcher />

            <a
              href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#111820] bg-[#E8F1F5] hover:bg-[#d8e7ee] transition-colors border border-[#E0E8EC]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#346C83]" />
              <span>{t.nav_inquire}</span>
            </a>

            {onOpenTestRide ? (
              <button
                onClick={onOpenTestRide}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#111820] hover:bg-[#346C83] transition-colors shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.nav_test_ride}</span>
              </button>
            ) : (
              <Link
                href="/test-ride"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#111820] hover:bg-[#346C83] transition-colors shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.nav_test_ride}</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Controls: Language Switcher + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111820] hover:text-[#346C83]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F9FA] border-b border-[#E0E8EC] px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3 text-sm font-semibold text-[#111820]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60"
            >
              {t.nav_overview}
            </Link>
            <Link
              href="/bikes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60"
            >
              {t.nav_bikes} (All 8 Models)
            </Link>
            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60 flex items-center justify-between text-[#346C83] font-bold"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span>{t.nav_calculator}</span>
              </span>
              <span className="text-[10px] bg-[#E8F1F5] text-[#346C83] px-2 py-0.5 rounded font-extrabold">
                LKR EMI
              </span>
            </Link>
            <Link
              href="/parts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60 flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-[#667780]" />
              <span>{t.nav_parts}</span>
            </Link>
            <Link
              href="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60 flex items-center justify-between"
            >
              <span>{t.nav_offers}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-red-100 text-red-600">
                {t.nav_deals_badge}
              </span>
            </Link>
            <Link
              href="/service"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60 flex items-center justify-between"
            >
              <span>After-Sales Service</span>
              <span className="text-[10px] bg-[#E8F1F5] text-[#346C83] px-2 py-0.5 rounded font-extrabold">
                Galle Bay
              </span>
            </Link>
            <Link
              href="/warranty"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60 flex items-center justify-between"
            >
              <span>Digital Warranty (VIN)</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-extrabold border border-emerald-200">
                Active
              </span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60"
            >
              {t.nav_about}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E0E8EC]/60"
            >
              {t.nav_showroom}
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20inquire%20about%20Zuboo%20electric%20bikes."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#E8F1F5] text-[#111820] text-xs font-bold uppercase"
              >
                <MessageSquare className="w-4 h-4 text-[#346C83]" />
                <span>WhatsApp Inquiry</span>
              </a>
              {onOpenTestRide ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTestRide();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#111820] text-white text-xs font-bold uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav_test_ride}</span>
                </button>
              ) : (
                <Link
                  href="/test-ride"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-lg bg-[#111820] text-white text-xs font-bold uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.nav_test_ride}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
