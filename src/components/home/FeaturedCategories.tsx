import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section aria-labelledby="categorias-title" className="bg-warm-white py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            id="categorias-title"
            eyebrow="Colecciones"
            title="Para cada momento de la casa"
          />
          <Link href="/catalogo" className="link-underline self-start text-sm font-semibold text-earth sm:self-auto">
            Ver catálogo completo
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {categories.map((category, index) => (
            <li key={category.id} className="reveal">
              <Link href={`/catalogo?categoria=${category.id}`} className="group block">
                <div
                  className={`relative overflow-hidden rounded-sm bg-sand ${
                    index % 2 === 1 ? "aspect-[3/4] lg:mt-12" : "aspect-[3/4]"
                  }`}
                >
                  <SafeImage
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, 46vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    fallbackLabel={category.name}
                  />
                  <span className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/90 text-earth opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-earth sm:text-[1.7rem]">
                  {category.name}
                </h3>
                <p className="mt-1 hidden text-sm leading-relaxed text-earth-soft sm:block">
                  {category.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
