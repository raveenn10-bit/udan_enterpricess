import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zuboo Electric Bikes Collection | All 9 Models - Udan Enterprises Galle",
  description: "Browse the full collection of 9 Zuboo electric bikes and scooters in Sri Lanka. From the heavy-duty T16 and 3000W Tank to the retro Paris and eco Mini, discover specifications, range, and book a test ride at Udan Enterprises.",
  alternates: {
    canonical: "https://zubooudan.com/bikes",
  },
  openGraph: {
    title: "All 9 Zuboo Electric Bikes | Udan Enterprises Sri Lanka",
    description: "Discover Zuboo electric motorcycles & scooters: T16, Mini, GT, The Tank, T11, T3, Paris, EX008, KB1. High torque, up to 110km range, zero petrol costs.",
    url: "https://zubooudan.com/bikes",
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
