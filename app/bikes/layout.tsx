import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zuboo Electric Bikes Collection | All 8 Models - Udan Enterprises Galle",
  description: "Browse the full collection of 8 Zuboo electric bikes and scooters in Sri Lanka. From the eco-friendly Mini to the 3000W Tank, discover specifications, range, provisional prices, and book a test ride at Udan Enterprises.",
  openGraph: {
    title: "All 8 Zuboo Electric Bikes | Udan Enterprises Sri Lanka",
    description: "Discover Zuboo electric motorcycles & scooters: Mini, GT, The Tank, T11, T3, Paris, EX008, KB1. High torque, up to 110km range, zero petrol costs.",
    url: "https://udanenterprises.lk/bikes",
    siteName: "Udan Enterprises",
    images: [
      {
        url: "/media/bikes/gt/main.webp",
        width: 1200,
        height: 630,
        alt: "Zuboo Electric Bikes Collection - Udan Enterprises",
      },
    ],
    locale: "en_LK",
    type: "website",
  },
};

export default function BikesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
