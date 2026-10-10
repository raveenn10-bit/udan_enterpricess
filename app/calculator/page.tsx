"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoanCalculator from "@/components/LoanCalculator";
import TestRideModal from "@/components/TestRideModal";
import { useTranslation } from "@/lib/i18n";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Building,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function CalculatorPage() {
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
              <span className="text-[#346C83] font-bold">{t.nav_calculator}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820] leading-tight">
              {language === "si" ? (
                <>
                  ශ්‍රී ලංකා රුපියල් (LKR) <br />
                  <span className="text-[#346C83]">ලීසිං සහ ණය ගණකය</span>
                </>
              ) : language === "ta" ? (
                <>
                  இலங்கை ரூபாய் (LKR) <br />
                  <span className="text-[#346C83]">கடன் மற்றும் EMI கணிப்பான்</span>
                </>
              ) : (
                <>
                  Sri Lankan Rupee (LKR) <br />
                  <span className="text-[#346C83]">Loan & EMI Calculator</span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
              {t.calc_subtitle}
            </p>
          </div>

          {/* Calculator Interactive Engine */}
          <LoanCalculator />

          {/* Financial Guidance & FAQ Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0E8EC] space-y-4">
              <div className="flex items-center gap-2 text-[#346C83]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-heading font-bold text-base text-[#111820] uppercase tracking-wider">
                  {language === "si"
                    ? "ලීසිං පහසුකම් ලබාගැනීම සඳහා අවශ්‍ය ලියකියවිලි"
                    : language === "ta"
                    ? "லீசிங் பெற தேவையான ஆவணங்கள்"
                    : "Documents Required for Sri Lankan Leasing"}
                </h3>
              </div>
              <p className="text-xs text-[#667780] leading-relaxed">
                Applying for an electric bike lease with our partner financial institutions (Commercial Bank, HNB, Sampath, LOLC) is quick and streamlined:
              </p>
              <ul className="space-y-2 text-xs text-[#111820]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>National Identity Card (NIC) / Driving License copy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Latest 3 months salary slips or business income proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Billing proof (Electricity or Water bill for address verification)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Proforma Invoice issued by Udan Enterprises Galle Showroom</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E0E8EC] space-y-4">
              <div className="flex items-center gap-2 text-[#346C83]">
                <Zap className="w-5 h-5 text-amber-500" />
                <h3 className="font-heading font-bold text-base text-[#111820] uppercase tracking-wider">
                  {language === "si"
                    ? "විදුලි යතුරුපැදියක් තෝරාගැනීමේ මූල්‍ය වාසි"
                    : language === "ta"
                    ? "மின்சார பைக்கின் நிதி நன்மைகள்"
                    : "Financial Benefits of Switching to Electric"}
                </h3>
              </div>
              <p className="text-xs text-[#667780] leading-relaxed">
                With Sri Lankan fuel prices at Rs 370/Litre, typical daily commuters spend over Rs 180,000 annually on petrol alone.
              </p>
              <ul className="space-y-2 text-xs text-[#111820]">
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero Engine Oil & Filter Changes:</strong> Save Rs 25,000+ per year on regular oil and spark plug changes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Fuel Cost Reduction of ~90%:</strong> 100 km on a Zuboo bike costs only ~Rs 90 in electricity vs ~Rs 1,050 in petrol.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Instant Payback:</strong> In 24 months, your accumulated fuel savings match or surpass the down payment!</span>
                </li>
              </ul>
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
