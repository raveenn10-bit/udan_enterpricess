"use client";

import { BatteryCharging, Cpu, Sparkles, Gauge, ShieldCheck, Zap } from "lucide-react";

export default function WhyElectric() {
  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#F7F9FA] hairline-b">
      <div className="editorial-container">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-[#346C83]" />
            <span>TECHNOLOGY & PERFORMANCE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820]">
            ENGINEERED FOR MODERN MOBILITY
          </h2>
          <p className="mt-4 text-[#667780] text-base leading-relaxed">
            Every Zuboo electric model is crafted around robust core components that ensure
            smooth power delivery, long cell lifespans, and low running costs.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3 Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E0E8EC]">
              <div className="flex items-start gap-5">
                <span className="font-heading text-3xl font-bold text-[#E0E8EC]">
                  01
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-bold text-[#111820] flex items-center gap-2">
                    EXTENDED REAL-WORLD RANGE
                    <BatteryCharging className="w-4 h-4 text-[#346C83]" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                    High energy density battery packs delivering up to 100+ km on a single charge.
                    Charge overnight or swap at work using standard domestic power outlets.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E0E8EC]">
              <div className="flex items-start gap-5">
                <span className="font-heading text-3xl font-bold text-[#E0E8EC]">
                  02
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-bold text-[#111820] flex items-center gap-2">
                    ZERO EMISSIONS AT ALL SPEEDS
                    <Gauge className="w-4 h-4 text-[#346C83]" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                    Completely eliminate fuel consumption, exhaust emissions, and engine noise.
                    Experience pure silent movement with immediate throttle response.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E0E8EC]">
              <div className="flex items-start gap-5">
                <span className="font-heading text-3xl font-bold text-[#E0E8EC]">
                  03
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-lg font-bold text-[#111820] flex items-center gap-2">
                    LOWEST OPERATIONAL OVERHEAD
                    <Zap className="w-4 h-4 text-[#346C83]" />
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                    No oil changes, no spark plugs, no air filters, and no belt tensioning.
                    Electric motors have 90% fewer moving parts than internal combustion engines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Technical Diagram Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#111820] text-white border border-[#111820] shadow-xl">
              <span className="text-[10px] font-bold text-[#346C83] uppercase tracking-widest block">
                Zuboo Core Architecture
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-1">
                Advanced Technical Specifications
              </h3>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-sky-400 shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-white">
                      Removable & High-Capacity Battery Packs
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Equipped with 48V to 72V configurations with intelligent Battery Management Systems (BMS)
                      safeguarding against overcharge, temperature variations, and cell imbalance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-6 border-b border-white/10">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 shrink-0">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-white">
                      High-Torque Waterproof Hub Motors
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Ranging from 490W eco-commuter motors up to 3000W peak output units. Tuned for
                      instant low-end torque to conquer inclines and carry heavy pillion loads effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-amber-400 shrink-0">
                    <Gauge className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-base text-white">
                      Smart Digital TFT / LCD Instrumentation
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      High-contrast digital cockpits displaying real-time speed, battery level indicator,
                      trip meter, safety indicators, and electronic gear modes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Advertised Warranty: Up to 2-3 Years</span>
                </div>
                <span className="font-semibold text-slate-200">Udan Enterprises</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
