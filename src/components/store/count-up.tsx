"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** target value to count to */
  to: number;
  /** text prepended before the number, e.g. "~" */
  prefix?: string;
  /** text appended after the number, e.g. "%" */
  suffix?: string;
  /** animation duration in ms */
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 → `to` the first time it scrolls into view. Respects
 * prefers-reduced-motion (and SSR) by rendering the final value immediately.
 */
export function CountUp({ to, prefix = "", suffix = "", duration = 1400, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || done) return;
        setDone(true);
        observer.disconnect();

        let raf = 0;
        let start: number | null = null;
        const tick = (ts: number) => {
          if (start === null) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(eased * to));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [to, duration, done]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
