"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms before the reveal animation starts. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Blur + fade-up on scroll, mirroring the v1 site's signature reveal motion.
 *
 * Robust by design:
 * - Hiding is applied only via the `.js .reveal` CSS rule, so with JS disabled
 *   (or before hydration) the content is fully visible — no SEO/no-JS risk.
 * - prefers-reduced-motion users never see the hidden state (handled in CSS).
 * - The `.in` class (added on intersection) triggers the transition.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = window.setTimeout(() => el.classList.add("in"), delay);
          observer.disconnect();
          el.dataset.timer = String(t);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<HTMLElement & HTMLDivElement>} className={`reveal ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
