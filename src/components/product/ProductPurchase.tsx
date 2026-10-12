"use client";

import { MessageCircle, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { MAX_QUANTITY_PER_ITEM, useCart } from "@/components/cart/CartProvider";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { formatPrice } from "@/lib/format";
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const whatsappUrl = buildWhatsAppUrl(buildProductInquiryMessage(product, quantity));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          max={MAX_QUANTITY_PER_ITEM}
          label={product.name}
        />
        {quantity > 1 ? (
          <p className="text-sm text-earth-soft" aria-live="polite">
            Subtotal:{" "}
            <span className="font-semibold text-earth tabular-nums">
              {formatPrice(product.price * quantity)}
            </span>
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            addItem(product.id, quantity);
            setQuantity(1);
          }}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Agregar al carrito
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Consultar por WhatsApp
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  );
}
