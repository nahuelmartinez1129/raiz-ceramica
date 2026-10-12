import type { CategoryId, Product, SortOption } from "@/types";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "destacados", label: "Destacados" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
];

export function isSortOption(value: string | null | undefined): value is SortOption {
  return sortOptions.some((option) => option.value === value);
}

/** Normaliza texto para buscar sin importar mayúsculas ni tildes. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export interface CatalogFilters {
  category: CategoryId | null;
  query: string;
  sort: SortOption;
}

export function filterProducts(products: Product[], filters: CatalogFilters): Product[] {
  const query = normalizeText(filters.query);

  const filtered = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (query && !normalizeText(product.name).includes(query)) return false;
    return true;
  });

  if (filters.sort === "precio-asc") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (filters.sort === "precio-desc") {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
}
