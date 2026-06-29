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
  /**
   * When set, the clip plays once (no native loop), freezes on its last frame,
   * then automatically replays after this many milliseconds — repeating with a
   * breathing pause between plays. With `playOnView`, the replay only fires
   * while the clip is visible (otherwise it waits until it scrolls back in).
   */
  replayDelayMs?: number;
}

/**
 * Background hero video. Lives in a client component so we can set
 * `playbackRate` (not expressible as an HTML attribute) once the element mounts
 * and again whenever the source reloads. With `playOnView`, playback is gated
 * on an IntersectionObserver so the clip only runs while visible. With
 * `replayDelayMs`, the clip plays once, holds its final frame, and loops again
 * after the given delay.
 */
export function HeroVideo({
  src,
  poster,
  className,
  rate = 1,
  playOnView = false,
  replayDelayMs,
}: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(true);
  const pendingReplayRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  // A delayed-replay clip manages its own looping, so the native loop is off.
  const shouldLoop = replayDelayMs == null;

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

    // playOnView: drive play/pause from visibility. A finished clip is left on
    // its last frame; a replay queued while off-screen runs as soon as it
    // scrolls back into view.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        visibleRef.current = visible;
        if (visible) {
          if (pendingReplayRef.current) {
            pendingReplayRef.current = false;
            video.currentTime = 0;
          }
          if (video.ended) return;
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

  // Delayed auto-replay: hold the last frame, then loop again after the delay.
  useEffect(() => {
    const video = ref.current;
    if (!video || replayDelayMs == null) return;

    const replay = () => {
      // If the clip scrolled out of view, defer the replay until it returns.
      if (!visibleRef.current) {
        pendingReplayRef.current = true;
        return;
      }
      video.currentTime = 0;
      video.playbackRate = rate;
      void video.play().catch(() => {});
    };

    const onEnded = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(replay, replayDelayMs);
    };

    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("ended", onEnded);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [replayDelayMs, rate]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay={!playOnView}
      muted
      loop={shouldLoop}
      playsInline
      poster={poster}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
