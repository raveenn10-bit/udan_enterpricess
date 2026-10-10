"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Calculator, Wrench } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t, language } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await addDoc(collection(db, "newsletter_subscribers"), {
        email,
        subscribedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Newsletter notice:", err);
    }
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#111820] text-white pt-16 pb-12 hairline-t border-white/10">
      <div className="editorial-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9">
                <Image
                  src="/media/branding/udan-logo.png"
                  alt="Udan Enterprises"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base tracking-tight text-white leading-none uppercase">
                  UDAN <span className="text-[#346C83]">ENTERPRISES</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-0.5 font-semibold">
                  {t.brand_subtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer_desc}
            </p>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="font-heading font-bold text-amber-400 text-xs tracking-wide">
                {t.slogan_charge}
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Showroom Address:
                </span>
                {t.showroom_address}
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Hotline & WhatsApp:
                </span>
                <a
                  href="tel:+94784969652"
                  className="text-white hover:text-[#346C83] font-bold"
                >
                  {t.phone_label}
                </a>
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                  Official Email:
                </span>
                <a
                  href={`mailto:${t.email_label}`}
                  className="text-slate-300 hover:text-white underline"
                >
                  {t.email_label}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.footer_quick_links}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.nav_overview}
                </Link>
              </li>
              <li>
                <Link href="/bikes" className="hover:text-white transition-colors">
                  {t.nav_bikes}
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="hover:text-white text-amber-300 transition-colors flex items-center gap-1 font-semibold"
                >
                  <Calculator className="w-3 h-3 text-amber-400" />
                  <span>{t.nav_calculator}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/parts"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <Wrench className="w-3 h-3 text-slate-400" />
                  <span>{t.nav_parts}</span>
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors">
                  {t.nav_offers}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t.nav_about}
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-white transition-colors">
                  After-Sales Service Bay
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover:text-white transition-colors">
                  Digital Warranty & VIN
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.nav_showroom}
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 text-slate-400 transition-colors text-[11px] block pt-1">
                  🔒 Showroom CMS Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Zuboo Featured Models */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.footer_models}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link href="/bikes/gt" className="hover:text-white transition-colors">
                  Zuboo GT (Touring)
                </Link>
              </li>
              <li>
                <Link href="/bikes/the-tank" className="hover:text-white transition-colors">
                  Zuboo The Tank (3000W)
                </Link>
              </li>
              <li>
                <Link href="/bikes/paris" className="hover:text-white transition-colors">
                  Zuboo Paris (Retro)
                </Link>
              </li>
              <li>
                <Link href="/bikes/t11" className="hover:text-white transition-colors">
                  Zuboo T11 (Sports)
                </Link>
              </li>
              <li>
                <Link href="/bikes/t3" className="hover:text-white transition-colors">
                  Zuboo T3 (Urban)
                </Link>
              </li>
              <li>
                <Link href="/bikes/mini" className="hover:text-white transition-colors">
                  Zuboo Mini (Eco Commuter)
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Updates */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t.footer_stay_informed}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer_newsletter_desc}
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-1 px-3.5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#346C83]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#346C83] hover:bg-[#28576b] text-white text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  {t.footer_join_btn}
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you. You are on the priority update list.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Udan Enterprises. {t.footer_all_rights}</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <span>Website Developer: Harsh Apex Digital Solutions</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Showroom Verification
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
