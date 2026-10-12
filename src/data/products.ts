import type { Product } from "@/types";
import { productImages } from "./images";

/**
 * Catálogo de productos.
 * Precios ficticios en pesos argentinos (ARS), sin decimales.
 * Para agregar un producto, copiá un bloque y cambiá el `id` (debe ser único,
 * en minúsculas y con guiones: se usa como dirección de la ficha).
 */
export const products: Product[] = [
  {
    id: "taza-alba",
    name: "Taza Alba",
    price: 12000,
    category: "tazas-y-vasos",
    shortDescription: "Taza de gres con esmalte satinado en tono rosa tierra.",
    description:
      "Alba nace de las primeras luces de la mañana. Una taza de paredes finas y asa cómoda, esmaltada en un rosa tierra que cambia suavemente según la luz. Ideal para café con leche o té.",
    details: [
      "Gres torneado a mano",
      "Capacidad aproximada: 300 ml",
      "Esmalte satinado libre de plomo",
      "Apta para lavavajillas y microondas",
    ],
    image: productImages.tazaAlba,
    badge: "Más elegido",
    featured: true,
  },
  {
    id: "taza-nube",
    name: "Taza Nube",
    price: 13500,
    category: "tazas-y-vasos",
    shortDescription: "Taza alta en gris piedra, de líneas simples y textura suave.",
    description:
      "Una taza alta de silueta recta y esmalte gris piedra, pensada para quienes disfrutan de las bebidas largas. Su superficie mate tiene pequeñas variaciones que la hacen única.",
    details: [
      "Gres modelado a mano",
      "Capacidad aproximada: 380 ml",
      "Esmalte mate en gris piedra",
      "Se recomienda lavado a mano",
    ],
    image: productImages.tazaNube,
    badge: "Nuevo",
    featured: true,
  },
  {
    id: "bowl-tierra",
    name: "Bowl Tierra",
    price: 15000,
    category: "bowls-y-platos",
    shortDescription: "Bowl de borde irregular con esmalte blanco moteado.",
    description:
      "El Bowl Tierra tiene un borde ondulado que conserva las huellas del modelado. Su esmalte blanco con motas de hierro natural lo vuelve protagonista de cualquier mesa, desde un desayuno hasta una ensalada.",
    details: [
      "Gres con óxidos naturales",
      "Diámetro aproximado: 16 cm",
      "Esmalte blanco moteado",
      "Apto para lavavajillas",
    ],
    image: productImages.bowlTierra,
    badge: "Más elegido",
    featured: true,
  },
  {
    id: "plato-bruma",
    name: "Plato Bruma",
    price: 11000,
    category: "bowls-y-platos",
    shortDescription: "Plato playo de esmalte blanco niebla con motas suaves.",
    description:
      "Un plato playo de líneas serenas y esmalte blanco niebla. Las motas que aparecen en la cocción hacen que no haya dos iguales. Combina con toda la colección.",
    details: [
      "Gres prensado y terminado a mano",
      "Diámetro aproximado: 26 cm",
      "Esmalte semimate",
      "Apto para lavavajillas",
    ],
    image: productImages.platoBruma,
  },
  {
    id: "florero-organico",
    name: "Florero Orgánico",
    price: 28000,
    category: "floreros-y-decoracion",
    shortDescription: "Florero escultórico de forma circular con centro hueco.",
    description:
      "Una pieza escultórica que funciona como florero y como objeto decorativo por sí mismo. Su forma circular con centro abierto juega con la luz y las sombras del ambiente.",
    details: [
      "Cerámica modelada a mano en placas",
      "Altura aproximada: 22 cm",
      "Acabado mate color hueso",
      "Ideal para flores secas o una rama",
    ],
    image: productImages.floreroOrganico,
    badge: "Edición limitada",
    featured: true,
  },
  {
    id: "florero-arena",
    name: "Florero Arena",
    price: 24000,
    category: "floreros-y-decoracion",
    shortDescription: "Florero de textura rugosa en tono arena, sin esmaltar.",
    description:
      "Inspirado en los médanos de la costa, el Florero Arena conserva la textura cruda de la arcilla. Su terminación sin esmalte resalta la nobleza del material.",
    details: [
      "Arcilla con chamote, modelada a mano",
      "Altura aproximada: 18 cm",
      "Exterior sin esmaltar, interior impermeabilizado",
      "Limpiar con paño húmedo",
    ],
    image: productImages.floreroArena,
  },
  {
    id: "set-desayuno-calma",
    name: "Set Desayuno Calma",
    price: 35000,
    category: "sets-y-regalos",
    shortDescription: "Taza, plato de postre y bowl en tonos claros y naturales.",
    description:
      "Todo lo necesario para un desayuno sin apuro: una taza, un plato de postre y un bowl pequeño, esmaltados en tonos crema que combinan entre sí. Llega presentado para regalar.",
    details: [
      "Incluye taza, plato de postre y bowl",
      "Gres esmaltado en tonos crema",
      "Presentación lista para regalo",
      "Aptos para lavavajillas",
    ],
    image: productImages.setDesayunoCalma,
    badge: "Más elegido",
    featured: true,
  },
  {
    id: "jarra-serena",
    name: "Jarra Serena",
    price: 26000,
    category: "floreros-y-decoracion",
    shortDescription: "Jarra de pico suave para servir o lucir un ramo.",
    description:
      "Serena es una jarra de curvas amables y pico definido. Funciona para servir agua o limonada en la mesa y también como florero para un ramo de lavanda o flores de estación.",
    details: [
      "Gres torneado a mano",
      "Capacidad aproximada: 1 litro",
      "Esmalte blanco brillante",
      "Lavado a mano recomendado",
    ],
    image: productImages.jarraSerena,
    badge: "Nuevo",
  },
  {
    id: "vaso-marea",
    name: "Vaso Marea",
    price: 9500,
    category: "tazas-y-vasos",
    shortDescription: "Vaso sin asa en verde mar moteado con base de arcilla expuesta.",
    description:
      "Un vaso sin asa con esmalte verde moteado que recuerda al mar en invierno. La base queda sin esmaltar para mostrar el color natural de la arcilla.",
    details: [
      "Gres torneado a mano",
      "Capacidad aproximada: 250 ml",
      "Esmalte verde moteado, base cruda",
      "Apto para lavavajillas",
    ],
    image: productImages.vasoMarea,
  },
  {
    id: "porta-sahumerio-raiz",
    name: "Porta sahumerio Raíz",
    price: 8000,
    category: "floreros-y-decoracion",
    shortDescription: "Base baja para sahumerios y conos, de líneas mínimas.",
    description:
      "Una base baja y amplia que recoge las cenizas de sahumerios y conos. Pequeña, liviana y pensada para acompañar momentos de pausa.",
    details: [
      "Cerámica modelada a mano",
      "Diámetro aproximado: 12 cm",
      "Esmalte resistente al calor",
      "Usar siempre sobre superficies estables",
    ],
    image: productImages.portaSahumerio,
  },
  {
    id: "set-de-cuencos",
    name: "Set de Cuencos",
    price: 22000,
    category: "sets-y-regalos",
    shortDescription: "Tres cuencos con interior esmaltado en azul profundo.",
    description:
      "Tres cuencos de tamaños escalonados con exterior en arcilla clara e interior azul profundo. Perfectos para servir frutos secos, salsas o para un desayuno compartido.",
    details: [
      "Incluye 3 cuencos de distintos tamaños",
      "Diámetros aproximados: 10, 12 y 14 cm",
      "Interior esmaltado, exterior natural",
      "Aptos para lavavajillas",
    ],
    image: productImages.setCuencos,
  },
  {
    id: "centro-de-mesa-tierra",
    name: "Centro de Mesa Tierra",
    price: 32000,
    category: "bowls-y-platos",
    shortDescription: "Fuente amplia de forma libre para centro de mesa.",
    description:
      "Una fuente amplia y baja, modelada a mano con pellizco. Sus bordes ondulados y sus tonos tierra la convierten en un centro de mesa para frutas, panes o simplemente para ser contemplada.",
    details: [
      "Gres modelado a mano por pellizco",
      "Diámetro aproximado: 30 cm",
      "Esmalte en tonos tierra",
      "Cada pieza presenta variaciones únicas",
    ],
    image: productImages.centroMesaTierra,
    badge: "Edición limitada",
    featured: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

/** Productos de la misma categoría primero, completando con el resto. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const others = products.filter(
    (item) => item.category !== product.category && item.featured,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
