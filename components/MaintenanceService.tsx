"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BatteryCharging, Disc, Wrench, ShieldAlert, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

export default function MaintenanceService() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="service"
      ref={sectionRef}
      className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Maintenance Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest">
              <span className="w-8 h-0.5 bg-red-600" />
              <span>AFTER-SALES & SERVICE</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              KEEP YOUR RIDE SMOOTH AND EFFICIENT
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              At Udan Enterprises, our certified technicians ensure your Zuboo electric bike delivers
              optimum performance day in and day out with dedicated service in Galle.
            </p>

            {/* 4 Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="service-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Regular Battery Checks</h3>
                <p className="text-xs text-slate-500 mt-1">
                  BMS health diagnosis, voltage balancing, and thermal checks for longevity.
                </p>
              </div>

              <div className="service-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
                  <Disc className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Tire Maintenance</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pressure optimization and tread depth verification for peak wet-weather grip.
                </p>
              </div>

              <div className="service-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Brake System Inspection</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Disc pads, calipers, and electronic EBS regenerative braking calibration.
                </p>
              </div>

              <div className="service-card p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-red-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Professional Support</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Official Zuboo factory spare parts and scheduled warranty checkups.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/94771234567?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20book%20a%20maintenance%20service%20for%20my%20Zuboo%20electric%20bike."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <span>Book Service Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Why Choose Reasons */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" />
                <span>UNMATCHED VALUE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                PROVIDING A COMPELLING LIST OF REASONS
              </h3>

              <p className="text-sm text-slate-600 mt-2 mb-6">
                Choose Zuboo at Udan Enterprises to enjoy modern lifestyle benefits, low operational
                overhead, and zero carbon footprint.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Eco-Friendly & Zero Emission",
                    desc: "100% electric ride that reduces your carbon footprint to absolute zero.",
                  },
                  {
                    title: "Ultra-Low Maintenance",
                    desc: "No spark plugs, no engine oil, no clutch cables, and minimal mechanical wear.",
                  },
                  {
                    title: "Smart & Modern Design",
                    desc: "Futuristic digital dashboard, LED daytime running lights, and keyless controls.",
                  },
                  {
                    title: "Powerful & Reliable Performance",
                    desc: "Tuned for immediate hill-climbing torque and dependable coastal weather resilience.",
                  },
                  {
                    title: "Authorized Dealer Warranty",
                    desc: "Genuine spare parts availability and dedicated local after-sales service in Galle.",
                  },
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{reason.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{reason.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
