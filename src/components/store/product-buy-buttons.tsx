"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart, type CartProductInput } from "./cart-context";

/** Add-to-cart + Buy-now actions for the product detail page. */
export function ProductBuyButtons({ product }: { product: CartProductInput }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => {
          addItem(product);
          openCart();
        }}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-teal-deep"
      >
        <ShoppingBag className="h-4 w-4" /> Add to cart
      </button>
      <button
        type="button"
        onClick={() => {
          addItem(product);
          router.push("/checkout");
        }}
        className="inline-flex h-12 items-center justify-center rounded-full border border-fr-border px-7 text-sm font-semibold text-fr-teal transition-colors hover:bg-fr-wash"
      >
        Buy now
      </button>
    </div>
  );
}
