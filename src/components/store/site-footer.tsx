import Link from "next/link";

const FOOTER_COLS = [
  {
    title: "Shop",
    links: [
      { label: "Fresh Longan", href: "/products/fresh-longan" },
      { label: "Fresh Lychee", href: "/products/fresh-lychee" },
      { label: "Dried Longan", href: "/products/dried-longan" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Process", href: "/#story" },
      { label: "Benefits", href: "/#benefits" },
      { label: "Blog", href: "/blog" },
      { label: "Wholesale (B2B)", href: "/wholesale" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#", icon: "/assets/social-instagram.svg" },
  { label: "TikTok", href: "#", icon: "/assets/social-tiktok.svg" },
  { label: "X", href: "#", icon: "/assets/social-x.svg" },
  { label: "YouTube", href: "#", icon: "/assets/social-youtube.svg" },
];

export function SiteFooter() {
  return (
    <footer className="relative bg-fr-teal text-white" style={{ marginTop: "-2.5rem", zIndex: 0 }}>
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-24 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo_web_white.svg" alt="Flower Ranch Hawaii" className="h-12 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Fresh, hand-harvested Hawaiian longan grown on the Hamakua Coast in Hilo, Hawaiʻi.
            </p>
          </div>

          <div className="flex flex-wrap gap-10 sm:gap-16">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h2 className="font-mono text-xs uppercase tracking-widest text-fr-lime">
                  {col.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-fr-lime">Follow</h2>
              <div className="mt-4 flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.icon} alt="" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <span>© 2026 Flower Ranch Hawaii. All rights reserved.</span>
          <span>Grown in Hilo, Hawaiʻi · Shipped fresh nationwide.</span>
        </div>
      </div>
    </footer>
  );
}
