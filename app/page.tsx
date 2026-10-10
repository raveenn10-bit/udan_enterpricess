"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  BatteryCharging,
  Gauge,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Filter,
  Layers,
  Wrench,
  Percent,
  X,
  ExternalLink,
  Cpu,
  Droplets,
  DollarSign
} from "lucide-react";
import { BIKE_MODELS, BikeModel } from "@/data/bikes";
import Hero from "@/components/ui/hero";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";

export default function ZubooHomePage() {
  const [selectedHeroModel, setSelectedHeroModel] = useState<"t3" | "gt" | "the-tank" | "kb1">("t3");
  const [t3Color, setT3Color] = useState<string>("/bikes/t3/t3-black.webp");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isTestRideOpen, setIsTestRideOpen] = useState<boolean>(false);
  const [testRideBike, setTestRideBike] = useState<string>("Zuboo T3");
  const [dailyKm, setDailyKm] = useState<number>(35);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{ name: string; phone: string; date: string; bike: string }>({
    name: "",
    phone: "",
    date: "",
    bike: "Zuboo T3"
  });

  // Fuel calculation values
  const petrolPricePerLiter = 370; // LKR
  const bikeMileagePerLiter = 38; // km/L
  const monthlyPetrolCost = Math.round(((dailyKm * 30) / bikeMileagePerLiter) * petrolPricePerLiter);
  const monthlyElectricCost = Math.round((dailyKm * 30 * 0.03 * 45)); // ~Rs 1.35 per km electric
  const monthlySavings = monthlyPetrolCost - monthlyElectricCost;
  const yearlySavings = monthlySavings * 12;

  const heroModelsData = {
    t3: {
      name: "Zuboo T3",
      code: "T3-2000W",
      tagline: "Smart Urban High-Power Electric Scooter",
      badge: "Flagship Performance",
      desc: "Designed for premium urban mobility. Features a 2000W high-torque motor, dual hydraulic disc brakes, full digital smart telemetry dashboard, and automotive-grade lithium battery with intelligent BMS.",
      motor: "2000W High Torque",
      speed: "65 km/h",
      range: "110 km",
      battery: "72V 35Ah High Capacity",
      charging: "5 - 7 Hours",
      price: "LKR 465,000",
      colors: [
        { name: "Matte Black", img: "/bikes/t3/t3-black.webp", hex: "#1e1e1e" },
        { name: "Pearl White", img: "/bikes/t3/t3-white.webp", hex: "#f0f0f0" },
        { name: "Nardo Grey", img: "/bikes/t3/t3-grey.webp", hex: "#7a8288" },
        { name: "Mint Green", img: "/bikes/t3/t3-mint.webp", hex: "#7bc4b2" },
        { name: "Desert Cream", img: "/bikes/t3/t3-cream.webp", hex: "#dfd2be" },
      ]
    },
    gt: {
      name: "Zuboo GT",
      code: "GT-1800W",
      tagline: "Heavy-Duty Dual-Sport Adventure Utility",
      badge: "Touring & Adventure",
      desc: "Engineered for maximum endurance and rough Southern terrain. High-strength tubular steel frame, heavy-duty rear tail carrier rack with secure top-box, and dual airbag rear shocks.",
      motor: "1800W High Torque",
      speed: "58 km/h",
      range: "100 km",
      battery: "72V 32Ah High Capacity",
      charging: "6 - 8 Hours",
      price: "LKR 445,000",
      colors: [
        { name: "Adventure Yellow / Black", img: "/bikes/gt/gt-adventure.webp", hex: "#eab308" }
      ]
    },
    "the-tank": {
      name: "Zuboo The Tank",
      code: "TANK-1200W",
      tagline: "Long-Range Heavy-Duty Utility Scooter",
      badge: "Commercial & Utility",
      desc: "The ultimate workhorse for Sri Lankan business and delivery. Reinforced dual suspension, wide heavy-duty footrest, high load capacity, and dependable long-range battery system.",
      motor: "1200W Brushless",
      speed: "50 km/h",
      range: "90 km",
      battery: "72V 26Ah Long Life",
      charging: "6 - 8 Hours",
      price: "LKR 425,000",
      colors: [
        { name: "Titanium Silver", img: "/media/bikes/the-tank/main.webp", hex: "#64748b" }
      ]
    },
    kb1: {
      name: "Zuboo KB1",
      code: "KB1-1000W",
      tagline: "Smart Everyday Urban Commuter",
      badge: "Value Leader",
      desc: "Lightweight, extremely agile, and easy to handle for riders of all ages. Integrated front shopping basket, plush passenger pillion seat with backrest, and low running costs.",
      motor: "1000W High Efficiency",
      speed: "45 km/h",
      range: "75 km",
      battery: "60V 20Ah Lithium Ready",
      charging: "5 - 6 Hours",
      price: "LKR 335,000",
      colors: [
        { name: "Electric Blue", img: "/media/bikes/kb1/main.webp", hex: "#0284c7" }
      ]
    }
  };

  const currentHero = heroModelsData[selectedHeroModel];

  const filteredBikes = BIKE_MODELS.filter((bike) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "commuter") return bike.category.toLowerCase().includes("commuter") || bike.slug === "mini" || bike.slug === "kb1";
    if (activeCategory === "touring") return bike.category.toLowerCase().includes("touring") || bike.slug === "gt" || bike.slug === "t3";
    if (activeCategory === "heavyduty") return bike.slug === "the-tank" || bike.slug === "t11";
    if (activeCategory === "retro") return bike.category.toLowerCase().includes("retro") || bike.slug === "paris" || bike.slug === "ex008";
    return true;
  });

  const openBookingModal = (bikeName: string) => {
    setTestRideBike(bikeName);
    setBookingSuccess(false);
    setIsTestRideOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const date = String(formData.get("date") || "");
    const bike = String(formData.get("bike") || testRideBike);

    setBookingDetails({ name, phone, date, bike });
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111820] flex flex-col selection:bg-[#ff5e14] selection:text-white font-sans">
      {/* 1. TOP ANNOUNCEMENT BAR (Clean OEM Style) */}
      <div className="bg-[#0F172A] text-white py-2 px-4 text-xs font-medium border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-[#FF5E14] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              OFFICIAL OEM DEALERSHIP
            </span>
            <span className="hidden md:inline text-slate-300">
              Udan Enterprises • Kurunduwatta, Galle • JOIN US & CHARGE YOUR RIDE ⚡
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <a href="tel:0784969652" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>078 496 9652</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="https://wa.me/94784969652"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#25D366] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
            <span className="text-slate-600">|</span>
            <a href="mailto:Pibida17udan4131@gmail.com" className="hover:text-white transition-colors hidden sm:inline">
              Pibida17udan4131@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* 2. OEM MAIN NAVIGATION HEADER (Pure Clean White with Zuboo Signature Orange) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & OEM Partnership */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/media/branding/udan-logo.png"
                alt="Udan Enterprises"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#FF5E14] transition-colors">
                  UDAN
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-[#FF5E14]">
                  ENTERPRISES
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Authorized Zuboo Dealership • Galle
              </span>
            </div>
            <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1" />
            <div className="hidden lg:block relative h-6 w-16 opacity-90 group-hover:opacity-100 transition-opacity">
              <Image
                src="/zuboo-logo.webp"
                alt="Zuboo Electric"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Link href="/" className="text-[#FF5E14] hover:text-[#FF5E14] transition-colors">
              Home
            </Link>
            <a href="#featured-models" className="hover:text-[#FF5E14] transition-colors">
              E-Scooters & Bikes
            </a>
            <a href="#categories" className="hover:text-[#FF5E14] transition-colors">
              Categories
            </a>
            <a href="#technology" className="hover:text-[#FF5E14] transition-colors">
              Technology & BMS
            </a>
            <a href="#savings-calculator" className="hover:text-[#FF5E14] transition-colors text-emerald-700 font-extrabold flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Fuel Savings</span>
            </a>
            <Link href="/about" className="hover:text-[#FF5E14] transition-colors">
              About Showroom
            </Link>
            <Link href="/offers" className="hover:text-[#FF5E14] transition-colors flex items-center gap-1">
              <span>Offers</span>
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.2 rounded font-black">Hot</span>
            </Link>
            <a href="#showroom-location" className="hover:text-[#FF5E14] transition-colors">
              Contact Galle
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0784969652"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-800 text-xs font-bold transition-colors bg-slate-50"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>078 496 9652</span>
            </a>
            <button
              onClick={() => openBookingModal("Zuboo T3")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF5E14] hover:bg-[#E04D09] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Test Ride</span>
            </button>
          </div>
        </div>
      </header>

      {/* AERO-HERO-3 INTEGRATION */}
      <Hero
        title="Sustainable Solutions for a Better Future"
        subtitle="Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions."
        buttonText="Explore Zuboo Fleet"
        onCtaClick={() => {
          document.getElementById("showroom-fleet")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. SHOWROOM FLEET & FLAGSHIP SHOWCASE (Zuboo OEM Clean Flagship Banner) */}
      <section id="showroom-fleet" className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100 py-12 lg:py-20 overflow-hidden">
        {/* Subtle background graphics */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-24 right-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-100 rounded-full blur-2xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Slogan & Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/60 text-[#FF5E14] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>JOIN US & CHARGE YOUR RIDE ⚡ • GALLE SHOWROOM</span>
            </div>

            {/* Flagship Model Selector Tabs */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm text-xs font-bold">
              {(["t3", "gt", "the-tank", "kb1"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedHeroModel(key);
                    if (key === "t3") setT3Color("/bikes/t3/t3-black.webp");
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-all ${
                    selectedHeroModel === key
                      ? "bg-[#0F172A] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {heroModelsData[key].name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Spec Cards */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF5E14] block mb-2">
                  {currentHero.badge}
                </span>
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                  {currentHero.name}
                  <span className="block text-2xl sm:text-3xl font-semibold text-slate-500 mt-1">
                    {currentHero.tagline}
                  </span>
                </h1>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                {currentHero.desc}
              </p>

              {/* Color Switcher (For T3) */}
              {selectedHeroModel === "t3" && (
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-md">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                    Available Showroom Colors:
                  </span>
                  <div className="flex items-center gap-3">
                    {heroModelsData.t3.colors.map((color) => (
                      <button
                        key={color.img}
                        onClick={() => setT3Color(color.img)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          t3Color === color.img
                            ? "border-[#FF5E14] bg-orange-50/50 text-slate-900 ring-2 ring-orange-200"
                            : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="hidden sm:inline">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Spec Matrix (Clean OEM Style) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-slate-500">Motor Power</span>
                  </div>
                  <div className="text-base font-black text-slate-900">{currentHero.motor}</div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                    <Gauge className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-slate-500">Max Speed</span>
                  </div>
                  <div className="text-base font-black text-slate-900">{currentHero.speed}</div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                    <BatteryCharging className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-slate-500">Range</span>
                  </div>
                  <div className="text-base font-black text-slate-900">{currentHero.range}</div>
                </div>
                <div className="p-2">
                  <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase text-slate-500">Warranty</span>
                  </div>
                  <div className="text-base font-black text-slate-900">3 Years</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => openBookingModal(currentHero.name)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#FF5E14] hover:bg-[#E04D09] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-500/25 active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Test Ride Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/94784969652?text=${encodeURIComponent(`Hello Udan Enterprises, I would like to inquire about the ${currentHero.name} (${currentHero.code}) advertised at ${currentHero.price}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-300 hover:border-slate-800 bg-white text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero High-Res Studio Image */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              <div className="relative w-full h-[360px] sm:h-[460px] flex items-center justify-center bg-radial from-slate-100 to-transparent rounded-3xl p-6">
                <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                  <Image
                    src={
                      selectedHeroModel === "t3"
                        ? t3Color
                        : selectedHeroModel === "gt"
                        ? "/bikes/gt/gt-adventure.webp"
                        : selectedHeroModel === "the-tank"
                        ? "/media/bikes/the-tank/main.webp"
                        : "/media/bikes/kb1/main.webp"
                    }
                    alt={currentHero.name}
                    fill
                    priority
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-md -mt-6 z-20">
                <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">Showroom Ready in Galle</div>
                  <div className="text-[11px] text-slate-500">Zero petrol required • 100% Electric</div>
                </div>
                <div className="ml-4 pl-4 border-l border-slate-200 text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Advertised</div>
                  <div className="text-sm font-black text-[#FF5E14]">{currentHero.price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ZUBOO PRODUCT CATEGORIES CLASSIFICATION (Directly inspired by Zuboo.com) */}
      <section id="categories" className="py-16 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-medium tracking-widest text-slate-400 uppercase block mb-2">
              ZUBOO PRODUCT CLASSIFICATION
            </span>
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
              FIND YOUR PERFECT RIDE
            </TextReveal>
          </FadeIn>

          {/* 4 Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. E-Scooter */}
            <div
              onClick={() => {
                setActiveCategory("commuter");
                document.getElementById("featured-models")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-full mb-4 flex items-center justify-center">
                <Image
                  src="/media/bikes/mini/main.webp"
                  alt="E-Scooters"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="text-sm font-medium text-slate-800 group-hover:text-[#FF5E14] transition-colors">
                E-Scooter Series
              </h3>
              <p className="text-xs text-slate-400 mt-1">Daily Commuting</p>
            </div>

            {/* 2. E-Motorcycle / High Performance */}
            <div
              onClick={() => {
                setActiveCategory("touring");
                document.getElementById("featured-models")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-full mb-4 flex items-center justify-center">
                <Image
                  src="/bikes/t3/t3-black.webp"
                  alt="E-Motorcycle Series"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="text-sm font-medium text-slate-800 group-hover:text-[#FF5E14] transition-colors">
                E-Motorcycle Series
              </h3>
              <p className="text-xs text-slate-400 mt-1">High Performance</p>
            </div>

            {/* 3. Heavy-Duty Utility */}
            <div
              onClick={() => {
                setActiveCategory("heavyduty");
                document.getElementById("featured-models")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-full mb-4 flex items-center justify-center">
                <Image
                  src="/media/bikes/the-tank/main.webp"
                  alt="Heavy-Duty Utility"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="text-sm font-medium text-slate-800 group-hover:text-[#FF5E14] transition-colors">
                Heavy-Duty & Cargo
              </h3>
              <p className="text-xs text-slate-400 mt-1">Commercial Grade</p>
            </div>

            {/* 4. Retro Classics */}
            <div
              onClick={() => {
                setActiveCategory("retro");
                document.getElementById("featured-models")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] p-6 transition-all duration-300 hover:shadow-lg flex flex-col items-center text-center"
            >
              <div className="relative h-32 w-full mb-4 flex items-center justify-center">
                <Image
                  src="/media/bikes/paris/main.webp"
                  alt="Retro Classics"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="text-sm font-medium text-slate-800 group-hover:text-[#FF5E14] transition-colors">
                Retro Lifestyle
              </h3>
              <p className="text-xs text-slate-400 mt-1">European Aesthetics</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "EXCELLENT PRODUCTS" / ALL 8 ZUBOO MODELS SHOWCASE */}
      <section id="featured-models" className="py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <TextReveal as="h2" className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
                Our Collection
              </TextReveal>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: "all", label: "All Models" },
                { id: "touring", label: "Sport & Touring" },
                { id: "heavyduty", label: "Heavy-Duty" },
                { id: "commuter", label: "City Commuter" },
                { id: "retro", label: "Retro Lifestyle" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 text-sm transition-colors rounded-full ${
                    activeCategory === tab.id
                      ? "text-slate-900 font-medium"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Clean 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBikes.map((bike) => (
              <Link
                key={bike.id}
                href={`/bikes/${bike.slug}`}
                className="group block bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-square p-8 flex items-center justify-center bg-white">
                  <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image
                      src={bike.mainImage}
                      alt={bike.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-5 text-center border-t border-slate-50 bg-white">
                  <h3 className="text-sm font-medium text-slate-800 transition-colors group-hover:text-[#FF5E14]">
                    {bike.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {bike.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Single Contact Row */}
          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500">
              Visit showroom or WhatsApp <span className="font-medium text-slate-800">078 496 9652</span> for pricing & test rides
            </p>
          </div>
        </div>
      </section>

      {/* 6. ZUBOO ADVANTAGES & CORE TECHNOLOGY (Like Zuboo.com OEM Tech Section) */}
      <section id="technology" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-widest text-[#FF5E14] uppercase block mb-2">
              WHY CHOOSE ZUBOO
            </span>
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight">
              ENGINEERED FOR SRI LANKAN ROADS
            </TextReveal>
            <p className="mt-3 text-sm text-slate-500">
              International manufacturing quality with 7 production bases worldwide, adapted specifically for Galle&apos;s coastal terrain and daily commuting demands.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Smart BMS */}
            <FadeIn delay={0} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#FF5E14] flex items-center justify-center mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                Intelligent Smart BMS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                7-layer battery management with active thermal cutoff, overcharge mitigation, and deep-discharge protection ensuring 1,200+ healthy charging cycles.
              </p>
            </FadeIn>

            {/* 2. Waterproof Motor */}
            <FadeIn delay={0.1} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                IP67 Waterproof Motor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fully hermetically sealed high-torque hub motor engineered to withstand heavy tropical monsoon rains, flooded roads, and saline coastal breezes.
              </p>
            </FadeIn>

            {/* 3. Fuel Economy */}
            <FadeIn delay={0.2} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                90% Cost Reduction
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Slash your monthly transit expenses. Full overnight charge costs only ~Rs 60, saving owners over Rs 200,000 every single year versus petrol.
              </p>
            </FadeIn>

            {/* 4. Showroom & Genuine Parts */}
            <FadeIn delay={0.3} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">
                Galle Service & Spares
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full factory diagnostic scanners, genuine Zuboo lithium chargers, brake pads, and tire spares stocked right at our Kurunduwatta showroom.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE FUEL SAVINGS CALCULATOR (Sri Lankan Rupees) */}
      <section id="savings-calculator" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Explanations */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <DollarSign className="w-3.5 h-3.5" />
                <span>SRI LANKA PETROL VS ELECTRIC SAVINGS</span>
              </div>
              <FadeIn direction="left">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  STOP BURNING MONEY AT PETROL SHEDS.
                </h2>
              </FadeIn>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                With Sri Lankan petrol priced at Rs 370/L, switching to a Zuboo electric scooter puts tens of thousands of rupees back into your pocket every month.
              </p>

              {/* Slider Input */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">Daily Commute Distance:</span>
                  <span className="text-xl font-black text-[#FF5E14]">{dailyKm} km / day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={dailyKm}
                  onChange={(e) => setDailyKm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#FF5E14]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>10 km (City Short)</span>
                  <span>45 km (Average)</span>
                  <span>90 km (Southern Intercity)</span>
                </div>
              </div>
            </div>

            {/* Right: Calculated Results Card */}
            <div className="lg:col-span-6">
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
                <h3 className="text-lg font-bold text-slate-300 uppercase tracking-wider">
                  Monthly Fuel Comparison
                </h3>

                <div className="space-y-4">
                  {/* Petrol bill */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-red-500/30">
                    <div>
                      <span className="text-xs font-bold text-red-400 block uppercase">Petrol Scooter Bill</span>
                      <span className="text-xs text-slate-400">Based on Rs 370/L @ 38 km/L</span>
                    </div>
                    <span className="text-xl font-black text-red-400">
                      Rs. {monthlyPetrolCost.toLocaleString()} /mo
                    </span>
                  </div>

                  {/* Zuboo Electric Bill */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/60 rounded-xl border border-emerald-500/30">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 block uppercase">Zuboo Electric Power</span>
                      <span className="text-xs text-slate-400">Domestic overnight charging (~Rs 60/charge)</span>
                    </div>
                    <span className="text-xl font-black text-emerald-400">
                      Rs. {monthlyElectricCost.toLocaleString()} /mo
                    </span>
                  </div>
                </div>

                {/* Net Savings Box */}
                <div className="p-6 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-500/40 text-center">
                  <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider block mb-1">
                    YOUR ANNUAL ESTIMATED CASH SAVINGS
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight my-2">
                    Rs. {yearlySavings.toLocaleString()}
                  </div>
                  <span className="text-xs text-slate-300 block">
                    Save Rs. {monthlySavings.toLocaleString()} every single month! That covers your bike installment.
                  </span>
                </div>

                {/* CTA */}
                <a
                  href={`https://wa.me/94784969652?text=${encodeURIComponent(`Hello Udan Enterprises, I calculated my daily commute as ${dailyKm}km with expected savings of Rs. ${monthlySavings.toLocaleString()}/month. Please provide financing/buying details for Zuboo bikes.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-[#FF5E14] hover:bg-[#E04D09] text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get Financing Quotation on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SHOWROOM LOCATION & CONTACT SECTION */}
      <section id="showroom-location" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Showroom Details */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF5E14] uppercase block mb-2">
                  OFFICIAL GALLE SHOWROOM
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  VISIT UDAN ENTERPRISES
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Step inside our modern showroom, inspect all 8 Zuboo models in person, speak with certified technicians, and experience a live test ride.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900">Showroom Address</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Udugama Road, Kurunduwatta, Galle, Sri Lanka
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Phone className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900">Direct Showroom Hotline</h4>
                    <a href="tel:0784969652" className="text-xs font-bold text-slate-900 hover:text-[#FF5E14] mt-0.5 block">
                      078 496 9652
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Clock className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900">Opening Hours</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday – Saturday: 8:30 AM – 6:00 PM<br />
                      Sunday: 9:00 AM – 2:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <Mail className="w-5 h-5 text-[#FF5E14] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900">Official Inquiries Email</h4>
                    <a href="mailto:Pibida17udan4131@gmail.com" className="text-xs text-slate-600 hover:text-[#FF5E14] mt-0.5 block">
                      Pibida17udan4131@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/94784969652"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-green-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            {/* Quick Test Ride Form */}
            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF5E14] block mb-1">
                FREE TEST RIDE BOOKING
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                EXPERIENCE THE POWER IN PERSON
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Pick your preferred Zuboo model and date. We will prepare the bike fully charged for your arrival at our Galle showroom.
              </p>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Test Ride Request Ready!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you <strong>{bookingDetails.name}</strong>! Your test ride for the{" "}
                    <strong>{bookingDetails.bike}</strong> on <strong>{bookingDetails.date}</strong> is prepared.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/94784969652?text=${encodeURIComponent(
                        `Hello Udan Enterprises, I would like to book a test ride for ${bookingDetails.bike} on ${bookingDetails.date}. My name is ${bookingDetails.name} (${bookingDetails.phone}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Confirm on WhatsApp</span>
                    </a>
                    <a
                      href="tel:0784969652"
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Showroom</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="e.g. Kasun Perera"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="07X XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                        Choose Model *
                      </label>
                      <select
                        name="bike"
                        defaultValue={testRideBike}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
                      >
                        {BIKE_MODELS.map((b) => (
                          <option key={b.id} value={b.name}>
                            {b.name} ({b.motorPower.split(" ")[0]})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                        Preferred Date *
                      </label>
                      <input
                        name="date"
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        defaultValue={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-xs font-medium focus:outline-none focus:border-[#FF5E14] focus:ring-1 focus:ring-[#FF5E14]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#FF5E14] hover:bg-[#E04D09] text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 mt-2"
                  >
                    Prepare Test Ride Appointment →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 9. TEST RIDE MODAL DIALOG */}
      {isTestRideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setIsTestRideOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-black uppercase tracking-wider text-[#FF5E14] block mb-1">
              FREE SHOWROOM TEST RIDE
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              BOOK {testRideBike.toUpperCase()}
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              Experience the acceleration, comfort, and zero-noise drive at Udan Enterprises, Galle Kurunduwatta showroom.
            </p>

            {bookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Appointment Ready!</h4>
                <p className="text-xs text-slate-600">
                  {bookingDetails.name}, your test ride for <strong>{bookingDetails.bike}</strong> is scheduled for{" "}
                  <strong>{bookingDetails.date}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={`https://wa.me/94784969652?text=${encodeURIComponent(
                      `Hello Udan Enterprises, I would like to book a test ride for ${bookingDetails.bike} on ${bookingDetails.date}. My name is ${bookingDetails.name} (${bookingDetails.phone}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsTestRideOpen(false)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    required
                    placeholder="Kasun Perera"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="078 496 9652"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:outline-none focus:border-[#FF5E14]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                      Selected Bike
                    </label>
                    <input
                      name="bike"
                      readOnly
                      value={testRideBike}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600 block mb-1.5">
                      Date *
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      defaultValue={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:outline-none focus:border-[#FF5E14]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#FF5E14] hover:bg-[#E04D09] text-white font-black text-xs uppercase tracking-wider transition-all mt-3"
                >
                  Confirm Test Ride Slot →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 10. CLEAN INTERNATIONAL OEM FOOTER */}
      <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
            {/* Col 1: Brand & Dealership Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10">
                  <Image
                    src="/media/branding/udan-logo.png"
                    alt="Udan Enterprises"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="text-lg font-black tracking-tight text-white block">
                    UDAN ENTERPRISES
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Official Zuboo Dealership • Galle
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Sri Lanka's dedicated Zuboo electric vehicle dealership. Delivering premium zero-emission transportation, high-capacity lithium battery technology, and genuine factory spare parts in Galle.
              </p>

              <div className="pt-2 text-xs text-slate-300 font-bold">
                <span className="text-[#FF5E14]">Tagline:</span> JOIN US & CHARGE YOUR RIDE ⚡
              </div>
            </div>

            {/* Col 2: Models Quick Links */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
                Zuboo Models
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/bikes/t3" className="hover:text-white transition-colors">Zuboo T3 (2000W)</Link></li>
                <li><Link href="/bikes/gt" className="hover:text-white transition-colors">Zuboo GT (1800W)</Link></li>
                <li><Link href="/bikes/the-tank" className="hover:text-white transition-colors">Zuboo The Tank</Link></li>
                <li><Link href="/bikes/mini" className="hover:text-white transition-colors">Zuboo Mini City</Link></li>
                <li><Link href="/bikes/kb1" className="hover:text-white transition-colors">Zuboo KB1 Value</Link></li>
                <li><Link href="/bikes/paris" className="hover:text-white transition-colors">Zuboo Paris Retro</Link></li>
              </ul>
            </div>

            {/* Col 3: Customer Services & Portals */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
                Services & Portals
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link href="/calculator" className="hover:text-white transition-colors">LKR Loan & EMI Calculator</Link></li>
                <li><Link href="/parts" className="hover:text-white transition-colors">Genuine Spare Parts</Link></li>
                <li><Link href="/service" className="hover:text-white transition-colors">Service Booking Galle</Link></li>
                <li><Link href="/warranty" className="hover:text-white transition-colors">Digital VIN Warranty Check</Link></li>
                <li><Link href="/offers" className="hover:text-white transition-colors">Special Seasonal Offers</Link></li>
                <li><Link href="/admin" className="hover:text-white transition-colors">Showroom Staff CMS</Link></li>
              </ul>
            </div>

            {/* Col 4: Galle Showroom Direct */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-white mb-4">
                Galle Showroom
              </h4>
              <div className="space-y-3 text-xs text-slate-400">
                <p>Udugama Road, Kurunduwatta, Galle</p>
                <p>
                  <strong className="text-white block">Hotline:</strong>
                  <a href="tel:0784969652" className="text-[#FF5E14] hover:underline">078 496 9652</a>
                </p>
                <p>
                  <strong className="text-white block">Email:</strong>
                  <a href="mailto:Pibida17udan4131@gmail.com" className="hover:text-white">Pibida17udan4131@gmail.com</a>
                </p>
                <p>
                  <strong className="text-white block">WhatsApp:</strong>
                  <a href="https://wa.me/94784969652" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                    +94 78 496 9652
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Credits */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © 2026 Udan Enterprises (Pvt) Ltd. Official Zuboo Electric Dealership. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1.5">
              <span>Crafted by</span>
              <span className="font-bold text-slate-300">Harsh Apex Digital Solutions</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
