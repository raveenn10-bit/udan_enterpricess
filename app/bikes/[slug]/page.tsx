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

  const bikeUrl = `https://zubooudan.com/bikes/${bike.slug}`;
  const imageUrl = bike.mainImage.startsWith("http")
    ? bike.mainImage
    : `https://zubooudan.com${bike.mainImage}`;

  return {
    title: `${bike.name} (${bike.modelCode}) | Zuboo Electric Sri Lanka - Udan Enterprises`,
    description: `${bike.tagline}. ${bike.description} Motor: ${bike.motorPower}, Range: ${bike.advertisedRange}, Top Speed: ${bike.topSpeed}. Available for test rides at Udan Enterprises Galle showroom.`,
    alternates: {
      canonical: `https://zubooudan.com/bikes/${bike.slug}`,
    },
    openGraph: {
      title: `${bike.name} (${bike.modelCode}) - Zuboo Electric`,
      description: `${bike.tagline}. Range: ${bike.advertisedRange}, Motor: ${bike.motorPower}. Inquire now at Udan Enterprises Galle.`,
      url: bikeUrl,
      siteName: "Zuboo Udan Enterprises Sri Lanka",
      images: [
        {
          url: imageUrl,
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: bike.name,
    brand: {
      "@type": "Brand",
      name: "Zuboo",
    },
    modelCode: bike.modelCode,
    description: bike.description,
    image: bike.mainImage.startsWith("http")
      ? bike.mainImage
      : `https://zubooudan.com${bike.mainImage}`,
    offers: {
      "@type": "Offer",
      price: bike.advertisedPrice,
      priceCurrency: "LKR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Udan Enterprises",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <BikeDetailView bike={bike} relatedBikes={relatedBikes} />
    </>
  );
}
