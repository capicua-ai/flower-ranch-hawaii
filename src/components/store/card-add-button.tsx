"use client";

import { Plus } from "lucide-react";

import type { Product } from "@/lib/store-data";
import { useCartForm } from "@/lib/cart";
import { openCartDrawer } from "@/lib/cart-drawer";

/**
 * "Add to cart" button shown BELOW the product card (always visible — no hover
 * dependency), a classic, clearer affordance. Rendered outside the card's Link
 * so the click adds to the cart instead of navigating.
 */
export function CardAddButton({ product }: { product: Product }) {
  const { formProps, register } = useCartForm();

  if (!product.merchandiseId) return null;

  return (
    <form
      {...formProps({
        afterSubmit: () => openCartDrawer(),
      })}
      className="mt-4"
    >
      <input type="hidden" {...register("merchandiseId", { value: product.merchandiseId })} />
      <input type="hidden" {...register("quantity", { value: 1 })} />
      <button
        type="submit"
        {...register("add")}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-fr-border bg-white text-sm font-semibold text-fr-teal transition-colors hover:border-fr-lime hover:bg-fr-lime hover:text-fr-teal-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
      >
        <Plus className="h-4 w-4" /> Add to cart
      </button>
    </form>
  );
}
