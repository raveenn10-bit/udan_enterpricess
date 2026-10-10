"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Shield, Award, Users } from "lucide-react";

export default function AboutIntro() {
  return (
    <section className="py-20 lg:py-24 bg-[#E8F1F5]/40 hairline-b">
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-0.5 bg-[#346C83]" />
              <span>THE UDAN ENTERPRISES STORY</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820] leading-tight">
              PIONEERING ACCESSIBLE ELECTRIC MOBILITY IN SRI LANKA
            </h2>

            <p className="text-base text-[#667780] leading-relaxed">
              At Udan Enterprises, we believe the transition to clean electric vehicles is not just
              an environmental necessity — it is the smartest economic decision for every Sri Lankan
              commuter, family, and business.
            </p>

            <p className="text-sm text-[#667780] leading-relaxed">
              By bringing the internationally renowned **Zuboo Electric Motorcycle** lineup to our
              showroom, we offer precision-engineered bikes that eliminate reliance on volatile
              fuel costs, reduce routine maintenance to near zero, and deliver unmatched riding comfort.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-white border border-[#E0E8EC]">
                <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
                <span className="font-heading font-bold text-base text-[#111820] block">0% Emissions</span>
                <span className="text-[11px] text-[#667780]">Clean coastal transport</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E0E8EC]">
                <Shield className="w-5 h-5 text-[#346C83] mb-2" />
                <span className="font-heading font-bold text-base text-[#111820] block">2-3 Yr Warranty</span>
                <span className="text-[11px] text-[#667780]">Advertised motor & battery</span>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E0E8EC]">
                <Award className="w-5 h-5 text-amber-600 mb-2" />
                <span className="font-heading font-bold text-base text-[#111820] block">Genuine Spares</span>
                <span className="text-[11px] text-[#667780]">Full after-sales support</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111820] hover:text-[#346C83] transition-colors"
              >
                <span>Read Full Company Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-white border border-[#E0E8EC] shadow-sm relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E0E8EC]">
                <span className="text-xs font-bold uppercase tracking-widest text-[#346C83]">
                  Digital Showroom
                </span>
                <span className="text-[11px] text-[#667780] font-mono">Galle, Sri Lanka</span>
              </div>

              <div className="relative h-52 w-full rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] p-4 flex items-center justify-center">
                <Image
                  src="/media/bikes/paris/main.webp"
                  alt="Zuboo Paris at Udan Enterprises"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-[#111820]">
                  Experience Zuboo In Person
                </h3>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Visit our showroom or request a door-step demonstration to inspect build quality,
                  evaluate ride height, and experience instantaneous electric torque.
                </p>
              </div>

              <Link
                href="/contact"
                className="block text-center w-full py-3 rounded-lg bg-[#111820] hover:bg-[#346C83] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Find Showroom & Hours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
