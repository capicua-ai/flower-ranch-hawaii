import type { Metadata } from "next";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { CheckoutClient } from "@/components/store/checkout-client";

export const metadata: Metadata = {
  title: "Checkout — Flower Ranch Hawaii",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <CheckoutClient />
      </main>
      <SiteFooter />
    </>
  );
}
