import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { Reveal } from "@/components/store/reveal";
import { ProductCard } from "@/components/store/product-card";
import { iconFor } from "@/lib/icon-map";
import {
  getBenefits,
  getDeliverySteps,
  getPosts,
  getProducts,
  getSiteSettings,
} from "@/lib/store-data";

const NUTRITION = [
  { label: "Calories", value: "~60" },
  { label: "Carbohydrates", value: "~15 g" },
  { label: "Vitamin C", value: "84–93% DV" },
  { label: "Potassium", value: "~8% DV" },
];

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-green px-7 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-green [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1"
    >
      {children}
    </Link>
  );
}

export default async function Home() {
  const [settings, products, benefits, deliverySteps, posts] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    getBenefits(),
    getDeliverySteps(),
    getPosts(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        {/* Negative margin pulls the hero up under the floating nav so the
            photo bleeds to the very top edge. */}
        <div className="-mt-[68px] bg-fr-wash sm:-mt-[72px]">
          <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden rounded-b-[2rem] sm:rounded-b-[2.75rem]">
            <div className="absolute inset-0 -z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/hero-bg.png"
                alt=""
                className="h-full w-full scale-105 object-cover"
              />
              {/* Cinematic gradient: dark top (nav legibility), open middle, deep bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-fr-forest-deep/80 via-fr-forest/25 to-fr-forest-deep/95" />
              {/* Soft centered scrim so the headline stays crisp over busy imagery */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(62% 55% at 50% 48%, rgba(12,46,10,0.55), transparent 76%)",
                }}
              />
            </div>

            {/* Badge stamp accent (decorative) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/badge.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-6 top-28 hidden w-28 rotate-[-14deg] opacity-90 drop-shadow-xl lg:block xl:right-12 xl:w-36"
            />

            <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pb-16 pt-28 text-center sm:px-8">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white backdrop-blur">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-fr-green" />
                  {settings.heroBadge}
                </span>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="mt-6 max-w-4xl text-balance text-[2.75rem] font-bold leading-[1.02] tracking-tight text-white drop-shadow-sm sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                  {settings.heroTitle}
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                  {settings.heroSubtitle}
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <PrimaryButton href="/products">
                    Shop now <ArrowRight className="h-4 w-4" />
                  </PrimaryButton>
                  <Link
                    href="/#benefits"
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                  >
                    Health benefits
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={480}>
                <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 sm:gap-x-5">
                  <li>Hand-harvested</li>
                  <li aria-hidden className="text-fr-green">
                    •
                  </li>
                  <li>USDA Grade A</li>
                  <li aria-hidden className="text-fr-green">
                    •
                  </li>
                  <li>Ships in 2 days</li>
                </ul>
              </Reveal>
            </div>

            {/* Scroll cue */}
            <a
              href="/#benefits"
              aria-label="Scroll to benefits"
              className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-white/70 transition-colors hover:text-white sm:block"
            >
              <ChevronDown className="h-6 w-6 motion-safe:animate-bounce" />
            </a>
          </section>
        </div>

        {/* ── BENEFITS ─────────────────────────────────────────── */}
        <section id="benefits" className="bg-fr-wash">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                Benefits of Longan
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                A little fruit with <em className="not-italic text-fr-forest">big</em> benefits
              </h2>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <ul className="grid gap-3 sm:grid-cols-2">
                {benefits.map((b) => {
                  const Icon = iconFor(b.icon);
                  return (
                    <li
                      key={b.title}
                      className="flex gap-4 rounded-2xl border border-fr-border bg-white p-5"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fr-green/20 text-fr-forest">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-fr-ink">{b.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-2xl bg-fr-forest p-7 text-white">
                <h3 className="font-mono text-xs uppercase tracking-widest text-fr-green">
                  Nutritional Profile
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  Fresh longan is light and hydrating. A typical 100 g serving offers roughly:
                </p>
                <dl className="mt-5 divide-y divide-white/15">
                  {NUTRITION.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-3">
                      <dt className="text-sm text-white/75">{label}</dt>
                      <dd className="font-mono text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-fr-muted">
              Disclaimer: Not intended to diagnose, treat, cure, or prevent any disease. Nutritional
              values are approximate. Sources: WebMD, Health.com.
            </p>
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                  Shop
                </span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  Fresh from the orchard
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fr-forest hover:text-fr-green"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* ── ORCHARD VIDEO ────────────────────────────────────── */}
        <section id="story" className="bg-fr-cream">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                Our Orchard
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                Five decades on the same volcanic ridge
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-fr-muted">
                What you taste is volcanic mineral, ocean trade winds, and the patience of a family
                that refuses to scale beyond what the land can carry.
              </p>
            </div>
            <div className="mt-12 overflow-hidden rounded-3xl border border-fr-border shadow-sm">
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/hero-bg.png"
              >
                <source src="/assets/Hero video-2.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* ── DELIVERY JOURNEY ─────────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                Delivered Fresh
              </span>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                From our tree to your table
              </h2>
            </div>
            <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {deliverySteps.map((step, i) => {
                const Icon = iconFor(step.icon);
                return (
                  <li key={step.title} className="relative flex flex-col items-center text-center">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-wash text-fr-forest">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="mt-4 font-mono text-xs text-fr-green">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-semibold text-fr-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fr-muted">{step.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────── */}
        <section className="bg-white px-5 pb-20 sm:px-8">
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-fr-forest px-6 py-16 text-center sm:py-20">
            <div className="absolute inset-0 -z-10 opacity-25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/banner.png" alt="" className="h-full w-full object-cover" />
            </div>
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Taste Hawaiʻi's freshest longan
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">
              Limited seasonal harvest. Order now and we ship within days of picking.
            </p>
            <div className="mt-8 flex justify-center">
              <PrimaryButton href="/products">
                Shop now <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </div>
          </div>
        </section>

        {/* ── BLOG TEASER ──────────────────────────────────────── */}
        <section className="bg-fr-wash">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                  From the Blog
                </span>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  Longan, the Hawaiian way
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fr-forest hover:text-fr-green"
              >
                All articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-fr-border bg-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-fr-forest/10"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold leading-snug text-fr-ink group-hover:text-fr-forest">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fr-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fr-forest group-hover:text-fr-green">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
