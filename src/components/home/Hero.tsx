import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { heroContent } from "@/data/content";
import { siteImages } from "@/data/images";

export function Hero() {
  const [lead, last] = splitLastWord(heroContent.title);

  return (
    <section aria-labelledby="hero-title" className="grain overflow-hidden">
      <div className="container-page grid items-center gap-10 pt-8 pb-16 sm:pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-10 lg:pb-24">
        <div className="lg:col-span-5 lg:pr-6">
          <p className="eyebrow animate-fade-up">{heroContent.eyebrow}</p>
          <h1
            id="hero-title"
            className="mt-6 text-[3.25rem] leading-[0.95] text-earth animate-fade-up [animation-delay:120ms] sm:text-7xl lg:text-[5.5rem]"
          >
            {lead} <em className="font-normal text-terracotta-deep italic">{last}</em>
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-earth-soft animate-fade-up [animation-delay:240ms] sm:text-lg">
            {heroContent.subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-3 animate-fade-up [animation-delay:360ms] sm:flex-row">
            <Link href={heroContent.primaryCta.href} className="btn btn-primary group">
              {heroContent.primaryCta.label}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link href={heroContent.secondaryCta.href} className="btn btn-outline">
              {heroContent.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand animate-fade-in sm:aspect-[5/4] lg:aspect-[6/7]">
            <SafeImage
              src={siteImages.hero.src}
              alt={siteImages.hero.alt}
              fill
              preload
              quality={85}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </div>

          <div className="absolute -bottom-6 left-4 max-w-[15rem] bg-warm-white p-5 shadow-[0_20px_50px_rgb(64_53_46/0.12)] animate-fade-up [animation-delay:600ms] sm:left-8 lg:-left-10">
            <p className="font-serif text-xl leading-snug text-earth">
              Hecho a mano, en pequeños lotes.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-earth-soft">
              Cada pieza tiene variaciones únicas de forma y esmalte.
            </p>
          </div>

          <p
            aria-hidden="true"
            className="absolute top-6 -right-2 hidden origin-top-right translate-x-full -rotate-90 text-[0.65rem] font-semibold tracking-[0.4em] text-earth-soft uppercase xl:block"
          >
            Hecho a mano · Miramar
          </p>
        </div>
      </div>
    </section>
  );
}

function splitLastWord(text: string): [string, string] {
  const index = text.lastIndexOf(" ");
  return index === -1 ? ["", text] : [text.slice(0, index), text.slice(index + 1)];
}
