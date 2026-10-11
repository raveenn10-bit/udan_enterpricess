import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  Database,
  UserCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Zuboo Udan Enterprises Sri Lanka",
  description:
    "Official Privacy Policy for Udan Enterprises (zubooudan.com), authorized dealer of Zuboo Electric Vehicles in Galle, Sri Lanka. Compliant with the Sri Lanka Personal Data Protection Act (PDPA) No. 9 of 2022.",
  alternates: {
    canonical: "https://zubooudan.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Zuboo Udan Enterprises Sri Lanka",
    description:
      "Understand how Udan Enterprises collects, protects, and handles customer data for test rides, warranty registration, and showroom services under Sri Lanka PDPA No. 9 of 2022.",
    url: "https://zubooudan.com/privacy",
    siteName: "Udan Enterprises - Zuboo Sri Lanka",
    type: "website",
  },
};

export default function PrivacyPage() {
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
              <span className="text-[#111820]">Privacy Policy</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E8F1F5] text-[#1A365D] border border-[#CCDCE3] mb-4">
              <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
              <span>PDPA Compliance • Sri Lanka Act No. 9 of 2022</span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#111820] tracking-tight mb-4">
              Privacy Policy
            </h1>

            <p className="text-base sm:text-lg text-[#5A6A76] max-w-3xl leading-relaxed">
              At <strong>Udan Enterprises (Pvt) Ltd</strong> (&ldquo;Udan Enterprises&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;),
              operating <strong>zubooudan.com</strong> as the authorized retail and service partner for Zuboo Electric Vehicles in Galle,
              we are strictly committed to safeguarding your privacy and personal data.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 pt-4 border-t border-slate-100 mt-6">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Last Revised: {lastUpdated}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Pinnaduwa Showroom, Galle, Sri Lanka</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#FF5E14]" />
                <span>Applicable to all Showroom, Web & Mobile Interactions</span>
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
                    <FileText className="w-4 h-4 text-[#FF5E14]" />
                    <span>Policy Sections</span>
                  </h3>
                  <nav className="space-y-1.5 text-xs">
                    {[
                      { href: "#scope", label: "1. Scope & Legal Framework" },
                      { href: "#collection", label: "2. Personal Data We Collect" },
                      { href: "#usage", label: "3. How We Use Information" },
                      { href: "#security", label: "4. Data Security & Storage" },
                      { href: "#third-parties", label: "5. Third-Party Disclosures" },
                      { href: "#pdpa-rights", label: "6. Your Rights (PDPA 2022)" },
                      { href: "#retention", label: "7. Data Retention Policy" },
                      { href: "#cookies", label: "8. Cookies & Telemetry" },
                      { href: "#contact", label: "9. Contact & Inquiries" },
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

                {/* Showroom Direct Contact Card */}
                <div className="bg-[#1A365D] text-white rounded-2xl p-5 shadow-md space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF5E14] uppercase tracking-wider">
                    <Lock className="w-4 h-4" />
                    <span>Data Privacy Officer</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm">
                    Have questions about your personal data?
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Contact our compliance desk at the Pinnaduwa, Galle dealership for inquiries, access requests, or rectifications.
                  </p>
                  <div className="space-y-2 pt-2 text-xs border-t border-white/10">
                    <a
                      href="mailto:Pibida17udan4131@gmail.com"
                      className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#FF5E14]" />
                      <span className="truncate">Pibida17udan4131@gmail.com</span>
                    </a>
                    <a
                      href="tel:0784969652"
                      className="flex items-center gap-2 text-slate-200 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>078 496 9652 / +94 78 496 9652</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Policy Content */}
            <article className="lg:col-span-8 order-1 lg:order-2 space-y-12">
              {/* Section 1 */}
              <section id="scope" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Section 01</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  1. Scope & Legal Framework
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    This Privacy Policy applies to all personal information collected and processed by
                    <strong> Udan Enterprises (Pvt) Ltd</strong> through our official website (<strong>zubooudan.com</strong>),
                    our customer support channels (telephone, WhatsApp, and email), and our physical showroom located on
                    <strong> Udugama Road, Kurunduwatta, Pinnaduwa, Galle, Sri Lanka</strong>.
                  </p>
                  <p>
                    We operate as a lawful <em>Data Controller</em> in strict alignment with the
                    <strong> Personal Data Protection Act (PDPA) No. 9 of 2022</strong> of the Democratic Socialist Republic
                    of Sri Lanka. Our processing practices respect the core data protection principles of lawfulness, fairness,
                    transparency, purpose limitation, data minimisation, accuracy, storage limitation, and integrity.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section id="collection" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Database className="w-4 h-4" />
                  <span>Section 02</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  2. Personal Data We Collect
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
                  <p>
                    Depending on how you interact with Udan Enterprises, we may collect and maintain the following categories of data:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Customer Inquiries & Quotes
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        <li>Full Name and preferred title</li>
                        <li>Telephone and WhatsApp contact number</li>
                        <li>Email address</li>
                        <li>City / District of residence (e.g. Galle, Matara)</li>
                        <li>Vehicle model of interest (e.g. T16, The Tank, GT)</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Free Test Ride Appointments
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        <li>Sri Lankan National Identity Card (NIC) number</li>
                        <li>Valid Driving License details (where required)</li>
                        <li>Scheduled test appointment date and timeslot</li>
                        <li>Signed safety indemnity & rider disclaimer</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Warranty & Vehicle Registration
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        <li>Vehicle Identification Number (VIN) / Chassis Number</li>
                        <li>Electric Motor Serial Number</li>
                        <li>Battery Pack Serial & Chemistry specification</li>
                        <li>Purchase invoice number and delivery date</li>
                        <li>Periodic maintenance and odometer records</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC] space-y-2">
                      <h3 className="font-bold text-xs uppercase tracking-wider text-[#111820]">
                        Digital & Browsing Information
                      </h3>
                      <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        <li>IP address and approximate geographic location</li>
                        <li>Browser user agent, screen resolution, operating system</li>
                        <li>Referral sources and page navigation patterns</li>
                        <li>Essential functional and performance session cookies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="usage" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" />
                  <span>Section 03</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  3. How We Use Your Information
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    Udan Enterprises utilizes customer information solely for legitimate automotive business purposes, specifically:
                  </p>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Scheduling & Conducting Free Test Rides:</strong> Verifying rider eligibility, coordinating
                        showroom course safety, and confirming booking appointments via SMS or WhatsApp.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Official Zuboo Factory Warranty Registration:</strong> Registering vehicle chassis numbers,
                        motors, and battery packs with Zuboo factory databases to ensure prompt honors for our 2-Year Motor &
                        Battery and 3-Year Chassis warranty pledges.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>After-Sales Servicing & Technical Recalls:</strong> Alerting owners of scheduled maintenance
                        inspections, software updates, battery health checks, or safety notices.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Customer Inquiries & Quotation Requests:</strong> Generating formal proforma invoices, price
                        breakdowns, and financing support documentation upon explicit customer request.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#FF5E14] shrink-0 mt-0.5" />
                      <span>
                        <strong>Statutory & Tax Compliance:</strong> Maintaining lawful sales records and fiscal documents required
                        by the Inland Revenue Department (IRD) and Sri Lankan commercial law.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section id="security" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Lock className="w-4 h-4" />
                  <span>Section 04</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  4. Data Security & Storage Measures
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    We implement automotive-grade organizational, technical, and physical security measures to protect your
                    personal data from unauthorized disclosure, destruction, loss, or alteration:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
                    <li>
                      <strong>Transport Layer Security (TLS/HTTPS):</strong> All web traffic and digital form submissions on
                      <code>zubooudan.com</code> are protected with modern 256-bit SSL encryption.
                    </li>
                    <li>
                      <strong>Restricted Dealership Access:</strong> Customer records and warranty documents are strictly
                      accessible only by authorized dealership management and service department staff at our Pinnaduwa showroom.
                    </li>
                    <li>
                      <strong>Secure Cloud Infrastructure:</strong> Inquiries and digital records are stored using secure cloud
                      databases backed by Google Cloud / Firebase enterprise security protocols.
                    </li>
                    <li>
                      <strong>Physical Showroom Security:</strong> Paper invoices, warranty cards, and identity photocopies are
                      stored in locked administrative archives with monitored showroom access control.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="third-parties" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Eye className="w-4 h-4" />
                  <span>Section 05</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  5. Third-Party Disclosures & Partner Sharing
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    <strong>We do not sell, rent, trade, or monetize your personal information to third-party marketing brokers under any circumstances.</strong>
                  </p>
                  <p>
                    Data is only shared in the following bounded and transparent operational contexts:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm">
                    <li>
                      <strong>Zuboo OEM Manufacturing Division:</strong> Chassis numbers and technical battery metrics are shared
                      with Zuboo factory systems for digital warranty activation, parts provisioning, and safety bulletins.
                    </li>
                    <li>
                      <strong>Authorized Financing & Leasing Partners:</strong> If you explicitly apply for electric bike financing,
                      we transmit quotation documentation to your chosen financial institution (e.g. LOLC Finance, Commercial Bank,
                      CDB, LB Finance) with your prior written consent.
                    </li>
                    <li>
                      <strong>Government Authorities:</strong> Where compelled by valid legal subpoenas, court orders, or statutory
                      mandates from Sri Lankan regulatory bodies such as the Department of Motor Traffic (DMT).
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="pdpa-rights" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#FF5E14]" />
                  <span>Section 06</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  6. Your Rights Under Sri Lanka PDPA No. 9 of 2022
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    Under the Sri Lanka Personal Data Protection Act No. 9 of 2022, as a data subject, you hold clear statutory rights:
                  </p>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820] mb-1">
                        Right of Access & Confirmation
                      </h4>
                      <p className="text-xs text-slate-600">
                        You have the right to request confirmation of whether we process your personal data and to obtain a
                        summary copy of your warranty and service file.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820] mb-1">
                        Right to Rectification
                      </h4>
                      <p className="text-xs text-slate-600">
                        If your contact details, phone number, residential address, or ownership credentials change, you may
                        request an immediate correction in our records.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820] mb-1">
                        Right to Withdraw Consent
                      </h4>
                      <p className="text-xs text-slate-600">
                        Where data processing relies on your voluntary consent (such as promotional updates or WhatsApp catalogs),
                        you may withdraw that consent at any time without penalty.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E0E8EC]">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-[#111820] mb-1">
                        Right to Erasure (&ldquo;Right to be Forgotten&rdquo;)
                      </h4>
                      <p className="text-xs text-slate-600">
                        You may request the deletion of prospective inquiry data. Please note that active vehicle warranty records
                        and tax invoices must be retained for the minimum statutory period under Sri Lankan commercial law.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="retention" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Section 07</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  7. Data Retention Policy
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    We retain personal data only for as long as necessary to fulfill the purposes for which it was gathered:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2">
                    <li>
                      <strong>Warranty & Chassis History:</strong> Retained for the full operational lifecycle of the vehicle
                      (minimum 7 years) to honor warranty obligations, manage battery recycling, and enable genuine spare parts matching.
                    </li>
                    <li>
                      <strong>Test Ride Registration Records:</strong> Retained for 12 months following the appointment for safety
                      audit and liability compliance.
                    </li>
                    <li>
                      <strong>General Web Inquiries:</strong> Inactive sales inquiries are automatically purged or anonymized after 18 months.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section id="cookies" className="bg-white rounded-2xl border border-[#E0E8EC] p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#346C83] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Section 08</span>
                </div>
                <h2 className="font-heading font-black text-xl sm:text-2xl text-[#111820]">
                  8. Cookies & Telemetry Technologies
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-3 leading-relaxed">
                  <p>
                    <code>zubooudan.com</code> uses privacy-respecting cookies and local storage tokens to deliver smooth website
                    performance, remember your language preference (English, Sinhala, Tamil), and ensure fast image loading across our 9 Zuboo models.
                  </p>
                  <p>
                    You can instruct your browser to refuse all cookies or indicate when a cookie is sent. Disabling essential cookies
                    will not prevent you from browsing our showroom bikes or calling our hotline.
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
                  9. Contact Information & Dealership Office
                </h2>
                <div className="text-sm text-[#5A6A76] space-y-4 leading-relaxed">
                  <p>
                    If you have questions regarding this Privacy Policy, wish to review your stored personal data, or require
                    formal assistance under the Sri Lanka PDPA, please contact our showroom office directly:
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
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Showroom Hours: Mon - Sat: 8:30 AM - 6:00 PM | Sunday by Appointment</span>
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
