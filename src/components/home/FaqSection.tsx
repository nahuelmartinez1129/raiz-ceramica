import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

export function FaqSection() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="Preguntas frecuentes"
            title="Antes de hacer tu pedido"
            description="Si tenés otra duda, escribinos por WhatsApp y te respondemos directamente."
          />
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-sand-deep first:border-t">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-2xl leading-snug text-earth transition-colors hover:text-terracotta-deep">
                {faq.question}
                <Plus
                  className="faq-icon h-5 w-5 shrink-0 text-terracotta-deep transition-transform duration-300"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-7 text-base leading-relaxed text-earth-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
