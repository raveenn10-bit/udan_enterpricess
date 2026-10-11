"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Home,
  Compass,
  Calendar,
  Phone,
  Zap,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  Gauge,
  BatteryCharging,
} from "lucide-react";

const POPULAR_MODELS = [
  {
    name: "Zuboo T16",
    subtitle: "1500W Heavy Duty",
    category: "Sports Maxi & Cargo",
    power: "1500W (2000W Peak)",
    range: "≥ 90 km",
    speed: "65 km/h",
    slug: "t16",
    image: "/bikes/t16/t16.webp",
    badge: "Heavy Duty Commuter",
    badgeColor: "bg-[#FF5E14]/15 text-[#FF5E14] border-[#FF5E14]/30",
  },
  {
    name: "Zuboo The Tank",
    subtitle: "3000W All-Terrain",
    category: "Extreme Power",
    power: "3000W Peak",
    range: "≥ 80 km",
    speed: "75 km/h",
    slug: "the-tank",
    image: "/bikes/tank/tank.webp",
    badge: "All-Terrain Dominance",
    badgeColor: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  {
    name: "Zuboo GT",
    subtitle: "1800W Touring",
    category: "Touring & Adventure",
    power: "1800W High Torque",
    range: "≥ 100 km",
    speed: "60 km/h",
    slug: "gt",
    image: "/bikes/gt/gt.webp",
    badge: "Dual-Sport Touring",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    name: "Zuboo Paris",
    subtitle: "Retro European",
    category: "Retro Classic",
    power: "1200W Smooth",
    range: "≥ 80 km",
    speed: "60 km/h",
    slug: "paris",
    image: "/bikes/paris/paris.webp",
    badge: "Vintage Elegance",
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  {
    name: "Zuboo Mini",
    subtitle: "City Commuter",
    category: "Compact Utility",
    power: "490W Eco Motor",
    range: "> 32 km",
    speed: "30 km/h",
    slug: "mini",
    image: "/bikes/mini/mini.webp",
    badge: "Urban Eco Freedom",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#07090E] text-white selection:bg-[#FF5E14] selection:text-white">
      {/* Universal Navigation */}
      <Navbar />

      <main className="flex-1 relative overflow-hidden pt-28 pb-20">
        {/* Automotive Lighting Background Glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-b from-[#FF5E14]/15 via-[#E51937]/10 to-transparent blur-[140px] rounded-full" />
          <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#FF5E14]/10 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
          {/* Subtle Cyber Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Brand Tagline */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-pulse" />
              <span>Udan Enterprises • Zuboo Electric Vehicles Galle</span>
            </span>
          </div>

          {/* Hero 404 Visual Block */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Massive Electric 404 Headliner */}
            <div className="relative inline-block select-none">
              <h1 className="text-8xl sm:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
                404
              </h1>
              <div className="absolute -inset-1 blur-2xl bg-gradient-to-r from-[#FF5E14]/30 to-[#E51937]/30 -z-10 opacity-70" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-[#FF5E14] text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-[#FF5E14]/40">
                Route Signal Lost
              </div>
            </div>

            {/* Bilingual Headings */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                Destination Not Found{" "}
                <span className="text-[#FF5E14]">/</span>{" "}
                <span className="text-slate-300 font-semibold text-xl sm:text-2xl">
                  පිටුව හමු නොවීය
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                The electric route you are looking for has been moved, renamed,
                or is unavailable in our Galle showroom catalog.
              </p>
            </div>

            {/* Quick Action Buttons Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              <Link
                href="/"
                className="group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#E51937] hover:from-[#e04d09] hover:to-[#c4152f] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#FF5E14]/25 hover:shadow-xl hover:shadow-[#FF5E14]/40 hover:-translate-y-0.5"
              >
                <Home className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                <span>Return to Showroom Home</span>
              </Link>

              <Link
                href="/bikes"
                className="group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                <Compass className="w-4 h-4 text-[#FF5E14] shrink-0 transition-transform group-hover:rotate-45" />
                <span>Browse All 9 Zuboo Models</span>
              </Link>

              <Link
                href="/test-ride"
                className="group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0 transition-transform group-hover:scale-110" />
                <span>Book Free Test Ride</span>
              </Link>

              <a
                href="tel:0784969652"
                className="group flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-emerald-300 font-bold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 shrink-0 transition-transform group-hover:rotate-12" />
                <span>Call Galle Hotline: 078 496 9652</span>
              </a>
            </div>
          </div>

          {/* Quick Vehicle Showcase Section */}
          <section className="mt-20 pt-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF5E14] mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Showroom Ready Vehicles</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  Popular Zuboo Electric Motorcycles
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Jump straight to one of our top-rated zero-emission electric models in Galle.
                </p>
              </div>

              <Link
                href="/bikes"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5E14] hover:text-white transition-colors group self-start md:self-auto"
              >
                <span>View Full Lineup (9 Models)</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 5-Card Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {POPULAR_MODELS.map((bike) => (
                <Link
                  key={bike.slug}
                  href={`/bikes/${bike.slug}`}
                  className="group relative flex flex-col rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FF5E14]/50 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF5E14]/10"
                >
                  {/* Top Badge */}
                  <div className="p-3.5 pb-0 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${bike.badgeColor}`}
                    >
                      {bike.subtitle}
                    </span>
                  </div>

                  {/* Vehicle Thumbnail */}
                  <div className="relative w-full h-36 my-2 px-3 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={bike.image}
                        alt={`${bike.name} Electric Bike`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 pt-1 flex-1 flex flex-col justify-between space-y-3 bg-gradient-to-t from-black/60 to-transparent">
                    <div>
                      <h4 className="font-heading font-black text-base text-white group-hover:text-[#FF5E14] transition-colors">
                        {bike.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {bike.category}
                      </p>
                    </div>

                    {/* Mini Spec Badges */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-white/10 text-[10px]">
                      <div className="flex items-center gap-1 text-slate-300">
                        <Gauge className="w-3 h-3 text-[#FF5E14] shrink-0" />
                        <span className="truncate">{bike.speed}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <BatteryCharging className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{bike.range}</span>
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#FF5E14] transition-colors">
                      <span>Explore Model</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Galle Showroom Verification Card */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.02] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FF5E14]/15 border border-[#FF5E14]/30 flex items-center justify-center text-[#FF5E14] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-white text-base">
                    Visit Udan Enterprises Showroom in Galle
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Open Now
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                  Udugama Road, Kurunduwatta, Pinnaduwa, Galle. Experience live
                  demonstrations, battery diagnostics, and certified Zuboo test
                  rides with our technical team.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises%2C%20I%20am%20looking%20for%20a%20Zuboo%20electric%20bike."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>WhatsApp Galle Team</span>
              </a>
              <Link
                href="/contact"
                className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/10"
              >
                <span>Showroom Location Map</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
