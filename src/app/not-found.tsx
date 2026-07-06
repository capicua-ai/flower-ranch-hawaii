import Link from "next/link";
import { handleShopifyRedirects } from "@shopify/hydrogen";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SiteFooter } from "@/components/store/site-footer";
import { SiteHeader } from "@/components/store/site-header";
import { getStorefrontClient } from "@/lib/storefront";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const requestHeaders = await headers();
  const url = requestHeaders.get("x-storefront-url");

  if (url) {
    const result = await handleShopifyRedirects({
      request: new Request(url),
      storefrontClient: await getStorefrontClient(),
    });
    const location = result?.headers.get("location");
    if (location) redirect(location);
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-fr-ink">Page not found</h1>
          <p className="mt-4 text-fr-muted">The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="mt-8 inline-flex h-12 items-center rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
          >
            Back home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
