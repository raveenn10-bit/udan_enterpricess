"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ZUBOO_COLLECTION, BikeModel } from "@/data/bikes";
import { useTranslation } from "@/lib/i18n";
import {
  Calculator,
  Fuel,
  Zap,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

interface BankBenchmark {
  name: string;
  rate: number;
  badge?: string;
}

const BANK_BENCHMARKS: BankBenchmark[] = [
  { name: "Commercial Bank", rate: 14.5, badge: "Lowest Benchmark" },
  { name: "Hatton National Bank (HNB)", rate: 15.0 },
  { name: "Sampath Bank", rate: 15.5 },
  { name: "Seylan Bank / Leasing", rate: 16.5 },
];

export default function LoanCalculator({ initialModelSlug }: { initialModelSlug?: string }) {
  const { t, language } = useTranslation();

  // Find initial bike or default to Zuboo GT
  const defaultBike =
    ZUBOO_COLLECTION.find((b) => b.slug === initialModelSlug) ||
    ZUBOO_COLLECTION.find((b) => b.id === "gt") ||
    ZUBOO_COLLECTION[0];

  const [selectedModel, setSelectedModel] = useState<BikeModel>(defaultBike);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(30); // 20% to 70%
  const [tenureMonths, setTenureMonths] = useState<number>(24); // 12, 24, 36, 48
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(15.0); // 14% to 18%
  const [dailyCommuteKm, setDailyCommuteKm] = useState<number>(35); // 10 to 100 km/day

  // Financial Calculations
  const calculations = useMemo(() => {
    const price = selectedModel.advertisedPrice;
    const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
    const loanPrincipal = price - downPaymentAmount;

    // Monthly interest rate r
    const monthlyRate = annualInterestRate / (12 * 100);
    const n = tenureMonths;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = loanPrincipal / n;
    } else {
      emi =
        (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }
    const monthlyInstallment = Math.round(emi);
    const totalInterest = Math.round(monthlyInstallment * n - loanPrincipal);
    const totalPayable = downPaymentAmount + monthlyInstallment * n;

    // Petrol Savings Estimator (Sri Lanka benchmarks)
    // Petrol Price = Rs 370 / Liter
    // Average 125cc petrol scooter: ~35 km per liter
    // Monthly distance = dailyCommuteKm * 30 days
    const monthlyDistance = dailyCommuteKm * 30;
    const petrolLitersPerMonth = monthlyDistance / 35;
    const petrolCostPerMonth = petrolLitersPerMonth * 370;
    // Routine engine oil + servicing costs for petrol scooter (~Rs 4 per km)
    const petrolMaintenancePerMonth = monthlyDistance * 3.5;
    const totalPetrolCostPerMonth = Math.round(petrolCostPerMonth + petrolMaintenancePerMonth);

    // Zuboo EV electricity cost:
    // Uses approx 2.0 kWh per 100 km (0.02 kWh/km)
    // Sri Lanka residential electricity cost approx Rs 45 per kWh
    // EV electricity cost = monthlyDistance * 0.02 * 45 = monthlyDistance * 0.90 LKR
    const evElectricityCostPerMonth = Math.round(monthlyDistance * 0.9);

    // Net Monthly Savings
    const netMonthlySavings = Math.round(totalPetrolCostPerMonth - evElectricityCostPerMonth);

    // Net effective monthly outflow = EMI minus Fuel Savings!
    const effectiveMonthlyOutflow = Math.max(0, monthlyInstallment - netMonthlySavings);

    return {
      price,
      downPaymentAmount,
      loanPrincipal,
      monthlyInstallment,
      totalInterest,
      totalPayable,
      monthlyDistance,
      totalPetrolCostPerMonth,
      evElectricityCostPerMonth,
      netMonthlySavings,
      effectiveMonthlyOutflow,
    };
  }, [selectedModel, downPaymentPercent, tenureMonths, annualInterestRate, dailyCommuteKm]);

  // Formatted Currency Helpers
  const formatLKR = (val: number) => {
    return "Rs " + val.toLocaleString("en-LK");
  };

  // WhatsApp Inquiry URL with pre-filled quote
  const whatsappUrl = useMemo(() => {
    const text =
      `*Leasing & Quotation Inquiry - Udan Enterprises*\n\n` +
      `*Vehicle Model:* ${selectedModel.name} (${selectedModel.modelCode})\n` +
      `*Vehicle Price:* ${formatLKR(calculations.price)}\n` +
      `*Down Payment:* ${formatLKR(calculations.downPaymentAmount)} (${downPaymentPercent}%)\n` +
      `*Financed Amount:* ${formatLKR(calculations.loanPrincipal)}\n` +
      `*Tenure:* ${tenureMonths} Months\n` +
      `*Benchmark Rate:* ${annualInterestRate}% p.a.\n` +
      `*Estimated Monthly Installment (EMI):* ${formatLKR(calculations.monthlyInstallment)}/mo\n` +
      `*Estimated Petrol Savings:* ${formatLKR(calculations.netMonthlySavings)}/mo\n\n` +
      `Please provide the official bank quotation and leasing partner documentation for approval in Galle.`;
    return `https://wa.me/94784969652?text=${encodeURIComponent(text)}`;
  }, [selectedModel, calculations, downPaymentPercent, tenureMonths, annualInterestRate]);

  return (
    <div className="bg-white rounded-2xl border border-[#E0E8EC] shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#111820] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/10 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.calc_title}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
              {language === "si"
                ? "සුබූ විද්‍යුත් යතුරුපැදි ලීසිං / ණය ගණකය"
                : language === "ta"
                ? "சுபூ மின்சார பைக் லீசிங் / கடன் கணிப்பான்"
                : "Plan Your Zuboo Investment in Sri Lankan Rupees"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t.calc_subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center px-3.5 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {language === "si"
                ? "පෙට්‍රල් වියදම 90% කින් අඩු කරගන්න"
                : language === "ta"
                ? "பெட்ரோல் செலவில் 90% சேமிக்கவும்"
                : "Save ~90% on Monthly Fuel Costs"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 space-y-10">
        {/* Step 1: Vehicle Model Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#111820] text-white flex items-center justify-center text-[10px] font-black">
                1
              </span>
              <span>{t.calc_model_label}</span>
            </label>
            <span className="text-xs text-[#667780]">
              {language === "si" ? "මාදිලි 8 කින් තෝරන්න" : language === "ta" ? "8 மாடல்கள் உள்ளன" : "Select from 8 showroom models"}
            </span>
          </div>

          {/* Quick Model Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ZUBOO_COLLECTION.map((bike) => {
              const isSelected = bike.id === selectedModel.id;
              return (
                <button
                  key={bike.id}
                  type="button"
                  onClick={() => setSelectedModel(bike)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "border-[#346C83] bg-[#E8F1F5] ring-2 ring-[#346C83]/20 shadow-xs"
                      : "border-[#E0E8EC] bg-white hover:border-[#346C83]/50 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-2">
                    <span className="font-heading font-bold text-xs sm:text-sm text-[#111820] leading-tight">
                      {bike.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-[#346C83] shrink-0" />
                    )}
                  </div>
                  <div>
                    <span className="block text-[11px] font-extrabold text-[#346C83]">
                      {bike.formattedPrice}
                    </span>
                    <span className="block text-[10px] text-[#667780] font-medium mt-0.5">
                      {bike.motorPower.split(" ")[0]} • {bike.advertisedRange}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Sliders and Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 space-y-7">
            {/* Down Payment Slider */}
            <div className="space-y-3 bg-[#F7F9FA] p-5 rounded-xl border border-[#E0E8EC]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#111820] text-white flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  <span>{t.calc_down_payment}</span>
                </label>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#111820]">
                    {formatLKR(calculations.downPaymentAmount)}
                  </span>
                  <span className="ml-1.5 text-xs font-bold text-[#346C83]">
                    ({downPaymentPercent}%)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={20}
                max={70}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#E0E8EC] rounded-lg appearance-none cursor-pointer accent-[#346C83]"
              />

              <div className="flex justify-between text-[11px] font-semibold text-[#667780]">
                <span>20% (Minimum)</span>
                <span>40% (Recommended)</span>
                <span>70% (Lowest EMI)</span>
              </div>
            </div>

            {/* Loan Tenure Selector */}
            <div className="space-y-3 bg-[#F7F9FA] p-5 rounded-xl border border-[#E0E8EC]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#111820] text-white flex items-center justify-center text-[10px] font-black">
                    3
                  </span>
                  <span>{t.calc_tenure}</span>
                </label>
                <span className="text-sm font-extrabold text-[#111820]">
                  {tenureMonths} {t.calc_months} ({tenureMonths / 12}{" "}
                  {tenureMonths / 12 === 1 ? "Year" : "Years"})
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {[12, 24, 36, 48].map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenureMonths(months)}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                      tenureMonths === months
                        ? "bg-[#111820] text-white shadow-xs"
                        : "bg-white text-[#111820] border border-[#E0E8EC] hover:bg-slate-100"
                    }`}
                  >
                    {months}M
                  </button>
                ))}
              </div>
            </div>

            {/* Annual Interest Rate & Bank Benchmarks */}
            <div className="space-y-3 bg-[#F7F9FA] p-5 rounded-xl border border-[#E0E8EC]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#111820] text-white flex items-center justify-center text-[10px] font-black">
                    4
                  </span>
                  <span>{t.calc_interest_rate}</span>
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="28"
                    value={annualInterestRate}
                    onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
                    className="w-16 px-2 py-1 text-right text-xs font-extrabold text-[#111820] bg-white border border-[#E0E8EC] rounded-lg focus:outline-none focus:border-[#346C83]"
                  />
                  <span className="text-xs font-bold text-[#111820]">% p.a.</span>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block mb-2">
                  {t.calc_bank_benchmarks}:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BANK_BENCHMARKS.map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      onClick={() => setAnnualInterestRate(bank.rate)}
                      className={`p-2 rounded-lg text-left border transition-all text-[11px] ${
                        annualInterestRate === bank.rate
                          ? "border-[#346C83] bg-[#E8F1F5] font-bold text-[#111820]"
                          : "border-[#E0E8EC] bg-white text-[#667780] hover:bg-slate-100"
                      }`}
                    >
                      <div className="font-semibold truncate">{bank.name}</div>
                      <div className="font-bold text-[#346C83]">{bank.rate}%</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily Commute Distance for Fuel Savings calculation */}
            <div className="space-y-3 bg-[#E8F1F5]/60 p-5 rounded-xl border border-[#346C83]/30">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-amber-600" />
                  <span>{t.calc_daily_commute}</span>
                </label>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#111820]">
                    {dailyCommuteKm} km / day
                  </span>
                  <span className="text-[11px] text-[#667780] block">
                    ({calculations.monthlyDistance} km / month)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={dailyCommuteKm}
                onChange={(e) => setDailyCommuteKm(Number(e.target.value))}
                className="w-full h-2 bg-[#E0E8EC] rounded-lg appearance-none cursor-pointer accent-[#346C83]"
              />

              <div className="flex justify-between text-[11px] font-semibold text-[#667780]">
                <span>10 km (Short City Commute)</span>
                <span>35 km (Average Commute)</span>
                <span>100 km (High Mileage)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Financial Results & Petrol Savings Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Result Box */}
            <div className="bg-[#111820] text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#346C83]/20 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                  {t.calc_monthly_installment}
                </span>
                <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mt-1">
                  {formatLKR(calculations.monthlyInstallment)}
                  <span className="text-xs font-medium text-slate-400"> / month</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  for {tenureMonths} monthly payments on {selectedModel.name}
                </div>
              </div>

              {/* Petrol Savings Comparison Card */}
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.calc_petrol_savings_title}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-800/80 text-[10px] text-emerald-200">
                    Octane 92 @ Rs 370/L
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.calc_petrol_cost_month}:</span>
                    <span className="font-semibold text-red-300">
                      ~{formatLKR(calculations.totalPetrolCostPerMonth)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.calc_ev_cost_month}:</span>
                    <span className="font-semibold text-emerald-300">
                      ~{formatLKR(calculations.evElectricityCostPerMonth)}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/30 flex justify-between items-center">
                    <span className="font-bold text-emerald-400 text-xs">
                      {t.calc_net_savings_month}:
                    </span>
                    <span className="text-base font-extrabold text-emerald-300">
                      +{formatLKR(calculations.netMonthlySavings)} / mo
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-900/40 text-[11px] text-emerald-200 leading-tight">
                  💡 <strong>Smart Financial Tip:</strong> Your fuel savings alone offset{" "}
                  <strong>
                    {Math.min(
                      100,
                      Math.round(
                        (calculations.netMonthlySavings / calculations.monthlyInstallment) * 100
                      )
                    )}
                    %
                  </strong>{" "}
                  of your monthly bike installment!
                </div>
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-2 text-xs border-t border-white/10 pt-4 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.calc_price_label}:</span>
                  <span className="font-bold text-white">{formatLKR(calculations.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.calc_down_payment}:</span>
                  <span className="font-bold text-white">
                    {formatLKR(calculations.downPaymentAmount)} ({downPaymentPercent}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.calc_loan_amount}:</span>
                  <span className="font-bold text-white">
                    {formatLKR(calculations.loanPrincipal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{t.calc_total_interest}:</span>
                  <span className="font-bold text-amber-300">
                    {formatLKR(calculations.totalInterest)}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/5">
                  <span className="text-slate-400">{t.calc_total_payable}:</span>
                  <span className="font-bold text-white">
                    {formatLKR(calculations.totalPayable)}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Pre-filled Quotation CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-[#111820] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.calc_whatsapp_cta}</span>
              </a>

              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                {t.calc_disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Local Leasing Partner Institutions in Galle */}
        <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#346C83]" />
            <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider">
              {language === "si"
                ? "ගාල්ල සහ දකුණු පළාත සඳහා ලීසිං සහ මූල්‍ය සහකරුවන්"
                : language === "ta"
                ? "காலி மற்றும் தென் மாகாணத்திற்கான லீசிங் கூட்டாளர்கள்"
                : "Preferred Leasing & Banking Partners in Galle"}
            </h3>
          </div>
          <p className="text-xs text-[#667780] leading-relaxed">
            Udan Enterprises collaborates with certified local financial institutions across Galle and Southern Province to expedite speedy approval, minimal paperwork, and preferential interest rates for electric vehicle purchases.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-[#111820]">
            <div className="p-3 bg-white rounded-xl border border-[#E0E8EC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Commercial Bank</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E0E8EC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Hatton National Bank</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E0E8EC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-600" />
              <span>Sampath Bank</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E0E8EC] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>LOLC Finance / Leasing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
