"use client";

import Image from "next/image";
import { FEATURED_MODELS, BikeModel } from "@/data/bikes";
import { Gauge, Battery, Zap, Shield, ArrowRight, MessageSquare, Calendar, AlertCircle } from "lucide-react";

interface FeaturedModelsProps {
  onSelectModelForTestRide: (modelId: string) => void;
}

export default function FeaturedModels({ onSelectModelForTestRide }: FeaturedModelsProps) {
  const getWhatsAppLink = (bike: BikeModel) => {
    const text = encodeURIComponent(
      `Hi Udan Enterprises, I would like to inquire about the ${bike.name} (${bike.modelCode}) advertised at ${bike.formattedPrice}.`
    );
    return `https://wa.me/94784969652?text=${text}`;
  };

  return (
    <section id="featured" className="py-20 lg:py-28 bg-[#FFFFFF] hairline-b">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-[#346C83]" />
              <span>SHOWROOM HIGHLIGHTS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820]">
              FEATURED ZUBOO MODELS
            </h2>
            <p className="mt-4 text-[#667780] text-base leading-relaxed">
              Explore our top recommended models for Sri Lankan commuters, delivery operators,
              and touring enthusiasts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#667780] bg-[#F7F9FA] p-3 rounded-lg border border-[#E0E8EC]">
            <AlertCircle className="w-4 h-4 text-[#346C83] shrink-0" />
            <span>Specifications & pricing shown are provisional advertised figures.</span>
          </div>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURED_MODELS.map((bike) => (
            <div
              key={bike.id}
              className="group rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] hover:border-[#346C83]/50 p-6 sm:p-8 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#346C83] bg-[#E8F1F5] px-2.5 py-1 rounded">
                      {bike.badge}
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-[#111820] mt-2.5">
                      {bike.name}
                    </h3>
                    <p className="text-xs text-[#667780] mt-0.5">{bike.tagline}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-[#667780] block uppercase">
                      Advertised
                    </span>
                    <span className="font-heading text-lg font-bold text-[#111820]">
                      {bike.formattedPrice}
                    </span>
                  </div>
                </div>

                {/* Bike Image Display */}
                <div className="relative h-60 w-full my-6 flex items-center justify-center bg-white rounded-xl border border-[#E0E8EC] p-4 overflow-hidden">
                  <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={bike.mainImage}
                      alt={bike.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-[#E0E8EC] text-xs">
                  <div>
                    <span className="text-[10px] text-[#667780] block font-medium">Motor</span>
                    <span className="font-bold text-[#111820]">{bike.motorPower.split(" ")[0]}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#667780] block font-medium">Range</span>
                    <span className="font-bold text-[#111820]">{bike.advertisedRange}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#667780] block font-medium">Braking</span>
                    <span className="font-bold text-[#111820] truncate block">{bike.brakes.split(" ")[0]}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-xs text-[#667780] line-clamp-3 leading-relaxed">
                  {bike.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#E0E8EC] flex items-center gap-3">
                <button
                  onClick={() => onSelectModelForTestRide(bike.id)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#111820] hover:bg-[#346C83] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Test Ride</span>
                </button>

                <a
                  href={getWhatsAppLink(bike)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#111820] text-xs font-bold uppercase tracking-wider transition-colors border border-[#E0E8EC]"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#346C83]" />
                  <span>Inquire</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
