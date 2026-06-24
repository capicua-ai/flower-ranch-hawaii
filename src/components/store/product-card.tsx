import Link from "next/link";
import type { Product } from "@/lib/store-data";
import { CardAddButton } from "./card-add-button";

/**
 * Product card (synthesized from atomic-inspiration: lookup.design product-card
 * pattern + godly/lapa food-DTC execution). The image dominates and the card
 * stays calm: a quiet two-line meta block (Fraunces name + confident price,
 * mono micro-label beneath) and an "Add to cart" bar that reveals on hover —
 * and stays visible on touch devices where there is no hover. The add bar sits
 * outside the link so it adds to the cart instead of navigating.
 */
export function ProductCard({ product }: { product: Product }) {
  const cartProduct = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    priceNote: product.priceNote,
    image: product.image,
  };

  return (
    <div className="group flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col focus-visible:outline-none"
      >
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-fr-cream shadow-[0_18px_40px_-24px_rgba(0,70,85,0.45)] ring-1 ring-fr-border/70 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_50px_-22px_rgba(0,70,85,0.5),0_0_36px_-6px_rgba(142,216,95,0.55)] group-hover:ring-fr-lime/60 group-focus-within:ring-2 group-focus-within:ring-fr-lime">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-3 px-0.5">
          <h3 className="truncate font-heading text-xl font-semibold text-fr-ink transition-colors group-hover:text-fr-teal">
            {product.name}
          </h3>
          <span className="shrink-0 font-mono text-base font-semibold text-fr-teal">
            {product.price}
          </span>
        </div>
        <p className="mt-1 px-0.5 font-mono text-[11px] uppercase tracking-wider text-fr-muted">
          {product.tagline}
        </p>
      </Link>

      <CardAddButton product={cartProduct} />
    </div>
  );
}
