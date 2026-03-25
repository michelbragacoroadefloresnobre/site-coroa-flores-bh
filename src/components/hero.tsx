import Image from "next/image";
import { MessageCircle, ChevronDown, Clock, MapPin } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.generalHelp);

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero.jpg"
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
      <div className="relative z-10 flex flex-col items-center px-4 py-24 text-center">
        {/* Trust badge */}
        <div
          className="flex items-center gap-4 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm md:gap-5 md:px-7 md:py-3.5"
          style={{ animation: "hero-fade-up 0.8s ease-out both" }}
        >
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 md:gap-2 md:text-[18px]">
            <Clock className="size-3.5 md:size-5" />
            Atendimento 24h
          </span>
          <span className="h-3.5 w-px bg-white/30 md:h-5" />
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/90 md:gap-2 md:text-[18px]">
            <MapPin className="size-3.5 md:size-5" />
            São Paulo e região
          </span>
        </div>

        <h1
          className="mt-7 max-w-[800px] font-serif text-[32px] leading-[1.15] font-bold text-white sm:text-[44px] md:text-[56px]"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.15s both" }}
        >
          Coroas de flores entregues em São Paulo com cuidado e no tempo certo.
        </h1>

        <p
          className="mt-6 max-w-[560px] text-lg text-white/90 md:text-xl"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.3s both" }}
        >
          Atendimento pelo WhatsApp, 24 horas. A gente te orienta e cuida de
          tudo até a entrega.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#2D5A3D] px-8 py-4 text-[17px] font-medium text-white shadow-[0_4px_24px_rgba(0,0,0,0.25)] transition-all duration-200 hover:bg-[#346844] hover:shadow-[0_6px_32px_rgba(0,0,0,0.3)]"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.45s both" }}
        >
          <MessageCircle className="size-5" />
          Falar pelo WhatsApp
        </a>

        <p
          className="mt-3 text-sm text-white/75"
          style={{ animation: "hero-fade-up 0.8s ease-out 0.55s both" }}
        >
          Respondemos em minutos. Atendemos agora, inclusive feriados.
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#catalogo"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity hover:opacity-80"
      >
        <div
          className="flex flex-col items-center gap-1"
          style={{ animation: "scroll-hint 2.5s ease-in-out infinite" }}
        >
          <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">
            Saiba mais
          </span>
          <ChevronDown className="size-5 text-white/50" />
        </div>
      </a>
    </section>
  );
}
