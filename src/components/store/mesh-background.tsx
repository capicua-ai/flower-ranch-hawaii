/**
 * Grainy mesh-gradient backdrop. Soft, heavily-blurred brand-colour blobs over
 * the section's base fill, finished with a film-grain layer — the "aurora /
 * grainy gradient" look, in our palette (lime / green / teal on cream).
 *
 * Purely decorative (aria-hidden, pointer-events-none). Drop inside a
 * `relative isolate` section; keep the section's real content in a sibling with
 * `relative` so it paints above this `-z-10` layer. `flip` mirrors the
 * arrangement so adjacent sections don't look identical; `intensity` scales the
 * blob opacity (0–1).
 */

interface Blob {
  color: string;
  /** inline position/size (percentages of the section box) */
  pos: React.CSSProperties;
}

const BLOBS: Blob[] = [
  { color: "rgba(142,216,95,0.55)", pos: { top: "-14%", left: "-8%", width: "62%", height: "62%" } },
  { color: "rgba(59,169,52,0.45)", pos: { bottom: "-18%", right: "-10%", width: "66%", height: "66%" } },
  { color: "rgba(0,118,140,0.30)", pos: { top: "22%", right: "6%", width: "50%", height: "56%" } },
  { color: "rgba(142,216,95,0.42)", pos: { bottom: "2%", left: "12%", width: "52%", height: "52%" } },
  // soft light pocket keeps content readable and adds breathing room
  { color: "rgba(255,255,255,0.55)", pos: { top: "38%", left: "32%", width: "46%", height: "42%" } },
];

interface MeshBackgroundProps {
  className?: string;
  /** Mirror the blob layout horizontally for variety between sections. */
  flip?: boolean;
  /** 0–1 multiplier on blob strength. */
  intensity?: number;
  /** Film-grain opacity. */
  grain?: number;
}

export function MeshBackground({
  className = "",
  flip = false,
  intensity = 0.5,
  grain = 0.8,
}: MeshBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
      >
        {BLOBS.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              ...b.pos,
              background: b.color,
              opacity: intensity,
              filter: "blur(100px)",
            }}
          />
        ))}
      </div>
      <div className="fr-grain absolute inset-0" style={{ opacity: grain }} />
    </div>
  );
}
