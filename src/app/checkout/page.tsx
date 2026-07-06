import { redirect } from "next/navigation";

/** Legacy preview checkout — Shopify checkout is handled at `/checkout` via Hydrogen. */
export default function CheckoutPage() {
  redirect("/cart");
}
