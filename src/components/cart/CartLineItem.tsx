"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types";
import { MAX_QUANTITY_PER_ITEM, useCart } from "./CartProvider";

export function CartLineItem({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem, closeCart } = useCart();
  const { product, quantity, subtotal } = item;

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/productos/${product.id}`}
        onClick={closeCart}
        className="relative h-28 w-22 shrink-0 overflow-hidden rounded-sm bg-sand"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          src={product.image.src}
          alt=""
          fill
          sizes="88px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/productos/${product.id}`}
              onClick={closeCart}
              className="-my-2 inline-flex min-h-10 items-center font-serif text-xl leading-tight text-earth hover:text-terracotta-deep"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-earth-soft tabular-nums">
              {formatPrice(product.price)} c/u
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="-mt-1 -mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-earth-soft transition-colors hover:bg-sand hover:text-terracotta-deep"
            aria-label={`Eliminar ${product.name} del carrito`}
          >
            <Trash className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <QuantitySelector
            value={quantity}
            onChange={(value) => updateQuantity(product.id, value)}
            max={MAX_QUANTITY_PER_ITEM}
            label={product.name}
            size="sm"
          />
          <p className="text-base font-semibold text-earth tabular-nums">
            <span className="sr-only">Subtotal: </span>
            {formatPrice(subtotal)}
          </p>
        </div>
      </div>
    </li>
  );
}
