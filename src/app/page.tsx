import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { Reveal } from "@/components/store/reveal";
import { ProductCard } from "@/components/store/product-card";
import { PostCard } from "@/components/store/post-card";
import { SectionLabel } from "@/components/store/section-label";
import { CountUp } from "@/components/store/count-up";
import { OurStory } from "@/components/store/our-story";
import { HeroVideo } from "@/components/store/hero-video";
import { InView } from "@/components/store/in-view";
import { MeshBackground } from "@/components/store/mesh-background";
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
              <HeroVideo
                className="h-full w-full scale-105 object-cover object-right blur-[0.25px]"
                src="/assets/hero_video2_loop.mp4"
                poster="/assets/heroimage2.png"
                rate={0.65}
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
                    Shop now
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
          className="relative isolate overflow-hidden"
          style={{ backgroundColor: "#f7faf0" }}
        >
          <MeshBackground />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <InView className="max-w-2xl">
              <SectionLabel>Benefits of Longan</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                A little fruit with <em className="font-medium not-italic text-[#33971f]">big</em> benefits
              </h2>
            </InView>

            <InView delay={120} className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(140px,1fr)] lg:grid-flow-dense lg:grid-cols-6">
              {/* Photo anchor */}
              <div className="relative col-span-2 min-h-[210px] overflow-hidden rounded-3xl bg-fr-cream shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2 lg:row-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/longan-fruit.png"
                  alt="Fresh Hawaiian longan"
                  className="h-full w-full object-cover"
                />
                <Link
                  href="/products"
                  className="group/cta absolute inset-x-4 bottom-4 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-6 text-sm font-semibold text-fr-teal-deep shadow-lg transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime [&_svg]:transition-transform group-hover/cta:[&_svg]:translate-x-1"
                >
                  Shop now
                </Link>
              </div>

              {/* Feature benefit */}
              {benefits[0] && (
                <div className="col-span-2 flex flex-col justify-center gap-3 rounded-3xl bg-fr-teal p-7 text-white shadow-[0_18px_40px_-24px_rgba(0,70,85,0.45)] lg:col-span-4">
                  <h3 className="font-heading text-2xl font-semibold sm:text-3xl">
                    {benefits[0].title}
                  </h3>
                        <p className="mt-3 max-w-md leading-relaxed text-white/80">
                          {/* glue the last two words so the line never ends on a lone word (widow) */}
                          {benefits[0].body.replace(/\s+(\S+)\s*$/, " $1")}
                  </p>
                </div>
              )}

              {/* Supporting benefit tiles */}
              {benefits.slice(1, 3).map((b) => (
                <div
                  key={b.title}
                  className="fr-card-glow col-span-1 flex flex-col justify-center rounded-3xl p-6 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2"
                  style={{ background: "linear-gradient(155deg, #ffffff 0%, #eef6e4 100%)" }}
                >
                  <h3 className="font-heading text-2xl font-semibold text-fr-teal">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                </div>
              ))}

              {/* Nutrition — four equal stats, each counts up on view */}
              <div className="col-span-2 flex flex-col gap-4 rounded-3xl bg-fr-teal p-6 text-white shadow-[0_18px_40px_-24px_rgba(0,70,85,0.4)] lg:col-span-2">
                <span className="font-mono text-xs uppercase tracking-wider text-fr-lime">
                  Nutrition · per 100 g
                </span>
                <div className="grid flex-1 grid-cols-2 gap-y-1">
                  {[
                    { to: 93, suffix: "%", label: "Daily Vitamin C" },
                    { to: 60, prefix: "~", label: "Calories" },
                    { to: 15, suffix: "g", label: "Carbs" },
                    { to: 8, suffix: "%", label: "Potassium DV" },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className="flex flex-col items-center py-2.5 text-center"
                      style={{
                        borderLeft:
                          i % 2 === 1 ? "1px solid rgba(255,255,255,0.15)" : undefined,
                      }}
                    >
                      <CountUp
                        to={s.to}
                        prefix={s.prefix}
                        suffix={s.suffix}
                        className="font-heading text-4xl font-semibold leading-none"
                      />
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-white/60">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Remaining benefit tiles */}
              {benefits.slice(3).map((b) => (
                <div
                  key={b.title}
                  className="fr-card-glow col-span-1 flex flex-col justify-center rounded-3xl p-6 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60 lg:col-span-2"
                  style={{ background: "linear-gradient(155deg, #ffffff 0%, #eef6e4 100%)" }}
                >
                  <h3 className="font-heading text-2xl font-semibold text-fr-teal">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fr-muted">{b.body}</p>
                </div>
              ))}
            </InView>

            <p className="mt-8 text-xs leading-relaxed text-fr-muted lg:whitespace-nowrap">
              Disclaimer: Not intended to diagnose, treat, cure, or prevent any disease. Nutritional
              values are approximate. Sources: WebMD, Health.com.
            </p>
          </div>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <InView className="flex flex-wrap items-end justify-between gap-4">
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
            </InView>

            <InView delay={120} className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </InView>
          </div>
        </section>

        {/* ── OUR STORY (orchard video + journey, unified) ─────── */}
        <OurStory steps={deliverySteps} />

        {/* ── BLOG TEASER ──────────────────────────────────────── */}
        <section className="bg-white">
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <InView className="flex flex-wrap items-end justify-between gap-4">
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
            </InView>

            <InView delay={120} className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </InView>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
