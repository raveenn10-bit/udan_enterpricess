"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BatteryCharging, Cpu, Sparkles, Gauge, ArrowRight, ShieldCheck } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function WhyZuboo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".why-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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

      gsap.fromTo(
        ".why-feature-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-features-list",
            start: "top 80%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        ".why-spec-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".why-spec-card",
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-zuboo"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-white border-y border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="why-header max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-8 h-0.5 bg-red-600" />
            <span>WHY ZUBOO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            THINGS YOU WERE SEEKING FOR
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Say goodbye to fuel queues and rising petrol prices. Zuboo delivers intelligent electric
            commutes designed for maximum reliability and freedom.
          </p>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: 01, 02, 03 Numbered Feature Pillars */}
          <div className="lg:col-span-5 space-y-8 why-features-list">
            {/* Feature 01 */}
            <div className="why-feature-item group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-red-600 transition-colors">
                  01
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    UP TO 60 MILES PER CHARGE
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Go further with advanced smart battery management. Easily cover your daily commute,
                    errands, and weekend leisure on a single charge.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 02 */}
            <div className="why-feature-item group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-red-600 transition-colors">
                  02
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    ZERO EMISSIONS ALL SPEED
                    <Gauge className="w-4 h-4 text-sky-600" />
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Enjoy a cleaner, silent ride that generates zero local emissions and keeps the
                    coastal air of Galle pristine.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 03 */}
            <div className="why-feature-item group p-6 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/70 hover:border-red-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-red-600 transition-colors">
                  03
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    REVOLUTIONARY DESIGN
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    A perfect blend of high-strength alloy engineering, ergonomic seat cushioning, and
                    striking road presence that turns heads.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Advanced Specifications Interactive Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="why-spec-card relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 sm:p-10 text-white shadow-2xl overflow-hidden border border-slate-700/60">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                      ENGINEERING EXCELLENCE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
                      Advanced Specifications Built For The Future
                    </h3>
                  </div>

                  <a
                    href="#bikes"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
                  >
                    <span>View All Features</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* 3 Spec Callout Rows */}
                <div className="mt-8 space-y-6">
                  {/* Spec 1 */}
                  <div className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <div className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
                      <BatteryCharging className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">Removable Lithium Battery</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        High energy density cells with quick-release lock. Take it indoors to charge
                        at your home or office using any standard 230V socket.
                      </p>
                    </div>
                  </div>

                  {/* Spec 2 */}
                  <div className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <div className="p-3 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 shrink-0">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">High-Torque Hub Motor</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        Silent, brushless waterproof motor delivering instant torque for steep slopes,
                        passenger riding, and effortless overtaking.
                      </p>
                    </div>
                  </div>

                  {/* Spec 3 */}
                  <div className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                    <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <Gauge className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-white">Smart Digital Dashboard</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        High-contrast outdoor-visible LCD display showcasing live speed, battery
                        percentage, odometer, gear modes, and fault diagnostics.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Assurance */}
                <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Official Manufacturer Warranty & Zuboo Genuine Spares</span>
                  </div>
                  <span className="font-semibold text-slate-300">Udan Enterprises Exclusive</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
