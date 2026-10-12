import { BenefitsSection } from "@/components/home/BenefitsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FaqSection } from "@/components/home/FaqSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { StorySection } from "@/components/home/StorySection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsSection />
      <FeaturedCategories />
      <FeaturedProducts />
      <StorySection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
