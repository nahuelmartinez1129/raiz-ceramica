/**
 * Configuración del negocio.
 * Todo lo que un comercio real necesita cambiar está centralizado acá.
 */

/**
 * Número de WhatsApp en formato internacional, solo dígitos y sin "+".
 * Ejemplo para Argentina (celular de Mar del Plata/Miramar): 5492291XXXXXX.
 *
 * Se puede definir con la variable de entorno NEXT_PUBLIC_WHATSAPP_PHONE
 * (recomendado al desplegar) o editando el valor por defecto.
 * Mientras siga siendo el marcador "549XXXXXXXXXX", el sitio abre WhatsApp
 * sin destinatario para que el mensaje pueda probarse sin enviarse a nadie.
 */
export const WHATSAPP_PHONE: string =
  process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim() || "549XXXXXXXXXX";

export const siteConfig = {
  name: "Raíz Cerámica",
  shortName: "Raíz",
  tagline: "Objetos con alma, hechos para durar",
  description:
    "Cerámica artesanal hecha a mano en pequeños lotes: tazas, bowls, floreros y sets inspirados en la naturaleza. Consultas y pedidos por WhatsApp.",
  /** URL pública del sitio. Se usa para Open Graph, sitemap y robots. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  locale: "es_AR",
  location: "Miramar, Buenos Aires, Argentina",
  email: "hola@raizceramica.demo",
  instagram: {
    handle: "@raiz.ceramica.demo",
    // Perfil ficticio: se mantiene como enlace demostrativo.
    url: "https://www.instagram.com/",
  },
  /** Aviso visible en el pie de página. */
  demoNotice:
    "Raíz Cerámica es una marca ficticia creada como demostración de portfolio. Los productos, precios y textos son ilustrativos y no constituyen una oferta comercial.",
  photoNotice:
    "Fotografías ilustrativas de Unsplash; no corresponden a piezas producidas por la marca.",
} as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nuestra-historia", label: "Nuestra historia" },
  { href: "/#contacto", label: "Contacto" },
] as const;
