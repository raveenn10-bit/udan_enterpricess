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
  ChevronLeft,
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
  ZoomIn,
  Cpu,
  Droplets,
  DollarSign
} from "lucide-react";
import { BIKE_MODELS, BikeModel } from "@/data/bikes";
import { useShowroomSettings, useHomepageContent, useDynamicProducts } from "@/lib/site-data";
import Hero from "@/components/ui/hero";
import FadeIn from "@/components/FadeIn";
import TextReveal from "@/components/TextReveal";
import BrandBounceText from "@/components/BrandBounceText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SHOWCASE_BIKES = [
  {
    name: "Zuboo EX008",
    badge: "Aerodynamic Urban Sport",
    power: "1000W Urban Motor",
    speed: "45 km/h",
    range: "≥ 60 km",
    battery: "60V 20Ah",
    price: "LKR 295,000",
    image: "/media/showcase/1.png",
    tagline: "Streamlined aerodynamic sport styling with durable hydraulic suspension",
    desc: "Sleek sport aerodynamic commuter scooter with comfortable seating and dependable urban range."
  },
  {
    name: "Zuboo The Tank (Lime)",
    badge: "Heavy-Duty Dual Headlights",
    power: "3000W Peak Performance",
    speed: "75 km/h",
    range: "≥ 80 km",
    battery: "72V 32Ah",
    price: "LKR 515,000",
    image: "/media/showcase/2.png",
    tagline: "Lime green dual headlights with heavy-duty steel crash bars",
    desc: "Distinctive lime green finish with twin projector headlights and reinforced steel frame for Southern terrain."
  },
  {
    name: "Zuboo T3",
    badge: "Sport Motorcycle Flagship",
    power: "2000W High Torque",
    speed: "65 km/h",
    range: "≥ 110 km",
    battery: "72V 32Ah",
    price: "LKR 480,000",
    image: "/media/showcase/3.png",
    tagline: "Aggressive sport aerodynamics with smart LCD console",
    desc: "White sport commuter styling with 110km extended highway range and smart digital cockpit."
  },
  {
    name: "Zuboo Paris",
    badge: "European Retro Classic",
    power: "1200W Smooth Torque",
    speed: "60 km/h",
    range: "≥ 80 km",
    battery: "72V 23Ah",
    price: "LKR 330,000",
    image: "/media/showcase/4.png",
    tagline: "Mint green classic retro luxury with front windscreen",
    desc: "Plush passenger backrest, aerodynamic windscreen, and smooth whisper-quiet drive."
  },
  {
    name: "Zuboo The Tank (Desert Cargo)",
    badge: "Heavy-Duty Utility Cargo",
    power: "3000W Peak Performance",
    speed: "75 km/h",
    range: "≥ 85 km",
    battery: "72V 32Ah",
    price: "LKR 525,000",
    image: "/media/showcase/5.png",
    tagline: "Desert sand finish with heavy rear cargo carrier",
    desc: "Commercial-grade utility scooter equipped with rear cargo box for heavy deliveries and Southern haulage."
  },
  {
    name: "Zuboo Mini",
    badge: "Compact City Commuter",
    power: "490W Eco Motor",
    speed: "35 km/h",
    range: "≥ 35 km",
    battery: "48V 12Ah",
    price: "LKR 195,000",
    image: "/media/showcase/6.png",
    tagline: "Pastel blue step-through commuter with deep front basket",
    desc: "Ultra-agile city mobility with front shopping basket, passenger pillion, and minimal recharge costs."
  }
];

