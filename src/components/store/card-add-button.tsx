"use client";

import { Plus } from "lucide-react";
import { useCart, type CartProductInput } from "./cart-context";

/**
 * The "Add to cart" bar overlaid on a product card image. Rendered as a sibling
 * of the card's Link (not nested in it) so the click adds to the cart instead of
 * navigating. Revealed on hover on desktop, always visible on touch.
 */
export function CardAddButton({ product }: { product: CartProductInput }) {
  const { addItem, openCart } = useCart();
  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-0 opacity-100 transition-all duration-300 ease-out lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
      <button
        type="button"
        onClick={() => {
          addItem(product);
          openCart();
        }}
        className="pointer-events-auto flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white/95 text-sm font-semibold text-fr-teal shadow-lg backdrop-blur transition-colors hover:bg-fr-lime hover:text-fr-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
      >
        <Plus className="h-4 w-4" /> Add to cart
      </button>
    </div>
  );
}
