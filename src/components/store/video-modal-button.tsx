"use client";

import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

interface VideoModalButtonProps {
  /** YouTube video id (the part after v=). */
  videoId: string;
  label?: string;
}

/**
 * A lime CTA button that opens the given YouTube video in an accessible modal
 * (lightbox) instead of navigating away. Closes on backdrop click, the X, or
 * Escape; locks body scroll while open.
 */
export function VideoModalButton({ videoId, label = "Watch how to open & eat" }: VideoModalButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-fr-lime px-7 text-sm font-semibold text-fr-teal-deep shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fr-lime"
      >
        <Play className="h-4 w-4" />
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How to eat longan — video"
          onClick={() => setOpen(false)}
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{
            zIndex: 100,
            backgroundColor: "rgba(0,40,48,0.72)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-11 right-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="How to eat longan"
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
