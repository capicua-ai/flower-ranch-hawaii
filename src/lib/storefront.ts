import { headers } from "next/headers";
import { cache } from "react";
import {
  createStorefrontClient,
  createStorefrontRequestContext,
} from "@shopify/hydrogen";

const FIRST_FORWARDED_FOR_VALUE_INDEX = 0;

export const getStorefrontClient = cache(async () => {
  const requestHeaders = await headers();
  const requestContext = createStorefrontRequestContext({ headers: requestHeaders });
  const forwardedForValues = requestHeaders.get("x-forwarded-for")?.split(",");
  const buyerIp = forwardedForValues?.[FIRST_FORWARDED_FOR_VALUE_INDEX]?.trim();
  if (!buyerIp) throw new Error("buyer IP is required for private SFAPI clients");

  return createStorefrontClient({
    type: "private",
    config: {
      storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
      privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN!,
      buyerIp,
      requestContext,
      i18n: { country: "US", language: "EN" },
    },
  });
});
