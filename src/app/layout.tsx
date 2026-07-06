import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProviderShell } from "@/components/store/cart-provider-shell";
import { SmoothAnchors } from "@/components/store/smooth-anchors";
import { getServerCart } from "@/lib/get-server-cart";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const SITE_TITLE = "Flower Ranch Hawaii — Fresh Hawaiian Longan";
const SITE_DESCRIPTION =
  "Fresh, hand-harvested Hawaiian longan grown on the Hamakua Coast. Shop fresh longan and lychee, or partner with us for premium wholesale supply.";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/assets/logo.png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Flower Ranch Hawaii",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/assets/Opengraph.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/Opengraph.jpg"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialCart = await getServerCart();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="module"
          src="https://cdn.shopify.com/storefront/standard-actions.js"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <CartProviderShell initialCart={initialCart ?? undefined}>{children}</CartProviderShell>
        <SmoothAnchors />
      </body>
    </html>
  );
}
