import { useState, useEffect } from "react";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
 * Hook to retrieve live showroom settings (hotline, whatsapp, address, hours, maps)
 * Real-time updates via Cloud Firestore onSnapshot + instant local-first event listener
 */
export function useShowroomSettings() {
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load from local cache or defaults
    getShowroomSettings().then((cached) => {
      if (isMounted && cached) {
        setSettings(cached);
        setLoading(false);
      }
    });

    // 2. Real-time Cloud Firestore listener
    let unsubscribeFirestore: (() => void) | null = null;
    try {
      unsubscribeFirestore = onSnapshot(
        doc(db, "settings", "showroom"),
        (snap) => {
          if (snap.exists() && isMounted) {
            const data = snap.data() as ShowroomSettings;
            setSettings(data);
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem("udan_settings_cache", JSON.stringify(data));
              } catch (e) {}
            }
          }
        },
        (error) => {
          console.warn("Firestore settings onSnapshot notice:", error);
        }
      );
    } catch (e) {
      console.warn("Could not register settings onSnapshot:", e);
    }

    // 3. Local-first immediate cross-component & cross-tab sync
    const handleLocalUpdate = () => {
      getShowroomSettings().then((updated) => {
        if (isMounted && updated) {
          setSettings(updated);
        }
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("udan-data-updated", handleLocalUpdate);
      window.addEventListener("storage", handleLocalUpdate);
    }

    return () => {
      isMounted = false;
      if (unsubscribeFirestore) unsubscribeFirestore();
      if (typeof window !== "undefined") {
        window.removeEventListener("udan-data-updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }, []);

  return { settings, loading };
}

/**
 * Hook to retrieve live homepage CMS headlines, ticker, and showcases
 * Real-time updates via Cloud Firestore onSnapshot + local-first event listener
 */
export function useHomepageContent() {
  const [cms, setCms] = useState<SiteContentHomepage>(DEFAULT_HOMEPAGE_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load
    getHomepageContent().then((cached) => {
      if (isMounted && cached) {
        setCms(cached);
        setLoading(false);
      }
    });

    // 2. Real-time Cloud Firestore listener
    let unsubscribeFirestore: (() => void) | null = null;
    try {
      unsubscribeFirestore = onSnapshot(
        doc(db, "site_content", "homepage"),
        (snap) => {
          if (snap.exists() && isMounted) {
            const data = snap.data() as SiteContentHomepage;
            setCms(data);
            if (typeof window !== "undefined") {
              try {
                localStorage.setItem("udan_cms_cache", JSON.stringify(data));
              } catch (e) {}
            }
          }
        },
        (error) => {
          console.warn("Firestore CMS onSnapshot notice:", error);
        }
      );
    } catch (e) {
      console.warn("Could not register CMS onSnapshot:", e);
    }

    // 3. Local-first immediate sync
    const handleLocalUpdate = () => {
      getHomepageContent().then((updated) => {
        if (isMounted && updated) {
          setCms(updated);
        }
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("udan-data-updated", handleLocalUpdate);
      window.addEventListener("storage", handleLocalUpdate);
    }

    return () => {
      isMounted = false;
      if (unsubscribeFirestore) unsubscribeFirestore();
      if (typeof window !== "undefined") {
        window.removeEventListener("udan-data-updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }, []);

  return { cms, loading };
}

function mapProductToBike(data: ProductItem): BikeModel {
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
 * Hook to retrieve live published bike models from Firestore
 * Real-time updates via Cloud Firestore onSnapshot + local-first event listener
 */
export function useDynamicProducts() {
  const [products, setProducts] = useState<BikeModel[]>(ZUBOO_COLLECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load
    getProducts().then((items) => {
      const published = items.filter((p) => p.status === "published");
      if (published.length > 0 && isMounted) {
        setProducts(published.map(mapProductToBike));
        setLoading(false);
      }
    });

    // 2. Real-time Cloud Firestore listener
    let unsubscribeFirestore: (() => void) | null = null;
    try {
      unsubscribeFirestore = onSnapshot(
        collection(db, "products"),
        (snap) => {
          if (!snap.empty && isMounted) {
            const allItems = snap.docs.map((d) => d.data() as ProductItem);
            const published = allItems.filter((p) => p.status === "published");
            if (published.length > 0) {
              setProducts(published.map(mapProductToBike));
            }
          }
        },
        (error) => {
          console.warn("Firestore products onSnapshot notice:", error);
        }
      );
    } catch (e) {
      console.warn("Could not register products onSnapshot:", e);
    }

    // 3. Local-first update listener
    const handleLocalUpdate = () => {
      getProducts().then((items) => {
        const published = items.filter((p) => p.status === "published");
        if (published.length > 0 && isMounted) {
          setProducts(published.map(mapProductToBike));
        }
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("udan-data-updated", handleLocalUpdate);
      window.addEventListener("storage", handleLocalUpdate);
    }

    return () => {
      isMounted = false;
      if (unsubscribeFirestore) unsubscribeFirestore();
      if (typeof window !== "undefined") {
        window.removeEventListener("udan-data-updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }, []);

  return { products, loading };
}

/**
 * Hook to retrieve live active promotional offers
 * Real-time updates via Cloud Firestore onSnapshot + local-first event listener
 */
export function useDynamicOffers() {
  const [offers, setOffers] = useState<OfferItem[]>(DEFAULT_OFFERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial fast load
    getOffers().then((items) => {
      const active = items.filter((o) => o.isActive);
      if (active.length > 0 && isMounted) {
        setOffers(active);
        setLoading(false);
      }
    });

    // 2. Real-time Cloud Firestore listener
    let unsubscribeFirestore: (() => void) | null = null;
    try {
      unsubscribeFirestore = onSnapshot(
        collection(db, "offers"),
        (snap) => {
          if (!snap.empty && isMounted) {
            const allOffers = snap.docs.map((d) => d.data() as OfferItem);
            const active = allOffers.filter((o) => o.isActive);
            if (active.length > 0) {
              setOffers(active);
            }
          }
        },
        (error) => {
          console.warn("Firestore offers onSnapshot notice:", error);
        }
      );
    } catch (e) {
      console.warn("Could not register offers onSnapshot:", e);
    }

    // 3. Local update listener
    const handleLocalUpdate = () => {
      getOffers().then((items) => {
        const active = items.filter((o) => o.isActive);
        if (active.length > 0 && isMounted) {
          setOffers(active);
        }
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("udan-data-updated", handleLocalUpdate);
      window.addEventListener("storage", handleLocalUpdate);
    }

    return () => {
      isMounted = false;
      if (unsubscribeFirestore) unsubscribeFirestore();
      if (typeof window !== "undefined") {
        window.removeEventListener("udan-data-updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }, []);

  return { offers, loading };
}
