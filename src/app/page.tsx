import { About } from "@/components/about";
import { Catalog } from "@/components/catalog";
import { DeliveryLocations } from "@/components/delivery-locations";
import { Faq } from "@/components/faq";
import { Features } from "@/components/features";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />

      <ScrollReveal>
        <Features />
      </ScrollReveal>

      <ScrollReveal>
        <Catalog />
      </ScrollReveal>

      <ScrollReveal>
        <DeliveryLocations />
      </ScrollReveal>

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Faq />
      </ScrollReveal>

      <ScrollReveal>
        <FinalCta />
      </ScrollReveal>
    </main>
  );
}
