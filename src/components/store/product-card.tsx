import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/store-data";

/**
 * DTC-style product card: tall editorial image on a warm surface, a hand-set
 * "In season" sticker, prominent price, and an add-to-cart affordance that
 * fills on hover. Shared by the home grid and the /products catalog.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col focus-visible:outline-none"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-fr-cream ring-1 ring-fr-border/70 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-fr-forest/10 group-focus-visible:ring-2 group-focus-visible:ring-fr-green">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {product.inStock && (
          <span className="absolute left-4 top-4 -rotate-[5deg] rounded-full bg-fr-green px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white shadow-md">
            In season
          </span>
        )}

        <span
          aria-hidden
          className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-fr-forest shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-fr-green group-hover:text-white"
        >
          <Plus className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-fr-ink transition-colors group-hover:text-fr-forest">
            {product.name}
          </h3>
          <p className="mt-0.5 truncate text-sm text-fr-muted">{product.tagline}</p>
        </div>
        <span className="shrink-0 font-mono text-base font-semibold text-fr-forest">
          {product.price}
        </span>
      </div>
    </Link>
  );
}
