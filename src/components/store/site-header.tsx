"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Shop", href: "/products" },
  { label: "Our Story", href: "/#story" },
  { label: "Benefits", href: "/#benefits" },
  { label: "Blog", href: "/blog" },
  { label: "Wholesale", href: "/wholesale" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fr-border/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Flower Ranch Hawaii — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/fr_logo_navbar.svg" alt="" className="h-9 w-auto" />
          <span className="sr-only">Flower Ranch Hawaii</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-fr-ink/80 transition-colors hover:text-fr-teal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/account"
            aria-label="Account"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fr-ink/80 transition-colors hover:bg-fr-wash hover:text-fr-teal"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            href="/checkout"
            aria-label="Cart"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fr-ink/80 transition-colors hover:bg-fr-wash hover:text-fr-teal"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-fr-ink/80 transition-colors hover:bg-fr-wash lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-fr-border/70 bg-white px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-fr-ink/90 transition-colors hover:bg-fr-wash hover:text-fr-teal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
