"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Playback speed multiplier (1 = normal). */
  rate?: number;
  /**
   * When true, the video stays paused until it scrolls into view (and pauses
   * again when it leaves), instead of autoplaying on mount.
   */
  playOnView?: boolean;
}

/**
 * Background hero video. Lives in a client component so we can set
 * `playbackRate` (not expressible as an HTML attribute) once the element mounts
 * and again whenever the source reloads. With `playOnView`, playback is gated
 * on an IntersectionObserver so the clip only runs while visible.
 */
export function HeroVideo({ src, poster, className, rate = 1, playOnView = false }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // The browser resets playbackRate when the source loads, so keep it pinned
    // on loadedmetadata too.
    const applyRate = () => {
      video.playbackRate = rate;
    };
    applyRate();
    video.addEventListener("loadedmetadata", applyRate);

    if (!playOnView) {
      // Default: start immediately. play() can reject if autoplay is blocked —
      // it's muted, so this normally succeeds; ignore otherwise.
      const start = () => {
        applyRate();
        void video.play().catch(() => {});
      };
      start();
      video.addEventListener("loadedmetadata", start);
      return () => {
        video.removeEventListener("loadedmetadata", applyRate);
        video.removeEventListener("loadedmetadata", start);
      };
    }

    // playOnView: drive play/pause from visibility.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting;
        if (visible) {
          applyRate();
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(video);
    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      observer.disconnect();
    };
  }, [rate, playOnView]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay={!playOnView}
      muted
      loop
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
