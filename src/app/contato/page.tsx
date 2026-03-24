import { ContactHero } from "@/components/contact-hero";
import { ContactChannels } from "@/components/contact-channels";
import { ContactCta } from "@/components/contact-cta";

export default function ContatoPage() {
  return (
    <main>
      <ContactHero />
      <ContactChannels />
      <ContactCta />
    </main>
  );
}
