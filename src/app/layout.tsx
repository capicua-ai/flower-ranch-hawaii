import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/store/cart-context";
import { CartDrawer } from "@/components/store/cart-drawer";
import { SmoothAnchors } from "@/components/store/smooth-anchors";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Editorial display serif for headings (warm, high-contrast — premium DTC feel).
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
});

const SITE_TITLE = "Flower Ranch Hawaii — Fresh Hawaiian Longan";
const SITE_DESCRIPTION =
  "Fresh, hand-harvested Hawaiian longan grown on the Hamakua Coast. Shop fresh longan and lychee, or partner with us for premium wholesale supply.";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        {/* Mark JS as available so scroll-reveal hiding only applies with JS on
            (prevents content being stuck hidden for no-JS/crawlers). */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
        <SmoothAnchors />
      </body>
    </html>
  );
}
