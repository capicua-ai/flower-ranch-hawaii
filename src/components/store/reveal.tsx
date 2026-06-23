interface RevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms before the entrance animation starts. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}

/**
 * Entrance motion wrapper. Adds the `.reveal` class, which plays an on-load
 * fade/rise (see globals.css). Uses CSS `animation … both` so the element is
 * always visible after — it can never get stuck hidden, and content shows
 * normally with JS disabled or for reduced-motion users.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const Tag = as;
  return (
    <Tag
      className={`reveal ${className ?? ""}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
