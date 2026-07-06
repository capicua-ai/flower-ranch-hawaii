"use client";

import { HydrogenCartContents } from "@/components/store/hydrogen-cart-contents";

export function HydrogenCartPage() {
  return (
    <div className="flex min-h-[24rem] flex-col">
      <HydrogenCartContents showCheckout />
    </div>
  );
}
