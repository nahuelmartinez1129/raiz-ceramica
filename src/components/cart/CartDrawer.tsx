"use client";

import Link from "next/link";
import { ArrowLeft, CircleCheck, Info, MessageCircle, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatPrice, pluralize } from "@/lib/format";
import { buildOrderMessage, buildWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { CartLineItem } from "./CartLineItem";
import { useCart } from "./CartProvider";

type Step = "cart" | "sent";

export function CartDrawer() {
  const { items, total, totalQuantity, isOpen, closeCart, clearCart } = useCart();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("cart");
  const [confirmingClear, setConfirmingClear] = useState(false);

  // Sincroniza el estado con el <dialog> nativo (foco atrapado, Esc y fondo inerte).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleClose = () => {
    closeCart();
    setStep("cart");
    setConfirmingClear(false);
  };

  const whatsappUrl = buildWhatsAppUrl(buildOrderMessage(items, total));
  const configured = isWhatsAppConfigured();
  const isEmpty = items.length === 0;

  return (
    <dialog
      ref={dialogRef}
      className="side-panel"
      aria-labelledby="cart-title"
      onClose={handleClose}
      onClick={(event) => {
        // Clic en el fondo oscuro (fuera del panel) cierra el carrito.
        if (event.target === dialogRef.current) handleClose();
      }}
    >
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b border-sand px-5 py-4 sm:px-7">
          <div>
            <h2 id="cart-title" className="font-serif text-3xl text-earth">
              Tu pedido
            </h2>
            {!isEmpty ? (
              <p className="text-xs text-earth-soft">{pluralize(totalQuantity, "pieza", "piezas")}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-earth transition-colors hover:bg-sand"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        {isEmpty && step === "cart" ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand text-terracotta-deep">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 font-serif text-2xl text-earth">Tu carrito está vacío</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-earth-soft">
              Recorré la colección y agregá las piezas que te gustaría consultar.
            </p>
            <Link href="/catalogo" onClick={handleClose} className="btn btn-primary mt-8">
              Explorar colección
            </Link>
          </div>
        ) : step === "sent" ? (
          <div className="flex flex-1 flex-col justify-center px-6 sm:px-8">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive/15 text-olive-deep">
              <CircleCheck className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 font-serif text-3xl leading-tight text-earth">
              ¿Se abrió WhatsApp con tu pedido?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-earth-soft">
              Enviá el mensaje desde WhatsApp para iniciar la consulta. El total es orientativo:
              disponibilidad, entrega y condiciones se confirman con el comercio. Si ya lo enviaste,
              podés vaciar el carrito.
            </p>
            <div className="mt-8 grid gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  clearCart();
                  handleClose();
                }}
              >
                Sí, ya lo envié: vaciar carrito
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Abrir WhatsApp otra vez
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
              <button
                type="button"
                className="btn text-earth-soft hover:text-earth"
                onClick={() => setStep("cart")}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al carrito
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sand overflow-y-auto px-5 sm:px-7" aria-label="Productos en el carrito">
              {items.map((item) => (
                <CartLineItem key={item.product.id} item={item} />
              ))}
            </ul>

            <footer className="border-t border-sand bg-cream/60 px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-7">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-semibold tracking-[0.12em] text-earth-soft uppercase">
                  Total estimado
                </span>
                <span className="font-serif text-3xl text-earth tabular-nums lining-nums">{formatPrice(total)}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-earth-soft">
                Orientativo: la disponibilidad, el envío y el precio final se confirman por WhatsApp.
              </p>

              {!configured ? (
                <p className="mt-3 flex gap-2 rounded-sm bg-sand/70 p-3 text-xs leading-relaxed text-earth">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Modo demostración: el número de WhatsApp todavía no está configurado. Se abrirá
                  WhatsApp con el mensaje listo para que elijas el destinatario.
                </p>
              ) : null}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setStep("sent")}
                className="btn btn-whatsapp mt-4 w-full"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enviar pedido por WhatsApp
                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>

              <div className="mt-3 flex items-center justify-between gap-2">
                <button type="button" onClick={handleClose} className="link-underline py-2 text-sm text-earth">
                  Seguir comprando
                </button>
                {confirmingClear ? (
                  <span className="flex items-center gap-3 text-sm">
                    <span className="text-earth-soft">¿Vaciar?</span>
                    <button
                      type="button"
                      className="py-2 font-semibold text-terracotta-deep"
                      onClick={() => {
                        clearCart();
                        setConfirmingClear(false);
                      }}
                    >
                      Sí
                    </button>
                    <button type="button" className="py-2 text-earth" onClick={() => setConfirmingClear(false)}>
                      No
                    </button>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmingClear(true)}
                    className="py-2 text-sm text-earth-soft transition-colors hover:text-terracotta-deep"
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            </footer>
          </>
        )}
      </div>
    </dialog>
  );
}
