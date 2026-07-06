import { createStorefrontClient } from "@shopify/hydrogen";

export const staticStorefrontClient = createStorefrontClient({
  type: "private_shared_rate_limit",
  config: {
    storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
    privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN!,
    i18n: { country: "US", language: "EN" },
  },
});
