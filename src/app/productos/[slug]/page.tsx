import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Hand, Info } from "lucide-react";
import { ProductBadge } from "@/components/product/ProductBadge";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/config/site";
import { getCategory } from "@/data/categories";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/productos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const title = `${product.name} — ${formatPrice(product.price)}`;
  return {
    title,
    description: product.shortDescription,
    alternates: { canonical: `/productos/${product.id}` },
    openGraph: {
      title: `${product.name} · ${siteConfig.name}`,
      description: product.shortDescription,
      url: `/productos/${product.id}`,
      images: [{ url: product.image.src, alt: product.image.alt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/productos/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <>
      <div className="container-page pt-6 pb-20 sm:pt-10">
        <nav aria-label="Ruta de navegación" className="text-sm text-earth-soft">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/catalogo" className="link-underline inline-flex items-center gap-1 text-earth">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Catálogo
              </Link>
            </li>
            {category ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href={`/catalogo?categoria=${category.id}`} className="link-underline">
                    {category.name}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-earth">
              {product.name}
            </li>
          </ol>
        </nav>

        <article className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand lg:sticky lg:top-28">
              <SafeImage
                src={product.image.src}
                alt={product.image.alt}
                fill
                preload
                quality={85}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
                fallbackLabel={product.name}
              />
              {product.badge ? (
                <ProductBadge badge={product.badge} className="absolute top-4 left-4" />
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            {category ? <p className="eyebrow">{category.name}</p> : null}
            <h1 className="mt-3 text-5xl leading-[1.02] text-earth sm:text-6xl">{product.name}</h1>
            <p className="mt-4 font-serif text-3xl text-earth tabular-nums lining-nums">
              {formatPrice(product.price)}
              <span className="ml-2 align-middle font-sans text-xs font-medium tracking-wide text-earth-soft">
                ARS · precio orientativo
              </span>
            </p>

            <p className="mt-6 text-base leading-relaxed text-earth-soft sm:text-lg">{product.description}</p>

            <div className="mt-8">
              <ProductPurchase product={product} />
            </div>

            <section aria-labelledby="detalles-title" className="mt-10 border-t border-sand-deep pt-8">
              <h2 id="detalles-title" className="flex items-center gap-2 font-serif text-2xl text-earth">
                <Hand className="h-5 w-5 text-terracotta-deep" aria-hidden="true" strokeWidth={1.6} />
                Información artesanal
              </h2>
              <ul className="mt-4 space-y-2.5">
                {product.details.map((detail) => (
                  <li key={detail} className="flex gap-3 text-sm leading-relaxed text-earth-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-8 flex gap-3 rounded-sm bg-sand/60 p-4 text-sm leading-relaxed text-earth">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-deep" aria-hidden="true" />
              Al ser una pieza hecha a mano, puede presentar leves variaciones de forma, color y
              textura respecto de la fotografía. La disponibilidad se confirma por WhatsApp.
            </p>
          </div>
        </article>
      </div>

      {related.length > 0 ? (
        <section aria-labelledby="relacionados-title" className="border-t border-sand bg-warm-white py-20 sm:py-24">
          <div className="container-page">
            <p className="eyebrow">Seguí explorando</p>
            <h2 id="relacionados-title" className="mt-4 text-4xl text-earth sm:text-5xl">
              También te puede gustar
            </h2>
            <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
