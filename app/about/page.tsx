import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Zap,
  Wrench,
  Leaf,
  Award,
  Clock,
  Compass,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Cpu,
  BatteryCharging,
  Settings,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Udan Enterprises - Zuboo Electric Mobility Sri Lanka",
  description:
    "Learn about Udan Enterprises, our journey in Galle, Sri Lanka, our partnership with Zuboo Electric Vehicles, our green mission, and our genuine spares and after-sales philosophy.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Editorial Masthead / Header */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pb-20 border-b border-[#E0E8EC]">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#346C83]/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#D32F2F]/10 blur-3xl" />
          </div>

          <div className="editorial-container relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#346C83] border border-[#E0E8EC] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#346C83] animate-pulse" />
                <span>The Udan Story • Galle, Sri Lanka</span>
              </div>

              <h1 className="font-story font-normal text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111820] leading-[1.1] mb-6">
                Driving Sustainable <br />
                <span className="text-[#346C83]">Zero-Emission</span> Mobility
              </h1>

              <p className="text-base sm:text-xl text-[#667780] leading-relaxed max-w-2xl font-normal">
                Udan Enterprises is Sri Lanka&apos;s authorized retail and service partner for Zuboo Electric Vehicles.
                We exist to liberate riders from escalating fuel prices with intelligent, whisper-quiet, and durable
                electric two-wheelers tailored for our roads.
              </p>

              {/* Meta stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 mt-10 border-t border-[#E0E8EC]">
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#111820]">
                    100%
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#667780] mt-1">
                    Zero Direct Emissions
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#346C83]">
                    9 Models
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#667780] mt-1">
                    Versatile EV Collection
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#111820]">
                    ≥ 100 km
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#667780] mt-1">
                    Peak Commuting Range
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#D32F2F]">
                    Galle, LK
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#667780] mt-1">
                    Showroom & Service Hub
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: The Company Story in Sri Lanka */}
        <section className="py-16 sm:py-24 border-b border-[#E0E8EC] bg-white">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest">
                  <span className="w-8 h-0.5 bg-[#346C83]" />
                  <span>Our Origins & Purpose</span>
                </div>

                <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] leading-snug uppercase">
                  Born Out of Necessity. Built for Sri Lanka&apos;s Next Generation.
                </h2>

                <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
                  Sri Lankan commuters have endured unprecedented challenges in recent years: crippling fuel shortages,
                  soaring petrol costs, steep vehicle import restrictions, and rising transport expenses that strain
                  household budgets.
                </p>

                <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
                  Founded with an uncompromising conviction that transportation should be clean, economical, and dependable,
                  <strong className="text-[#111820]"> Udan Enterprises</strong> established its roots in Galle, Southern Province.
                  Our team set out to provide Sri Lankan families, daily commuters, office workers, and small business owners
                  with an authentic alternative: premium-grade electric scooters and bikes that eliminate petrol dependency entirely.
                </p>

                <div className="p-5 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#111820] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#346C83]" />
                    <span>The Southern Province Advantage</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                    From coastal commuter runs along the Matara-Galle highway to bustling urban lanes inside Galle city,
                    our vehicles are tested and configured to deliver smooth torque, high ground clearance, and long battery life.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-3xl overflow-hidden border border-[#E0E8EC] shadow-lg bg-slate-900 aspect-4/3 flex items-center justify-center p-6">
                  <Image
                    src="/media/bikes/gt/main.webp"
                    alt="Zuboo GT Electric Bike at Udan Enterprises"
                    fill
                    className="object-contain p-4 transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-[#111820]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#667780] block">Flagship Touring Model</span>
                      <span className="text-sm font-extrabold text-white">Zuboo GT 1800W High Torque</span>
                    </div>
                    <span className="text-xs font-bold text-[#346C83] bg-white/10 px-3 py-1 rounded-full">
                      ≥ 100 km Range
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Strategic Partnership with Zuboo Electric Vehicles */}
        <section className="py-16 sm:py-24 border-b border-[#E0E8EC] bg-[#F7F9FA]">
          <div className="editorial-container">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-2 text-[#D32F2F] font-bold text-xs uppercase tracking-widest mb-3">
                <span className="w-8 h-0.5 bg-[#D32F2F]" />
                <span>Global Manufacturing & Engineering</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase leading-tight">
                Our Strategic Partnership with Zuboo
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#667780] leading-relaxed">
                We did not settle for unbranded or generic imports. Udan Enterprises partnered with Zuboo Electric Vehicles—an
                international leader in two-wheeler electric mobility renowned for robust frame fabrication, automotive-grade
                electronics, and stringent quality control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <div className="rounded-3xl bg-white p-7 border border-[#E0E8EC] shadow-sm hover:border-[#346C83]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83] mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111820] mb-2 uppercase">
                  High-Torque Hub Motors
                </h3>
                <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                  Ranging from 490W eco-motors up to 3000W high-performance units (The Tank), Zuboo motors provide instantaneous
                  climb torque to conquer coastal hills, bridges, and passenger loads without hesitation.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-3xl bg-white p-7 border border-[#E0E8EC] shadow-sm hover:border-[#346C83]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83] mb-6">
                  <BatteryCharging className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111820] mb-2 uppercase">
                  Tianneng Power Technology
                </h3>
                <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                  Equipped with 72V 32Ah high-durability power packs engineered for sustained discharge cycles. Built with heat-resistant
                  casings suited for tropical coastal temperatures and stable energy delivery.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-3xl bg-white p-7 border border-[#E0E8EC] shadow-sm hover:border-[#346C83]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1F5] flex items-center justify-center text-[#346C83] mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#111820] mb-2 uppercase">
                  Intelligent Vector Controllers
                </h3>
                <p className="text-xs sm:text-sm text-[#667780] leading-relaxed">
                  Smooth 3-speed electronic power curve management eliminates jerky starts. Regenerative electronic braking recaptures
                  kinetic energy while providing superior wet-weather stopping power.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Mission & Sustainable Impact */}
        <section className="py-16 sm:py-24 border-b border-[#E0E8EC] bg-[#111820] text-white">
          <div className="editorial-container">
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest mb-3">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Environmental & Economic Mission</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
                Empowering Sri Lanka with Clean, Affordable Transportation
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
                Every Zuboo bike deployed on Sri Lankan roads is a direct step towards national energy resilience,
                cleaner urban air, and dramatic personal savings for commuters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/40 transition-colors">
                <div className="font-heading text-4xl font-extrabold text-emerald-400 mb-3">
                  90%
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-white mb-2">
                  Operating Cost Reduction
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  A full charge costs roughly LKR 60–90 on standard home electricity, offering up to 100+ km of travel.
                  Compared to petrol costs exceeding LKR 370 per liter, riders save tens of thousands of rupees every month.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-sky-500/40 transition-colors">
                <div className="font-heading text-4xl font-extrabold text-sky-400 mb-3">
                  0 g
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-white mb-2">
                  Tailpipe Carbon Emissions
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Zero combustion, zero fumes, zero exhaust noise. Preserving the delicate coastal environment of Galle,
                  Unawatuna, and Southern Province tourism corridors for future generations.
                </p>
              </div>

              <div className="p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D32F2F]/40 transition-colors">
                <div className="font-heading text-4xl font-extrabold text-red-400 mb-3">
                  100%
                </div>
                <h3 className="font-heading font-bold text-base uppercase text-white mb-2">
                  Domestic Socket Charging
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  No specialized charging stations required. Plug directly into any standard 230V household wall outlet
                  at home or office. Wake up every morning with a full tank of battery energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: After-Sales Service & Genuine Spares Philosophy */}
        <section className="py-16 sm:py-24 border-b border-[#E0E8EC] bg-white">
          <div className="editorial-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC]">
                    <Wrench className="w-8 h-8 text-[#346C83] mb-3" />
                    <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-1">
                      Certified EV Technicians
                    </h4>
                    <p className="text-xs text-[#667780] leading-relaxed">
                      Trained in brushless motor mechanics, electronic throttle systems, and multi-rail wiring diagnostics.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC]">
                    <Settings className="w-8 h-8 text-[#346C83] mb-3" />
                    <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-1">
                      100% Genuine Zuboo Parts
                    </h4>
                    <p className="text-xs text-[#667780] leading-relaxed">
                      Direct OEM controllers, brake assemblies, throttle grips, tires, and digital instrument clusters in stock.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC]">
                    <ShieldCheck className="w-8 h-8 text-[#D32F2F] mb-3" />
                    <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-1">
                      Warranty Fulfillment
                    </h4>
                    <p className="text-xs text-[#667780] leading-relaxed">
                      Advertised 2-year/20,000 km battery & motor warranty backed by our dedicated Galle showroom inspection team.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC]">
                    <Clock className="w-8 h-8 text-[#346C83] mb-3" />
                    <h4 className="font-heading font-bold text-sm text-[#111820] uppercase mb-1">
                      Rapid Turnaround
                    </h4>
                    <p className="text-xs text-[#667780] leading-relaxed">
                      Routine checkups, tire rotations, and brake adjustments serviced swiftly to keep your daily commute uninterrupted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                <div className="flex items-center gap-2 text-[#346C83] font-bold text-xs uppercase tracking-widest">
                  <span className="w-8 h-0.5 bg-[#346C83]" />
                  <span>The Udan Assurance</span>
                </div>

                <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#111820] uppercase leading-tight">
                  Our Genuine Spares & After-Sales Philosophy
                </h2>

                <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
                  We believe that an electric vehicle is only as dependable as the support network standing behind it.
                  Many third-party vehicle importers sell bikes without stocking replacement parts or training technicians.
                  At Udan Enterprises, our philosophy is the polar opposite.
                </p>

                <p className="text-sm sm:text-base text-[#667780] leading-relaxed">
                  Before launching any Zuboo model, we secure an inventory of original replacement parts—from micro-switches
                  and hydraulic brake master cylinders to suspension struts and full battery replacements. When you invest in a Zuboo
                  from Udan Enterprises, you are investing in peace of mind.
                </p>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#346C83] hover:text-[#111820] transition-colors"
                  >
                    <span>Contact Galle Service Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Core Values & Transparency */}
        <section className="py-16 sm:py-20 border-b border-[#E0E8EC] bg-[#F7F9FA]">
          <div className="editorial-container">
            <div className="max-w-2xl mb-12">
              <h2 className="font-heading font-black text-xl sm:text-3xl text-[#111820] uppercase">
                Our Core Principles
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#667780]">
                Built on integrity, transparency, and uncompromised client care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <span className="text-xs font-mono font-bold text-[#346C83] block mb-2">01 / HONESTY</span>
                <h4 className="font-heading font-bold text-base text-[#111820] mb-2 uppercase">
                  Verified Transparency
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  We disclose all advertised figures as provisional pending showroom physical verification. We never promise
                  unrealistic range figures that fail in real-world road conditions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <span className="text-xs font-mono font-bold text-[#346C83] block mb-2">02 / ENDURANCE</span>
                <h4 className="font-heading font-bold text-base text-[#111820] mb-2 uppercase">
                  Road-Tested Durability
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  Every chassis, shock absorber, and waterproof wiring connector is scrutinized for Sri Lanka&apos;s tropical
                  rainfall and coastal salinity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E0E8EC]">
                <span className="text-xs font-mono font-bold text-[#346C83] block mb-2">03 / EMPOWERMENT</span>
                <h4 className="font-heading font-bold text-base text-[#111820] mb-2 uppercase">
                  Rider-First Service
                </h4>
                <p className="text-xs text-[#667780] leading-relaxed">
                  From your initial test ride and vehicle registration to your scheduled checkups, our Galle team ensures
                  you receive direct, responsive, and respectful attention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Editorial CTA Banner */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-[#111820] via-[#1a232d] to-[#111820] text-white">
          <div className="editorial-container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                Experience Electric Freedom
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-white leading-tight">
                Ready to Experience Zuboo Electric Mobility in Galle?
              </h2>
              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Schedule a complimentary test ride, inspect our models in person, or talk with our electric mobility
                specialists today on WhatsApp.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/test-ride"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#346C83] hover:bg-[#28576b] text-white transition-all shadow-md flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book a Free Test Ride</span>
                </Link>

                <Link
                  href="/offers"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2"
                >
                  <span>View Special Offers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="https://wa.me/94784969652?text=Hi%20Udan%20Enterprises,%20I%20would%20like%20to%20learn%20more%20about%20your%20company%20and%20Zuboo%20bikes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] hover:bg-[#d8e7ee] text-[#111820] transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#346C83]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
