import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-fr-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-fr-forest/10"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-fr-wash">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-fr-muted">
                      {p.tagline}
                    </span>
                    <h2 className="mt-1 text-xl font-bold text-fr-ink">{p.name}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fr-muted">
                      {p.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-sm font-medium text-fr-forest">
                        {p.price} <span className="text-fr-muted">/ {p.priceNote.split(" · ")[0].replace("per ", "")}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fr-forest group-hover:text-fr-green">
                        Shop <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
