"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { totalQuantity, hydrated, openCart } = useCart();
  // Antes de leer el carrito guardado se muestra 0, igual que en el servidor.
  const count = hydrated ? totalQuantity : 0;
  const label =
    count === 0
      ? "Abrir carrito, vacío"
      : `Abrir carrito, ${count} ${count === 1 ? "pieza" : "piezas"}`;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={label}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-earth transition-colors hover:bg-sand"
    >
      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
      {count > 0 ? (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta-deep px-1 text-[0.65rem] font-bold text-warm-white tabular-nums animate-fade-in"
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </button>
  );
}
