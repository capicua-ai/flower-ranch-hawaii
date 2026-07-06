"use client";

import { ShoppingBag } from "lucide-react";

import { useCartForm } from "@/lib/cart";
import { openCartDrawer } from "@/lib/cart-drawer";

interface ProductBuyButtonsProps {
  merchandiseId: string;
  availableForSale?: boolean;
}

/** Add-to-cart actions for the product detail page. */
export function ProductBuyButtons({
  merchandiseId,
  availableForSale = true,
}: ProductBuyButtonsProps) {
  const { formProps, register } = useCartForm();

  return (
    <div className="flex flex-wrap gap-3">
      <form
        {...formProps({
          afterSubmit: () => openCartDrawer(),
        })}
      >
        <input type="hidden" {...register("merchandiseId", { value: merchandiseId })} />
        <input type="hidden" {...register("quantity", { value: 1 })} />
        <button
          type="submit"
          {...register("add")}
          disabled={!availableForSale}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-teal-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" /> Add to cart
        </button>
      </form>
      <form
        {...formProps({
          afterSubmit: () => {
            window.location.assign("/checkout");
          },
        })}
      >
        <input type="hidden" {...register("merchandiseId", { value: merchandiseId })} />
        <input type="hidden" {...register("quantity", { value: 1 })} />
        <button
          type="submit"
          {...register("add")}
          disabled={!availableForSale}
          className="inline-flex h-12 items-center justify-center rounded-full border border-fr-border px-7 text-sm font-semibold text-fr-teal transition-colors hover:bg-fr-wash disabled:cursor-not-allowed disabled:opacity-50"
        >
          Buy now
        </button>
      </form>
    </div>
  );
}
