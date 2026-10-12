import type { ImageAsset } from "@/types";

/**
 * Fotografías demostrativas (Unsplash, licencia gratuita).
 * Son ilustrativas: no muestran piezas producidas por la marca ficticia.
 * Para usar fotos propias, reemplazá el `src` por la URL o ruta local
 * (por ejemplo "/productos/taza-alba.jpg" dentro de /public).
 */
const unsplash = (photo: string, width = 1600): string =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${width}&q=80`;

export const siteImages = {
  hero: {
    src: unsplash("photo-1677761640321-b80251be00ca", 2000),
    alt: "Dos piezas de cerámica claras sobre un lienzo de lino iluminado por luz natural cálida",
  },
  storyMain: {
    src: unsplash("photo-1753164725896-f0a39315ff8a"),
    alt: "Manos de un ceramista dando forma a una pieza de arcilla en el torno",
  },
  storySecondary: {
    src: unsplash("photo-1740329362219-08c21cfe3dbc"),
    alt: "Mesa de taller con platos, tazas y cuencos de cerámica junto a una ventana",
  },
  processDesign: {
    src: unsplash("photo-1595351298020-038700609878"),
    alt: "Torno de alfarería en movimiento con herramientas y arcilla a un costado",
  },
  processGlaze: {
    src: unsplash("photo-1673339065013-f8411fb93848"),
    alt: "Persona pintando a mano el esmalte de un cuenco de cerámica con un pincel",
  },
  processHome: {
    src: unsplash("photo-1680901250951-fa314c006ca8"),
    alt: "Florero con flores secas sobre una mesa en un ambiente hogareño",
  },
  ctaBand: {
    src: unsplash("photo-1763824372146-95e9b6d90926", 2000),
    alt: "Filas de vasos de cerámica sin esmaltar secándose en un taller",
  },
} satisfies Record<string, ImageAsset>;

export const categoryImages = {
  tazas: {
    src: unsplash("photo-1605117012605-b68dedd4accc", 1200),
    alt: "Taza de cerámica gris sobre un plato texturado, con luz lateral",
  },
  bowls: {
    src: unsplash("photo-1556205801-a0bf81cdc90d", 1200),
    alt: "Tres bowls de cerámica blanca moteada sobre una superficie clara",
  },
  floreros: {
    src: unsplash("photo-1597696929736-6d13bed8e6a8", 1200),
    alt: "Colección de floreros de cerámica en tonos neutros sobre madera",
  },
  sets: {
    src: unsplash("photo-1649270716777-1bd08cb443f5", 1200),
    alt: "Jarra y tazas de cerámica terracota sobre una mesa de madera",
  },
} satisfies Record<string, ImageAsset>;

export const productImages = {
  tazaAlba: {
    src: unsplash("photo-1633738674687-9505aa528801"),
    alt: "Taza de cerámica en tono rosado terracota proyectando una sombra suave",
  },
  tazaNube: {
    src: unsplash("photo-1518548981607-b068130027d2"),
    alt: "Taza de cerámica gris junto a un paño de lino y una rama de flores secas",
  },
  bowlTierra: {
    src: unsplash("photo-1572003414130-d1b4632a0d73"),
    alt: "Bowls de cerámica blanca moteada apilados de forma orgánica",
  },
  platoBruma: {
    src: unsplash("photo-1614548539644-ef528186523a"),
    alt: "Plato de cerámica blanca moteada con servilleta de lino y cubiertos",
  },
  floreroOrganico: {
    src: unsplash("photo-1643569556871-91ec60671ed7"),
    alt: "Florero de cerámica beige con forma circular y centro hueco",
  },
  floreroArena: {
    src: unsplash("photo-1631125915973-e0d155a14e4e"),
    alt: "Tres floreros de cerámica color arena con textura rústica sobre un pedestal",
  },
  setDesayunoCalma: {
    src: unsplash("photo-1610701596061-2ecf227e85b2"),
    alt: "Vajilla de cerámica clara para desayuno sobre una mesa de madera",
  },
  jarraSerena: {
    src: unsplash("photo-1630406863872-cc385078a650"),
    alt: "Jarra de cerámica blanca con un ramo de lavanda seca",
  },
  vasoMarea: {
    src: unsplash("photo-1782351076283-73aa35f76058"),
    alt: "Vaso de cerámica verde moteado con base de arcilla expuesta sobre madera",
  },
  portaSahumerio: {
    src: unsplash("photo-1617954095840-0427f79be4cf"),
    alt: "Porta sahumerio de cerámica con un cono encendido y humo suave",
  },
  setCuencos: {
    src: unsplash("photo-1610128361323-6e941c97f023"),
    alt: "Cuencos de cerámica con interior azul esmaltado junto a lavanda",
  },
  centroMesaTierra: {
    src: unsplash("photo-1731162694065-b4e5f6a667e6"),
    alt: "Cuencos de cerámica de formas orgánicas en tonos tierra sobre un estante",
  },
} satisfies Record<string, ImageAsset>;
