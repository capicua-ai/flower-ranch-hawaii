import { Leaf } from "lucide-react";

/**
 * Section eyebrow/kicker: a small leaf glyph + mono uppercase label.
 * Use `dark` on dark-teal section backgrounds so the label reads as lime.
 */
export function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest ${
        dark ? "text-fr-lime" : "text-fr-teal"
      }`}
    >
      <Leaf className={`h-3.5 w-3.5 ${dark ? "text-fr-lime" : "text-[#33971f]"}`} aria-hidden />
      {children}
    </span>
  );
}
