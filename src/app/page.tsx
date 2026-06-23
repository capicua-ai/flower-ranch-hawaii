import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { Reveal } from "@/components/store/reveal";
import { ProductCard } from "@/components/store/product-card";
import { PostCard } from "@/components/store/post-card";
import { iconFor } from "@/lib/icon-map";
import {
  getBenefits,
  getDeliverySteps,
  getPosts,
  getProducts,
  getSiteSettings,
} from "@/lib/store-data";

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

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(170px,1fr)] lg:grid-flow-dense lg:grid-cols-6">
              {/* Photo anchor */}
              <div className="relative col-span-2 min-h-[210px] overflow-hidden rounded-3xl bg-fr-cream ring-1 ring-fr-border/60 lg:col-span-2 lg:row-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/longan-fruit.png"
                  alt="Fresh Hawaiian longan"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fr-forest shadow-sm backdrop-blur">
                  Single-orchard · Hilo
                </span>
              </div>

              {/* Feature benefit */}
              {benefits[0] &&
                (() => {
                  const Icon = iconFor(benefits[0].icon);
                  return (
                    <div className="col-span-2 flex flex-col justify-between gap-5 rounded-3xl bg-fr-forest p-7 text-white lg:col-span-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-fr-green-soft">
                        <Icon className="h-6 w-6" />
                      </span>
                      <div>
                        <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
                          {benefits[0].title}
                        </h3>
                        <p className="mt-2 max-w-md leading-relaxed text-white/80">
                          {benefits[0].body}
                        </p>
                      </div>
                    </div>
                  );
                })()}

              {/* Supporting benefit tiles */}
              {benefits.slice(1, 3).map((b) => {
                const Icon = iconFor(b.icon);
                return (
                  <div
                    key={b.title}
                    className="col-span-1 rounded-3xl bg-white p-6 ring-1 ring-fr-border/60 lg:col-span-2"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fr-green/15 text-fr-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fr-ink">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                  </div>
                );
              })}

              {/* Nutrition reborn as a bold stat tile */}
              <div className="col-span-2 flex flex-col justify-between gap-4 rounded-3xl bg-fr-green p-6 text-white lg:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/85">
                  Nutrition · per 100 g
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl font-semibold leading-none">93%</span>
                    <span className="text-sm font-medium text-white/90">Daily Vitamin C</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-white/85">
                    ~60 cal · ~15 g carbs · ~8% potassium — light &amp; hydrating.
                  </p>
                </div>
              </div>

              {/* Remaining benefit tiles */}
              {benefits.slice(3).map((b) => {
                const Icon = iconFor(b.icon);
                return (
                  <div
                    key={b.title}
                    className="col-span-1 rounded-3xl bg-white p-6 ring-1 ring-fr-border/60 lg:col-span-2"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-fr-green/15 text-fr-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-semibold text-fr-ink">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                  </div>
                );
              })}
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

        {/* ── ORCHARD STORY ────────────────────────────────────── */}
        <section id="story" className="bg-fr-cream">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-fr-forest/70">
                Our Orchard
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                Five decades on the same volcanic ridge
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fr-muted">
                What you taste is volcanic mineral, ocean trade winds, and the patience of a family
                that refuses to scale beyond what the land can carry.
              </p>
              <p className="mt-4 leading-relaxed text-fr-muted">
                Every cluster is picked by hand at peak ripeness, then packed and shipped within a
                day — so it reaches you tasting like the ridge it grew on.
              </p>
              <dl className="mt-8 grid max-w-md grid-cols-3 gap-6">
                {[
                  { v: "50+", l: "Years family farming" },
                  { v: "1", l: "Single orchard, Hilo" },
                  { v: "100%", l: "Hand-harvested" },
                ].map((s) => (
                  <div key={s.l}>
                    <dd className="font-heading text-3xl font-semibold text-fr-forest sm:text-4xl">
                      {s.v}
                    </dd>
                    <dt className="mt-1 text-xs leading-snug text-fr-muted">{s.l}</dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-fr-border/70 shadow-lg shadow-fr-forest/10">
              <video
                className="aspect-[4/5] w-full object-cover sm:aspect-square lg:aspect-[4/5]"
                autoPlay
                muted
                loop
                playsInline
                poster="/assets/hero-bg.png"
              >
                <source src="/assets/Hero video-2.mp4" type="video/mp4" />
              </video>
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fr-forest shadow-sm backdrop-blur">
                Hāmākua Coast · Hawaiʻi
              </span>
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
            <ol className="relative mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-x-6">
              {/* Connector line through the icons (desktop) */}
              <div
                aria-hidden
                className="absolute inset-x-[10%] top-8 hidden border-t border-dashed border-fr-border lg:block"
              />
              {deliverySteps.map((step, i) => {
                const Icon = iconFor(step.icon);
                return (
                  <li key={step.title} className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-fr-green text-white shadow-sm shadow-fr-forest/20 ring-4 ring-white">
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="mt-5 font-heading text-3xl font-semibold leading-none text-fr-forest/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-semibold text-fr-ink">{step.title}</h3>
                    <p className="mx-auto mt-1.5 max-w-[13rem] text-sm leading-relaxed text-fr-muted">
                      {step.body}
                    </p>
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
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
