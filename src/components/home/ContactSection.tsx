import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/data/images";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function ContactSection() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative isolate overflow-hidden">
      <SafeImage
        src={siteImages.ctaBand.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-earth/75" aria-hidden="true" />

      <div className="container-page py-24 text-center sm:py-32">
        <p className="eyebrow !text-sand">Contacto</p>
        <h2 id="contacto-title" className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] text-warm-white sm:text-6xl">
          ¿Buscás una pieza especial o querés consultar disponibilidad?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sand sm:text-lg">
          Escribinos por WhatsApp para consultar stock, piezas personalizadas o formas de entrega.
          Taller demostrativo ubicado en {siteConfig.location}.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={buildWhatsAppUrl(buildGeneralInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-warm-white text-earth hover:bg-sand"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escribinos por WhatsApp
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
          <Link
            href="/catalogo"
            className="btn border border-sand/50 text-warm-white hover:border-warm-white hover:bg-warm-white/10"
          >
            Ver el catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
