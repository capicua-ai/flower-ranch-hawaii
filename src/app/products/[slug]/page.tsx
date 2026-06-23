import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShoppingBag, Truck } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { getProduct, PRODUCTS } from "@/lib/store-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found — Flower Ranch Hawaii" };
  return {
    title: `${product.name} — Flower Ranch Hawaii`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fr-muted transition-colors hover:text-fr-teal"
          >
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square overflow-hidden rounded-3xl border border-fr-border bg-fr-wash">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.gallery[0]} alt={product.name} className="h-full w-full object-cover" />
              </div>
              {product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.gallery.slice(1).map((src, i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-2xl border border-fr-border bg-fr-wash"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail */}
            <div className="lg:py-4">
              <span className="font-mono text-xs uppercase tracking-widest text-fr-teal/70">
                {product.tagline}
              </span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-bold text-fr-teal">{product.price}</span>
                <span className="text-sm text-fr-muted">{product.priceNote}</span>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-fr-ink/80">{product.description}</p>

              {product.inStock && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fr-teal">
                  <Check className="h-4 w-4" /> In season — shipping now
                </p>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to cart
                </button>
                <Link
                  href="/checkout"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-fr-border px-7 text-sm font-semibold text-fr-teal transition-colors hover:bg-fr-wash"
                >
                  Buy now
                </Link>
              </div>

              <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-fr-muted">
                <Truck className="h-4 w-4" /> Cold-chain shipped within 1 day of harvest
              </p>

              {/* Specs */}
              <dl className="mt-8 divide-y divide-fr-border border-t border-fr-border">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-fr-muted">{spec.label}</dt>
                    <dd className="font-mono text-sm font-medium text-fr-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
