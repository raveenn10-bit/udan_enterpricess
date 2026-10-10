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

export const metadata: Metadata = {
  metadataBase: new URL("https://udanenterprises.lk"),
  title: "Udan Enterprises | Zuboo Electric Bikes Sri Lanka",
  description:
    "Experience premium electric mobility with Zuboo Electric Bikes at Udan Enterprises. Discover models, specifications, test ride bookings, and local service in Galle.",
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
      <body className="antialiased selection:bg-[#346C83] selection:text-white">
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
