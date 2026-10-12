"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  quantity?: number;
  variant?: "icon" | "full";
}

export function AddToCartButton({
  productId,
  productName,
  quantity = 1,
  variant = "full",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => addItem(productId, quantity)}
        aria-label={`Agregar ${productName} al carrito`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-earth/15 bg-warm-white text-earth transition-all duration-300 hover:border-earth hover:bg-earth hover:text-warm-white"
      >
        <ShoppingBag className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button type="button" onClick={() => addItem(productId, quantity)} className="btn btn-primary w-full">
      <ShoppingBag className="h-4 w-4" aria-hidden="true" />
      Agregar al carrito
    </button>
  );
}
