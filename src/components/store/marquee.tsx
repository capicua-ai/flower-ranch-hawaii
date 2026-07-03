const DEFAULT_ITEMS = [
  "Craft",
  "Transparency",
  "Hawaiian-grown",
  "Regenerative",
  "Single-orchard",
  "Cold-chain",
];

/**
 * Seamless infinite marquee. The track is the items duplicated once and
 * translated -50%, so the loop is gapless. Pauses on hover; disabled under
 * prefers-reduced-motion. Second copy is aria-hidden so screen readers read the
 * list once.
 */
export function Marquee({
  items = DEFAULT_ITEMS,
  durationSeconds = 32,
}: {
  items?: string[];
  durationSeconds?: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="fr-marquee-band relative flex overflow-hidden bg-fr-lime py-5">
      <style>{`
        @keyframes fr-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .fr-marquee-track { animation: fr-marquee ${durationSeconds}s linear infinite; will-change: transform; }
        .fr-marquee-band:hover .fr-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .fr-marquee-track { animation: none; } }
      `}</style>

      <div className="fr-marquee-track flex w-max shrink-0 items-center">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="whitespace-nowrap px-7 font-mono text-base font-semibold uppercase tracking-[0.22em] text-fr-teal-deep">
              {item}
            </span>
            <span aria-hidden className="text-fr-teal-deep/45">
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
