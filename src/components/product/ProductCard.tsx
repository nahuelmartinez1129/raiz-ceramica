import Link from "next/link";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { AddToCartButton } from "./AddToCartButton";
import { ProductBadge } from "./ProductBadge";

interface ProductCardProps {
  product: Product;
  /** Prioriza la carga de las imágenes visibles al inicio. */
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProductCard({ product, priority = false, headingLevel = "h3" }: ProductCardProps) {
  const Heading = headingLevel;
  const href = `/productos/${product.id}`;
  const category = getCategory(product.category);

  return (
    <article className="group relative flex flex-col">
      {/* Toda la tarjeta es clicable gracias al enlace extendido del título. */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
        <SafeImage
          src={product.image.src}
          alt={product.image.alt}
          fill
          preload={priority}
          sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          fallbackLabel={product.name}
        />
        {product.badge ? (
          <ProductBadge badge={product.badge} className="absolute top-3 left-3" />
        ) : null}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {category ? (
            <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-earth-soft uppercase">
              {category.name}
            </p>
          ) : null}
          <Heading className="mt-1 font-serif text-2xl leading-tight text-earth">
            <Link
              href={href}
              className="link-underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-terracotta-deep"
            >
              {product.name}
            </Link>
          </Heading>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-earth-soft">
            {product.shortDescription}
          </p>
          <p className="mt-2 text-base font-semibold text-earth tabular-nums">
            {formatPrice(product.price)}
          </p>
        </div>
        {/* Por encima del enlace extendido de la tarjeta. */}
        <div className="relative z-10 mt-5">
          <AddToCartButton productId={product.id} productName={product.name} variant="icon" />
        </div>
      </div>
    </article>
  );
}
