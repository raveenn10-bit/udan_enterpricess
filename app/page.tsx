"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import BrandBounceText from "@/components/BrandBounceText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ZubooHomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.from(".main-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        delay: 0.2
      });

      // 2. Sections Reveal (Bidirectional)
      gsap.utils.toArray<HTMLElement>(".reveal-section, [data-scroll-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // 3. Staggered Cards (Bidirectional)
      gsap.utils.toArray<HTMLElement>(".stagger-grid").forEach((grid) => {
        const cards = grid.querySelectorAll(".stagger-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: grid,
                start: "top 82%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });

      // 4. Parallax Image
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            scrub: true
          },
          y: -30,
          ease: "none"
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const [selectedHeroModel, setSelectedHeroModel] = useState<"paris" | "mini" | "the-tank">("paris");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isTestRideOpen, setIsTestRideOpen] = useState<boolean>(false);
  const [testRideBike, setTestRideBike] = useState<string>("Zuboo Paris");
  const [dailyKm, setDailyKm] = useState<number>(35);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{ name: string; phone: string; date: string; bike: string }>({
    name: "",
    phone: "",
    date: "",
    bike: "Zuboo Paris"
  });

  // Fuel calculation values
  const petrolPricePerLiter = 370; // LKR
  const bikeMileagePerLiter = 38; // km/L
  const monthlyPetrolCost = Math.round(((dailyKm * 30) / bikeMileagePerLiter) * petrolPricePerLiter);
  const monthlyElectricCost = Math.round((dailyKm * 30 * 0.03 * 45)); // ~Rs 1.35 per km electric
  const monthlySavings = monthlyPetrolCost - monthlyElectricCost;
  const yearlySavings = monthlySavings * 12;

  const heroModelsData = {
    paris: {
      name: "Zuboo Paris",
      code: "PARIS-1200W",
      tagline: "Timeless European Retro Classic Electric Scooter",
      badge: "Retro Classic & Luxury",
      desc: "Inspired by classic European luxury with gentle curves, cushioned passenger backrest, aerodynamic front windscreen, and smooth whisper-quiet electric drive. The ideal urban cruiser for effortless everyday travel in Galle.",
      motor: "1200W Smooth Torque",
      speed: "60 km/h",
      range: "≥ 80 km",
      battery: "72V 23Ah High Efficiency",
      charging: "4 - 6 Hours",
      warranty: "3 Years",
      price: "LKR 330,000",
      image: "/bikes/paris/paris.webp",
      highlight: "Retro Style & Windscreen"
    },
    mini: {
      name: "Zuboo Mini",
      code: "MINI-490W",
      tagline: "Lightweight Urban Commuter with Deep Cargo Basket",
      badge: "Compact City Commuter",
      desc: "Ultra-agile, lightweight step-through electric commuter bike featuring a deep front shopping basket, plush passenger pillion seat, dual shock absorbers, and low running costs. Perfect for daily local trips.",
      motor: "490W Eco Motor",
      speed: "30 - 35 km/h",
      range: "≥ 35 km",
      battery: "48V 12Ah Lithium Ready",
      charging: "4 - 6 Hours",
      warranty: "2 Years",
      price: "LKR 195,000",
      image: "/bikes/mini/mini.webp",
      highlight: "Front Basket & Compact Frame"
    },
    "the-tank": {
      name: "Zuboo The Tank",
      code: "TANK-3000W",
      tagline: "Heavy-Duty All-Terrain Commercial & Utility Electric Scooter",
      badge: "Heavy-Duty Utility Flagship",
      desc: "Built with extreme structural reinforcement, twin circular projector spotlights, steel perimeter crash bars, inverted hydraulic forks, and unstoppable high-torque motor engineered to haul heavy cargo across Southern terrain.",
      motor: "3000W Peak Performance",
      speed: "65 - 75 km/h",
      range: "≥ 80 km",
      battery: "72V 32Ah High Discharge",
      charging: "6 - 8 Hours",
      warranty: "3 Years",
      price: "LKR 515,000",
      image: "/bikes/tank/tank.webp",
      highlight: "Crash Bars & Twin Projectors"
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
    <div ref={containerRef} className="min-h-screen bg-[#FFFFFF] text-[#111820] flex flex-col selection:bg-[#ff5e14] selection:text-white font-sans">
      {/* Centered Navigation Navbar */}
      <Navbar onOpenTestRide={() => openBookingModal("Zuboo T3")} />

      {/* AERO-HERO-3 INTEGRATION */}
      <Hero
        title="Sustainable Solutions for a Better Future"
        subtitle="Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions."
        buttonText="Explore Zuboo Fleet"
        onCtaClick={() => {
          (document.getElementById("fleet") || document.getElementById("showroom-fleet"))?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. SHOWROOM FLEET & FLAGSHIP SHOWCASE (Zuboo Clean Transparent Glassmorphic Showcase - Paris, Mini & The Tank) */}
      <section
        id="fleet"
        data-scroll-section
        className="reveal-section relative bg-gradient-to-b from-slate-50 via-orange-50/20 to-slate-50 border-b border-slate-200/70 py-12 lg:py-20 overflow-hidden"
      >
        <span id="showroom-fleet" className="sr-only" />
        {/* Subtle background ambient glow for glassmorphism */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-sky-200/25 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Top Slogan & Flagship Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#FF5E14] text-xs font-black tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLAGSHIP 3-BIKE PERFORMANCE SHOWCASE • GALLE SHOWROOM</span>
            </div>

            {/* Flagship 3-Model Selector Tabs */}
            <div className="flex items-center bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 shadow-sm text-xs font-black">
              {(["paris", "mini", "the-tank"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHeroModel(key)}
                  className={`px-4 sm:px-5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    selectedHeroModel === key
                      ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/25 scale-[1.02]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  <span>{heroModelsData[key].name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold ${
                    selectedHeroModel === key ? "bg-[#FF5E14] text-white" : "bg-slate-200/70 text-slate-600"
                  }`}>
                    {key === "paris" ? "Retro" : key === "mini" ? "Commuter" : "Utility"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Hero Card in Ultra-Clean Transparent Glassmorphism */}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Headlines & Spec Cards */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF5E14] block mb-2">
                    {currentHero.badge}
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-normal text-slate-950 tracking-tight leading-[1.05] font-hero">
                    {currentHero.name}
                    <span className="block text-xl sm:text-2xl font-bold text-slate-600 mt-1 font-manrope">
                      {currentHero.tagline}
                    </span>
                  </h2>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {currentHero.desc}
                </p>

                {/* Technical Spec Matrix (Ultra-Clean Glassmorphism) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/70 shadow-sm">
                  <div className="p-2">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase text-slate-500">Motor Power</span>
                    </div>
                    <div className="text-base font-black text-slate-950">{currentHero.motor}</div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <Gauge className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase text-slate-500">Max Speed</span>
                    </div>
                    <div className="text-base font-black text-slate-950">{currentHero.speed}</div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <BatteryCharging className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase text-slate-500">Range</span>
                    </div>
                    <div className="text-base font-black text-slate-950">{currentHero.range}</div>
                  </div>
                  <div className="p-2">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[11px] font-bold uppercase text-slate-500">Warranty</span>
                    </div>
                    <div className="text-base font-black text-slate-950">{currentHero.warranty}</div>
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
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/80 hover:border-slate-800 bg-white/70 backdrop-blur-md text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero High-Res Studio Cutout Image */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
                <div className="relative w-full h-[360px] sm:h-[460px] flex items-center justify-center bg-radial from-white/40 via-white/10 to-transparent rounded-3xl p-4">
                  <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                    <Image
                      src={currentHero.image}
                      alt={currentHero.name}
                      fill
                      priority
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/80 shadow-lg -mt-6 z-20">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-900">Showroom Ready in Galle</div>
                    <div className="text-[11px] text-slate-500">Zero petrol required • 100% Electric</div>
                  </div>
                  <div className="ml-4 pl-4 border-l border-slate-300/60 text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Advertised</div>
                    <div className="text-sm font-black text-[#FF5E14]">{currentHero.price}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Quick Transparent Model Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/60">
              {(["paris", "mini", "the-tank"] as const).map((key) => {
                const m = heroModelsData[key];
                const isSel = selectedHeroModel === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedHeroModel(key)}
                    className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 flex items-center gap-4 ${
                      isSel
                        ? "bg-white/80 backdrop-blur-md border-2 border-[#FF5E14] shadow-lg shadow-orange-500/10 scale-[1.01]"
                        : "bg-white/30 backdrop-blur-md border border-white/60 hover:bg-white/60 hover:border-white shadow-sm"
                    }`}
                  >
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        loading="lazy"
                        sizes="80px"
                        className="object-contain drop-shadow-md"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#FF5E14] block">
                        {m.badge}
                      </span>
                      <h4 className="text-sm font-black text-slate-900 truncate">{m.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-slate-800">{m.price}</span>
                        <span className="text-[10px] text-slate-500">• {m.motor}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSel ? "text-[#FF5E14] translate-x-1" : "text-slate-400"}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN PRODUCT CLASSIFICATION (Exact Zuboo OEM Showcase) */}
      <section id="categories" data-scroll-section className="reveal-section py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn bidirectional className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-950 uppercase tracking-tight text-center font-collection">
              MAIN PRODUCT CLASSIFICATION
            </h2>
          </FadeIn>

          {/* 6 Models in 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10 max-w-6xl mx-auto">
            {[
              {
                classification: "Electric Motorcycle",
                name: "Zuboo T3 (2000W)",
                image: "/bikes/t3/t3.webp",
                slug: "t3",
                highlight: false,
              },
              {
                classification: "Electric Bike",
                name: "Zuboo Mini (City Commuter)",
                image: "/bikes/mini/mini.webp",
                slug: "mini",
                highlight: true,
              },
              {
                classification: "Electric Motorcycle",
                name: "Zuboo T11 (Commercial Cargo)",
                image: "/bikes/t11/t11.webp",
                slug: "t11",
                highlight: false,
              },
              {
                classification: "Retro Electric Scooter",
                name: "Zuboo Paris (European Classic)",
                image: "/bikes/paris/paris.webp",
                slug: "paris",
                highlight: false,
              },
              {
                classification: "Electric Utility Scooter",
                name: "Zuboo The Tank (Dual Suspension)",
                image: "/bikes/tank/tank.webp",
                slug: "the-tank",
                highlight: false,
              },
              {
                classification: "Electric City Bike",
                name: "Zuboo EX008 (Urban Vintage)",
                image: "/bikes/ex008/ex008.webp",
                slug: "ex008",
                highlight: false,
              },
            ].map((item, idx) => (
              <FadeIn
                key={item.slug}
                bidirectional
                delay={idx * 0.08}
                className="group flex flex-col items-center text-center bg-white rounded-2xl p-4 transition-all duration-300"
              >
                <Link
                  href={`/bikes/${item.slug}`}
                  className="relative h-64 sm:h-72 w-full flex items-center justify-center p-4 bg-white"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    loading="lazy"
                    decoding="async"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </Link>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 tracking-tight">
                  {item.classification}
                </h3>
                <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase mt-1 mb-5">
                  {item.name}
                </p>

                <Link
                  href={`/bikes/${item.slug}`}
                  className={`inline-block px-9 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 shadow-sm ${
                    item.highlight
                      ? "bg-[#E51937] hover:bg-[#c4122d] text-white"
                      : "bg-[#222222] hover:bg-[#E51937] text-white"
                  }`}
                >
                  View More
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "EXCELLENT PRODUCTS" / ALL 8 ZUBOO MODELS SHOWCASE */}
      <section id="featured-models" data-scroll-section className="reveal-section py-24 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn bidirectional className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <TextReveal as="h2" className="text-2xl sm:text-3xl font-medium text-slate-900 tracking-tight font-collection">
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
            {filteredBikes.map((bike, idx) => (
              <FadeIn
                key={bike.id}
                bidirectional
                delay={(idx % 3) * 0.08}
                className="h-full"
              >
                <Link
                  href={`/bikes/${bike.slug}`}
                  className="group block h-full bg-white rounded-2xl border border-slate-100 hover:border-[#FF5E14] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square p-8 flex items-center justify-center bg-white">
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out">
                      <Image
                        src={bike.mainImage}
                        alt={bike.name}
                        fill
                        loading="lazy"
                        decoding="async"
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
              </FadeIn>
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
      <section id="technology" data-scroll-section className="reveal-section py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn bidirectional className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-medium tracking-widest text-[#FF5E14] uppercase block mb-2">
              WHY CHOOSE ZUBOO
            </span>
            <TextReveal as="h2" className="text-2xl sm:text-3xl font-normal text-slate-900 tracking-tight font-tech">
              ENGINEERED FOR SRI LANKAN ROADS
            </TextReveal>
            <p className="mt-3 text-sm text-slate-500">
              International manufacturing quality with 7 production bases worldwide, adapted specifically for Galle&apos;s coastal terrain and daily commuting demands.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 1. Smart BMS */}
            <FadeIn bidirectional delay={0} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
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
            <FadeIn bidirectional delay={0.1} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
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
            <FadeIn bidirectional delay={0.2} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
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
            <FadeIn bidirectional delay={0.3} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg">
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
      <section id="savings-calculator" data-scroll-section className="reveal-section py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Explanations */}
            <FadeIn bidirectional direction="left" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                <DollarSign className="w-3.5 h-3.5" />
                <span>SRI LANKA PETROL VS ELECTRIC SAVINGS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-normal tracking-tight leading-tight font-editorial">
                STOP BURNING MONEY AT PETROL SHEDS.
              </h2>
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
            </FadeIn>

            {/* Right: Calculated Results Card */}
            <FadeIn bidirectional direction="right" className="lg:col-span-6">
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. SHOWROOM LOCATION & CONTACT SECTION */}
      <section id="showroom-location" data-scroll-section className="reveal-section py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Showroom Details */}
            <FadeIn bidirectional direction="left" className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-black tracking-widest text-[#FF5E14] uppercase block mb-2 font-manrope">
                  OFFICIAL GALLE SHOWROOM
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight font-story flex flex-wrap items-center gap-2">
                  <span>VISIT</span>
                  <BrandBounceText sizeClassName="text-2xl sm:text-3xl lg:text-4xl" />
                </h2>
                <p className="mt-2 text-sm text-slate-600 font-manrope">
                  Step inside our modern showroom, inspect all 8 Zuboo models in person, speak with certified technicians, and experience a live test ride.
                </p>
              </div>

              {/* Authentic Galle Showroom Photo */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-md group">
                <Image
                  src="/media/showroom/galle-showroom.jpg"
                  alt="Udan Enterprises Kurunduwatta Galle Showroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Udan Enterprises Showroom • Kurunduwatta, Galle</span>
                </div>
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
            </FadeIn>

            {/* Quick Test Ride Form */}
            <FadeIn bidirectional direction="right" className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
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
            </FadeIn>
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

      {/* 10. CINEMATIC MOTORCYCLE SKYLINE FOOTER */}
      <Footer />
    </div>
  );
}
