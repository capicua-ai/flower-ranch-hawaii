"use client";

import { useEffect, useRef, useState } from "react";
import type { DeliveryStep } from "@/lib/store-data";
import { iconFor } from "@/lib/icon-map";

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
      {/* Flowing dashed connector through the numbered nodes (desktop) */}
      <svg
        aria-hidden
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        className="absolute hidden lg:block"
        style={{ left: "10%", width: "80%", top: "18px", height: "2px" }}
      >
        <line
          className="fr-flow"
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="#6db33f"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Vertical dashed connector through the nodes (mobile / tablet) */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 top-4 -z-10 w-px -translate-x-1/2 lg:hidden"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #6db33f 0 2px, transparent 2px 9px)",
        }}
      />

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
              className="fr-step group relative flex flex-col items-center text-center"
            >
              {/* Numbered node sitting on the connector */}
              <span
                className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-bold text-[#33971f] ring-1 ring-black/5"
                style={{ backgroundColor: "#eef7e1" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Card */}
              <div
                className="relative mt-4 flex w-full flex-1 flex-col overflow-hidden rounded-2xl p-5 shadow-[0_10px_30px_-18px_rgba(0,70,85,0.32)] ring-1 ring-fr-border backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:ring-2 group-hover:ring-fr-lime group-hover:shadow-[0_22px_44px_-22px_rgba(0,70,85,0.4)]"
                style={{ backgroundColor: "rgba(255,255,255,0.45)" }}
              >
                {/* frosted-glass top sheen */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-20"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.45), transparent)",
                  }}
                />
                <div
                  className="fr-step-icon relative mx-auto flex items-center justify-center rounded-full text-fr-teal ring-1 ring-black/5 transition-colors duration-300 group-hover:text-[#33971f]"
                  style={{ width: "3.5rem", height: "3.5rem" }}
                >
                  <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-fr-teal">{step.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[13rem] text-sm leading-relaxed text-fr-muted">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
