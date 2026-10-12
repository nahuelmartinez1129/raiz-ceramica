"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import type { CartItem, CartLine } from "@/types";
import { readStoredCart, writeStoredCart } from "./cart-storage";

export const MAX_QUANTITY_PER_ITEM = 20;

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; quantity: number }
  | { type: "set"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

interface CartState {
  lines: CartLine[];
  /** true cuando ya se intentó leer el carrito guardado (solo en el cliente). */
  hydrated: boolean;
}

const clampQuantity = (quantity: number): number =>
  Math.min(MAX_QUANTITY_PER_ITEM, Math.max(1, Math.floor(quantity)));

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate": {
      // Conserva lo que se haya agregado antes de terminar de leer el almacenamiento.
      // Se copian las líneas para mantener el reducer puro (React puede ejecutarlo dos veces).
      const merged = action.lines.map((line) => ({ ...line }));
      for (const line of state.lines) {
        const existing = merged.find((item) => item.productId === line.productId);
        if (existing) existing.quantity = clampQuantity(existing.quantity + line.quantity);
        else merged.push(line);
      }
      return { hydrated: true, lines: sanitize(merged) };
    }
    case "add": {
      const exists = state.lines.some((line) => line.productId === action.productId);
      const lines = exists
        ? state.lines.map((line) =>
            line.productId === action.productId
              ? { ...line, quantity: clampQuantity(line.quantity + action.quantity) }
              : line,
          )
        : [...state.lines, { productId: action.productId, quantity: clampQuantity(action.quantity) }];
      return { ...state, lines };
    }
    case "set":
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.productId === action.productId
            ? { ...line, quantity: clampQuantity(action.quantity) }
            : line,
        ),
      };
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((line) => line.productId !== action.productId),
      };
    case "clear":
      return { ...state, lines: [] };
  }
}

/** Descarta productos que ya no existen en el catálogo y normaliza cantidades. */
function sanitize(lines: CartLine[]): CartLine[] {
  return lines
    .filter((line) => getProduct(line.productId))
    .map((line) => ({ ...line, quantity: clampQuantity(line.quantity) }));
}

interface CartContextValue {
  items: CartItem[];
  totalQuantity: number;
  total: number;
  hydrated: boolean;
  isOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // El estado inicial es idéntico en servidor y cliente (carrito vacío):
  // el contenido guardado se carga después del montaje, sin errores de hidratación.
  const [state, dispatch] = useReducer(cartReducer, { lines: [], hydrated: false });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: "hydrate", lines: readStoredCart() });
  }, []);

  useEffect(() => {
    if (state.hydrated) writeStoredCart(state.lines);
  }, [state]);

  const items = useMemo<CartItem[]>(
    () =>
      state.lines.flatMap((line) => {
        const product = getProduct(line.productId);
        return product
          ? [{ product, quantity: line.quantity, subtotal: product.price * line.quantity }]
          : [];
      }),
    [state.lines],
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!getProduct(productId)) return;
    dispatch({ type: "add", productId, quantity });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "set", productId, quantity });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "remove", productId });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "clear" }), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value: CartContextValue = {
    items,
    totalQuantity,
    total,
    hydrated: state.hydrated,
    isOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
  };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de <CartProvider>.");
  return context;
}
