"use client";

import { Phone, MessageSquare, MapPin, Calendar, Clock, AlertCircle } from "lucide-react";

interface ShowroomContactProps {
  onOpenTestRide: () => void;
}

export default function ShowroomContact({ onOpenTestRide }: ShowroomContactProps) {
  return (
    <section id="showroom" className="py-20 lg:py-28 bg-[#FFFFFF] hairline-b">
      <div className="editorial-container">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-[#346C83]" />
            <span>VISIT & CONNECT</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111820]">
            UDAN ENTERPRISES SHOWROOM
          </h2>
          <p className="mt-4 text-[#667780] text-base leading-relaxed">
            Connect directly with our team to inquire about model availability, test rides,
            and localized after-sales service.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Direct Hotline & WhatsApp */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F1F5] text-[#346C83] flex items-center justify-center mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                Direct Hotline & Inquiries
              </span>
              <h3 className="font-heading text-xl font-bold text-[#111820] mt-1">
                078 496 9652
              </h3>
              <p className="text-xs text-[#667780] mt-2 leading-relaxed">
                Call or WhatsApp our showroom team for instant pricing, test ride slots, and stock inquiries.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E0E8EC] flex items-center gap-3">
              <a
                href="tel:+94784969652"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111820] hover:text-[#346C83] transition-colors uppercase tracking-wider"
              >
                <span>Call Now →</span>
              </a>
              <span className="text-[#E0E8EC]">•</span>
              <a
                href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20learn%20more%20about%20Zuboo%20electric%20bikes."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors uppercase tracking-wider"
              >
                <span>WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Card 2: Showroom Address */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                Official Showroom Hub
              </span>
              <h3 className="font-heading text-lg font-bold text-[#111820] mt-1">
                Udugama Road, Kurunduwatta
              </h3>
              <p className="text-xs text-[#667780] mt-1 leading-relaxed">
                Kurunduwatta, Galle, Southern Province, Sri Lanka.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                <span>JOIN US & CHARGE YOUR RIDE ⚡</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E0E8EC]">
              <button
                onClick={onOpenTestRide}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111820] hover:text-[#346C83] transition-colors uppercase tracking-wider"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Test Ride at Showroom →</span>
              </button>
            </div>
          </div>

          {/* Card 3: Email & Support */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#E8F1F5] text-[#346C83] flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#667780] block">
                Official Email
              </span>
              <h3 className="font-heading text-sm font-bold text-[#111820] mt-1 truncate">
                Pibida17udan4131@gmail.com
              </h3>
              <p className="text-xs text-[#667780] mt-2 leading-relaxed">
                Send official corporate purchase inquiries, bulk fleet tenders, or warranty claims.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E0E8EC]">
              <a
                href="mailto:Pibida17udan4131@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111820] hover:text-[#346C83] transition-colors uppercase tracking-wider"
              >
                <span>Send Email →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Verification & Transparency Banner */}
        <div className="p-4 rounded-xl bg-[#E8F1F5] border border-[#E0E8EC] flex items-start sm:items-center gap-3 text-xs text-[#111820]">
          <AlertCircle className="w-4 h-4 text-[#346C83] shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <span className="font-bold">Showroom Verified:</span> Udan Enterprises Showroom is located at Udugama Road, Kurunduwatta, Galle. Customer inquiries, walk-ins, and scheduled test rides are welcome.
          </p>
        </div>
      </div>
    </section>
  );
}
