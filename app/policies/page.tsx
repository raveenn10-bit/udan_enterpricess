import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Zap,
  Calendar,
  BatteryCharging,
  Recycle,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Award,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowRight,
  Clock,
  Sparkles,
  HelpCircle,
  Truck,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dealership Policies & Warranty Guidelines | Zuboo Udan Enterprises",
  description:
    "Comprehensive dealership policies for Udan Enterprises in Galle, Sri Lanka. Official Zuboo factory warranties, free test ride safety guidelines, reservation policies, and eco-friendly battery recycling.",
  alternates: {
    canonical: "https://zubooudan.com/policies",
  },
  openGraph: {
    title: "Dealership Policies & Warranty Guidelines | Zuboo Udan Enterprises",
    description:
      "Explore official factory warranties, safety standards, pre-delivery inspections, and green battery recycling protocols at Udan Enterprises Galle.",
    url: "https://zubooudan.com/policies",
    siteName: "Udan Enterprises - Zuboo Sri Lanka",
    type: "website",
  },
};

export default function PoliciesPage() {
  const lastUpdated = "October 11, 2026";

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FA] text-[#111820] selection:bg-[#346C83] selection:text-white">
      {/* Universal Sticky Navbar */}
      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        {/* Editorial Masthead / Header */}
        <section className="relative overflow-hidden pt-12 pb-14 bg-white border-b border-[#E0E8EC]">
          <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#FF5E14]/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#346C83]/10 blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
              <Link href="/" className="hover:text-[#FF5E14] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#111820]">Policies Hub</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#1A365D] border border-[#CCDCE3] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
              <span>Official Dealership Protocols & Guidelines</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#111820] tracking-tight mb-4">
              Policies Hub
            </h1>

            <p className="text-base sm:text-lg text-[#5A6A76] max-w-3xl leading-relaxed">
              Transparent, automotive-grade commitments designed to protect our riders. Review our
              official Zuboo factory warranty protocols, test ride safety rules, invoicing terms, and green battery recycling stewardship.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Pinnaduwa Showroom, Galle, Sri Lanka</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Policies Grid Overview */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="#factory-warranty"
              className="group p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-sm hover:border-[#FF5E14] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF5E14]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111820] group-hover:text-[#FF5E14] transition-colors">
                    1. Factory Warranty
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    2-Year Motor/Battery & 3-Year Chassis Coverage.
                  </p>
                </div>
              </div>
              <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-[#FF5E14]">
                <span>View Guidelines</span>
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <a
              href="#test-ride-safety"
              className="group p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-sm hover:border-[#FF5E14] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1A365D]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111820] group-hover:text-[#FF5E14] transition-colors">
                    2. Test Ride Safety
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Helmets provided, closed-course & road protocols.
                  </p>
                </div>
              </div>
              <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-[#FF5E14]">
                <span>View Guidelines</span>
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <a
              href="#order-delivery"
              className="group p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-sm hover:border-[#FF5E14] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111820] group-hover:text-[#FF5E14] transition-colors">
                    3. Order & Delivery
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Reservation deposits, PDI & vehicle handovers.
                  </p>
                </div>
              </div>
              <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-[#FF5E14]">
                <span>View Guidelines</span>
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            <a
              href="#battery-disposal"
              className="group p-5 rounded-2xl bg-white border border-[#E0E8EC] shadow-sm hover:border-[#FF5E14] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Recycle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#111820] group-hover:text-[#FF5E14] transition-colors">
                    4. Battery Disposal
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Eco recycling & lithium/lead stewardship in Galle.
                  </p>
                </div>
              </div>
              <div className="pt-3 flex items-center gap-1 text-[11px] font-bold text-[#FF5E14]">
                <span>View Guidelines</span>
                <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </div>
        </section>

        {/* Detailed Policies Content Sections */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
          {/* Policy 1: Factory Warranty Policy */}
          <section
            id="factory-warranty"
            className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E0E8EC]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF5E14] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Policy Document 01</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820]">
                  Official Zuboo Factory Warranty Policy
                </h2>
              </div>
              <Link
                href="/warranty"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F9FA] hover:bg-[#E8F1F5] text-[#1A365D] border border-[#CCDCE3] text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                <span>Verify VIN / Warranty</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF5E14]" />
              </Link>
            </div>

            <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
              <p>
                Every brand-new Zuboo electric motorcycle and scooter delivered by Udan Enterprises comes with an official
                multi-tier warranty directly supported by Zuboo OEM manufacturing standards.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#FFF7F2] border border-[#FFE2D1] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E14]">
                      Electric Motor & Battery Pack
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#FF5E14] text-white">
                      24 Months
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#111820]">
                    2 Years or 20,000 Kilometers
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Covers internal motor coil burnouts, magnetic decay, controller failure, and premature battery cell
                    degradation falling below 70% retention under normal charging conditions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#F0F7FA] border border-[#D1E6F0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1A365D]">
                      Chassis Frame & Structural Welds
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-[#1A365D] text-white">
                      36 Months
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#111820]">
                    3 Years Frame Integrity Guarantee
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Guarantees high-strength carbon-manganese structural steel mainframe tubes and robotically welded joint
                    seams against structural fatigue or cracking under standard road operation.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-heading font-bold text-sm text-[#111820] uppercase tracking-wider">
                  Warranty Claim Procedure & Preconditions:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Regular Servicing:</strong> The vehicle must receive scheduled routine checkups (3 months, 6 months,
                      and 12 months) at the Udan Enterprises authorized service center in Pinnaduwa, Galle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Genuine Zuboo Spares:</strong> Replacement brake pads, tires, bulbs, and electrical components must
                      be authentic Zuboo spares certified by Udan Enterprises.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong>Exclusions:</strong> Warranty does not cover normal wear-and-tear items (tires, brake friction linings,
                      rubber grips), damage resulting from unauthorized speed limiter hacking, pressure washer direct submersion,
                      or off-road stunt riding beyond vehicle specifications.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Policy 2: Free Test Ride Safety Policy */}
          <section
            id="test-ride-safety"
            className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E0E8EC]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider">
                  <Zap className="w-4 h-4 text-[#FF5E14]" />
                  <span>Policy Document 02</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820]">
                  Free Test Ride Safety Policy
                </h2>
              </div>
              <Link
                href="/test-ride"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#E51937] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:brightness-110 transition-all shrink-0"
              >
                <span>Book Test Ride</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
              <p>
                Udan Enterprises offers complimentary, no-obligation test rides across all 9 Zuboo electric models so customers
                can personally experience electric acceleration, whisper-quiet performance, and regenerative braking.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                    1. Rider Verification
                  </span>
                  <p className="text-xs text-slate-600">
                    Presentation of valid original NIC/Passport and Sri Lankan motorcycle license where required for
                    high-speed commuter models.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                    2. Sanitized Helmets
                  </span>
                  <p className="text-xs text-slate-600">
                    Complimentary full-face or open-face helmets sanitized between uses are supplied to every rider. Wearing a
                    helmet is non-negotiable.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#111820] block">
                    3. Showroom Course
                  </span>
                  <p className="text-xs text-slate-600">
                    Initial acceleration and braking are tested on our dedicated showroom surface before venturing onto the
                    designated Kurunduwatta road corridor.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950 uppercase tracking-wider text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important Safety Notice for Riders</span>
                </div>
                <p>
                  Riders must adhere strictly to the 40 km/h showroom test route speed limit and obey all Southern Expressway /
                  Galle road intersection signals. Our staff accompany every test ride or monitor the perimeter track.
                </p>
              </div>
            </div>
          </section>

          {/* Policy 3: Order Deposit, Invoicing & Delivery Policy */}
          <section
            id="order-delivery"
            className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E0E8EC]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
                  <Truck className="w-4 h-4" />
                  <span>Policy Document 03</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820]">
                  Order Deposit, Invoicing & Delivery Policy
                </h2>
              </div>
              <a
                href="tel:0784969652"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F7F9FA] hover:bg-slate-100 text-[#111820] border border-[#E0E8EC] text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Sales Desk</span>
              </a>
            </div>

            <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
              <p>
                Our sales and vehicle reservation framework is designed to provide full financial transparency from initial booking
                to final key handover.
              </p>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                    Reservation Deposit & Vehicle Allocation
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Vehicles are locked in with a formal reservation deposit (typically LKR 25,000 to LKR 50,000 depending on the model).
                    Upon deposit confirmation, an official numbered booking voucher and chassis allocation notice are issued to the customer.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                    24-Point Pre-Delivery Inspection (PDI)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prior to handover, our certified technicians conduct a 24-point PDI verification: checking tire bead pressure,
                    hydraulic disc brake fluid, lighting and turn signal relays, full battery charge cycle balancing, and digital TFT
                    calibration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                    Showroom Handover & Doorstep Delivery
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Customers may collect their fully charged bike directly from our Pinnaduwa showroom or arrange enclosed flatbed
                    delivery across the Galle, Matara, and Hambantota districts at transparent logistics cost.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Policy 4: Environmental & Battery Disposal Policy */}
          <section
            id="battery-disposal"
            className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E0E8EC]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  <Recycle className="w-4 h-4" />
                  <span>Policy Document 04</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#111820]">
                  Environmental & Battery Disposal Policy
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero-Landfill Pledge</span>
              </span>
            </div>

            <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
              <p>
                At Udan Enterprises, our mission is to eliminate tailpipe emissions without creating secondary environmental harm.
                We operate a strict, responsible battery stewardship program for both Lithium-ion and Lead-Acid power packs in Galle.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
                    <BatteryCharging className="w-4 h-4 text-emerald-600" />
                    <span>Free Showroom Battery Collection Hub</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    All Zuboo riders can return expired or degraded battery packs to our Kurunduwatta, Pinnaduwa showroom free
                    of charge. We never permit hazardous battery disposal in municipal domestic trash or waterways.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-900">
                    <Recycle className="w-4 h-4 text-emerald-600" />
                    <span>Certified Recycler Neutralization</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Collected battery cells are transferred to authorized Sri Lankan e-waste recycling facilities licensed by
                    the Central Environmental Authority (CEA) for closed-loop mineral recovery (nickel, cobalt, lead, and plastic).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F9FA] border border-[#E0E8EC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#111820]">
                    Battery Upgrade & Buyback Credits
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Trading in an old Zuboo battery pack? Receive cash credit toward your new factory high-capacity power pack.
                  </p>
                </div>
                <a
                  href="https://wa.me/94784969652?text=Hello%20Udan%20Enterprises%2C%20I%20would%20like%20to%20inquire%20about%20battery%20recycling%20or%20upgrade%20credits."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Quick FAQ Section */}
          <section className="bg-white rounded-3xl border border-[#E0E8EC] p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF5E14] uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="font-heading font-black text-2xl text-[#111820]">
                Common Policy Questions
              </h2>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                  How long does warranty claims processing take?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Most diagnostics are completed within 2 to 4 business hours at our Pinnaduwa service desk. If a replacement
                  motor controller, charger, or battery pack is required under warranty, replacement is typically executed within
                  24 to 72 hours from factory inventory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                  Do I need an appointment for a free test ride?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  While walk-in visitors are warmly welcomed at our Galle showroom, booking an appointment online in advance ensures
                  your preferred model (e.g. Zuboo The Tank or GT) is fully charged and sanitized ready for immediate riding.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-1.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                  Can I finance an electric bike with a bank or leasing company?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yes. Udan Enterprises collaborates with major Sri Lankan financial institutions including Commercial Bank, LOLC,
                  CDB, and LB Finance to provide fast leasing quotations and structured installment options.
                </p>
              </div>
            </div>
          </section>

          {/* Dealership Contact Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#1A365D] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF5E14] block">
                Official Dealership Desk
              </span>
              <h3 className="font-heading font-black text-xl sm:text-2xl">
                Have a specific question about our policies?
              </h3>
              <p className="text-xs text-slate-300 max-w-lg">
                Speak directly with our Galle showroom managers for personalized assistance, warranty clarification, or corporate fleet bookings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="tel:0784969652"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF5E14] to-[#E51937] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>078 496 9652</span>
              </a>
              <Link
                href="/contact"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all"
              >
                <span>Showroom Location</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
