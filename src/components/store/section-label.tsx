/**
 * Section eyebrow/kicker: a mono uppercase label in a pill.
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
      className={`inline-flex items-center rounded-full px-3.5 py-1.5 font-mono text-[13px] uppercase tracking-widest ring-1 ${
        dark
          ? "bg-white/10 text-fr-lime ring-white/20"
          : "bg-white text-fr-teal shadow-sm ring-fr-border"
      }`}
    >
      {children}
    </span>
  );
}
