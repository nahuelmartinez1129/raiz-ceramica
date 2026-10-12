"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { sortOptions, type CatalogFilters as Filters } from "@/lib/catalog";
import type { CategoryId, SortOption } from "@/types";

interface CatalogFiltersProps {
  filters: Filters;
  onCategoryChange: (category: CategoryId | null) => void;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export function CatalogFilters({
  filters,
  onCategoryChange,
  onQueryChange,
  onSortChange,
}: CatalogFiltersProps) {
  const chips: { id: CategoryId | null; label: string }[] = [
    { id: null, label: "Todo" },
    ...categories.map((category) => ({ id: category.id, label: category.name })),
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar por nombre
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-earth-soft"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            enterKeyHint="search"
            placeholder="Buscar piezas por nombre…"
            value={filters.query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="h-12 w-full rounded-full border border-sand-deep bg-warm-white pr-12 pl-11 text-base text-earth placeholder:text-earth-soft/70 focus:border-earth focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep [&::-webkit-search-cancel-button]:hidden"
          />
          {filters.query ? (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="absolute top-1/2 right-1.5 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-earth-soft hover:bg-sand hover:text-earth"
              aria-label="Borrar búsqueda"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <div className="relative sm:w-64">
          <label htmlFor="catalog-sort" className="sr-only">
            Ordenar productos
          </label>
          <select
            id="catalog-sort"
            value={filters.sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-12 w-full cursor-pointer appearance-none rounded-full border border-sand-deep bg-warm-white pr-11 pl-5 text-sm font-medium text-earth focus:border-earth focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                Ordenar: {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-earth-soft"
            aria-hidden="true"
          />
        </div>
      </div>

      <div role="group" aria-label="Filtrar por categoría" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 pb-1 sm:w-auto sm:flex-wrap">
          {chips.map((chip) => {
            const active = filters.category === chip.id;
            return (
              <li key={chip.id ?? "todo"}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => onCategoryChange(chip.id)}
                  className={`h-10 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                    active
                      ? "border-earth bg-earth text-warm-white"
                      : "border-sand-deep bg-transparent text-earth hover:border-earth"
                  }`}
                >
                  {chip.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
