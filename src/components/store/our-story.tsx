import Link from "next/link";
import { Leaf } from "lucide-react";
import type { DeliveryStep } from "@/lib/store-data";
import { SectionLabel } from "./section-label";
import { Grain } from "./botanical";
import { RoadmapSteps } from "./roadmap-steps";
import { InView } from "./in-view";
import { MeshBackground } from "./mesh-background";
import { HeroVideo } from "./hero-video";

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
      style={{ backgroundColor: "#fbfdf8" }}
    >
      <MeshBackground intensity={0.32} />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        {/* Header */}
        <InView className="mx-auto max-w-2xl text-center">
          <SectionLabel>Our Promise</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight text-fr-ink sm:text-5xl">
            From our orchard{" "}
            <em className="font-medium not-italic text-[#33971f]">to your table</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-fr-muted">
            Follow the journey of our Hawaiian longan — grown with care, handled with respect, and
            delivered fresh to your door.
          </p>
        </InView>

        {/* Orchard video — full width */}
        <InView
          delay={100}
          className="relative mt-12 overflow-hidden rounded-3xl ring-1 ring-fr-border/60 shadow-[0_24px_60px_-32px_rgba(0,70,85,0.4)]"
        >
          <HeroVideo
            src="/assets/placeholdervideo_v3.mp4"
            poster="/assets/hero-bg.png"
            className="aspect-[16/8] w-full object-cover"
            rate={0.9}
            playOnView
            replayDelayMs={15000}
          />
          {/* Soft-focus blur in each corner — a gentle, symmetric vignette
              that reads as intentional. The bottom-right one also dissolves the
              burned-in Gemini watermark. */}
          {[
            { k: "tl", pos: { top: 0, left: 0 }, at: "top left", blur: 4, solid: 10 },
            { k: "tr", pos: { top: 0, right: 0 }, at: "top right", blur: 4, solid: 10 },
            { k: "bl", pos: { bottom: 0, left: 0 }, at: "bottom left", blur: 4, solid: 10 },
            // Bottom-right is stronger — it has to dissolve the burned-in watermark.
            { k: "br", pos: { bottom: 0, right: 0 }, at: "bottom right", blur: 13, solid: 26 },
          ].map((c) => (
            <span
              key={c.k}
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                ...c.pos,
                width: "26%",
                height: "52%",
                backdropFilter: `blur(${c.blur}px)`,
                WebkitBackdropFilter: `blur(${c.blur}px)`,
                maskImage: `radial-gradient(at ${c.at}, #000 ${c.solid}%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(at ${c.at}, #000 ${c.solid}%, transparent 100%)`,
              }}
            />
          ))}
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-fr-teal shadow-sm backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-[#33971f]" /> Hawaiʻi, USA · Sustainably grown
          </span>
        </InView>

        {/* 5-step journey sub-header */}
        <div className="mt-16 text-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#33971f]">
            Our 5-step journey
          </span>
          <h3 className="mt-2 font-heading text-3xl font-bold tracking-tight text-fr-ink sm:text-4xl">
            From our trees <em className="font-medium not-italic text-[#33971f]">to your table</em>
          </h3>
        </div>

        {/* Roadmap: circular nodes on a flowing dashed connector, revealed in sequence */}
        <RoadmapSteps steps={steps} />

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
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
