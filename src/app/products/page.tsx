import type { Metadata } from "next";
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

export default async function ProductsPage() {
  const products = await getProducts();
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
            <h2 className="sr-only">All products</h2>
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
