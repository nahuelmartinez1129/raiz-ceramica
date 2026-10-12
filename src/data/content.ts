import type { ImageAsset } from "@/types";
import { siteImages } from "./images";

/** Textos editoriales del sitio. Editables sin tocar los componentes. */

export const heroContent = {
  eyebrow: "Cerámica artesanal · Pequeños lotes",
  title: "La belleza de lo imperfecto",
  subtitle:
    "Cada pieza se modela, esmalta y hornea a mano. Por eso ninguna es igual a otra: sus marcas, motas y variaciones son parte de su historia.",
  primaryCta: { label: "Explorar colección", href: "/catalogo" },
  secondaryCta: { label: "Conocé nuestra historia", href: "/nuestra-historia" },
};

export const storyContent = {
  eyebrow: "Nuestra historia",
  title: "Objetos cotidianos que también cuentan historias",
  paragraphs: [
    "En Raíz creemos que los objetos cotidianos también pueden contar historias. Creamos piezas de cerámica en pequeños lotes, inspiradas en la naturaleza, los tonos de la tierra y la belleza de lo hecho a mano.",
    "Trabajamos sin apuro, respetando los tiempos de la arcilla: el secado, la primera cocción, el esmaltado y el horneado final. Cada etapa deja una huella distinta en la pieza.",
    "Nos inspiran la costa, los médanos y la luz cálida de las tardes. Buscamos objetos simples, nobles y duraderos, pensados para usarse todos los días.",
  ],
  quote: "No buscamos la perfección: buscamos piezas con carácter.",
  disclaimer:
    "Raíz Cerámica es una marca ficticia. Esta historia es un texto demostrativo creado para ilustrar cómo podría presentarse un emprendimiento real.",
};

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: ImageAsset;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Diseñamos cada pieza",
    description:
      "Partimos de bocetos y formas simples. Pensamos cómo se va a usar cada objeto antes de tocar la arcilla.",
    image: siteImages.processDesign,
  },
  {
    number: "02",
    title: "Modelamos y esmaltamos a mano",
    description:
      "Torneamos, pellizcamos o trabajamos en placas. Luego aplicamos los esmaltes a mano, capa por capa.",
    image: siteImages.processGlaze,
  },
  {
    number: "03",
    title: "Cada pieza encuentra su hogar",
    description:
      "Después de dos cocciones, la pieza está lista para acompañar desayunos, mesas compartidas y rincones de tu casa.",
    image: siteImages.processHome,
  },
];

export interface Benefit {
  title: string;
  description: string;
  icon: "hand" | "layers" | "message";
}

export const benefits: Benefit[] = [
  {
    title: "Piezas con identidad artesanal",
    description:
      "Las variaciones de color, textura y forma son propias del trabajo manual.",
    icon: "hand",
  },
  {
    title: "Colecciones en pequeñas cantidades",
    description:
      "Producimos en lotes reducidos, por lo que algunas piezas pueden agotarse.",
    icon: "layers",
  },
  {
    title: "Consultas directas por WhatsApp",
    description:
      "Armás tu pedido en el sitio y lo enviás por WhatsApp para coordinar con el taller.",
    icon: "message",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "¿Cómo realizo un pedido?",
    answer:
      "Agregá las piezas que te gusten al carrito y tocá “Enviar pedido por WhatsApp”. Se abrirá una conversación con el detalle de productos, cantidades y total estimado. El pedido queda confirmado recién cuando el comercio responde con disponibilidad y condiciones.",
  },
  {
    question: "¿Puedo consultar por una pieza personalizada?",
    answer:
      "Sí, podés escribirnos por WhatsApp contando qué necesitás. La posibilidad de personalizar, los plazos y el precio se confirman con el comercio según cada caso.",
  },
  {
    question: "¿Cómo se coordina la entrega?",
    answer:
      "Las formas de entrega, retiro o envío se coordinan por WhatsApp una vez confirmada la disponibilidad. Las opciones y sus costos dependen de la zona y los confirma el comercio.",
  },
  {
    question: "¿Los productos son idénticos entre sí?",
    answer:
      "No. Al ser piezas hechas a mano, cada una puede tener pequeñas diferencias de forma, tamaño, color o textura respecto de la fotografía. Esas variaciones son parte del carácter artesanal.",
  },
  {
    question: "¿Cómo consulto la disponibilidad?",
    answer:
      "Desde la ficha de cada producto podés tocar “Consultar por WhatsApp”. Como producimos en pequeños lotes, el stock se confirma siempre de forma directa con el comercio.",
  },
];
