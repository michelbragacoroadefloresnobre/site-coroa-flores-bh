import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import cities from "@/data/cities.json";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.deliveryRegionInquiry);

export function DeliveryLocations() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] px-4 py-20 md:py-24">
      {/* Decorative background pin */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -right-10 top-8 size-[320px] opacity-[0.03]" viewBox="0 0 24 24" fill="#2D5A3D">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <svg className="absolute -left-12 bottom-12 size-[250px] opacity-[0.02]" viewBox="0 0 24 24" fill="#2D5A3D">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1100px] text-center">
        {/* Header */}
        <h2 className="font-serif text-[32px] font-bold text-[#1C1C1C] md:text-[40px]">
          Entregamos em São Paulo e em toda a região metropolitana
        </h2>
        <p className="mt-4 text-[17px] text-[#6B6B6B]">
          Cobertura ampla com entrega em até 1 hora. Veja se atendemos a sua
          região.
        </p>

        {/* Chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2.5">
          {cities.map((city) => (
            <span
              key={city}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E0D8CC] bg-white px-4 py-2 text-[14px] text-[#1C1C1C]"
            >
              <MapPin className="size-3.5 text-[#2D5A3D]" strokeWidth={2} />
              {city}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/locais"
            className="inline-flex items-center rounded-full bg-[#2D5A3D] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            Ver todos os locais de entrega
          </Link>
          <p className="mt-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#2D5A3D] hover:underline"
            >
              <MessageCircle className="size-3.5" />
              Não encontrou sua cidade? Fale com a gente pelo WhatsApp.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
