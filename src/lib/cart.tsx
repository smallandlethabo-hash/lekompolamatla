import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "./products";

export type CartItem = { id: string; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<{ product: Product; qty: number; lineTotal: number }>;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "llm_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (id, qty = 1) =>
    setItems((cur) => {
      const ex = cur.find((i) => i.id === id);
      if (ex) return cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...cur, { id, qty }];
    });
  const remove: CartCtx["remove"] = (id) => setItems((cur) => cur.filter((i) => i.id !== id));
  const setQty: CartCtx["setQty"] = (id, qty) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = PRODUCTS.find((p) => p.id === i.id);
      if (!product) return null;
      return { product, qty: i.qty, lineTotal: product.price * i.qty };
    })
    .filter(Boolean) as Array<{ product: Product; qty: number; lineTotal: number }>;
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);

  return <Ctx.Provider value={{ items, add, remove, setQty, clear, count, subtotal, detailed }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

export const WHATSAPP_NUMBER = "27672093814"; // +27 67 209 3814, no plus

export function whatsappOrderUrl(args: {
  items: Array<{ product: Product; qty: number; lineTotal: number }>;
  subtotal: number;
  customer?: { name?: string; location?: string; note?: string };
}) {
  const { items, subtotal, customer } = args;
  const lines = [
    "Hola Man Driller! 🔥",
    "I want to order from *Lekompo La Matla*:",
    "",
    ...items.map((d) => `• ${d.product.name} × ${d.qty} — R${d.lineTotal}`),
    "",
    `*Total: R${subtotal}*`,
  ];
  if (customer?.name) lines.push("", `Name: ${customer.name}`);
  if (customer?.location) lines.push(`Location: ${customer.location}`);
  if (customer?.note) lines.push(`Note: ${customer.note}`);
  lines.push("", "Please confirm payment & delivery. Matla! 💪");
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function whatsappSingleItemUrl(product: Product, qty = 1) {
  return whatsappOrderUrl({
    items: [{ product, qty, lineTotal: product.price * qty }],
    subtotal: product.price * qty,
  });
}

export function whatsappBookingUrl(form: { name: string; event: string; date: string; location: string; message: string }) {
  const text = encodeURIComponent(
    [
      "Hola Man Driller! 🎧",
      "I'd like to book you for an event:",
      "",
      `Name: ${form.name}`,
      `Event: ${form.event}`,
      `Date: ${form.date}`,
      `Location: ${form.location}`,
      "",
      `Message: ${form.message}`,
    ].join("\n"),
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}