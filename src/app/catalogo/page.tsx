import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogFallback, CatalogView } from "@/components/catalog/CatalogView";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Tazas, vasos, bowls, platos, floreros y sets de cerámica artesanal. Filtrá por categoría, buscá por nombre y armá tu pedido por WhatsApp.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo · Raíz Cerámica",
    description: "Piezas de cerámica artesanal hechas a mano en pequeños lotes.",
    url: "/catalogo",
  },
};

export default function CatalogPage() {
  return (
    <div className="container-page pt-10 pb-24 sm:pt-16">
      <header className="max-w-2xl">
        <p className="eyebrow">Colección completa</p>
        <h1 className="mt-4 text-5xl leading-[1.02] text-earth sm:text-6xl">Catálogo</h1>
        <p className="mt-5 text-base leading-relaxed text-earth-soft sm:text-lg">
          {products.length} piezas hechas a mano. Los precios son orientativos y la disponibilidad
          se confirma por WhatsApp.
        </p>
      </header>

      <div className="mt-10">
        <Suspense fallback={<CatalogFallback />}>
          <CatalogView />
        </Suspense>
      </div>
    </div>
  );
}
