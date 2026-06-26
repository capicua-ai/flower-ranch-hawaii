/**
 * Decorative botanical illustration anchored to a section corner, bleeding off
 * the edge (the section must be `relative isolate overflow-hidden`). Purely
 * ornamental: aria-hidden, non-interactive, sits behind content. Position, size
 * and bleed are passed via `className` / `style` from the section.
 */
export function CornerBotanical({
  src,
  className = "",
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
      style={style}
    />
  );
}
