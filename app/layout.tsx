import type { Metadata } from "next";
import { 
  DM_Serif_Display, 
  Fraunces, 
  Della_Respira, 
  Alice, 
  EB_Garamond, 
  Manrope,
  Inter, 
  Space_Grotesk 
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/lib/i18n";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dellaRespira = Della_Respira({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-della-respira",
  display: "swap",
});

const alice = Alice({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alice",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MotorcycleDealer", "LocalBusiness"],
      "@id": "https://zubooudan.com/#dealer",
      name: "Udan Enterprises - Zuboo Electric Sri Lanka",
      url: "https://zubooudan.com",
      telephone: "+94784969652",
      priceRange: "LKR 195,000 - LKR 525,000",
      image: "https://zubooudan.com/media/branding/udan-hero-poster.webp",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Udugama Road, Kurunduwatta",
        addressLocality: "Pinnaduwa, Galle",
        addressRegion: "Southern Province",
        postalCode: "80000",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.0535,
        longitude: 80.2210,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "08:30",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "09:00",
          closes: "14:00",
        },
      ],
      sameAs: [
        "https://maps.app.goo.gl/GyJCSSS7p6Bd18xM8",
        "https://facebook.com",
        "https://instagram.com",
        "https://tiktok.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://zubooudan.com/#website",
      name: "Udan Enterprises - Zuboo Electric Sri Lanka",
      url: "https://zubooudan.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://zubooudan.com/bikes?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zubooudan.com"),
  title: {
    default: "Zuboo Electric Bikes Sri Lanka | Udan Enterprises Pinnaduwa Galle",
    template: "%s | Zuboo Sri Lanka - Udan Enterprises",
  },
  description:
    "Official Zuboo Electric Motorcycle & Scooter Dealership in Sri Lanka. Explore all 9 models including T16, The Tank 3000W, GT, T11, Paris & Mini. Showroom on Udugama Rd, Pinnaduwa, Galle. Save 90% on petrol. Book your free test ride today.",
  keywords: [
    "Zuboo electric bikes Sri Lanka",
    "Zuboo Udan Enterprises",
    "Zuboo Galle showroom",
    "Zuboo Pinnaduwa",
    "electric motorcycle Sri Lanka price",
    "electric scooter Sri Lanka 2026",
    "Zuboo T16 price Sri Lanka",
    "Zuboo The Tank 3000W",
    "Zuboo GT electric bike",
    "Zuboo Paris electric scooter",
    "Zuboo T3 price",
    "best electric bike Sri Lanka",
    "fuel savings electric bike Sri Lanka",
    "Southern Province electric bikes",
    "ශ්‍රී ලංකාවේ විදුලි යතුරුපැදි",
    "සුබූ ඉලෙක්ට්‍රික් බයික් ගාල්ල පින්නදූව",
    "සුබූ උදන් එන්ටර්ප්‍රයිසස්",
  ],
  alternates: {
    canonical: "https://zubooudan.com",
  },
  openGraph: {
    title: "Zuboo Electric Bikes Sri Lanka | Udan Enterprises Pinnaduwa Galle",
    description:
      "Official Zuboo Electric Motorcycle & Scooter Dealership in Sri Lanka. Explore all 9 models including T16, The Tank 3000W, GT, T11, Paris & Mini. Showroom on Udugama Rd, Pinnaduwa, Galle. Save 90% on petrol. Book your free test ride today.",
    url: "https://zubooudan.com",
    siteName: "Zuboo Udan Enterprises Sri Lanka",
    locale: "en_LK",
    alternateLocale: ["si_LK"],
    images: [
      {
        url: "https://zubooudan.com/media/branding/udan-hero-poster.webp",
        width: 1200,
        height: 630,
        alt: "Zuboo Electric Bikes Sri Lanka - Udan Enterprises Galle Pinnaduwa",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuboo Electric Bikes Sri Lanka | Udan Enterprises Pinnaduwa Galle",
    description:
      "Official Zuboo Electric Motorcycle & Scooter Dealership in Sri Lanka. Explore all 9 models including T16, The Tank 3000W, GT, T11, Paris & Mini. Showroom on Udugama Rd, Pinnaduwa, Galle. Save 90% on petrol. Book your free test ride today.",
    site: "@zubooudan",
    creator: "@zubooudan",
    images: ["https://zubooudan.com/media/branding/udan-hero-poster.webp"],
  },
  icons: {
    icon: "/media/branding/udan-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${manrope.variable} ${dmSerifDisplay.variable} ${fraunces.variable} ${dellaRespira.variable} ${alice.variable} ${ebGaramond.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Comprehensive JSON-LD Structured Data for LocalBusiness & WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect & DNS-Prefetch for high-speed asset resolution */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Instant first-paint visual with official hero banner preload */}
        <link
          rel="preload"
          href="/media/branding/udan-hero-banner.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/media/branding/udan-hero-poster.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/videos/hero.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className="antialiased selection:bg-[#346C83] selection:text-white">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
