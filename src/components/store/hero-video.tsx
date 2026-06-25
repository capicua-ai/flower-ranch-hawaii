"use client";

import { useEffect, useRef } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Playback speed multiplier (1 = normal). */
  rate?: number;
}

/**
 * Background hero video. Lives in a client component so we can set
 * `playbackRate` (not expressible as an HTML attribute) once the element mounts
 * and again whenever the source reloads.
 */
export function HeroVideo({ src, poster, className, rate = 1 }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Apply the rate and (re)start playback. The browser resets the rate when
    // the source loads, so re-apply on loadedmetadata too. play() can reject if
    // autoplay is blocked — it's muted, so this normally succeeds; ignore otherwise.
    const apply = () => {
      video.playbackRate = rate;
      void video.play().catch(() => {});
    };
    apply();
    video.addEventListener("loadedmetadata", apply);
    return () => video.removeEventListener("loadedmetadata", apply);
  }, [rate]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
