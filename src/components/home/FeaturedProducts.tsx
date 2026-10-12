import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts, products } from "@/data/products";

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section aria-labelledby="destacados-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="destacados-title"
          eyebrow="Piezas destacadas"
          title="Las favoritas del taller"
          description="Una selección de piezas para empezar a recorrer la colección. Todas se pueden consultar o sumar al pedido."
        />

        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <li key={product.id} className="reveal">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <Link href="/catalogo" className="btn btn-outline group">
            Ver las {products.length} piezas del catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
