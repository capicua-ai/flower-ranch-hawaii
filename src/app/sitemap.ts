import type { MetadataRoute } from "next";
import { getPosts, getProducts } from "@/lib/store-data";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

/**
 * Dynamic sitemap. Static public routes plus every product and blog-post slug
 * pulled from the database, so newly-added catalog/blog rows appear
 * automatically. Non-public routes (/account, /checkout, /account/login, /app)
 * are intentionally excluded — mirrors the noindex + Carte `exclude_from_sitemap`
 * settings.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/wholesale`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [products, posts] = await Promise.all([getProducts(), getPosts()]);

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${SITE_URL}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes, ...postRoutes];
  } catch {
    // If the DB is unreachable at build/request time, still emit the static map.
    return staticRoutes;
  }
}
