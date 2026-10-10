"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { BIKE_MODELS, BikeModel } from "@/data/bikes";
import { useDynamicProducts, useShowroomSettings } from "@/lib/site-data";
import { Gauge, Battery, Zap, Clock, Check, MessageSquare, Calendar, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface BikesCollectionProps {
  onSelectModelForTestRide: (modelId: string) => void;
}

export default function BikesCollection({ onSelectModelForTestRide }: BikesCollectionProps) {
  const { products: dynamicBikes } = useDynamicProducts();
  const { settings } = useShowroomSettings();

  const rawPhone = settings.whatsappNumber || "0784969652";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappIntl = cleanPhone.startsWith("0") ? `94${cleanPhone.slice(1)}` : cleanPhone;

  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedColorForT3, setSelectedColorForT3] = useState<string>(
    BIKE_MODELS[0].colors?.[0].image || "/bikes/t3/t3-black.webp"
  );
  const [activeColorNameForT3, setActiveColorNameForT3] = useState<string>(
    BIKE_MODELS[0].colors?.[0].name || "Matte Black"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".collection-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allBikes = dynamicBikes && dynamicBikes.length > 0 ? dynamicBikes : BIKE_MODELS;

  const filteredModels =
    selectedCategory === "all"
      ? allBikes
      : allBikes.filter((model) => model.id === selectedCategory || model.slug === selectedCategory);

  const getWhatsAppLink = (bike: BikeModel) => {
    const text = encodeURIComponent(
      `Hi ${settings.showroomName || "Udan Enterprises"}, I would like to inquire about the pricing and availability of the ${bike.name}.`
    );
    return `https://wa.me/${whatsappIntl}?text=${text}`;
  };

  return (
    <section
      id="bikes"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-8 h-0.5 bg-red-500" />
              <span>ZUBOO LINEUP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              EXPLORE OUR COLLECTION
            </h2>
            <p className="mt-3 text-slate-400 text-base max-w-xl">
              From rugged urban commuters to off-road tourers and retro classics, find the perfect
              electric companion for your lifestyle.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All Models
            </button>
            {BIKE_MODELS.map((bike) => (
              <button
                key={bike.id}
                onClick={() => setSelectedCategory(bike.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === bike.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {bike.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredModels.map((bike) => {
            const displayImage =
              bike.id === "t3" ? selectedColorForT3 : bike.mainImage;

            return (
              <div
                key={bike.id}
                className="collection-card group rounded-3xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/40 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges & Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30">
                        {bike.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                        {bike.name}
                      </h3>
                      <p className="text-sm font-medium text-slate-400 mt-0.5">
                        {bike.tagline}
                      </p>
                    </div>

                    {bike.formattedPrice && (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">
                          Starting From
                        </span>
                        <span className="text-lg font-black text-white">
                          {bike.formattedPrice}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bike Image Stage */}
                  <div className="relative h-64 sm:h-72 w-full my-6 flex items-center justify-center bg-radial from-slate-700/30 to-transparent rounded-2xl overflow-hidden p-4">
                    <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={displayImage}
                        alt={bike.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>

                  {/* Interactive Color Switcher (for T3) */}
                  {bike.colors && bike.colors.length > 1 && (
                    <div className="mb-6 p-3 rounded-2xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-slate-400 font-medium">Color: </span>
                        <span className="text-white font-bold">{activeColorNameForT3}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {bike.colors.map((color) => (
                          <button
                            key={color.name}
                            onClick={() => {
                              setSelectedColorForT3(color.image);
                              setActiveColorNameForT3(color.name);
                            }}
                            className={`w-6 h-6 rounded-full transition-all border-2 ${
                              selectedColorForT3 === color.image
                                ? "border-red-500 scale-125 shadow-md shadow-red-500/40"
                                : "border-slate-600 hover:scale-110"
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            aria-label={`Select color ${color.name}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specification 4-Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-700/70 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Gauge className="w-3.5 h-3.5 text-sky-400" />
                        <span>Top Speed</span>
                      </div>
                      <div className="font-bold text-white text-sm">{bike.topSpeed}</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Battery className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Max Range</span>
                      </div>
                      <div className="font-bold text-white text-sm">{bike.advertisedRange}</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Motor Power</span>
                      </div>
                      <div className="font-bold text-white text-sm">{(bike.motorPower || "").split(" ")[0]}</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        <span>Charge Time</span>
                      </div>
                      <div className="font-bold text-white text-sm">{bike.chargingTime || "4 - 8 hrs"}</div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    {bike.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions Bottom Bar */}
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onSelectModelForTestRide(bike.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-red-600/30 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Test Ride</span>
                  </button>

                  <a
                    href={getWhatsAppLink(bike)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
