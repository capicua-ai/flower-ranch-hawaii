import { cookies } from "next/headers";
import type { CartDataFromHandlers } from "@shopify/hydrogen";

import { cartHandlers } from "@/lib/cart-handlers";
import { getStorefrontClient } from "@/lib/storefront";

export async function getServerCart(): Promise<CartDataFromHandlers<
  typeof cartHandlers
> | null> {
  const storefrontClient = await getStorefrontClient();
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const request = new Request("http://cart.local/api/cart", {
    headers: cookieHeader ? { cookie: cookieHeader } : {},
  });

  const result = await cartHandlers.get({ storefrontClient, request });
  if (result.type !== "json") return null;
  const cart =
    result.data && typeof result.data === "object" && "cart" in result.data
      ? (result.data.cart as CartDataFromHandlers<typeof cartHandlers> | null)
      : null;
  return cart ?? null;
}
