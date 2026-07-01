"use client";

import { useEffect } from "react";

/**
 * Smooth-scrolls ONLY for in-page anchor links (href "#id" or "/#id" while on
 * the home route). Everything else — page navigation, programmatic scrolls,
 * scroll-to-top on route change — stays instant. Disabled under
 * prefers-reduced-motion. Renders nothing.
 */
export function SmoothAnchors() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      let id: string | null = null;
      if (href.startsWith("#")) id = href.slice(1);
      else if (href.startsWith("/#") && window.location.pathname === "/") id = href.slice(2);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
