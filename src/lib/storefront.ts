import { headers } from "next/headers";
import { cache } from "react";
import {
  createStorefrontClient,
  createStorefrontRequestContext,
} from "@shopify/hydrogen";
import { getBuyerIp } from "@/lib/buyer-ip";

export const getStorefrontClient = cache(async () => {
  const requestHeaders = await headers();
  const requestContext = createStorefrontRequestContext({ headers: requestHeaders });

  return createStorefrontClient({
    type: "private",
    config: {
      storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
      privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN!,
      buyerIp: getBuyerIp(requestHeaders),
      requestContext,
      i18n: { country: "US", language: "EN" },
    },
  });
});
