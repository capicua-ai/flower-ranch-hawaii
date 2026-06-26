"use client";

import { useEffect, useRef, useState } from "react";
import type { DeliveryStep } from "@/lib/store-data";
import { iconFor } from "@/lib/icon-map";

/**
 * The 5-step "journey" roadmap. Client component so it can:
 *  - reveal its nodes in sequence (01→05) when scrolled into view, and
 *  - keep the dashed connector flowing toward the destination (CSS `fr-flow`).
 * Staggering is done with CSS transition-delay per node, toggled by the
 * `fr-steps-in` class once the list intersects the viewport.
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
      {/* Wavy dashed connector — dashes march toward the destination (desktop) */}
      <svg
        aria-hidden
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        className="absolute hidden lg:block"
        style={{ left: "10%", width: "80%", top: "56px", height: "80px" }}
      >
        <path
          className="fr-flow"
          d="M0,2 C 10,2 15,78 25,78 C 35,78 40,2 50,2 C 60,2 65,78 75,78 C 85,78 90,2 100,2"
          fill="none"
          stroke="#6db33f"
          strokeWidth="2.5"
          strokeDasharray="1 7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol
        ref={olRef}
        className={`grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:items-start ${
          inView ? "fr-steps-in" : ""
        }`}
      >
        {steps.slice(0, 5).map((step, i) => {
          const Icon = iconFor(step.icon);
          const low = i % 2 === 1; // steps 2 & 4 drop down → wave
          return (
            <li
              key={step.title}
              style={{ transitionDelay: `${i * 110}ms` }}
              className={`fr-step group relative flex flex-col items-center text-center ${
                low ? "lg:mt-20" : ""
              }`}
            >
              {/* Circular node — opaque fill hides the connector behind it */}
              <div
                className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full text-fr-teal ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:text-[#33971f] group-hover:shadow-[0_16px_32px_-14px_rgba(142,216,95,0.6)] group-hover:ring-2 group-hover:ring-fr-lime"
                style={{ backgroundColor: "#f1f8ea" }}
              >
                <Icon className="h-10 w-10" />
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
  );
}
