import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { Reveal } from "@/components/store/reveal";
import { ProductCard } from "@/components/store/product-card";
import { PostCard } from "@/components/store/post-card";
import { SectionLabel } from "@/components/store/section-label";
import { Grain } from "@/components/store/botanical";
import { CountUp } from "@/components/store/count-up";
import { iconFor } from "@/lib/icon-map";
import {
  getBenefits,
  getDeliverySteps,
  getPosts,
  getProducts,
  getSiteSettings,
} from "@/lib/store-data";

/** Connector words that drop to a translucent tone in the two-tone hero headline. */
const HERO_STOPWORDS = new Set([
  "the",
  "of",
  "in",
  "a",
  "an",
  "and",
  "&",
  "to",
  "for",
  "your",
  "with",
  "our",
]);

/**
 * Two-tone hero headline (TerraElix-style): content words stay solid white,
 * connector words fade back. Stays editable — it reads whatever title comes
 * from the DB. If a title has no connectors, the interior words fade instead so
 * the rhythm still reads on short headlines.
 */
function HeroHeadline({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  const hasStop = words.some((w) => HERO_STOPWORDS.has(w.toLowerCase().replace(/[^a-z&]/g, "")));
  return (
    <>
      {words.map((word, i) => {
        const clean = word.toLowerCase().replace(/[^a-z&]/g, "");
        const faded = hasStop
          ? HERO_STOPWORDS.has(clean)
          : i !== 0 && i !== words.length - 1;
        return (
          <span key={`${word}-${i}`} className={faded ? "text-fr-lime" : "text-white"}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-1"
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
        <div className="-mt-[68px] sm:-mt-[72px]">
          <section className="relative isolate flex min-h-[112vh] flex-col overflow-hidden">
            <div className="absolute inset-0 -z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/heroimage2.png"
                alt="Fresh Hawaiian longan on the Hāmākua Coast"
                className="h-full w-full object-cover object-right"
              />
              {/* Left-weighted scrim keeps the oversized headline legible over the scene.
                  Deep teal-green (pine) keeps the foliage lush but regains teal depth/contrast. */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(11,50,43,0.92) 0%, rgba(11,50,43,0.6) 36%, rgba(11,50,43,0.2) 58%, rgba(11,50,43,0) 78%)",
                }}
              />
              {/* Top + bottom darken for nav legibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0b322b]/55 via-transparent to-[#0b322b]/80" />
            </div>

            {/* Headline → subtitle → CTAs, vertically centered in the tall hero */}
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-36 sm:px-8">
              <Reveal>
                <h1 className="max-w-4xl font-heading text-[3rem] font-semibold leading-[0.96] tracking-tight drop-shadow-sm sm:text-7xl lg:text-[5.5rem]">
                  <HeroHeadline title={settings.heroTitle} />
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/85">
                  {settings.heroSubtitle}
                </p>
              </Reveal>

              <Reveal delay={340}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link
                    href="/products"
                    className="group inline-flex h-14 items-center gap-2 rounded-full bg-fr-lime px-8 text-base font-semibold text-fr-teal-deep shadow-xl shadow-fr-teal-deep/30 transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-teal-deep [&_svg]:transition-transform group-hover:[&_svg]:-translate-y-0.5 group-hover:[&_svg]:translate-x-0.5"
                  >
                    Shop now <ArrowUpRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/#benefits"
                    className="inline-flex h-14 items-center rounded-full border border-white/40 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
                  >
                    See the benefits
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        </div>

        {/* ── BENEFITS ─────────────────────────────────────────── */}
        <section
          id="benefits"
          className="relative isolate overflow-hidden bg-fr-wash"
          style={{
            background:
              "radial-gradient(50% 45% at 10% 8%, rgba(142,216,95,0.20), transparent 60%), radial-gradient(48% 55% at 92% 16%, rgba(0,118,140,0.18), transparent 58%), radial-gradient(55% 55% at 72% 108%, rgba(59,169,52,0.16), transparent 62%), #ffffff",
          }}
        >
          <Grain opacity={0.45} />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <SectionLabel>Benefits of Longan</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                A little fruit with <em className="font-medium not-italic text-[#33971f]">big</em> benefits
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(170px,1fr)] lg:grid-flow-dense lg:grid-cols-6">
              {/* Photo anchor */}
              <div className="relative col-span-2 min-h-[210px] overflow-hidden rounded-3xl bg-fr-cream shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2 lg:row-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/longan-fruit.png"
                  alt="Fresh Hawaiian longan"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fr-teal shadow-sm backdrop-blur">
                  Single-orchard · Hilo
                </span>
              </div>

              {/* Feature benefit */}
              {benefits[0] && (
                <div className="col-span-2 flex flex-col justify-center gap-3 rounded-3xl bg-fr-teal p-7 text-white shadow-[0_18px_40px_-24px_rgba(0,70,85,0.45)] lg:col-span-4">
                  <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
                    {benefits[0].title}
                  </h3>
                  <p className="max-w-md leading-relaxed text-white/80">{benefits[0].body}</p>
                </div>
              )}

              {/* Supporting benefit tiles */}
              {benefits.slice(1, 3).map((b) => (
                <div
                  key={b.title}
                  className="fr-card-glow col-span-1 flex flex-col justify-center rounded-3xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2"
                >
                  <h3 className="font-heading text-xl font-semibold text-fr-teal">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                </div>
              ))}

              {/* Nutrition reborn as a bold stat tile */}
              <div className="col-span-2 flex flex-col justify-between gap-4 rounded-3xl bg-fr-lime p-6 text-fr-teal-deep shadow-[0_18px_40px_-24px_rgba(0,70,85,0.4)] lg:col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-fr-teal-deep">
                  Nutrition · per 100 g
                </span>
                <div>
                  <div className="flex items-baseline gap-2">
                    <CountUp
                      to={93}
                      suffix="%"
                      className="font-heading text-5xl font-semibold leading-none"
                    />
                    <span className="text-sm font-medium text-fr-teal-deep/80">Daily Vitamin C</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-fr-teal-deep/90">
                    ~60 cal · ~15 g carbs · ~8% potassium — light &amp; hydrating.
                  </p>
                </div>
              </div>

              {/* Remaining benefit tiles */}
              {benefits.slice(3).map((b) => (
                <div
                  key={b.title}
                  className="fr-card-glow col-span-1 flex flex-col justify-center rounded-3xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2"
                >
                  <h3 className="font-heading text-xl font-semibold text-fr-teal">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                </div>
              ))}
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
                <SectionLabel>Shop</SectionLabel>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  Fresh from the <em className="font-medium not-italic text-[#33971f]">orchard</em>
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fr-teal hover:text-fr-lime"
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

        {/* ── ORCHARD VIDEO (per PDF: "video of Orchard & Fruit") ── */}
        <section
          id="story"
          className="relative isolate overflow-hidden bg-fr-teal"
          style={{
            background:
              "radial-gradient(75% 80% at 12% 0%, rgba(59,169,52,0.28), transparent 55%), radial-gradient(70% 80% at 95% 8%, rgba(142,216,95,0.14), transparent 55%), radial-gradient(80% 90% at 92% 100%, rgba(0,38,46,0.75), transparent 60%), #004655",
          }}
        >
          <Grain opacity={0.7} />
          <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="mb-8 text-center">
              <SectionLabel dark>Our Orchard</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                See where your longan <em className="font-medium not-italic text-fr-lime">grows</em>
              </h2>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
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
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fr-teal shadow-sm backdrop-blur">
                Hāmākua Coast · Hawaiʻi
              </span>
            </div>
          </div>
        </section>

        {/* ── DELIVERY JOURNEY ─────────────────────────────────── */}
        <section
          className="relative isolate overflow-hidden"
          style={{
            background:
              "radial-gradient(60% 60% at 50% -10%, rgba(142,216,95,0.12), transparent 62%), radial-gradient(55% 65% at 100% 110%, rgba(0,118,140,0.12), transparent 60%), #f4fafa",
          }}
        >
          <Grain opacity={0.4} />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <SectionLabel>Delivered Fresh</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                From our tree to your <em className="font-medium not-italic text-[#33971f]">table</em>
              </h2>
            </div>
            <ol className="relative mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5">
              {/* Gradient connector running through the icon nodes (desktop) */}
              <div
                aria-hidden
                className="absolute left-[10%] right-[10%] top-10 hidden h-0.5 rounded-full bg-gradient-to-r from-fr-lime via-[#33971f] to-fr-teal lg:block"
              />
              {deliverySteps.map((step, i) => {
                const Icon = iconFor(step.icon);
                return (
                  <li key={step.title} className="group relative flex flex-col items-center text-center">
                    {/* Icon node sitting on the connector line */}
                    <div className="relative flex h-20 w-full items-center justify-center">
                      <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-fr-teal shadow-[0_12px_26px_-12px_rgba(0,70,85,0.5)] ring-1 ring-fr-border transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#33971f] group-hover:shadow-[0_18px_30px_-12px_rgba(0,70,85,0.55),0_0_22px_-6px_rgba(142,216,95,0.6)] group-hover:ring-fr-lime">
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fr-teal/70">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1.5 font-heading text-lg font-semibold text-fr-ink">
                      {step.title}
                    </h3>
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
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-3xl bg-fr-teal px-6 py-16 text-center shadow-[0_30px_60px_-30px_rgba(0,70,85,0.5)] sm:py-20">
            <div className="absolute inset-0 -z-10 opacity-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/banner.png" alt="" className="h-full w-full object-cover" />
            </div>
            {/* Subtle on-brand gradient glow (teal → lime), low-key for depth */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(110% 120% at 85% 5%, rgba(142,216,95,0.30), transparent 55%), radial-gradient(90% 120% at 10% 100%, rgba(0,118,140,0.45), transparent 60%)",
              }}
            />
            <Grain opacity={0.6} />
            <h2 className="mx-auto text-balance text-4xl font-bold tracking-tight text-white sm:whitespace-nowrap sm:text-5xl">
              Taste Hawaiʻi's freshest <em className="font-medium not-italic text-fr-lime">longan</em>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-white/80 sm:max-w-none sm:whitespace-nowrap">
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
        <section
          className="relative isolate overflow-hidden bg-fr-wash"
          style={{
            background:
              "radial-gradient(48% 50% at 90% 10%, rgba(142,216,95,0.20), transparent 58%), radial-gradient(52% 55% at 8% 30%, rgba(0,118,140,0.18), transparent 58%), radial-gradient(55% 55% at 30% 108%, rgba(59,169,52,0.16), transparent 62%), #ffffff",
          }}
        >
          <Grain opacity={0.45} />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionLabel>From the Blog</SectionLabel>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  Longan, the <em className="font-medium not-italic text-[#33971f]">Hawaiian way</em>
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-fr-teal hover:text-fr-lime"
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
