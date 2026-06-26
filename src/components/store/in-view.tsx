"use client";

import { useEffect, useRef, useState } from "react";

interface InViewProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms before the entrance plays. */
  delay?: number;
}

/**
 * Subtle scroll-reveal wrapper. Fades + rises its children in the first time
 * they scroll into view. The hidden state is gated behind `.js` (in globals.css)
 * and disabled for reduced-motion, so content is always visible without JS.
 */
export function InView({ children, className = "", delay = 0 }: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fr-inview ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
