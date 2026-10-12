import type { Category, CategoryId } from "@/types";
import { categoryImages } from "./images";

export const categories: Category[] = [
  {
    id: "tazas-y-vasos",
    name: "Tazas y vasos",
    description: "Para el primer café del día y los rituales de la tarde.",
    image: categoryImages.tazas,
  },
  {
    id: "bowls-y-platos",
    name: "Bowls y platos",
    description: "Piezas de mesa con texturas que invitan a compartir.",
    image: categoryImages.bowls,
  },
  {
    id: "floreros-y-decoracion",
    name: "Floreros y decoración",
    description: "Formas orgánicas para flores secas, ramas y rincones.",
    image: categoryImages.floreros,
  },
  {
    id: "sets-y-regalos",
    name: "Sets y regalos",
    description: "Combinaciones pensadas para regalar o regalarse.",
    image: categoryImages.sets,
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return categories.some((category) => category.id === value);
}
