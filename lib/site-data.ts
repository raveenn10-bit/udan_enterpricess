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
