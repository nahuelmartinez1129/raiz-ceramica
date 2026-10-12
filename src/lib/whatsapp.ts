import { WHATSAPP_PHONE, siteConfig } from "@/config/site";
import type { CartItem, Product } from "@/types";
import { formatPrice } from "./format";

/** Solo dígitos, entre 8 y 15 (formato E.164 sin "+"). */
export function isWhatsAppConfigured(phone: string = WHATSAPP_PHONE): boolean {
  return /^\d{8,15}$/.test(phone);
}

/**
 * Construye un enlace wa.me con el mensaje codificado.
 * Si el número todavía es el marcador de ejemplo, se omite el destinatario:
 * WhatsApp abre el mensaje y permite elegir el contacto, sin enviarlo a nadie.
 */
export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  const text = encodeURIComponent(message);
  return isWhatsAppConfigured(phone)
    ? `https://wa.me/${phone}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export function buildOrderMessage(items: CartItem[], total: number): string {
  const lines = items.map(
    ({ product, quantity, subtotal }) =>
      `- ${product.name} x ${quantity} — ${formatPrice(subtotal)}`,
  );

  return [
    `Hola, ${siteConfig.name}. Quiero consultar por este pedido:`,
    "",
    ...lines,
    "",
    `Total estimado: ${formatPrice(total)}`,
    "",
    "¿Me podrían confirmar disponibilidad y formas de entrega?",
  ].join("\n");
}

export function buildProductInquiryMessage(product: Product, quantity: number): string {
  const unitLabel = quantity === 1 ? "unidad" : "unidades";
  return [
    `Hola, ${siteConfig.name}. Quiero consultar por esta pieza:`,
    "",
    `- ${product.name} x ${quantity} ${unitLabel} — ${formatPrice(product.price * quantity)}`,
    "",
    "¿Está disponible? ¿Cuáles son las formas de entrega?",
  ].join("\n");
}

export function buildGeneralInquiryMessage(): string {
  return `Hola, ${siteConfig.name}. Quería hacer una consulta sobre sus piezas.`;
}
