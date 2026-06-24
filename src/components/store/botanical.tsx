/**
 * Decorative texture primitive. Purely ornamental (`aria-hidden`,
 * `pointer-events-none`) so it never interferes with content or assistive
 * tech — position it with className from the parent.
 */

/** Faint film-grain layer. Drop inside a `relative` section to warm a flat fill. */
export function Grain({
  className = "",
  opacity = 0.5,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`fr-grain pointer-events-none absolute inset-0 -z-10 ${className}`}
      style={{ opacity }}
    />
  );
}
