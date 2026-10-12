import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { storyContent } from "@/data/content";
import { siteImages } from "@/data/images";

interface StorySectionProps {
  /** En la página de inicio se muestra un resumen con enlace a la historia completa. */
  variant?: "teaser" | "full";
}

export function StorySection({ variant = "teaser" }: StorySectionProps) {
  const paragraphs = variant === "teaser" ? storyContent.paragraphs.slice(0, 1) : storyContent.paragraphs;
  const Heading = variant === "full" ? "h1" : "h2";

  return (
    <section aria-labelledby="historia-title" className="grain bg-sand/60 py-20 sm:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[4/5] w-[85%] overflow-hidden rounded-sm bg-sand">
            <SafeImage
              src={siteImages.storyMain.src}
              alt={siteImages.storyMain.alt}
              fill
              preload={variant === "full"}
              sizes="(min-width: 1024px) 40vw, 85vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 left-0 aspect-square w-[45%] overflow-hidden rounded-sm border-8 border-cream bg-sand shadow-xl sm:-bottom-12">
            <SafeImage
              src={siteImages.storySecondary.src}
              alt={siteImages.storySecondary.alt}
              fill
              sizes="(min-width: 1024px) 20vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="pt-8 lg:col-span-5 lg:col-start-8 lg:pt-0">
          <p className="eyebrow">{storyContent.eyebrow}</p>
          <Heading id="historia-title" className="mt-4 text-4xl leading-[1.05] text-earth sm:text-5xl">
            {storyContent.title}
          </Heading>
          <div className="mt-7 space-y-5 text-base leading-relaxed text-earth-soft sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <blockquote className="mt-8 border-l-2 border-terracotta pl-5 font-serif text-2xl leading-snug text-earth italic">
            “{storyContent.quote}”
          </blockquote>

          {variant === "teaser" ? (
            <Link href="/nuestra-historia" className="btn btn-outline group mt-10">
              Conocé nuestra historia
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          ) : (
            <p className="mt-8 rounded-sm bg-warm-white/70 p-4 text-xs leading-relaxed text-earth-soft">
              {storyContent.disclaimer}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
