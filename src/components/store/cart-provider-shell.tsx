"use client";

import type { CartDataFromHandlers } from "@shopify/hydrogen";

import { CartProvider } from "@/lib/cart";
import type { cartHandlers } from "@/lib/cart-handlers";
import { CartDrawer } from "@/components/store/cart-drawer";

export function CartProviderShell({
  children,
  initialCart,
}: {
  children: React.ReactNode;
  initialCart?: CartDataFromHandlers<typeof cartHandlers> | null;
}) {
  return (
    <CartProvider initialData={initialCart ?? undefined}>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
