import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.catalogHelp);

export function CatalogCta() {
  return (
    <section className="w-full bg-[#F5F0EB] px-4 py-20 md:py-24">
      <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
        <h2 className="font-serif text-[24px] font-bold text-[#1C1C1C] md:text-[40px]">
          Não encontrou o que procura?
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#6B6B6B] md:text-[17px]">
          A gente monta arranjos personalizados. Fale com a gente e a gente te
          ajuda a escolher.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp sobre arranjos personalizados"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#2D5A3D] px-8 py-4 text-[16px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-5" />
          Falar pelo WhatsApp
        </a>
      </div>
    </section>
  );
}
