import type { DeliveryStep } from "@/lib/store-data";
import { iconFor } from "@/lib/icon-map";
import { SectionLabel } from "./section-label";

/**
 * "From our tree to your table" — the supplied watercolor route illustration
 * (shipping-bg.png: Hilo orchard → flight path → your door) as the visual, with
 * the heading + "harvest to door" stat overlaid top-left and the 5 delivery
 * stops placed along the route (desktop). The image edges are feathered so it
 * fuses into the white section with no visible rectangle. On mobile the heading
 * sits above the illustration and the stops stack as a list.
 */

// Desktop stop positions along the illustrated flight path (% of the band).
const ROUTE = [
  { left: 27, top: 59 }, // on the Hilo pin
  { left: 44, top: 71 },
  { left: 57, top: 58 }, // raised so the marker clears the plane below it
  { left: 71, top: 71 },
  { left: 88, top: 64 }, // on the house pin
];

// Feather all four edges so the near-white image blends into the white section.
const EDGE_MASK =
  "linear-gradient(to right, transparent 0, #000 5%, #000 95%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 6%, #000 94%, transparent 100%)";

export function DeliveryJourney({
  steps,
  harvestTime = "3–5",
}: {
  steps: DeliveryStep[];
  harvestTime?: string;
}) {
  const heading = (
    <>
      <SectionLabel>Delivered Fresh</SectionLabel>
      <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-fr-ink lg:whitespace-nowrap xl:text-5xl">
        From our tree to your <em className="font-medium not-italic text-[#33971f]">table</em>
      </h2>
      <p className="mt-3 max-w-xs text-lg leading-relaxed text-fr-muted lg:max-w-none lg:whitespace-nowrap">
        A short journey for unmatched freshness.
      </p>
    </>
  );

  const stat = (
    <div className="inline-flex w-fit items-center gap-3 rounded-2xl bg-white/85 px-5 py-3 shadow-sm ring-1 ring-fr-border backdrop-blur">
      <span className="font-heading text-4xl font-semibold leading-none text-fr-teal">
        {harvestTime}
      </span>
      <span className="font-mono text-[11px] uppercase leading-relaxed tracking-widest text-fr-muted">
        Days · avg
        <br />
        harvest to door
      </span>
    </div>
  );

  return (
    <div>
      {/* Mobile heading (above the illustration) */}
      <div className="mb-6 lg:hidden">{heading}</div>

      {/* Illustrated route map */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/shipping-bg.png"
          alt="Illustrated route from our Hilo orchard, by air, to your doorstep"
          className="block w-full"
          style={{
            WebkitMaskImage: EDGE_MASK,
            maskImage: EDGE_MASK,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />

        {/* Soft white scrim (top-left) so the overlaid heading stays legible (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(105deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 34%, rgba(255,255,255,0) 60%)",
          }}
        />

        {/* Heading overlay (desktop, top-left) */}
        <div className="absolute left-0 top-0 hidden flex-col items-start p-10 xl:p-12 lg:flex">
          {heading}
        </div>

        {/* Stat overlay (desktop, bottom-left) — clears the Hilo pin marker */}
        <div className="absolute bottom-0 left-0 hidden p-10 xl:p-12 lg:block">{stat}</div>

        {/* Stops placed along the route (desktop) */}
        <div className="absolute inset-0 hidden lg:block">
          {steps.slice(0, 5).map((step, i) => {
            const pos = ROUTE[i] ?? ROUTE[ROUTE.length - 1];
            return (
              <div
                key={step.title}
                className="absolute isolate flex -translate-x-1/2 flex-col items-center text-center"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  width: "8.5rem",
                  // white halo so labels stay legible over any part of the art
                  textShadow:
                    "0 0 2px rgba(255,255,255,0.95), 0 1px 10px rgba(255,255,255,0.95), 0 0 16px rgba(255,255,255,0.85)",
                }}
              >
                {/* soft white glow behind the whole stop for legibility over the art */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-44 w-60 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.85) 45%, rgba(255,255,255,0) 78%)",
                  }}
                />
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-fr-lime font-mono text-[11px] font-bold text-fr-teal-deep shadow-sm ring-2 ring-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-bold leading-tight text-fr-ink">{step.title}</h3>
                <p className="mt-0.5 text-[11px] font-medium leading-snug text-fr-ink/80">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: stat + stops list */}
      <div className="lg:hidden">
        <div className="mt-6">{stat}</div>
        <ol className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
          {steps.slice(0, 5).map((step, i) => {
            const Icon = iconFor(step.icon);
            return (
              <li key={step.title} className="flex gap-4">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-fr-teal shadow-sm ring-1 ring-fr-border">
                  <Icon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-fr-lime font-mono text-[10px] font-bold text-fr-teal-deep ring-2 ring-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <div>
                  <h3 className="font-bold text-fr-ink">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-fr-muted">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
