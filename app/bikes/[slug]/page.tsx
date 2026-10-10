import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBikeBySlug, getAllBikeSlugs, getRelatedBikes } from "@/data/bikes";
import BikeDetailView from "@/components/BikeDetailView";

interface BikePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all Zuboo models
export async function generateStaticParams() {
  return getAllBikeSlugs().map((slug) => ({
    slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({
  params,
}: BikePageProps): Promise<Metadata> {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  if (!bike) {
    return {
      title: "Model Not Found | Udan Enterprises",
      description: "The requested Zuboo electric bike model was not found.",
    };
  }

  return {
    title: `${bike.name} (${bike.modelCode}) | Zuboo Electric Sri Lanka - Udan Enterprises`,
    description: `${bike.tagline}. ${bike.description} Motor: ${bike.motorPower}, Range: ${bike.advertisedRange}, Top Speed: ${bike.topSpeed}. Available for test rides at Udan Enterprises Galle showroom.`,
    openGraph: {
      title: `${bike.name} (${bike.modelCode}) - Zuboo Electric`,
      description: `${bike.tagline}. Range: ${bike.advertisedRange}, Motor: ${bike.motorPower}. Inquire now at Udan Enterprises Galle.`,
      url: `https://udanenterprises.lk/bikes/${bike.slug}`,
      siteName: "Udan Enterprises",
      images: [
        {
          url: bike.mainImage,
          width: 800,
          height: 600,
          alt: `${bike.name} Zuboo Electric Motorcycle`,
        },
      ],
      locale: "en_LK",
      type: "website",
    },
  };
}

export default async function BikeDetailPage({ params }: BikePageProps) {
  const { slug } = await params;
  const bike = getBikeBySlug(slug);

  if (!bike) {
    notFound();
  }

  const relatedBikes = getRelatedBikes(bike.slug, 3);

  return <BikeDetailView bike={bike} relatedBikes={relatedBikes} />;
}
