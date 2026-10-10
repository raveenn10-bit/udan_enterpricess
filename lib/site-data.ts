import { useState, useEffect } from "react";
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
  getCachedShowroomSettings,
  getCachedHomepageContent,
  getCachedProducts,
  getCachedOffers,
  checkAndSyncWithRemote,
} from "@/lib/admin-db";

/**
 * Hook to retrieve live showroom settings (hotline, whatsapp, address, hours, maps)
 * Instant local cache + 15m throttled remote sync versioning (0 Firestore reads if unchanged)
 */
export function useShowroomSettings() {
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load from local cache or defaults (0ms hydration)
    const cached = getCachedShowroomSettings();
    if (isMounted) {
      setSettings(cached);
      setLoading(false);
    }

    // 2. Throttled remote sync check (0 reads if within 15 min cache)
    checkAndSyncWithRemote();

    // 3. Local-first immediate cross-component & cross-tab sync
    const handleLocalUpdate = () => {
      if (isMounted) {
        setSettings(getCachedShowroomSettings());
      }
    };

    window.addEventListener("udan-data-updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("udan-data-updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    };
  }, []);

  return { settings, loading };
}

/**
 * Hook to retrieve live homepage CMS headlines, ticker, and showcases
 * Instant local cache + 15m throttled remote sync versioning (0 Firestore reads if unchanged)
 */
export function useHomepageContent() {
  const [cms, setCms] = useState<SiteContentHomepage>(DEFAULT_HOMEPAGE_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load from local cache or defaults (0ms hydration)
    const cached = getCachedHomepageContent();
    if (isMounted) {
      setCms(cached);
      setLoading(false);
    }

    // 2. Throttled remote sync check
    checkAndSyncWithRemote();

    // 3. Local-first immediate cross-component & cross-tab sync
    const handleLocalUpdate = () => {
      if (isMounted) {
        setCms(getCachedHomepageContent());
      }
    };

    window.addEventListener("udan-data-updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("udan-data-updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    };
  }, []);

  return { cms, loading };
}

export function mapProductToBike(data: ProductItem): BikeModel {
  return {
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
  };
}

/**
 * Hook to retrieve live published bike models from local cache
 * Instant local cache + 15m throttled remote sync versioning (0 Firestore reads if unchanged)
 */
export function useDynamicProducts() {
  const [products, setProducts] = useState<BikeModel[]>(ZUBOO_COLLECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = () => {
      const items = getCachedProducts();
      const published = items.filter((p) => p.status === "published");
      if (published.length > 0) {
        return published.map(mapProductToBike);
      }
      return ZUBOO_COLLECTION;
    };

    if (isMounted) {
      setProducts(loadProducts());
      setLoading(false);
    }

    // 2. Throttled remote sync check
    checkAndSyncWithRemote();

    // 3. Local-first immediate sync
    const handleLocalUpdate = () => {
      if (isMounted) {
        setProducts(loadProducts());
      }
    };

    window.addEventListener("udan-data-updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("udan-data-updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    };
  }, []);

  return { products, loading };
}

/**
 * Hook to retrieve live active promotional offers from local cache
 * Instant local cache + 15m throttled remote sync versioning (0 Firestore reads if unchanged)
 */
export function useDynamicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>(DEFAULT_OFFERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadOffers = () => {
      const items = getCachedOffers();
      const active = items.filter((o) => o.isActive);
      if (active.length > 0) {
        return active;
      }
      return DEFAULT_OFFERS;
    };

    if (isMounted) {
      setOffers(loadOffers());
      setLoading(false);
    }

    // 2. Throttled remote sync check
    checkAndSyncWithRemote();

    // 3. Local update listener
    const handleLocalUpdate = () => {
      if (isMounted) {
        setOffers(loadOffers());
      }
    };

    window.addEventListener("udan-data-updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);

    return () => {
      isMounted = false;
      window.removeEventListener("udan-data-updated", handleLocalUpdate);
      window.removeEventListener("storage", handleLocalUpdate);
    };
  }, []);

  return { offers, loading };
}
