import { MessageCircle } from "lucide-react"
import { buildWhatsappUrl } from "@/lib/whatsapp"
import { locationDeliveryMessage } from "@/lib/whatsapp-messages"

export function LocationCta({ locationName }: { locationName: string }) {
  const whatsappUrl = buildWhatsappUrl(locationDeliveryMessage(locationName))

  return (
    <section className="px-4 py-16 md:py-20">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#F5F0EB] px-6 py-14 text-center md:px-12 md:py-16">
        <h2 className="font-serif text-[28px] font-bold text-[#1A1A1A] sm:text-[34px] md:text-[38px]">
          Precisa de ajuda com seu pedido?
        </h2>

        <p className="mx-auto mt-4 max-w-[560px] text-[17px] text-[#6B6B6B]">
          Nossa equipe está disponível 24 horas para ajudar você a escolher a
          homenagem ideal e garantir a entrega no horário.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp sobre entrega"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#2D5A3D] px-8 py-4 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-5" />
          Falar pelo WhatsApp
        </a>
      </div>
    </section>
  )
}