const SHOWROOM_PHOTOS = [
  {
    src: "/media/gallery/gallery-1.jpg",
    title: "Opening Blessing Ceremony",
    desc: "Venerable Maha Sangha invoking auspicious pirith blessings for Udan Enterprises Galle."
  },
  {
    src: "/media/gallery/gallery-2.jpg",
    title: "Traditional Oil Lamp Lighting",
    desc: "Inauguration ceremony marking the official launch of the Zuboo dealership in Galle."
  },
  {
    src: "/media/gallery/gallery-3.jpg",
    title: "Showroom Launch & Community",
    desc: "Welcoming Southern Province riders to the premier electric mobility showroom."
  },
  {
    src: "/media/gallery/gallery-4.jpg",
    title: "Official Showroom Entrance",
    desc: "Grand Zuboo branded archway and front motorcycle showcase on Udugama Road, Kurunduwatta."
  },
  {
    src: "/media/gallery/gallery-5.jpg",
    title: "Showroom Glass Facade & Display",
    desc: "Direct view into the modern air-conditioned Zuboo e-scooter showroom floor."
  },
  {
    src: "/media/gallery/gallery-6.jpg",
    title: "Zuboo Fleet Lineup Presentation",
    desc: "Diverse range of Zuboo models ready for customer inspection and test rides."
  },
  {
    src: "/media/gallery/gallery-7.jpg",
    title: "Grand Opening Celebration",
    desc: "Official dealership launch celebration at Kurunduwatta, Galle with guests and riders."
  },
  {
    src: "/media/gallery/gallery-8.jpg",
    title: "Showroom Customer Experience Desk",
    desc: "Dedicated consultation area for test rides, leasing, and model guidance."
  },
  {
    src: "/media/gallery/gallery-9.jpg",
    title: "Electric Fleet Ready for Delivery",
    desc: "Fully charged Zuboo motorcycles prepared for registration, handover, and delivery."
  },
  {
    src: "/media/gallery/gallery-10.jpg",
    title: "Certified Service & Technical Support",
    desc: "Trained technician bay supporting battery warranty, diagnostics, and after-sales service."
  },
  {
    src: "/media/gallery/gallery-11.jpg",
    title: "Zuboo Premium Showroom Showcase",
    desc: "Modern indoor display featuring top-tier electric models and original accessories."
  }
];

