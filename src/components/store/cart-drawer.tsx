"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatMoney, useCart } from "./cart-context";

/**
 * Slide-over cart panel, mounted once in the root layout and driven by the
 * cart context's `isOpen`. Closes on backdrop click or Escape, and locks body
 * scroll while open.
 */
export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={isOpen ? 0 : -1}
        aria-label="Close cart"
        onClick={closeCart}
        className={`absolute inset-0 cursor-default bg-fr-teal-deep/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-fr-border px-5 py-4">
          <h2 className="font-heading text-xl font-semibold text-fr-ink">
            Your cart{count > 0 && <span className="ml-1 text-fr-muted">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fr-muted transition-colors hover:bg-fr-wash hover:text-fr-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-wash text-fr-teal">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <p className="text-lg font-medium text-fr-ink">Your cart is empty</p>
            <p className="max-w-xs text-sm text-fr-muted">
              Add some fresh Hawaiian longan to get started.
            </p>
            <Link
              href="/products"
              onClick={closeCart}
              className="mt-2 inline-flex h-11 items-center rounded-full bg-fr-lime px-6 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              Shop products
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-fr-border overflow-y-auto px-5">
              {items.map((it) => (
                <li key={it.slug} className="flex gap-4 py-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-fr-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading text-base font-semibold leading-snug text-fr-ink">
                          {it.name}
                        </h3>
                        <p className="mt-0.5 font-mono text-xs text-fr-muted">
                          {it.price}
                          {it.priceNote ? ` ${it.priceNote}` : ""}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(it.slug)}
                        aria-label={`Remove ${it.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-muted transition-colors hover:bg-fr-wash hover:text-fr-ink"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-fr-border">
                        <button
                          type="button"
                          onClick={() => setQty(it.slug, it.qty - 1)}
                          aria-label="Decrease quantity"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm font-medium text-fr-ink">
                          {it.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(it.slug, it.qty + 1)}
                          aria-label="Increase quantity"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-fr-teal">
                        {formatMoney(it.unitPrice * it.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-fr-border px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-fr-muted">Subtotal</span>
                <span className="font-heading text-xl font-semibold text-fr-ink">
                  {formatMoney(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-fr-muted">
                Shipping & taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 flex h-12 items-center justify-center rounded-full bg-fr-lime text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
              >
                Checkout
              </Link>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 flex w-full items-center justify-center text-sm font-medium text-fr-muted transition-colors hover:text-fr-teal"
              >
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
