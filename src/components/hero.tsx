import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.generalHelp);

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(44vh+var(--header-height))] items-center justify-center overflow-hidden pt-(--header-height) sm:min-h-[calc(50vh+var(--header-height))] md:min-h-[calc(52vh+var(--header-height))]">
      {/* Background image */}
      <Image
        src="/hero.png"
        alt="Coroa de flores brancas"
        fill
        className="object-cover"
        sizes="100vw"
        priority
        loading="eager"
      />

      {/* Layered gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/25" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1
          className="max-w-[800px] font-serif text-[26px] leading-[1.2] font-bold text-white sm:text-[40px] md:text-[56px] md:leading-[1.15]"
          style={{ animation: "hero-fade-up 0.8s ease-out both" }}
        >
          Coroas de Flores para Velório em Belo Horizonte com Entrega Rápida e Preço Justo.
        </h1>

        <p
          className="mt-3 max-w-[560px] text-base text-white/90 md:mt-6 md:text-xl"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.15s both" }}
        >
          Pontualidade e respeito em toda a região metropolitana de BH.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar mensagem pelo WhatsApp"
          className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2D5A3D] px-4 py-3 text-[clamp(12px,4vw,17px)] font-medium whitespace-nowrap text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-[#346844] hover:shadow-[0_6px_32px_rgba(0,0,0,0.3)] md:mt-8 md:inline-flex md:w-auto md:px-8 md:py-4 md:text-[17px]"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.3s both" }}
        >
          <MessageCircle className="size-5" />
          NOS CHAME NO WHATSAPP AGORA!
        </a>

        <p
          className="mt-2 text-[13px] text-white/75 md:mt-3 md:text-sm"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.4s both" }}
        >
          Respondemos em menos de 2 minutos. Atendemos agora, inclusive feriados.
        </p>
      </div>
    </section>
  );
}
