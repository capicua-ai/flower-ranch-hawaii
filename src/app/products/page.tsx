import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { SectionLabel } from "@/components/store/section-label";
import { ProductCard } from "@/components/store/product-card";
import { getProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Shop Fresh Hawaiian Longan & Lychee — Flower Ranch Hawaii",
  description:
    "Shop hand-harvested fresh longan, fresh lychee, and dried longan grown on the Hamakua Coast and shipped fresh to your door.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const all = await getProducts();
  const products = query
    ? all.filter((p) =>
        `${p.name} ${p.tagline} ${p.description}`.toLowerCase().includes(query.toLowerCase()),
      )
    : all;
  return (
    <>
      <SiteHeader />
      <main>
        <section className="-mt-[68px] bg-fr-teal sm:-mt-[72px]">
          <div className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
            <SectionLabel dark>Shop</SectionLabel>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Fresh from the <em className="font-medium not-italic text-fr-lime">orchard</em>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Hand-harvested in Hilo, Hawaiʻi and shipped within a day of picking. Choose your fruit.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            {query ? (
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-fr-muted">
                  {products.length} result{products.length === 1 ? "" : "s"} for{" "}
                  <span className="font-semibold text-fr-ink">“{query}”</span>
                </p>
                <Link
                  href="/products"
                  className="text-sm font-semibold text-fr-teal transition-colors hover:text-fr-lime"
                >
                  Clear search
                </Link>
              </div>
            ) : (
              <h2 className="sr-only">All products</h2>
            )}

            {products.length > 0 ? (
              <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <h2 className="font-heading text-2xl font-semibold text-fr-ink">
                  No products match your search
                </h2>
                <p className="mt-2 text-fr-muted">Try a different term.</p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex h-11 items-center rounded-full bg-fr-lime px-6 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
                >
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
