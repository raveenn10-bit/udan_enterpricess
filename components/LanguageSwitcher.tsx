"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation, Language } from "@/lib/i18n";
import { Globe, ChevronDown, Check } from "lucide-react";

interface LanguageOption {
  code: Language;
  label: string;
  native: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "si", label: "Sinhala", native: "සිංහල", flag: "🇱🇰" },
  { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇱🇰" },
];

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#111820] bg-white hover:bg-[#E8F1F5] border border-[#E0E8EC] transition-all shadow-2xs hover:shadow-xs focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-[#346C83]" />
        <span className="font-medium tracking-tight text-[11px] sm:text-xs">
          {currentOption.native}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[#667780] transition-transform duration-150 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-[#E0E8EC] shadow-lg py-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold text-[#667780] uppercase tracking-wider border-b border-[#E0E8EC]/60 mb-1">
            Language / භාෂාව / மொழி
          </div>
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors ${
                  isSelected
                    ? "bg-[#E8F1F5] text-[#346C83] font-bold"
                    : "text-[#111820] hover:bg-slate-50 font-medium"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <div>
                    <span className="block text-xs leading-none">{lang.native}</span>
                    <span className="text-[10px] text-[#667780] leading-tight">
                      {lang.label}
                    </span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#346C83]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
