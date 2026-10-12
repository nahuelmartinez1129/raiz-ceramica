import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/content";

export function ProcessSection() {
  return (
    <section aria-labelledby="proceso-title" className="py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          id="proceso-title"
          eyebrow="El proceso"
          title="Del barro a tu mesa"
          description="Cada pieza atraviesa varias etapas y semanas de trabajo. Ninguna sale exactamente igual a la anterior."
          align="center"
        />

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {processSteps.map((step, index) => (
            <li key={step.number} className={`reveal ${index === 1 ? "md:mt-16" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                <SafeImage
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(min-width: 768px) 30vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6 flex gap-5">
                <span className="font-serif text-5xl leading-none text-terracotta" aria-hidden="true">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-earth">
                    <span className="sr-only">Paso {index + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-earth-soft">{step.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
