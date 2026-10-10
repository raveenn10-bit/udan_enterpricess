"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { SPARE_PARTS_CATALOG, SparePart } from "@/data/parts";
import { useTranslation } from "@/lib/i18n";
import {
  Search,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Zap,
  Info,
} from "lucide-react";

export default function PartsCatalog() {
  const { t, language } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activePartForModal, setActivePartForModal] = useState<SparePart | null>(null);

  const categories = [
    { id: "all", label: t.parts_category_all },
    { id: "batteries", label: t.parts_category_batteries },
    { id: "tires", label: t.parts_category_tires },
    { id: "electronics", label: t.parts_category_electronics },
    { id: "accessories", label: t.parts_category_accessories },
  ];

  const filteredParts = useMemo(() => {
    return SPARE_PARTS_CATALOG.filter((part) => {
      const matchesCategory =
        selectedCategory === "all" || part.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        part.name.toLowerCase().includes(q) ||
        part.code.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q) ||
        part.compatibleModels.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getWhatsAppOrderUrl = (part: SparePart) => {
    const text =
      `*Spare Part Order Inquiry - Udan Enterprises*\n\n` +
      `*Item:* ${part.name}\n` +
      `*Part Code:* ${part.code}\n` +
      `*Price:* ${part.formattedPrice}\n` +
      `*Warranty:* ${part.warranty}\n\n` +
      `Hello team, please confirm immediate availability and reserve this part for collection at your Galle showroom.`;
    return `https://wa.me/94784969652?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E0E8EC] shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-[#667780] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.parts_search_placeholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E0E8EC] bg-[#F7F9FA] text-xs text-[#111820] placeholder-[#667780] focus:outline-none focus:border-[#346C83] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#667780] hover:text-[#111820]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Guarantee Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#346C83] bg-[#E8F1F5] px-3.5 py-2 rounded-xl border border-[#346C83]/20 self-stretch md:self-auto justify-center">
            <ShieldCheck className="w-4 h-4 text-[#346C83] shrink-0" />
            <span>{t.parts_genuine_guarantee}</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-[#111820] text-white shadow-xs"
                    : "bg-[#F7F9FA] text-[#667780] hover:bg-[#E8F1F5] hover:text-[#111820] border border-[#E0E8EC]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Parts Grid */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E0E8EC] p-8 space-y-3">
          <Wrench className="w-8 h-8 text-[#667780] mx-auto opacity-50" />
          <h3 className="font-heading font-bold text-base text-[#111820]">
            No parts matching your search
          </h3>
          <p className="text-xs text-[#667780] max-w-md mx-auto">
            Can&apos;t find what you are looking for? Contact the Udan Enterprises Galle
            workshop directly on WhatsApp to order specific Zuboo components.
          </p>
          <a
            href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises,%20I%20am%20looking%20for%20a%20specific%20Zuboo%20spare%20part."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-[#111820] font-bold text-xs uppercase tracking-wider mt-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Inquire Custom Part on WhatsApp</span>
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="bg-white rounded-2xl border border-[#E0E8EC] hover:border-[#346C83]/50 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Part Media Banner */}
                <div className="relative h-44 w-full bg-[#111820] overflow-hidden">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111820]/90 via-transparent to-black/30" />

                  {/* Stock and Featured Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
                      {part.inStock ? t.parts_in_stock : "Call to Order"}
                    </span>
                    {part.featured && (
                      <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-[#111820]">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase block">
                      {part.code}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-white leading-snug truncate">
                      {part.name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#667780] block">
                        Retail Price
                      </span>
                      <span className="text-xl font-heading font-extrabold text-[#111820]">
                        {part.formattedPrice}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {part.warranty}
                    </span>
                  </div>

                  <p className="text-xs text-[#667780] line-clamp-2 leading-relaxed">
                    {part.description}
                  </p>

                  {/* Key Specs Preview */}
                  <div className="bg-[#F7F9FA] p-3 rounded-xl border border-[#E0E8EC] space-y-1.5 text-[11px]">
                    {Object.entries(part.specifications)
                      .slice(0, 2)
                      .map(([key, val]) => (
                        <div key={key} className="flex justify-between text-[#111820]">
                          <span className="text-[#667780]">{key}:</span>
                          <span className="font-semibold truncate max-w-[60%]">{val}</span>
                        </div>
                      ))}
                  </div>

                  {/* Compatible Models */}
                  <div className="text-[10px] text-[#667780]">
                    <span className="font-bold text-[#111820]">Compatible with: </span>
                    <span>{part.compatibleModels.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="p-5 pt-0">
                <a
                  href={getWhatsAppOrderUrl(part)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#111820] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs group"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>{t.parts_order_whatsapp}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Workshop Service Notice */}
      <div className="p-6 rounded-2xl bg-[#E8F1F5] border border-[#346C83]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#346C83]" />
            <span>Need Installation or Free Diagnostic Check?</span>
          </h4>
          <p className="text-xs text-[#667780] max-w-xl">
            Our qualified electric motorcycle technicians in Galle provide on-the-spot fitment,
            brake bleeding, battery cell health analysis, and warranty repairs.
          </p>
        </div>
        <a
          href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises,%20I%20would%20like%20to%20book%20a%20service%20or%20spare%20parts%20installation%20at%20Galle%20showroom."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#111820] hover:bg-[#346C83] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
        >
          <span>Book Technician Slot</span>
        </a>
      </div>
    </div>
  );
}
