import { useState, useEffect } from "react";
import { BUSINESS_CONFIG } from "@/data/business";
import { ZUBOO_COLLECTION, BikeModel } from "@/data/bikes";
import {
  ShowroomSettings,
  SiteContentHomepage,
  ProductItem,
  OfferItem,
} from "@/types/admin";
import {
  DEFAULT_SETTINGS,
  DEFAULT_HOMEPAGE_CONTENT,
  DEFAULT_OFFERS,
  getShowroomSettings,
  getHomepageContent,
  getProducts,
  getOffers,
} from "@/lib/admin-db";

/**
 * Hook to retrieve live showroom settings (hotline, whatsapp, address, hours)
 * with instant fallback to static BUSINESS_CONFIG and local cache
 */
export function useShowroomSettings() {
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await getShowroomSettings();
        if (isMounted && data) {
          setSettings(data);
        }
      } catch (e) {
        // Fallback silently
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { settings, loading };
}

/**
 * Hook to retrieve live homepage CMS headlines and ticker
 */
export function useHomepageContent() {
  const [cms, setCms] = useState<SiteContentHomepage>(DEFAULT_HOMEPAGE_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await getHomepageContent();
        if (isMounted && data) {
          setCms(data);
        }
      } catch (e) {
        // Fallback silently
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { cms, loading };
}

/**
 * Hook to retrieve live published bike models from Firestore / Local Cache,
 * with fallback to ZUBOO_COLLECTION
 */
export function useDynamicProducts() {
  const [products, setProducts] = useState<BikeModel[]>(ZUBOO_COLLECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const productItems = await getProducts();
        const publishedItems = productItems.filter((p) => p.status === "published");
        if (publishedItems.length > 0 && isMounted) {
          const mappedBikes: BikeModel[] = publishedItems.map((data) => ({
            id: data.id,
            slug: data.slug,
            name: data.name,
            modelCode: data.modelCode,
            badge: data.badge,
            category: data.category as any,
            tagline: data.tagline,
            description: data.description,
            advertisedPrice: data.priceLKR,
            formattedPrice: `LKR ${data.priceLKR.toLocaleString()}`,
            isPriceVerified: data.isPriceVerified,
            motorPower: data.motorPower,
            topSpeed: data.topSpeed,
            advertisedRange: data.advertisedRange,
            battery: data.battery,
            chargingTime: data.chargingTime,
            dimensions: data.dimensions,
            brakes: data.brakes,
            display: data.display,
            warranty: data.warranty,
            features: data.features || [],
            mainImage: data.mainImage,
            gallery: data.gallery,
            colors: data.colors?.map((c) => ({
              name: c.name,
              hex: c.hex,
              image: c.image || data.mainImage,
            })) || [{ name: "Default", hex: "#111827", image: data.mainImage }],
            isFeatured: data.isFeatured,
            provisionalNotes: data.isPriceVerified
              ? ["Pricing verified by Udan Enterprises showroom."]
              : ["Price & specifications provisional; verify with Galle showroom."],
          }));
          setProducts(mappedBikes);
        }
      } catch (e) {
        // Fallback silently
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading };
}

/**
 * Hook to retrieve live active promotional offers
 */
export function useDynamicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>(DEFAULT_OFFERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await getOffers();
        const active = data.filter((o) => o.isActive);
        if (active.length > 0 && isMounted) {
          setOffers(active);
        }
      } catch (e) {
        // Fallback silently
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { offers, loading };
}
