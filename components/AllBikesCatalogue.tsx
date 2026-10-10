"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ZUBOO_COLLECTION, BikeModel } from "@/data/bikes";
import { useDynamicProducts } from "@/lib/site-data";
import { Gauge, Battery, Zap, Calendar, MessageSquare, ArrowRight, Search, ShieldCheck } from "lucide-react";

interface AllBikesCatalogueProps {
  onSelectModelForTestRide?: (modelId: string) => void;
  showSearch?: boolean;
}

export default function AllBikesCatalogue({
  onSelectModelForTestRide,
  showSearch = true,
}: AllBikesCatalogueProps) {
  const { products: dynamicBikes } = useDynamicProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedColorForT3, setSelectedColorForT3] = useState<string>("/bikes/t3/t3-black.webp");

  const filteredBikes = (dynamicBikes || ZUBOO_COLLECTION).filter((bike) => {
    const matchesSearch =
      bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bike.motorPower.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "commuter")
      return matchesSearch && ["mini", "t3", "kb1"].includes(bike.slug);
    if (selectedCategory === "touring")
      return matchesSearch && ["gt", "the-tank"].includes(bike.slug);
    if (selectedCategory === "sports")
      return matchesSearch && ["t11", "ex008"].includes(bike.slug);
    if (selectedCategory === "retro")
      return matchesSearch && bike.slug === "paris";

    return matchesSearch;
  });

  const getWhatsAppLink = (bike: BikeModel) => {
    const text = encodeURIComponent(
      `Hi Udan Enterprises, I would like to inquire about the ${bike.name} (${bike.modelCode}) advertised at ${bike.formattedPrice}.`
    );
    return `https://wa.me/94784969652?text=${text}`;
  };

  return (
    <section id="models" className="py-20 lg:py-28 bg-[#FFFFFF] hairline-b">
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-[#346C83]" />
              <span>OFFICIAL ZUBOO COLLECTION</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820]">
              ALL 8 ZUBOO ELECTRIC MODELS
            </h2>
            <p className="mt-3 text-[#667780] text-base max-w-xl">
              From lightweight daily city runabouts to dual-sport all-terrain tourers,
              browse our complete range of Zuboo electric motorcycles.
            </p>
          </div>

          {/* Search Box */}
          {showSearch && (
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#667780]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, motors..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E0E8EC] bg-[#F7F9FA] text-xs font-medium text-[#111820] focus:outline-none focus:border-[#346C83] focus:bg-white transition-colors"
              />
            </div>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E0E8EC]">
          {[
            { id: "all", label: "All Models" },
            { id: "commuter", label: "Commuters" },
            { id: "touring", label: "Touring & Adventure" },
            { id: "sports", label: "Sports Maxi" },
            { id: "retro", label: "Retro Classic" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === cat.id
                  ? "bg-[#111820] text-white shadow-sm"
                  : "bg-[#F7F9FA] text-[#667780] hover:text-[#111820] border border-[#E0E8EC]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBikes.map((bike) => {
            const displayImage =
              bike.slug === "t3" ? selectedColorForT3 : bike.mainImage;

            return (
              <div
                key={bike.id}
                className="group rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] hover:border-[#346C83]/50 p-5 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Top Badge & Code */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#346C83] bg-[#E8F1F5] px-2 py-0.5 rounded">
                      {bike.badge.split("•")[0]}
                    </span>
                    <span className="text-[10px] font-mono text-[#667780]">
                      {bike.modelCode}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-heading text-lg font-bold text-[#111820] mt-3">
                    <Link
                      href={`/bikes/${bike.slug}`}
                      className="hover:text-[#346C83] transition-colors"
                    >
                      {bike.name}
                    </Link>
                  </h3>
                  <p className="text-[11px] text-[#667780] line-clamp-1 mt-0.5">
                    {bike.tagline}
                  </p>

                  {/* Image Display */}
                  <div className="relative h-44 w-full my-4 bg-white rounded-lg border border-[#E0E8EC] p-3 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={displayImage}
                        alt={bike.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  </div>

                  {/* Color switcher for T3 */}
                  {bike.colors && bike.colors.length > 1 && (
                    <div className="mb-3 flex items-center justify-between text-[11px] px-2 py-1 rounded bg-white border border-[#E0E8EC]">
                      <span className="text-[#667780]">Colors:</span>
                      <div className="flex items-center gap-1.5">
                        {bike.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColorForT3(c.image)}
                            className={`w-3.5 h-3.5 rounded-full border ${
                              selectedColorForT3 === c.image
                                ? "border-[#346C83] scale-125"
                                : "border-slate-300"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-2 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-[#667780] block uppercase font-medium">
                        Advertised Price
                      </span>
                      <span className="font-heading text-base font-bold text-[#111820]">
                        {bike.formattedPrice}
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded">
                      Provisional
                    </span>
                  </div>

                  {/* Micro Specs */}
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E0E8EC] text-[11px]">
                    <div>
                      <span className="text-[#667780] block text-[10px]">Motor</span>
                      <span className="font-bold text-[#111820] truncate block">{bike.motorPower.split(" ")[0]}</span>
                    </div>
                    <div>
                      <span className="text-[#667780] block text-[10px]">Range</span>
                      <span className="font-bold text-[#111820]">{bike.advertisedRange}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 pt-3 border-t border-[#E0E8EC] flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/bikes/${bike.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-[#111820] hover:bg-[#346C83] text-white text-[11px] font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <a
                      href={getWhatsAppLink(bike)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 rounded-md bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#111820] transition-colors border border-[#E0E8EC]"
                      title="Inquire on WhatsApp"
                      aria-label="Inquire on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#346C83]" />
                    </a>
                  </div>

                  {onSelectModelForTestRide && (
                    <button
                      type="button"
                      onClick={() => onSelectModelForTestRide(bike.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-md bg-white hover:bg-[#E8F1F5] text-[#346C83] hover:text-[#111820] text-[10px] font-bold uppercase tracking-wider border border-[#E0E8EC] transition-colors"
                    >
                      <Calendar className="w-3 h-3 text-[#346C83]" />
                      <span>Book Test Ride</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
