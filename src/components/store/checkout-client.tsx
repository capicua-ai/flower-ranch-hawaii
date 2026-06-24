"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatMoney, useCart } from "./cart-context";

/**
 * Cart review + order summary. Payment is intentionally a placeholder for now —
 * "Place order" records intent only (no charge). Swap for a real provider later.
 */
export function CheckoutClient() {
  const { items, setQty, removeItem, subtotal, count, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-lime text-fr-teal-deep">
          <Check className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-fr-ink">Order requested</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-fr-muted">
          Thanks! This is a preview checkout — no payment was taken. We&apos;ll be in touch to
          confirm your fresh longan order.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-wash text-fr-teal">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-fr-ink">Your cart is empty</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-fr-muted">
          Add some fresh Hawaiian longan to get started.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">Checkout</h1>
      <p className="mt-2 text-fr-muted">
        {count} {count === 1 ? "item" : "items"} in your cart
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem]">
        {/* Line items */}
        <ul className="divide-y divide-fr-border border-y border-fr-border">
          {items.map((it) => (
            <li key={it.slug} className="flex gap-4 py-5">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-fr-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.image} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-fr-ink">{it.name}</h2>
                    <p className="mt-0.5 font-mono text-xs text-fr-muted">
                      {it.price}
                      {it.priceNote ? ` ${it.priceNote}` : ""}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(it.slug)}
                    aria-label={`Remove ${it.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fr-muted transition-colors hover:bg-fr-wash hover:text-fr-ink"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-fr-border">
                    <button
                      type="button"
                      onClick={() => setQty(it.slug, it.qty - 1)}
                      aria-label="Decrease quantity"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center font-mono text-sm font-medium text-fr-ink">
                      {it.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(it.slug, it.qty + 1)}
                      aria-label="Increase quantity"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fr-teal transition-colors hover:bg-fr-wash"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-mono text-base font-semibold text-fr-teal">
                    {formatMoney(it.unitPrice * it.qty)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-3xl border border-fr-border bg-fr-cream p-6">
          <h2 className="font-heading text-xl font-semibold text-fr-ink">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-fr-muted">Subtotal</dt>
              <dd className="font-mono font-medium text-fr-ink">{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-fr-muted">Shipping</dt>
              <dd className="text-fr-muted">Calculated at fulfilment</dd>
            </div>
          </dl>
          <div className="mt-5 flex items-center justify-between border-t border-fr-border pt-4">
            <span className="font-medium text-fr-ink">Total</span>
            <span className="font-heading text-2xl font-semibold text-fr-ink">
              {formatMoney(subtotal)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setPlaced(true);
              clear();
            }}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-fr-lime text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Place order
          </button>
          <p className="mt-3 text-center text-xs text-fr-muted">
            Preview checkout — no payment is taken yet.
          </p>
        </aside>
      </div>
    </div>
  );
}
