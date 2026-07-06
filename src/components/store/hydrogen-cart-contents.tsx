"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { formatPrice } from "@/lib/format-price";
import { useCart, useCartForm } from "@/lib/cart";
import { closeCartDrawer } from "@/lib/cart-drawer";
import { HydrogenCartLineItem } from "@/components/store/hydrogen-cart-line-item";

function CartErrorBanner() {
  const errors = useCart((state) => state.errors);
  const lines = useCart((state) => state.data.lines.nodes);
  const [dismissedAt, setDismissedAt] = useState(0);

  const messages = useMemo(() => {
    const lineIds = new Set(lines.map((line) => line.id));
    const bannerMessages: string[] = [];

    for (const entry of errors.network) {
      bannerMessages.push(entry.message);
    }

    for (const error of errors.cart.userErrors) {
      bannerMessages.push(error.message);
    }

    for (const [lineId, group] of errors.lines) {
      if (!lineIds.has(lineId)) {
        for (const error of group.userErrors) bannerMessages.push(error.message);
      }
    }

    return bannerMessages;
  }, [errors, lines]);

  if (messages.length === 0 || errors.lastUpdatedAt <= dismissedAt) return null;

  return (
    <div role="alert" className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
      <div className="flex items-start justify-between gap-3">
        <ul className="space-y-1">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setDismissedAt(errors.lastUpdatedAt)}
          className="shrink-0 font-medium underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

interface HydrogenCartContentsProps {
  onContinueShopping?: () => void;
  showCheckout?: boolean;
}

export function HydrogenCartContents({
  onContinueShopping,
  showCheckout = true,
}: HydrogenCartContentsProps) {
  const loading = useCart((state) => state.loading);
  const lines = useCart((state) => state.data.lines.nodes);
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const subtotal = useCart((state) => state.data.cost.subtotalAmount);
  const checkoutUrl = useCart((state) => state.data.checkoutUrl);
  const pendingLines = useCart((state) => state.pending.lines);
  const pendingDiscounts = useCart((state) => state.pending.discountCodes);
  const pendingNote = useCart((state) => state.pending.note);
  const hasPending = pendingLines.size > 0 || pendingDiscounts.size > 0 || pendingNote;

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 px-5 py-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-2xl bg-fr-wash" />
        ))}
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-wash text-fr-teal">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <p className="text-lg font-medium text-fr-ink">Your cart is empty</p>
        <p className="max-w-xs text-sm text-fr-muted">Add some fresh Hawaiian longan to get started.</p>
        <Link
          href="/products"
          onClick={onContinueShopping}
          className="mt-2 inline-flex h-11 items-center rounded-full bg-fr-lime px-6 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <>
      <CartErrorBanner />

      <ul className="flex-1 divide-y divide-fr-border overflow-y-auto px-5">
        {lines.map((line) => (
          <HydrogenCartLineItem key={line.id} line={line} />
        ))}
      </ul>

      <footer className="border-t border-fr-border px-5 py-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-fr-muted">Subtotal</span>
          <span
            className={`font-heading text-xl font-semibold text-fr-ink ${hasPending ? "opacity-30" : ""}`}
          >
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mt-1 text-xs text-fr-muted">Shipping & taxes calculated at checkout.</p>

        {showCheckout && checkoutUrl ? (
          <a
            href={checkoutUrl}
            className="mt-4 flex h-12 items-center justify-center rounded-full bg-fr-lime text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Checkout
          </a>
        ) : null}

        {onContinueShopping ? (
          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-2 flex w-full items-center justify-center text-sm font-medium text-fr-muted transition-colors hover:text-fr-teal"
          >
            Continue shopping
          </button>
        ) : null}

        {totalQuantity > 0 ? (
          <p className="sr-only">{totalQuantity} items in cart</p>
        ) : null}
      </footer>
    </>
  );
}
