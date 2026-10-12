"use client";

import { SearchX } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { getCategory, isCategoryId } from "@/data/categories";
import { products } from "@/data/products";
import { filterProducts, isSortOption, type CatalogFilters as Filters } from "@/lib/catalog";
import { pluralize } from "@/lib/format";
import { CatalogFilters } from "./CatalogFilters";

type ReadableParams = Pick<URLSearchParams, "get">;

function parseFilters(params: ReadableParams): Filters {
  const category = params.get("categoria");
  const sort = params.get("orden");
  return {
    category: isCategoryId(category) ? category : null,
    query: params.get("q") ?? "",
    sort: isSortOption(sort) ? sort : "destacados",
  };
}

function serializeFilters(filters: Filters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("categoria", filters.category);
  if (filters.query.trim()) params.set("q", filters.query);
  if (filters.sort !== "destacados") params.set("orden", filters.sort);
  return params.toString();
}

/**
 * Catálogo filtrable. Los filtros viven en la URL (?categoria=&q=&orden=),
 * así se pueden compartir enlaces a una categoría o búsqueda concreta.
 */
export function CatalogView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();

  const [filters, setFilters] = useState<Filters>(() => parseFilters(searchParams));
  const [syncedKey, setSyncedKey] = useState(paramsKey);

  // Si la URL cambia desde afuera (por ejemplo, un enlace del pie de página),
  // se actualizan los filtros durante el render, sin efectos adicionales.
  if (paramsKey !== syncedKey) {
    setSyncedKey(paramsKey);
    if (paramsKey !== serializeFilters(filters)) setFilters(parseFilters(searchParams));
  }

  const update = (patch: Partial<Filters>) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    const query = serializeFilters(next);
    // replaceState se integra con el router de Next.js sin recargar la página.
    window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
  };

  const results = filterProducts(products, filters);
  const activeCategory = filters.category ? getCategory(filters.category) : undefined;
  const hasFilters = Boolean(filters.category || filters.query.trim());

  return (
    <div>
      <CatalogFilters
        filters={filters}
        onCategoryChange={(category) => update({ category })}
        onQueryChange={(query) => update({ query })}
        onSortChange={(sort) => update({ sort })}
      />

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-2 border-b border-sand pb-4">
        <p className="text-sm text-earth-soft" role="status" aria-live="polite">
          {results.length === 0
            ? "No hay piezas que coincidan"
            : `Mostrando ${pluralize(results.length, "pieza", "piezas")}`}
          {activeCategory ? ` en ${activeCategory.name.toLowerCase()}` : ""}
          {filters.query.trim() ? ` para “${filters.query.trim()}”` : ""}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => update({ category: null, query: "" })}
            className="link-underline text-sm font-semibold text-earth"
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>

      {activeCategory ? (
        <p className="mt-6 max-w-xl font-serif text-2xl leading-snug text-earth">
          {activeCategory.description}
        </p>
      ) : null}

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} priority={index < 3} headingLevel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-12 flex flex-col items-center rounded-sm border border-dashed border-sand-deep bg-warm-white px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand text-terracotta-deep">
            <SearchX className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-6 font-serif text-3xl text-earth">No encontramos esa pieza</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-earth-soft">
            Probá con otra palabra o explorá todas las categorías. También podés consultarnos por
            WhatsApp por una pieza personalizada.
          </p>
          <button
            type="button"
            onClick={() => update({ category: null, query: "" })}
            className="btn btn-primary mt-8"
          >
            Ver todas las piezas
          </button>
        </div>
      )}
    </div>
  );
}

/** Vista estática que se muestra mientras se leen los parámetros de la URL. */
export function CatalogFallback() {
  return (
    <ul className="mt-[8.5rem] grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <li key={product.id}>
          <ProductCard product={product} priority={index < 3} headingLevel="h2" />
        </li>
      ))}
    </ul>
  );
}
