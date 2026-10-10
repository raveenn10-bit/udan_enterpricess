import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
  mapStaticBikeToProduct,
} from "@/lib/admin-db";

/**
 * Hook to retrieve live showroom settings (hotline, whatsapp, address, hours)
 * with instant fallback to static BUSINESS_CONFIG
 */
export function useShowroomSettings() {
  const [settings, setSettings] = useState<ShowroomSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const snap = await getDoc(doc(db, "settings", "showroom"));
        if (snap.exists() && isMounted) {
          setSettings(snap.data() as ShowroomSettings);
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
        const snap = await getDoc(doc(db, "site_content", "homepage"));
        if (snap.exists() && isMounted) {
          setCms(snap.data() as SiteContentHomepage);
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
 * Hook to retrieve live published bike models from Firestore,
 * with fallback to ZUBOO_COLLECTION
 */
export function useDynamicProducts() {
  const [products, setProducts] = useState<BikeModel[]>(ZUBOO_COLLECTION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const q = query(collection(db, "products"), where("status", "==", "published"));
        const snap = await getDocs(q);
        if (!snap.empty && isMounted) {
          const remoteBikes: BikeModel[] = snap.docs.map((docSnap) => {
            const data = docSnap.data() as ProductItem;
            return {
              id: data.id,
              slug: data.slug,
              name: data.name,
              modelCode: data.modelCode,
              badge: data.badge,
              category: data.category,
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
              colors: (data.colors || []).map((c) => ({
                name: c.name,
                hex: c.hex,
                image: c.image || data.mainImage,
              })),
              isFeatured: data.isFeatured,
              provisionalNotes: [],
            };
          });

          // Merge: if remote has items, use remote, otherwise fallback
          if (remoteBikes.length > 0) {
            setProducts(remoteBikes);
          }
        }
      } catch (e) {
        // Fallback to static
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
        const q = query(collection(db, "offers"), where("isActive", "==", true));
        const snap = await getDocs(q);
        if (!snap.empty && isMounted) {
          const list = snap.docs.map((d) => d.data() as OfferItem);
          if (list.length > 0) {
            setOffers(list);
          }
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
