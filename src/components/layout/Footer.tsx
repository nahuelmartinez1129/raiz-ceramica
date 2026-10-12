import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight, AtSign, Mail, MapPin, MessageCircle } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { categories } from "@/data/categories";
import { buildGeneralInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

/** Año actual, cacheado por día: el pie se mantiene estático y se actualiza solo. */
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralInquiryMessage());

  return (
    <footer className="grain bg-earth text-sand">
      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-warm-white">
            {siteConfig.tagline}.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-8 border border-sand/40 text-warm-white hover:border-warm-white hover:bg-warm-white hover:text-earth"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escribinos por WhatsApp
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        </div>

        <nav aria-label="Pie de página" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h2 className="eyebrow !text-sand/70">Navegación</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline text-warm-white/90 hover:text-warm-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow !text-sand/70">Catálogo</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/catalogo" className="link-underline text-warm-white/90 hover:text-warm-white">
                  Ver todo
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/catalogo?categoria=${category.id}`}
                    className="link-underline text-warm-white/90 hover:text-warm-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="eyebrow !text-sand/70">Contacto</h2>
            <ul className="mt-5 space-y-3 text-sm text-warm-white/90">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand/70" aria-hidden="true" />
                {siteConfig.location}
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sand/70" aria-hidden="true" />
                <span>
                  {siteConfig.email} <span className="text-sand/70">(demostrativo)</span>
                </span>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 hover:text-warm-white"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-sand/70" aria-hidden="true" />
                  <span className="link-underline">WhatsApp</span>
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2.5 hover:text-warm-white"
                >
                  <AtSign className="mt-0.5 h-4 w-4 shrink-0 text-sand/70" aria-hidden="true" />
                  <span>
                    <span className="link-underline">{siteConfig.instagram.handle}</span>{" "}
                    <span className="text-sand/70">(perfil ficticio)</span>
                  </span>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="border-t border-sand/15">
        <div className="container-page space-y-3 py-8 text-xs leading-relaxed text-sand/80">
          <p className="max-w-3xl">{siteConfig.demoNotice}</p>
          <p className="max-w-3xl">{siteConfig.photoNotice}</p>
          <p>
            © <CurrentYear /> {siteConfig.name} · Sitio de demostración para portfolio.
          </p>
        </div>
      </div>
    </footer>
  );
}
