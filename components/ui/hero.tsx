"use client";

import Image from "next/image";
import { Zap, MapPin, Calendar, ArrowRight, ShieldCheck, Leaf, Sparkles } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onCtaClick?: () => void;
  onOpenTestRide?: () => void;
}

export default function Hero({
  title = "ZUBOO EV BIKES Powered by UDAN ENTERPRISES",
  subtitle = "Ride the Future with Stylish, Smart Electric Mobility",
  buttonText = "Explore 9 Models",
  onCtaClick,
  onOpenTestRide,
}: HeroProps) {
  const handleExploreClick = () => {
    if (onCtaClick) {
      onCtaClick();
      return;
    }
    const target =
      document.getElementById("fleet") ||
      document.getElementById("featured-models") ||
      document.getElementById("showroom-fleet");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVisitShowroom = () => {
    const showroom = document.getElementById("showroom-location");
    if (showroom) {
      showroom.scrollIntoView({ behavior: "smooth" });
    } else if (onOpenTestRide) {
      onOpenTestRide();
    }
  };

  const handleBookTestRide = () => {
    if (onOpenTestRide) {
      onOpenTestRide();
    } else {
      const target =
        document.getElementById("showroom-location") ||
        document.getElementById("fleet");
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-[#0a0a0c] text-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
      {/* Background automotive ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-red-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-red-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek Automotive Eyebrow Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wide text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#FF5E14] animate-pulse" />
            <span className="text-[#FF5E14] font-bold">UDAN ENTERPRISES</span>
            <span className="text-white/30">•</span>
            <span>Official Zuboo Electric Dealership</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="text-emerald-400 font-bold">● Showroom Open in Galle</span>
            <span className="text-white/20">|</span>
            <span>Udugama Rd, Pinnaduwa</span>
          </div>
        </div>

        {/* Accessibility & SEO Headings (Visual content embedded in high-res graphic) */}
        <h1 className="sr-only">{title}</h1>
        <p className="sr-only">{subtitle}</p>

        {/* Center Visual: 16:9 Official Graphic Banner with Desktop Interactive Hotspots */}
        <div className="relative w-full aspect-[16/9] min-h-[240px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[580px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 bg-[#101014]">
          <Image
            src="/media/branding/udan-hero-banner.webp"
            alt="ZUBOO EV BIKES Powered by UDAN ENTERPRISES - Ride the Future with Stylish, Smart Electric Mobility"
            fill
            priority={true}
            {...({ fetchPriority: "high" } as Record<string, unknown>)}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover w-full h-full select-none"
          />

          {/* Desktop Interactive Hotspots Overlaid on Banner Buttons */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left Hotspot: "Explore Models" */}
            <button
              type="button"
              onClick={handleExploreClick}
              title="Explore Models"
              aria-label="Explore Zuboo Models"
              className="pointer-events-auto absolute rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-[#FF5E14] hover:bg-[#FF5E14]/15 hover:shadow-[0_0_20px_rgba(255,94,20,0.6)] focus:outline-hidden focus:ring-2 focus:ring-[#FF5E14] active:scale-95"
              style={{
                left: "34.2%",
                top: "41.5%",
                width: "16.8%",
                height: "6.5%",
              }}
            />

            {/* Right Hotspot: "Visit Showroom" */}
            <button
              type="button"
              onClick={handleVisitShowroom}
              title="Visit Showroom"
              aria-label="Visit Galle Showroom"
              className="pointer-events-auto absolute rounded-full cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-white/80 hover:bg-white/15 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] focus:outline-hidden focus:ring-2 focus:ring-white active:scale-95"
              style={{
                left: "52.0%",
                top: "41.5%",
                width: "14.0%",
                height: "6.5%",
              }}
            />
          </div>
        </div>

        {/* Sleek Action Bar (Mobile / Under Banner) */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {/* 1. Explore 9 Models */}
          <button
            type="button"
            onClick={handleExploreClick}
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FF5E14] via-[#FF6B2B] to-[#E51937] hover:from-[#E04D09] hover:to-[#C4122D] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-orange-600/30 active:scale-95 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-white animate-pulse" />
            <span>{buttonText || "Explore 9 Models"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* 2. Visit Galle Showroom */}
          <button
            type="button"
            onClick={handleVisitShowroom}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#16161c] hover:bg-[#202028] text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/15 hover:border-white/30 shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#FF5E14]" />
            <span>Visit Galle Showroom</span>
          </button>

          {/* 3. Book Free Test Ride */}
          <button
            type="button"
            onClick={handleBookTestRide}
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-[#FF5E14]/10 text-white hover:text-[#FF8C38] font-bold text-xs sm:text-sm uppercase tracking-wider border border-[#FF5E14]/40 hover:border-[#FF5E14] shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#FF5E14]" />
            <span>Book Free Test Ride</span>
          </button>
        </div>

        {/* 4 Official Badges under Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Zap className="w-4 h-4 text-[#FF5E14] shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Electric Power
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Leaf className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Eco Friendly
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Stylish Design
            </span>
          </div>
          <div className="flex items-center justify-center gap-2.5 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Smart Mobility
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
