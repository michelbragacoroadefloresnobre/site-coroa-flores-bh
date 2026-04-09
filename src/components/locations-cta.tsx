import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.deliveryInquiry);

export function LocationsCta() {
  return (
    <section className="px-4 py-20 md:py-24">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#F5F0EB] px-6 py-14 text-center md:px-12 md:py-16">
        <h2 className="font-serif text-[28px] font-bold text-[#1A1A1A] sm:text-[34px] md:text-[38px]">
          Não encontrou sua cidade?
        </h2>

        <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-[#6B6B6B]">
          Atendemos outras cidades da região metropolitana de Belo Horizonte e também de todo o Brasil. Consulte a disponibilidade pelo WhatsApp.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#2D5A3D] px-8 py-4 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-5" />
          Consultar disponibilidade
        </a>
      </div>
    </section>
  );
}
