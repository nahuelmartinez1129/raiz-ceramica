import { Hand, Layers, MessageCircle, type LucideIcon } from "lucide-react";
import { benefits, type Benefit } from "@/data/content";

const icons: Record<Benefit["icon"], LucideIcon> = {
  hand: Hand,
  layers: Layers,
  message: MessageCircle,
};

export function BenefitsSection() {
  return (
    <section aria-label="Por qué elegir piezas artesanales" className="border-y border-sand bg-warm-white">
      <ul className="container-page grid divide-y divide-sand md:grid-cols-3 md:divide-x md:divide-y-0">
        {benefits.map((benefit) => {
          const Icon = icons[benefit.icon];
          return (
            <li key={benefit.title} className="flex gap-5 py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-terracotta-deep">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-tight text-earth">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-earth-soft">{benefit.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
