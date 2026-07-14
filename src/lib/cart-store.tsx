// Cart / "Plate Builder" store
// Lightweight React context + localStorage persistence. No backend required.
// Stores: { [itemId]: qty } and guest count for the live price calculator.

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MENU, type MenuItem } from "./menu-data";

type CartMap = Record<string, number>;

type CartContextValue = {
  items: CartMap;
  guests: number;
  setGuests: (n: number) => void;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  selectedItems: { item: MenuItem; qty: number }[];
  perPlate: number;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "athithya:cart:v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartMap>({});
  const [guests, setGuests] = useState<number>(100);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items ?? {});
        setGuests(parsed.guests ?? 100);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, guests }));
  }, [items, guests]);

  const value = useMemo<CartContextValue>(() => {
    const add = (id: string) =>
      setItems((m) => ({ ...m, [id]: (m[id] ?? 0) + 1 }));
    const remove = (id: string) =>
      setItems((m) => {
        const next = { ...m };
        const v = (next[id] ?? 0) - 1;
        if (v <= 0) delete next[id];
        else next[id] = v;
        return next;
      });
    const setQty = (id: string, qty: number) =>
      setItems((m) => {
        const next = { ...m };
        if (qty <= 0) delete next[id];
        else next[id] = qty;
        return next;
      });
    const clear = () => setItems({});

    const selectedItems = Object.entries(items)
      .map(([id, qty]) => {
        const item = MENU.find((x) => x.id === id);
        return item ? { item, qty } : null;
      })
      .filter((x): x is { item: MenuItem; qty: number } => x !== null);

    // Per-plate: sum of (price * qty) — qty here represents servings of that dish per plate
    const perPlate = selectedItems.reduce((s, { item, qty }) => s + item.price * qty, 0);
    const total = perPlate * guests;
    const count = selectedItems.reduce((s, { qty }) => s + qty, 0);

    return { items, guests, setGuests, add, remove, setQty, clear, selectedItems, perPlate, total, count };
  }, [items, guests]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// Currency formatter (Indian Rupee)
export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
