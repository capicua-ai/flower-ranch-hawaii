"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

/**
 * Dedicated navbar for the standalone Wholesale (B2B) page. Same floating-pill
 * style as the DTC SiteHeader, but the links are in-page anchors to the
 * wholesale sections, and the primary CTA crosses over to the DTC store.
 */
const WS_NAV = [
  { label: "Opportunity", href: "#opportunity" },
  { label: "Story", href: "#story" },
  { label: "Product", href: "#product" },
  { label: "Quality", href: "#quality" },
  { label: "Values", href: "#values" },
  { label: "Contact", href: "#contact" },
];

export function WholesaleHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <nav className="relative flex h-14 items-center justify-between gap-3 rounded-full border border-fr-border/70 bg-white/85 pl-5 pr-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          <Link
            href="/wholesale"
            className="flex shrink-0 items-center"
            aria-label="Flower Ranch Hawaii — wholesale"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo_web_blacktext.svg" alt="" className="h-10 w-auto" />
            <span className="sr-only">Flower Ranch Hawaii wholesale</span>
          </Link>

          <div
            className="hidden items-center gap-6 lg:ml-auto lg:mr-6 lg:flex"
            role="navigation"
            aria-label="Wholesale"
          >
            {WS_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-fr-ink/75 transition-colors hover:text-fr-teal"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/products"
              className="group ml-1 hidden h-10 items-center gap-2 rounded-full bg-fr-lime px-5 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex [&_svg]:transition-transform group-hover:[&_svg]:translate-x-0.5"
            >
              See our products <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fr-ink/75 transition-colors hover:bg-fr-wash lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <nav
            className="mt-2 rounded-3xl border border-fr-border/70 bg-white/95 p-3 shadow-lg shadow-black/5 backdrop-blur-xl lg:hidden"
            aria-label="Wholesale mobile"
          >
            <ul className="flex flex-col gap-1">
              {WS_NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-fr-ink/90 transition-colors hover:bg-fr-wash hover:text-fr-teal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-full bg-fr-lime px-3 py-3 text-center text-base font-semibold text-fr-teal-deep"
                >
                  See our products
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
