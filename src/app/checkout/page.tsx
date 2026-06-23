import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";

export const metadata: Metadata = {
  title: "Checkout — Flower Ranch Hawaii",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-wash text-fr-teal">
            <ShoppingBag className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-fr-ink">Your cart is empty</h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-fr-muted">
            Add some fresh Hawaiian longan to get started. Checkout and order tracking are coming
            soon.
          </p>
          <Link
            href="/products"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Shop products
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
