import type { Metadata } from "next";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { ProductCard } from "@/components/store/product-card";
import { getProducts } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Shop Fresh Hawaiian Longan & Lychee — Flower Ranch Hawaii",
  description:
    "Shop hand-harvested fresh longan, fresh lychee, and dried longan grown on the Hamakua Coast and shipped fresh to your door.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-fr-forest">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <span className="font-mono text-xs uppercase tracking-widest text-fr-green">Shop</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Fresh from the orchard
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Hand-harvested in Hilo, Hawaiʻi and shipped within a day of picking. Choose your fruit.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
