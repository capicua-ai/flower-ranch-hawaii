"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "./cart-context";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Our Story", href: "/#story" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Blog", href: "/blog" },
  // Wholesale (B2B) route exists at /wholesale but is hidden from nav for now.
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        {/* Floating pill */}
        <nav className="relative flex h-14 items-center justify-between gap-3 rounded-full border border-fr-border/70 bg-white/85 pl-5 pr-3 shadow-lg shadow-black/5 backdrop-blur-xl">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Flower Ranch Hawaii — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/fr_logo_navbar.svg" alt="" className="h-10 w-auto" />
            <span className="sr-only">Flower Ranch Hawaii</span>
          </Link>

          <div
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
            role="navigation"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-fr-ink/75 transition-colors hover:text-fr-lime"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/account"
              aria-label="Account"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fr-ink/75 transition-colors hover:bg-fr-wash hover:text-fr-lime"
            >
              <User className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart${count > 0 ? ` (${count} items)` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-fr-ink/75 transition-colors hover:bg-fr-wash hover:text-fr-lime"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-fr-lime px-1 text-[11px] font-bold text-fr-teal-deep">
                  {count}
                </span>
              )}
            </button>
            <Link
              href="/products"
              className="ml-1 hidden h-10 items-center rounded-full bg-fr-lime px-5 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex"
            >
              Shop now
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
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-fr-ink/90 transition-colors hover:bg-fr-wash hover:text-fr-lime"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-full bg-fr-lime px-3 py-3 text-center text-base font-semibold text-fr-teal-deep"
                >
                  Shop now
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