export default function ZubooHomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { settings } = useShowroomSettings();
  const { cms } = useHomepageContent();
  const { products: dynamicBikes } = useDynamicProducts();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      // 1. Sections Reveal (Bidirectional)
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
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{ name: string; phone: string; date: string; bike: string }>({
    name: "",
    phone: "",
    date: "",
    bike: "Zuboo Paris"
  });

  const [selectedShowcaseBike, setSelectedShowcaseBike] = useState<number>(0);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState<number | null>(null);
  const [isBikeHovered, setIsBikeHovered] = useState<boolean>(false);
  const [isGalleryHovered, setIsGalleryHovered] = useState<boolean>(false);

  // Auto-cycle showcase bike every 3.5 seconds (pauses on hover)
  useEffect(() => {
    if (isBikeHovered) return;
    const interval = setInterval(() => {
      setSelectedShowcaseBike((prev) => (prev + 1) % SHOWCASE_BIKES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isBikeHovered]);

  // Auto-advance showroom gallery photos every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isGalleryHovered) return;
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % SHOWROOM_PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isGalleryHovered]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhotoIndex === null) return;
      if (e.key === "Escape") {
        setLightboxPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxPhotoIndex((prev) => (prev !== null ? (prev - 1 + SHOWROOM_PHOTOS.length) % SHOWROOM_PHOTOS.length : 0));
      } else if (e.key === "ArrowRight") {
        setLightboxPhotoIndex((prev) => (prev !== null ? (prev + 1) % SHOWROOM_PHOTOS.length : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPhotoIndex]);

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

  const filteredBikes = dynamicBikes.filter((bike) => {
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

      {/* Top CMS Announcement Ticker */}
      {cms.announcementText && (
        <div className="bg-[#0F172A] border-b border-orange-500/20 py-2.5 px-4 text-center text-xs font-semibold text-slate-300">
          <span className="text-[#FF5E14] font-black mr-2">⚡</span>
          <span>{cms.announcementText}</span>
        </div>
      )}

      {/* AERO-HERO-3 INTEGRATION */}
      <Hero
        title={cms.heroHeadline || "Sustainable Solutions for a Better Future"}
        subtitle={cms.heroSubtitle || "Empowering businesses and communities to thrive in a low-carbon world through tailored clean energy solutions."}
        buttonText={cms.heroCtaText || "Explore Zuboo Fleet"}
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
            <div className="flex items-center bg-white/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 shadow-sm text-xs font-black overflow-x-auto scrollbar-none max-w-full">
              {(["paris", "mini", "the-tank"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedHeroModel(key)}
                  className={`px-4 sm:px-5 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 whitespace-nowrap ${
                    selectedHeroModel === key
                      ? "bg-[#0F172A] text-white shadow-md shadow-slate-900/25 scale-[1.02]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  <span>{heroModelsData[key].name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
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

                {/* Technical Spec Matrix (Smooth Horizontal Scrollable on Mobile) */}
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-4 gap-3 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-white/70 shadow-sm">
                  <div className="p-2 shrink-0 w-[40vw] min-w-[130px] sm:w-auto snap-start">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <Zap className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase text-slate-500 whitespace-nowrap">Motor Power</span>
                    </div>
                    <div className="text-base font-black text-slate-950 whitespace-nowrap">{currentHero.motor}</div>
                  </div>
                  <div className="p-2 shrink-0 w-[40vw] min-w-[130px] sm:w-auto snap-start">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <Gauge className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase text-slate-500 whitespace-nowrap">Max Speed</span>
                    </div>
                    <div className="text-base font-black text-slate-950 whitespace-nowrap">{currentHero.speed}</div>
                  </div>
                  <div className="p-2 shrink-0 w-[40vw] min-w-[130px] sm:w-auto snap-start">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <BatteryCharging className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase text-slate-500 whitespace-nowrap">Range</span>
                    </div>
                    <div className="text-base font-black text-slate-950 whitespace-nowrap">{currentHero.range}</div>
                  </div>
                  <div className="p-2 shrink-0 w-[40vw] min-w-[130px] sm:w-auto snap-start">
                    <div className="flex items-center gap-1.5 text-[#FF5E14] mb-1">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] font-bold uppercase text-slate-500 whitespace-nowrap">Warranty</span>
                    </div>
                    <div className="text-base font-black text-slate-950 whitespace-nowrap">{currentHero.warranty}</div>
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

          {/* Subtle Mobile Swipe Indicator */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs font-bold text-[#FF5E14] mb-4 uppercase tracking-wider">
            <span>👈 Swipe to explore all models 👉</span>
          </div>

          {/* 6 Models in Responsive Horizontal Snap Carousel on Mobile / 3-Column Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-y-16 sm:gap-x-10 max-w-6xl mx-auto -mx-4 px-4 sm:mx-auto sm:px-0">
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
                className="group flex flex-col items-center text-center bg-white rounded-2xl p-4 transition-all duration-300 shrink-0 w-[82vw] sm:w-auto snap-center border border-slate-100 sm:border-transparent shadow-xs sm:shadow-none"
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
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none sm:flex-wrap pb-1 max-w-full">
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
                  className={`px-4 py-2 text-sm transition-colors rounded-full shrink-0 whitespace-nowrap ${
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

          {/* Subtle Mobile Swipe Indicator */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs font-bold text-[#FF5E14] mb-4 uppercase tracking-wider">
            <span>👈 Swipe to explore all models 👉</span>
          </div>

          {/* Clean Carousel on Mobile / 3-Column Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredBikes.map((bike, idx) => (
              <FadeIn
                key={bike.id}
                bidirectional
                delay={(idx % 3) * 0.08}
                className="h-full shrink-0 w-[80vw] sm:w-auto snap-center"
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

          {/* Subtle Mobile Swipe Indicator */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs font-bold text-[#FF5E14] mb-4 uppercase tracking-wider">
            <span>👈 Swipe to view all features 👉</span>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 scrollbar-none sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* 1. Smart BMS */}
            <FadeIn bidirectional delay={0} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg shrink-0 w-[80vw] sm:w-auto snap-center">
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
            <FadeIn bidirectional delay={0.1} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg shrink-0 w-[80vw] sm:w-auto snap-center">
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
            <FadeIn bidirectional delay={0.2} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg shrink-0 w-[80vw] sm:w-auto snap-center">
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
            <FadeIn bidirectional delay={0.3} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-[#FF5E14] transition-all duration-300 hover:shadow-lg shrink-0 w-[80vw] sm:w-auto snap-center">
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



      {/* 8. EXCELLENT PRODUCTS SHOWCASE & GALLE SHOWROOM GALLERY (Zuboo OEM Clean White Showcase) */}
      <section id="excellent-products" data-scroll-section className="reveal-section py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header matching zuboo.com */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-black font-manrope">
              EXCELLENT PRODUCTS
            </h2>
          </div>

          {/* Center Stage: Large Bike Model Cutout on Seamless Pure White (Smooth Auto-Cycle) */}
          <div
            className="relative w-full max-w-4xl mx-auto flex items-center justify-center mb-10 sm:mb-14"
            onMouseEnter={() => setIsBikeHovered(true)}
            onMouseLeave={() => setIsBikeHovered(false)}
          >
            {/* Bike Horizontal Slide Track */}
            <div className="w-full overflow-hidden bg-white">
              <div
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateX(-${selectedShowcaseBike * 100}%)` }}
              >
                {SHOWCASE_BIKES.map((bike, idx) => (
                  <div
                    key={bike.name}
                    className="w-full shrink-0 flex items-center justify-center h-[320px] sm:h-[440px] md:h-[500px] px-2 sm:px-6 bg-white"
                  >
                    <div className="relative w-full h-full max-w-2xl flex items-center justify-center">
                      <Image
                        src={bike.image}
                        alt={bike.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 850px"
                        className="object-contain select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)] hover:scale-105 transition-transform duration-500"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lower Stage: 4 Clean Showroom Photo Thumbnails Directly Below Bike (Matching zuboo.com) */}
          <div
            className="w-full max-w-5xl mx-auto pt-8 border-t border-slate-100"
            onMouseEnter={() => setIsGalleryHovered(true)}
            onMouseLeave={() => setIsGalleryHovered(false)}
          >
            {/* 4 Clean Thumbnails in a Horizontal Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {Array.from({ length: 4 }, (_, i) => {
                const photoIdx = (galleryIndex + i) % SHOWROOM_PHOTOS.length;
                const photo = SHOWROOM_PHOTOS[photoIdx];
                return (
                  <button
                    key={`${photoIdx}-${photo.src}`}
                    onClick={() => setLightboxPhotoIndex(photoIdx)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200/80 hover:border-black shadow-xs hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black cursor-pointer text-left bg-white"
                    title={photo.title}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 text-slate-900 p-2 rounded-full shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 9. SHOWROOM LOCATION & FREE TEST RIDE BOOKING FORM */}
      <section id="showroom-location" data-scroll-section className="reveal-section py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Showroom Photo & Dealership Credentials - Left Column */}
            <FadeIn bidirectional direction="left" className="lg:col-span-6 space-y-5 flex flex-col justify-between">
              {/* Authentic Galle Showroom Photo */}
              <div className="relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-200 shadow-md group">
                <Image
                  src="/media/showroom/galle-showroom.jpg"
                  alt="Udan Enterprises Kurunduwatta Galle Showroom"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                  <span>Udan Enterprises Showroom • Kurunduwatta, Galle</span>
                </div>
              </div>

              {/* Dealership Credential Chips */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#FF5E14] flex items-center justify-center shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block leading-tight">
                      100% Fully Charged Fleet
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Ready for live test ride</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block leading-tight">
                      Certified Zuboo Technicians
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Factory trained diagnostics</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block leading-tight">
                      Genuine Spare Parts Bay
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Original Zuboo spares in stock</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-slate-900 block leading-tight">
                      Official Factory Warranty
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">Authorized dealership backing</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Showroom Details & Contact Cards - Right Column */}
            <FadeIn bidirectional direction="right" className="lg:col-span-6 space-y-6 flex flex-col justify-between">
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

              {/* 4 Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* 1. Address */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 p-4 sm:p-5 group flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5E14] shrink-0 group-hover:scale-105 group-hover:bg-[#FF5E14] group-hover:text-white transition-all duration-300">
                    <MapPin className="w-5 h-5 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase text-slate-400 block font-manrope">SHOWROOM ADDRESS</span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug mt-1">
                      {settings.address || "Udugama Road, Kurunduwatta, Galle, Sri Lanka"}
                    </p>
                    <a
                      href={settings.googleMapsUrl || "https://maps.app.goo.gl/GyJCSSS7p6Bd18xM8"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5E14] hover:text-[#e04d09] mt-2 group-hover:underline"
                    >
                      <span>View on Google Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>

                {/* 2. Hotline */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 p-4 sm:p-5 group flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5E14] shrink-0 group-hover:scale-105 group-hover:bg-[#FF5E14] group-hover:text-white transition-all duration-300">
                    <Phone className="w-5 h-5 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase text-slate-400 block font-manrope">DIRECT HOTLINE</span>
                    <a
                      href={`tel:${(settings.hotline || "0784969652").replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-[#FF5E14] mt-1 block tracking-tight font-manrope"
                    >
                      {settings.hotline || "078 496 9652"}
                    </a>
                  </div>
                </div>

                {/* 3. Opening Hours */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 p-4 sm:p-5 group flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5E14] shrink-0 group-hover:scale-105 group-hover:bg-[#FF5E14] group-hover:text-white transition-all duration-300">
                    <Clock className="w-5 h-5 transition-colors" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase text-slate-400 block font-manrope">OPENING HOURS</span>
                    <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                      {settings.openingHours || "Mon–Sat: 8:30 AM – 6:00 PM | Sun: 9:00 AM – 2:00 PM"}
                    </p>
                  </div>
                </div>

                {/* 4. Email */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 p-4 sm:p-5 group flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5E14] shrink-0 group-hover:scale-105 group-hover:bg-[#FF5E14] group-hover:text-white transition-all duration-300">
                    <Mail className="w-5 h-5 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold tracking-[1.5px] uppercase text-slate-400 block font-manrope">OFFICIAL INQUIRIES</span>
                    <a
                      href={`mailto:${settings.email || "Pibida17udan4131@gmail.com"}`}
                      className="text-xs font-semibold text-slate-700 hover:text-[#FF5E14] mt-1 block truncate"
                    >
                      {settings.email || "Pibida17udan4131@gmail.com"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Cohesive Luxury CTA Buttons Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {/* 1. Primary: Book Test Ride */}
                <button
                  onClick={() => setIsTestRideOpen(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#FF3B30] hover:from-[#e04d09] hover:to-[#dc2626] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Test Ride</span>
                </button>

                {/* 2. WhatsApp Direct */}
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || "94784969652").replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-green-500/20 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>

                {/* 3. Google Maps Directions */}
                <a
                  href={settings.googleMapsUrl || "https://maps.app.goo.gl/GyJCSSS7p6Bd18xM8"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <MapPin className="w-4 h-4 text-[#FF5E14]" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                {/* 4. Direct Call Hotline */}
                <a
                  href={`tel:${(settings.hotline || "0784969652").replace(/\s+/g, '')}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-900 text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:shadow-sm"
                >
                  <Phone className="w-4 h-4 text-[#FF5E14]" />
                  <span>{settings.hotline || "078 496 9652"}</span>
                </a>
              </div>
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
                    href={`https://wa.me/${(settings.whatsappNumber || "94784969652").replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
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

      {/* 9.1 FULLSCREEN SHOWROOM PHOTO LIGHTBOX MODAL */}
      {lightboxPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setLightboxPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-900/90 shrink-0">
              <div>
                <span className="text-[10px] font-black text-[#FF5E14] uppercase tracking-wider block">
                  Udan Enterprises Galle Showroom
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {SHOWROOM_PHOTOS[lightboxPhotoIndex].title} ({lightboxPhotoIndex + 1} of {SHOWROOM_PHOTOS.length})
                </h4>
              </div>
              <button
                onClick={() => setLightboxPhotoIndex(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lightbox Center Image View */}
            <div className="relative w-full flex-1 min-h-[50vh] sm:min-h-[65vh] bg-black flex items-center justify-center overflow-hidden">
              <Image
                src={SHOWROOM_PHOTOS[lightboxPhotoIndex].src}
                alt={SHOWROOM_PHOTOS[lightboxPhotoIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Prev & Next Floating Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIndex((prev) => (prev !== null ? (prev - 1 + SHOWROOM_PHOTOS.length) % SHOWROOM_PHOTOS.length : 0));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhotoIndex((prev) => (prev !== null ? (prev + 1) % SHOWROOM_PHOTOS.length : 0));
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Caption & Action Footer */}
            <div className="px-4 sm:px-6 py-3.5 bg-slate-900/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <p className="text-slate-300 text-xs flex-1 min-w-[200px]">
                {SHOWROOM_PHOTOS[lightboxPhotoIndex].desc}
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/94784969652?text=${encodeURIComponent(
                    `Hello Udan Enterprises, I am inquiring regarding the showroom photo: ${SHOWROOM_PHOTOS[lightboxPhotoIndex].title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
                <a
                  href="tel:0784969652"
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. CINEMATIC MOTORCYCLE SKYLINE FOOTER */}
      <Footer />
    </div>
  );
}
