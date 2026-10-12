"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { navLinks, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { isActiveLink } from "@/lib/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Si la pantalla se agranda (rotación, ventana), el menú móvil ya no aplica.
  useEffect(() => {
    if (!open) return;
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="side-panel"
      aria-label="Menú"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="grain flex h-full flex-col bg-cream px-6 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between">
          <Logo onNavigate={onClose} />
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full text-earth transition-colors hover:bg-sand"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menú móvil" className="mt-14">
          <ul className="space-y-1">
            {navLinks.map((link, index) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-4 border-b border-sand py-4 font-serif text-4xl text-earth aria-[current=page]:text-terracotta-deep"
                  >
                    <span className="font-sans text-xs font-semibold text-earth-soft tabular-nums">
                      0{index + 1}
                    </span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto space-y-4 pt-10">
          <a
            href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp w-full"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escribinos por WhatsApp
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-sm text-earth-soft"
          >
            {siteConfig.instagram.handle} (demostrativo)
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </dialog>
  );
}
