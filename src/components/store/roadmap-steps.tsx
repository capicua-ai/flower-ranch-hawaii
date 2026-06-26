"use client";

import { useEffect, useRef, useState } from "react";
import type { DeliveryStep } from "@/lib/store-data";
import { iconFor } from "@/lib/icon-map";

// Per-step photo focus (object-position) — the subjects sit at different
// heights in each shot (truck/fruit low in the portrait frames, harvest
// centred in the landscape one), so each gets its own crop anchor.
const STEP_FOCUS = ["50% 82%", "50% 50%", "50% 66%", "50% 80%", "50% 86%"];

/**
 * The 5-step "journey" — a horizontal row of cards (stacks on mobile). Each card
 * has a numbered node sitting on a flowing dashed connector, an icon in a soft
 * green disc, a title and a short description. Reveals in sequence (01→05) when
 * scrolled into view; the connector dashes keep flowing toward the destination.
 */
export function RoadmapSteps({ steps }: { steps: DeliveryStep[] }) {
  const olRef = useRef<HTMLOListElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = olRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mt-12">
      <ol
        ref={olRef}
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 ${
          inView ? "fr-steps-in" : ""
        }`}
      >
        {steps.slice(0, 5).map((step, i) => {
          const Icon = iconFor(step.icon);
          return (
            <li
              key={step.title}
              style={{ animationDelay: `${i * 110}ms` }}
              className="fr-step group relative flex flex-col"
            >
              {/* Card */}
              <div className="relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl bg-white text-left shadow-[0_10px_30px_-18px_rgba(0,70,85,0.32)] ring-1 ring-fr-border transition-all duration-300 group-hover:-translate-y-1.5 group-hover:ring-2 group-hover:ring-fr-lime group-hover:shadow-[0_22px_44px_-22px_rgba(0,70,85,0.4)]">
                <div className="flex flex-col p-6">
                  <div className="flex items-center justify-between">
                    <div
                      className="fr-step-icon flex items-center justify-center rounded-full text-fr-teal ring-1 ring-black/5 transition-colors duration-300 group-hover:text-[#33971f]"
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="font-mono text-sm font-bold text-[#33971f]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-fr-teal">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fr-muted">{step.body}</p>
                </div>
                <div className="relative flex-1 overflow-hidden" style={{ minHeight: "15rem" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/assets/step${i + 1}.png`}
                    alt={step.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: STEP_FOCUS[i] ?? "50% 50%" }}
                  />
                  {/* Top fade so the photo blends into the white card */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-44"
                    style={{
                      background:
                        "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.85) 35%, transparent 100%)",
                    }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
