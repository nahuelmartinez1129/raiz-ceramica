export type CategoryId =
  | "tazas-y-vasos"
  | "bowls-y-platos"
  | "floreros-y-decoracion"
  | "sets-y-regalos";

export type ProductBadge = "Nuevo" | "Más elegido" | "Edición limitada";

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: ImageAsset;
}

export interface Product {
  /** Identificador único, también usado como slug en la URL. */
  id: string;
  name: string;
  /** Precio en pesos argentinos, sin decimales. */
  price: number;
  category: CategoryId;
  shortDescription: string;
  description: string;
  /** Detalles artesanales: materiales, medidas aproximadas, cuidados. */
  details: string[];
  image: ImageAsset;
  badge?: ProductBadge;
  /** Productos que se muestran en la vitrina de la página de inicio. */
  featured?: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export type SortOption = "destacados" | "precio-asc" | "precio-desc";
