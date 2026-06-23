import {
  Heart,
  Home,
  Leaf,
  type LucideIcon,
  MapPin,
  Moon,
  Package,
  Plane,
  Scissors,
  Shield,
  Sparkles,
} from "lucide-react";

// Maps the `icon` string stored in Chalk-editable tables (benefits,
// delivery_steps) to a lucide component. Keep in sync with the `select`
// choices registered for those columns.
const ICONS: Record<string, LucideIcon> = {
  Shield,
  Sparkles,
  Leaf,
  Moon,
  Heart,
  MapPin,
  Scissors,
  Package,
  Plane,
  Home,
};

export function iconFor(name: string): LucideIcon {
  return ICONS[name] ?? Leaf;
}
