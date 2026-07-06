import {
  createStorefrontClient,
  createStorefrontRequestContext,
  handleShopifyRoutes,
} from "@shopify/hydrogen";
import { withSoupedAuth } from "@souped-tools/auth-nextjs/proxy";
import { NextResponse, type NextRequest } from "next/server";

import { cartHandlers } from "@/lib/cart-handlers";
import { getBuyerIp } from "@/lib/buyer-ip";

async function handleHydrogenRoutes(request: NextRequest) {
  const requestContext = createStorefrontRequestContext(request);
  const storefrontClient = createStorefrontClient({
    type: "private",
    config: {
      storeDomain: process.env.PUBLIC_STORE_DOMAIN!,
      privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN!,
      buyerIp: getBuyerIp(request.headers),
      requestContext,
      i18n: { country: "US", language: "EN" },
    },
  });

  try {
    const shopifyRoute = await handleShopifyRoutes({
      request,
      storefrontClient,
      handlers: [cartHandlers],
    });
    if (shopifyRoute) return shopifyRoute;
  } catch (error) {
    console.error("[hydrogen] Route handler failed", error);
    return NextResponse.json(
      {
        error: {
          code: "shopify_route_failed",
          message: error instanceof Error ? error.message : "Shopify route failed",
        },
      },
      { status: 500 },
    );
  }

  const requestHeaders = requestContext.getForwardedRequestHeaders();
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  requestContext.applyResponseHeaders(response.headers);
  return response;
}

export const proxy = withSoupedAuth(
  {
    publicRoutes: [
      "/",
      "/account/login",
      "/products",
      "/products/:path*",
      "/blog",
      "/blog/:path*",
      "/wholesale",
      "/cart",
      "/checkout",
      "/api/cart",
      "/api/:version/graphql.json",
      "/assets/:path*",
      "/favicon.svg",
    ],
  },
  handleHydrogenRoutes,
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
