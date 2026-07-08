"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** A line in the cart: the product plus a resolved numeric price and quantity. */
export interface CartLine {
  slug: string;
  name: string;
  price: string; // display string, e.g. "$24"
  priceNote: string;
  image: string;
  unitPrice: number; // parsed from `price` for subtotal math
  qty: number;
}

/** Minimal product shape the UI passes when adding to the cart. */
export interface CartProductInput {
  slug: string;
  name: string;
  price: string;
  priceNote?: string;
  image: string;
}

interface CartContextValue {
  items: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (product: CartProductInput, qty?: number) => void;
  removeItem: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "fr-cart-v1";

/** Pull the leading numeric value out of a display price like "$24" or "$24.50 / lb". */
function parsePrice(price: string): number {
  const n = parseFloat(price.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount (client only — keeps SSR markup stable).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Client-only hydration from localStorage on mount — intentional.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change (after the initial load so we never clobber storage with []).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable (private mode / quota) — cart still works in-memory
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: CartProductInput, qty = 1) => {
    setItems((prev) => {
      const existing = prev.findIndex((it) => it.slug === product.slug);
      if (existing !== -1) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + qty };
        return next;
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          priceNote: product.priceNote ?? "",
          image: product.image,
          unitPrice: parsePrice(product.price),
          qty,
        },
      ];
    });
  }, []);

  const removeItem = useCallback(
    (slug: string) => setItems((prev) => prev.filter((it) => it.slug !== slug)),
    [],
  );

  const setQty = useCallback(
    (slug: string, qty: number) =>
      setItems((prev) =>
        qty <= 0
          ? prev.filter((it) => it.slug !== slug)
          : prev.map((it) => (it.slug === slug ? { ...it, qty } : it)),
      ),
    [],
  );

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.unitPrice * it.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQty,
      clear,
      openCart,
      closeCart,
    }),
    [items, count, subtotal, isOpen, addItem, removeItem, setQty, clear, openCart, closeCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}
