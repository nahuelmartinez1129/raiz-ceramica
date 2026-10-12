import type { Metadata } from "next";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StorySection } from "@/components/home/StorySection";

export const metadata: Metadata = {
  title: "Nuestra historia",
  description:
    "Cómo trabajamos en Raíz Cerámica: piezas hechas a mano en pequeños lotes, inspiradas en la naturaleza y los tonos de la tierra.",
  alternates: { canonical: "/nuestra-historia" },
  openGraph: {
    title: "Nuestra historia · Raíz Cerámica",
    description: "Piezas de cerámica hechas a mano en pequeños lotes.",
    url: "/nuestra-historia",
  },
};

export default function StoryPage() {
  return (
    <>
      <StorySection variant="full" />
      <ProcessSection />
      <BenefitsSection />
      <ContactSection />
    </>
  );
}
