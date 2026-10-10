"use client";

import { Phone, MessageSquare, MapPin, ArrowRight, Sparkles } from "lucide-react";

interface ContactBarProps {
  onOpenTestRide: () => void;
}

export default function ContactBar({ onOpenTestRide }: ContactBarProps) {
  return (
    <section id="contact" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Lifestyle Banner matching design */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-slate-800 via-slate-800/90 to-slate-900 p-8 sm:p-12 border border-slate-700/60 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLEANER • GREENER • BRIGHTER</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              IGNITE YOUR PASSION MOVEMENT AND FIND YOUR RHYTHM
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Embrace the joy of sustainable riding. Connect with your surroundings, feel the coastal
              ocean wind on your face, and experience true freedom without petrol costs.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenTestRide}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-red-600/30 active:scale-95"
            >
              <span>Get a Virtual Trial / Test Ride</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Strip */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              NEED ASSISTANCE OR MORE INFORMATION?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Our friendly local showroom team in Galle is ready to assist you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Call Us */}
            <a
              href="tel:+94784969652"
              className="p-6 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700 hover:border-[#346C83] transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#346C83]/20 text-[#346C83] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">Direct Hotline</span>
                <span className="text-base font-bold text-white group-hover:text-[#346C83] transition-colors">
                  078 496 9652
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Mon - Sat: 8:30 AM - 6:00 PM</span>
              </div>
            </a>

            {/* Card 2: WhatsApp Chat */}
            <a
              href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20learn%20more%20about%20Zuboo%20electric%20bikes."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">WhatsApp Direct</span>
                <span className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Chat Now (078 496 9652) →
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Instant quotes & model specs</span>
              </div>
            </a>

            {/* Card 3: Visit Showroom */}
            <div className="p-6 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-600/20 text-sky-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">Showroom Location</span>
                <span className="text-sm font-bold text-white block">Udugama Road, Kurunduwatta, Galle</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">Pibida17udan4131@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
