"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { HydrogenCartContents } from "@/components/store/hydrogen-cart-contents";
import { useCart } from "@/lib/cart";
import { CART_DRAWER_ID, closeCartDrawer } from "@/lib/cart-drawer";

export function CartDrawer() {
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const displayCount = totalQuantity > 99 ? "99+" : String(totalQuantity);

  useEffect(() => {
    const drawer = document.getElementById(CART_DRAWER_ID);
    if (!(drawer instanceof HTMLDialogElement)) return;

    const onToggle = () => {
      if (!drawer.open) return;
    };

    drawer.addEventListener("toggle", onToggle);
    return () => drawer.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <dialog
      id={CART_DRAWER_ID}
      aria-labelledby="cart-drawer-title"
      closedby="any"
      className="fr-cart-drawer"
    >
      <div className="flex h-full flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-fr-border px-5 py-4">
          <h2 id="cart-drawer-title" className="font-heading text-xl font-semibold text-fr-ink">
            Your cart
            {totalQuantity > 0 ? <span className="ml-1 text-fr-muted">({displayCount})</span> : null}
          </h2>
          <button
            type="button"
            onClick={closeCartDrawer}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fr-muted transition-colors hover:bg-fr-wash hover:text-fr-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <HydrogenCartContents onContinueShopping={closeCartDrawer} />
      </div>
    </dialog>
  );
}
