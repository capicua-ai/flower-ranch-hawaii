import type { Metadata } from "next";
import Link from "next/link";

import { HydrogenCartPage } from "@/components/store/hydrogen-cart-page";
import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";

export const metadata: Metadata = {
  title: "Cart — Flower Ranch Hawaii",
};

export const dynamic = "force-dynamic";

export default async function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
          <Link
            href="/products"
            className="text-sm font-medium text-fr-muted transition-colors hover:text-fr-teal"
          >
            Continue shopping
          </Link>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-fr-ink">Your cart</h1>
          <div className="mt-8 rounded-3xl border border-fr-border bg-white shadow-sm">
            <HydrogenCartPage />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
