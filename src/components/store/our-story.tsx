import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import type { DeliveryStep } from "@/lib/store-data";
import { iconFor } from "@/lib/icon-map";
import { SectionLabel } from "./section-label";
import { Grain } from "./botanical";

/**
 * "From our orchard to your table" — a unified story section: heading + a
 * orchard video + the 5-step journey roadmap + a closing CTA. Replaces the
 * separate orchard-video and delivery-journey sections.
 */

export function OurStory({ steps }: { steps: DeliveryStep[] }) {
  return (
    <section
      id="story"
      className="relative isolate"
      style={{
        background:
          "radial-gradient(45% 45% at 12% 8%, rgba(142,216,95,0.16), transparent 60%), radial-gradient(45% 50% at 90% 10%, rgba(0,118,140,0.12), transparent 58%), radial-gradient(55% 55% at 80% 108%, rgba(59,169,52,0.14), transparent 62%), #f5f9ee",
      }}
    >
      <Grain opacity={0.4} />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Our Promise</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
            From our orchard{" "}
            <em className="font-medium not-italic text-[#33971f]">to your table</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-fr-muted">
            Follow the journey of our Hawaiian longan — grown with care, handled with respect, and
            delivered fresh to your door.
          </p>
        </div>

        {/* Trust row */}
        {/* Orchard video — full width */}
        <div className="relative mt-12 overflow-hidden rounded-3xl ring-1 ring-fr-border/60 shadow-[0_24px_60px_-32px_rgba(0,70,85,0.4)]">
          <video
            className="aspect-[16/8] w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/hero-bg.png"
          >
            <source src="/assets/placeholder_video.mp4" type="video/mp4" />
          </video>
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fr-teal shadow-sm backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-[#33971f]" /> Hawaiʻi, USA · Sustainably grown
          </span>
        </div>

        {/* 5-step journey sub-header */}
        <div className="mt-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#33971f]">
            Our 5-step journey
          </span>
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-fr-ink sm:text-4xl">
            From our trees <em className="font-medium not-italic text-[#33971f]">to your table</em>
          </h3>
        </div>

        {/* Roadmap: circular nodes on a wavy dashed connector (photos pending) */}
        <div className="relative mt-12">
          {/* wavy dashed connector weaving through the staggered circles (desktop) */}
          <svg
            aria-hidden
            viewBox="0 0 100 80"
            preserveAspectRatio="none"
            className="absolute hidden lg:block"
            style={{ left: "10%", width: "80%", top: "56px", height: "80px" }}
          >
            <path
              d="M0,2 C 10,2 15,78 25,78 C 35,78 40,2 50,2 C 60,2 65,78 75,78 C 85,78 90,2 100,2"
              fill="none"
              stroke="#6db33f"
              strokeWidth="2.5"
              strokeDasharray="1 7"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:items-start">
            {steps.slice(0, 5).map((step, i) => {
              const Icon = iconFor(step.icon);
              const low = i % 2 === 1; // steps 2 & 4 drop down → wave
              return (
                <li
                  key={step.title}
                  className={`group relative flex flex-col items-center text-center ${low ? "lg:mt-20" : ""}`}
                >
                  {/* Circular node — cream ring masks the connector; gray = image placeholder */}
                  <div className="relative rounded-full p-2" style={{ backgroundColor: "#f5f9ee" }}>
                    <div
                      className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full text-fr-teal shadow-[0_14px_30px_-16px_rgba(0,70,85,0.4)] ring-1 ring-white/50 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:text-[#33971f] group-hover:shadow-[0_18px_36px_-12px_rgba(142,216,95,0.7)] group-hover:ring-2 group-hover:ring-fr-lime"
                      style={{
                        background:
                          "radial-gradient(115% 115% at 32% 22%, #f5fdea 0%, #e4f2d7 48%, #cfe4c4 100%)",
                      }}
                    >
                      <Icon className="h-10 w-10" />
                    </div>
                  </div>
                  <h3 className="mt-4 flex items-baseline justify-center gap-1.5 font-heading text-base font-bold text-fr-teal">
                    <span className="font-mono text-sm font-bold text-[#33971f]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-1 max-w-[12rem] text-sm leading-relaxed text-fr-muted">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Closing CTA — floats on the story field (no separate color band) */}
        <div className="relative isolate mt-20 overflow-hidden rounded-[2rem] bg-fr-teal px-6 py-16 text-center shadow-[0_50px_100px_-30px_rgba(0,70,85,0.55),0_18px_40px_-22px_rgba(0,70,85,0.4)] ring-1 ring-white/10 sm:py-20">
          {/* Orchard + arcs artwork, low-key over the teal */}
          <div className="absolute inset-0 -z-10" style={{ opacity: 0.2 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/banner.png" alt="" className="h-full w-full object-cover" />
          </div>
          {/* Subtle on-brand gradient glow (teal → lime) for depth */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(110% 120% at 85% 5%, rgba(142,216,95,0.30), transparent 55%), radial-gradient(90% 120% at 10% 100%, rgba(0,118,140,0.45), transparent 60%)",
            }}
          />
          <Grain opacity={0.6} />
          <h2 className="mx-auto text-balance font-heading text-4xl font-bold tracking-tight text-white sm:whitespace-nowrap sm:text-5xl">
            The <em className="font-medium not-italic text-fr-lime">best</em>{" "}
            longan you&apos;ll ever taste
          </h2>
          <div className="mt-9 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime [&_svg]:transition-transform hover:[&_svg]:translate-x-1"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
