import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Leaf, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { SiteHeader } from "@/components/store/site-header";
import { SiteFooter } from "@/components/store/site-footer";
import { SectionLabel } from "@/components/store/section-label";
import { CountUp } from "@/components/store/count-up";
import { MeshBackground } from "@/components/store/mesh-background";

export const metadata: Metadata = {
  title: "Wholesale Longan — Flower Ranch Hawaii",
  description:
    "Partner with Hawaiʻi's premier longan orchard. Premium, Grade A fresh longan for grocers, distributors, and specialty retailers. Request wholesale pricing.",
};

const STATS = [
  { to: 300, suffix: "K", unit: "LBS", label: "Annual capacity" },
  { to: 50, suffix: "+", unit: "YEARS", label: "Family farming" },
  { to: 20, prefix: "+$", unit: "/ LB", label: "Retail ceiling" },
];

const SPECS = [
  { label: "Package", value: "1 qt fresh-fruit box" },
  { label: "Net weight", value: "1 lb / box" },
  { label: "Case pack", value: "12 boxes / case" },
  { label: "Shelf life", value: "14 days cold-chain" },
  { label: "Irradiation", value: "USDA APHIS approved" },
  { label: "MOQ", value: "10 cases (120 lb)" },
  { label: "Lead time", value: "5–9 days post-harvest" },
  { label: "Origin", value: "Hilo, Hawaiʻi · single-orchard" },
];

const QUALITY = [
  { icon: ClipboardCheck, n: "01", title: "Harvest Scheduling", body: "We coordinate harvest windows in advance so your supply cycle aligns with our peak-season yields." },
  { icon: ShieldCheck, n: "02", title: "USDA Irradiation", body: "All fruit bound for the U.S. mainland undergoes mandatory USDA irradiation treatment, batched per cycle." },
  { icon: Leaf, n: "03", title: "Premium Packaging", body: "Full-color 1 lb, 12-case retail boxes. Shelf-ready for premium grocery and specialty retail." },
  { icon: Snowflake, n: "04", title: "Cold Chain & Shipping", body: "Temperature-managed transit to your distribution center or store floor via established freight partners." },
];

const VALUES = [
  { title: "Stewardship", body: "Protecting the land, honoring the legacy, and growing responsibly." },
  { title: "Community", body: "Partnering with workers, buyers, families, and CSA supporters." },
  { title: "Clarity", body: "Removing ambiguity — building a premium, transparent, careful brand." },
];

