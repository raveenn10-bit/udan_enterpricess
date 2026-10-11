import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileCheck,
  Scale,
  ShieldAlert,
  Calendar,
  Zap,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | Zuboo Udan Enterprises Sri Lanka",
  description:
    "Official Terms and Conditions for Udan Enterprises (zubooudan.com), governing test ride bookings, vehicle sales quotations, warranty guidelines, and showroom policies in Galle, Sri Lanka.",
  alternates: {
    canonical: "https://zubooudan.com/terms",
  },
  openGraph: {
    title: "Terms and Conditions | Zuboo Udan Enterprises Sri Lanka",
    description:
      "Review the terms governing Zuboo electric motorcycle purchases, free test rides, factory warranties, and dealership operations in Galle, Sri Lanka.",
    url: "https://zubooudan.com/terms",
    siteName: "Udan Enterprises - Zuboo Sri Lanka",
    type: "website",
  },
};

export default function TermsPage() {
  const lastUpdated = "October 11, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Universal Sticky Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Editorial Masthead / Header */}
        <section className="relative overflow-hidden pt-12 pb-14 bg-white border-b border-[#E0E8EC]">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#346C83]/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FF5E14]/10 blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#FF5E14] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#111820]">Terms and Conditions</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#1A365D] border border-[#CCDCE3] mb-4">
              <Scale className="w-4 h-4 text-[#FF5E14]" />
              <span>Dealership Operations & Rider Agreement</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#111820] tracking-tight mb-4">
              Terms and Conditions
            </h1>

            <p className="text-base sm:text-lg text-[#5A6A76] max-w-3xl leading-relaxed">
              These Terms and Conditions govern your access to and use of <strong>zubooudan.com</strong>,
              as well as test ride appointments, sales quotations, vehicle handovers, and warranty programs
              administered by <strong>Udan Enterprises (Pvt) Ltd</strong> in Galle, Sri Lanka.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Last Revised: {lastUpdated}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Jurisdiction: Democratic Socialist Republic of Sri Lanka</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Quick Index / Sidebar */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white rounded-2xl border border-[#E0E8EC] p-5 shadow-sm space-y-4">
                  <h3 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#FF5E14]" />
                    <span>Agreement Index</span>
                  </h3>
                  <nav className="space-y-1.5 text-xs">
                    {[
                      { href: "#acceptance", label: "1. Acceptance of Terms" },
                      { href: "#pricing", label: "2. Vehicle Specs & Pricing" },
                      { href: "#test-rides", label: "3. Test Ride Eligibility & Rules" },
                      { href: "#orders", label: "4. Deposits & Invoicing" },
                      { href: "#warranty", label: "5. Warranty Claims & Conditions" },
                      { href: "#liability", label: "6. Limitation of Liability" },
                      { href: "#ip", label: "7. Intellectual Property" },
                      { href: "#law", label: "8. Governing Law & Jurisdiction" },
                      { href: "#contact", label: "9. Showroom Inquiries" },
                    ].map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-[#FF5E14] hover:bg-[#F7F9FA] transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Action Box */}
                <div className="bg-[#1A365D] text-white rounded-2xl p-5 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5E14] uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Ready For A Test Ride?</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm">
                    Experience Zuboo Power in Person
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Book a free test session at our Galle showroom course under official safety supervision.
                  </p>
                  <Link
                    href="/test-ride"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#E51937] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 transition-all text-center"
                  >
                    <span>Book Test Ride</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Terms Content */}
            <article className="lg:col-span-8 order-1 lg:order-2 space-y-12">
              {/* Section 1 */}
              <section id="acceptance" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Section 01</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  1. Acceptance of Terms
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    By browsing <strong>zubooudan.com</strong>, submitting inquiry or test ride forms, placing vehicle
                    deposits, or entering our showroom premises at Udugama Road, Kurunduwatta, Pinnaduwa, Galle,
                    you acknowledge that you have read, understood, and agree to be legally bound by these Terms and Conditions.
                  </p>
                  <p>
                    If you do not agree with any provision of these Terms, you must discontinue use of the website and notify
                    our dealership management before conducting test rides or executing purchase agreements.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="pricing" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 02</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  2. Vehicle Specifications & Promotional Pricing
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    All electric motorcycle and scooter models listed on <strong>zubooudan.com</strong> (including the Zuboo
                    T16, The Tank, GT, Paris, Mini, T3, T11, EX008, and KB1) are presented with official factory specifications
                    and provisional dealership notes.
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Pricing Currency:</strong> All prices are displayed in Sri Lankan Rupees (LKR) and represent
                        indicative showroom retail or promotional launch rates at the time of publication.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Market & Tariff Adjustments:</strong> Due to import tariffs, currency fluctuations, and freight
                        costs in Sri Lanka, final purchase pricing is confirmed via formal written quotation or proforma invoice
                        issued by Udan Enterprises.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Range & Performance Ratings:</strong> Advertised battery range (e.g., &ge; 100 km) and top speed
                        ratings are based on optimal factory test conditions. Actual real-world range may vary depending on rider
                        weight, terrain elevation, tire pressure, and riding style.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="test-rides" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 03</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  3. Free Test Ride Requirements & Rider Conduct
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    To ensure the safety of our customers and personnel, all individuals participating in a Zuboo test ride must
                    comply strictly with the following eligibility rules:
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Identification & Licensure
                      </h4>
                      <p className="text-xs text-slate-600">
                        Riders must present a valid original Sri Lankan National Identity Card (NIC) or Passport. For high-powered
                        models (such as The Tank 3000W or GT 1800W), a valid Sri Lankan Driving License authorizing motorcycle operation
                        must be presented where applicable under Department of Motor Traffic (DMT) road regulations.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Mandatory Safety Gear
                      </h4>
                      <p className="text-xs text-slate-600">
                        Wearing an approved motorcycle safety helmet is mandatory during all test rides. Showroom sanitized helmets
                        are provided free of charge, or riders may utilize their own certified safety helmet.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Zero Tolerance for Impairment & Recklessness
                      </h4>
                      <p className="text-xs text-slate-600">
                        Udan Enterprises reserves the absolute right to refuse or terminate any test ride if a rider appears impaired
                        by alcohol or medication, demonstrates reckless behavior, or fails to adhere to the designated showroom route.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="orders" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Section 04</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  4. Order Deposits, Invoicing & Vehicle Handover
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    Vehicles may be reserved at our Pinnaduwa, Galle dealership via an official reservation deposit:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
                    <li>
                      <strong>Official Receipts:</strong> All deposits and balance payments must be accompanied by a formal
                      printed receipt bearing the Udan Enterprises business stamp.
                    </li>
                    <li>
                      <strong>Pre-Delivery Inspection (PDI):</strong> Every electric bike undergoes a multi-point PDI test
                      covering brake hydraulic pressure, motor controller calibration, battery state of charge (SoC), and tire
                      pressure before keys are handed over.
                    </li>
                    <li>
                      <strong>Vehicle Handover Package:</strong> Each customer receives the vehicle manual, genuine charger,
                      warranty documentation booklet, and two sets of smart ignition keys/fobs.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="warranty" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 05</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  5. Dealership Warranty Scope & Claim Requirements
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    As an authorized Zuboo partner, Udan Enterprises provides official manufacturer-backed warranties:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                        Electric Motor & Battery
                      </span>
                      <p className="text-lg font-black text-emerald-950 mt-1">2 Years / 20,000 KM</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Protects against manufacturer cell degradation defects and core motor coil failure.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">
                        Structural Chassis & Frame
                      </span>
                      <p className="text-lg font-black text-blue-950 mt-1">3 Years Protection</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Covers high-strength tubular steel frame weld joints and load integrity under normal riding.
                      </p>
                    </div>
                  </div>

                  <p className="pt-2">
                    <strong>Warranty Exclusions:</strong> The warranty will be deemed void if the vehicle undergoes unauthorized
                    third-party electrical wiring modifications, non-approved fast chargers are used, the battery is completely
                    submerged in water, or damage results from collisions, stunt riding, or overloading beyond certified limits.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="liability" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span>Section 06</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  6. Limitation of Liability & Road Safety
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    Operating any two-wheeled vehicle carries inherent road risks. Customers and riders assume full responsibility
                    for compliance with Sri Lanka&apos;s Motor Traffic Act, highway regulations, speed limits, and personal protective
                    gear requirements once a vehicle is operated on public highways.
                  </p>
                  <p>
                    To the maximum extent permitted under Sri Lankan law, Udan Enterprises shall not be liable for indirect,
                    incidental, or consequential damages resulting from third-party accidents, improper battery maintenance,
                    or unapproved modifications.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="ip" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <FileCheck className="w-4 h-4" />
                  <span>Section 07</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  7. Intellectual Property
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    The Zuboo trademarks, cheetah emblem, product model designs, and engineering documentation are proprietary
                    intellectual property of Zuboo Electric Vehicles.
                  </p>
                  <p>
                    All website imagery, editorial translations, custom graphic assets, and digital code on <code>zubooudan.com</code>
                    are the copyright of Udan Enterprises (Pvt) Ltd and its technical developers. Reproduction or redistribution
                    without written authorization is prohibited.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="law" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Scale className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 08</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  8. Governing Law & Jurisdiction
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    These Terms and Conditions and any disputes arising out of or related to vehicle reservations, showroom visits,
                    or warranties shall be governed by and construed in accordance with the substantive laws of the
                    <strong> Democratic Socialist Republic of Sri Lanka</strong>.
                  </p>
                  <p>
                    Both parties irrevocably agree that the courts of competent jurisdiction located in
                    <strong> Galle, Southern Province, Sri Lanka</strong> shall hold exclusive territorial jurisdiction to adjudicate
                    any dispute, claim, or controversy arising under this agreement.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="contact" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 09</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  9. Dealership Office & Contact Information
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
                  <p>
                    For inquiries, clarification regarding vehicle terms, or official warranty paperwork, contact our showroom team:
                  </p>

                  <div className="p-5 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-3">
                    <div className="font-heading font-bold text-base text-[#111820]">
                      Udan Enterprises (Pvt) Ltd
                    </div>
                    <div className="text-xs text-slate-600 space-y-1.5">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                        <span>Udugama Road, Kurunduwatta, Pinnaduwa, Galle, Southern Province, Sri Lanka</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#FF5E14] shrink-0" />
                        <a href="mailto:Pibida17udan4131@gmail.com" className="text-[#1A365D] hover:underline font-semibold">
                          Pibida17udan4131@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <a href="tel:0784969652" className="text-[#1A365D] hover:underline font-semibold">
                          078 496 9652 / +94 78 496 9652
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
