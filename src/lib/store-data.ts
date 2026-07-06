// Storefront content — now sourced from the database (editable via Souped
// Chalk). Tables: site_settings, products, blog_posts, benefits,
// delivery_steps. The owner edits these from Souped → Chalk without a redeploy.

import { db } from "@/lib/db";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  image: string;
  gallery: string[];
  description: string;
  specs: ProductSpec[];
  inStock: boolean;
  /** First variant GID for add-to-cart until full variant selection ships. */
  merchandiseId?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readingTime: string;
  body: string[];
}

export interface Benefit {
  title: string;
  body: string;
  icon: string;
}

export interface DeliveryStep {
  title: string;
  body: string;
  icon: string;
}

export interface SiteSettings {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  contactEmail: string;
}

const SETTINGS_FALLBACK: SiteSettings = {
  heroBadge: "Grown in Hilo, Hawaiʻi",
  heroTitle: "Fresh Hawaii Longan",
  heroSubtitle:
    "Hand-harvested on our family orchard and shipped to your door within days of picking.",
  contactEmail: "aloha@flowerranchhawaii.com",
};

function splitBody(body: string): string[] {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const row = await db.siteSettings.findFirst();
  return row
    ? {
        heroBadge: row.heroBadge,
        heroTitle: row.heroTitle,
        heroSubtitle: row.heroSubtitle,
        contactEmail: row.contactEmail,
      }
    : SETTINGS_FALLBACK;
}

export async function getProducts(): Promise<Product[]> {
  const rows = await db.product.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    price: r.price,
    priceNote: r.priceNote,
    image: r.image,
    gallery: (r.gallery as unknown as string[]) ?? [r.image],
    description: r.description,
    specs: (r.specs as unknown as ProductSpec[]) ?? [],
    inStock: r.inStock,
  }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const r = await db.product.findUnique({ where: { slug } });
  if (!r) return null;
  return {
    slug: r.slug,
    name: r.name,
    tagline: r.tagline,
    price: r.price,
    priceNote: r.priceNote,
    image: r.image,
    gallery: (r.gallery as unknown as string[]) ?? [r.image],
    description: r.description,
    specs: (r.specs as unknown as ProductSpec[]) ?? [],
    inStock: r.inStock,
  };
}

export async function getPosts(): Promise<BlogPost[]> {
  const rows = await db.blogPost.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    date: r.date,
    readingTime: r.readingTime,
    body: splitBody(r.body),
  }));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const r = await db.blogPost.findUnique({ where: { slug } });
  if (!r) return null;
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    image: r.image,
    date: r.date,
    readingTime: r.readingTime,
    body: splitBody(r.body),
  };
}

export async function getBenefits(): Promise<Benefit[]> {
  const rows = await db.benefit.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ title: r.title, body: r.body, icon: r.icon }));
}

export async function getDeliverySteps(): Promise<DeliveryStep[]> {
  const rows = await db.deliveryStep.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({ title: r.title, body: r.body, icon: r.icon }));
}