export default function WholesalePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative isolate -mt-[68px] overflow-hidden sm:-mt-[72px]">
          <div className="absolute inset-0 -z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/wholesalehero.png" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-fr-teal/85 via-fr-teal/65 to-fr-teal-deep/95" />
          </div>
          <div className="mx-auto max-w-7xl px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 font-mono text-xs uppercase tracking-widest text-white backdrop-blur">
              For Wholesale Buyers
            </span>
            <h1 className="mt-5 max-w-3xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Hawaiʻi's premier longan{" "}
              <em className="font-medium not-italic text-fr-lime">orchard</em>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
              We supply wholesale buyers and partners with Hawaiʻi's first premium longan — backed by
              a story no import brand can match.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105"
              >
                Request wholesale pricing <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#product"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                See specs
              </Link>
            </div>
          </div>
        </section>

        {/* ── OPPORTUNITY + STATS ──────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <SectionLabel>The Opportunity</SectionLabel>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  There's a business opportunity in{" "}
                  <em className="font-medium not-italic text-[#33971f]">longan</em>
                </h2>
              </div>
              <div>
                <p className="text-xl font-semibold text-fr-ink">
                  Longan is where matcha was a decade ago.
                </p>
                <p className="mt-3 leading-relaxed text-fr-muted">
                  The global search for longan is growing, and U.S. consumers already pay $12–$20/lb
                  for comparable tropical fruits. With 50+ years of farming heritage and the scale to
                  reliably supply your business, Flower Ranch Hawaii is the partner to secure before
                  competitors do.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-fr-border bg-fr-border sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2 bg-white px-6 py-10">
                  <p className="flex items-baseline gap-1">
                    <CountUp
                      to={s.to}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      className="text-5xl font-bold text-fr-teal"
                    />
                    <span className="font-mono text-sm font-medium text-fr-teal">{s.unit}</span>
                  </p>
                  <p className="text-sm text-fr-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MARQUEE ──────────────────────────────────────────── */}
        <div className="overflow-hidden bg-fr-lime py-4">
          <p className="text-center font-mono text-sm font-medium uppercase tracking-widest text-fr-teal-deep">
            Craft · Transparency · Hawaiian-grown · Regenerative · Single-orchard · Cold-chain
          </p>
        </div>

        {/* ── PRODUCT SPECS ────────────────────────────────────── */}
        <section id="product" className="bg-fr-teal">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Image product stack.png"
                alt="Flower Ranch longan retail packaging"
                className="w-full object-cover"
                style={{ aspectRatio: "4 / 5" }}
              />
            </div>
            <div>
              <SectionLabel dark>The Product</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Fresh longan, sized for serious <em className="font-medium not-italic text-fr-lime">buyers</em>
              </h2>
              <p className="mt-4 leading-relaxed text-white/80">
                Hand-harvested clusters, cold-chain handled within four hours of pick, USDA-irradiated
                and batch-shipped in branded fresh-fruit boxes. Available in case packs for grocers,
                distributors, and specialty retailers.
              </p>
              <dl className="mt-8 divide-y divide-white/15 border-t border-white/15">
                {SPECS.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-3.5">
                    <dt className="text-sm text-white/65">{spec.label}</dt>
                    <dd className="font-mono text-sm font-medium text-white">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── QUALITY ──────────────────────────────────────────── */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <SectionLabel>The Quality</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                Every step is visible and <em className="font-medium not-italic text-[#33971f]">accountable</em>
              </h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {QUALITY.map(({ icon: Icon, n, title, body }) => (
                <div key={n} className="flex gap-5 rounded-3xl bg-white p-7 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fr-wash text-fr-teal">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-medium text-[#33971f]">{n}</span>
                    <h3 className="mt-0.5 text-lg font-bold text-fr-ink">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fr-muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────── */}
        <section className="relative isolate overflow-hidden" style={{ backgroundColor: "#f7faf0" }}>
          <MeshBackground />
          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <SectionLabel>The Values</SectionLabel>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                  Why choose <em className="font-medium not-italic text-[#33971f]">Flower Ranch Hawaii</em>?
                </h2>
                <p className="mt-4 leading-relaxed text-fr-muted">
                  Our longan is organically grown and carefully harvested, ensuring every piece
                  delivers exceptional flavor and freshness — straight from the volcanic soils of
                  Hawaiʻi.
                </p>
              </div>
              <div className="flex flex-col gap-5">
                {VALUES.map((v) => (
                  <div key={v.title} className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60">
                    <h3 className="text-xl font-bold text-fr-teal">{v.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-fr-muted">{v.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT FORM ─────────────────────────────────────── */}
        <section id="contact" className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2">
            <div>
              <SectionLabel>The Next Step</SectionLabel>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
                Let's cultivate something lasting <em className="font-medium not-italic text-[#33971f]">together</em>
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-fr-muted">
                Tell us about your buying program and we'll route you to Hawaiʻi's premier longan
                orchard.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fr-teal">
                <Truck className="h-4 w-4" /> Local & mainland freight available
              </p>
            </div>

            <form className="flex flex-col gap-4 rounded-3xl bg-fr-cream p-7 shadow-[0_18px_40px_-24px_rgba(0,70,85,0.35)] ring-1 ring-fr-border/60">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-fr-ink">Full name</label>
                <input id="name" name="name" type="text" autoComplete="name" className="h-12 rounded-full border border-fr-border bg-white px-5 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-sm font-medium text-fr-ink">Company / organization</label>
                <input id="company" name="company" type="text" autoComplete="organization" className="h-12 rounded-full border border-fr-border bg-white px-5 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-fr-ink">Work email</label>
                <input id="email" name="email" type="email" autoComplete="email" className="h-12 rounded-full border border-fr-border bg-white px-5 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="businessType" className="text-sm font-medium text-fr-ink">Business type</label>
                  <select id="businessType" name="businessType" defaultValue="" className="h-12 rounded-full border border-fr-border bg-white px-4 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30">
                    <option value="" disabled>Select…</option>
                    <option>Grocery / Retail</option>
                    <option>Food Distributor</option>
                    <option>Food Service / Restaurant</option>
                    <option>Specialty / Natural</option>
                    <option>eCommerce / DTC</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="volume" className="text-sm font-medium text-fr-ink">Estimated volume</label>
                  <select id="volume" name="volume" defaultValue="" className="h-12 rounded-full border border-fr-border bg-white px-4 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30">
                    <option value="" disabled>Select…</option>
                    <option>1–5 cases</option>
                    <option>5–20 cases</option>
                    <option>20–100 cases</option>
                    <option>100+ cases</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-fr-ink">What are you looking for?</label>
                <textarea id="message" name="message" rows={4} className="rounded-2xl border border-fr-border bg-white px-5 py-3 text-fr-ink outline-none transition focus:border-fr-teal focus:ring-2 focus:ring-fr-lime/30" />
              </div>
              <button
                type="submit"
                className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep transition-all hover:-translate-y-0.5 hover:brightness-105"
              >
                Send inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
