"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartsCatalog from "@/components/PartsCatalog";
import TestRideModal from "@/components/TestRideModal";
import { useTranslation } from "@/lib/i18n";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function PartsPage() {
  const { t, language } = useTranslation();
  const [testRideModalOpen, setTestRideModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820]">
      <Navbar onOpenTestRide={() => setTestRideModalOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        <div className="editorial-container space-y-12">
          {/* Breadcrumb & Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#667780]">
              <Link href="/" className="hover:text-[#111820]">
                {t.nav_overview}
              </Link>
              <span>/</span>
              <span className="text-[#346C83] font-bold">{t.nav_parts}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820] leading-tight">
              {language === "si" ? (
                <>
                  සුබූ නියම <br />
                  <span className="text-[#346C83]">අමතර කොටස් සහ උපාංග</span>
                </>
              ) : language === "ta" ? (
                <>
                  சுபூ ஒரிஜினல் <br />
                  <span className="text-[#346C83]">உதிரி பாகங்கள் மற்றும் உபகரணங்கள்</span>
                </>
              ) : (
                <>
                  Genuine Zuboo <br />
                  <span className="text-[#346C83]">Spare Parts & Accessories</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
              {t.parts_subtitle}
            </p>
          </div>

          {/* Genuine Spare Parts Catalog Component */}
          <PartsCatalog />

          {/* Why Genuine Parts Guarantee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E0E8EC] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider">
                100% Factory Certified
              </h3>
              <p className="text-xs text-[#667780] leading-relaxed">
                Directly imported from certified Zuboo manufacturing facilities. Guarantees safety, exact pin compatibility, and zero harness modifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E0E8EC] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83]">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider">
                Island-Wide Courier Delivery
              </h3>
              <p className="text-xs text-[#667780] leading-relaxed">
                Order via WhatsApp with Cash on Delivery (COD) or bank transfer. Safe 1-3 day courier delivery across Sri Lanka or pickup at our Galle Showroom.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E0E8EC] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83]">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider">
                Professional Fitting Support
              </h3>
              <p className="text-xs text-[#667780] leading-relaxed">
                Visit our Kurunduwatta, Galle workshop for quick fitting by certified technicians, tire mounting, and computerised battery capacity health checks.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <TestRideModal
        isOpen={testRideModalOpen}
        onClose={() => setTestRideModalOpen(false)}
        preSelectedModelId="gt"
      />
    </div>
  );
}
