"use client";

import { Plus } from "lucide-react";
import { useCart, type CartProductInput } from "./cart-context";

/**
 * "Add to cart" button shown BELOW the product card (always visible — no hover
 * dependency), a classic, clearer affordance. Rendered outside the card's Link
 * so the click adds to the cart instead of navigating.
 */
export function CardAddButton({ product }: { product: CartProductInput }) {
  const { addItem, openCart } = useCart();
  return (
    <button
      type="button"
      onClick={() => {
        addItem(product);
        openCart();
      }}
      className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-fr-border bg-white text-sm font-semibold text-fr-teal transition-colors hover:border-fr-lime hover:bg-fr-lime hover:text-fr-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
    >
      <Plus className="h-4 w-4" /> Add to cart
    </button>
  );
}
