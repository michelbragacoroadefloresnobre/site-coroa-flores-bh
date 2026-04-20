import { MessageCircle, Clock, Lock, CreditCard } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.urgentOrder);

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[#1a3a2a] px-6 py-20 md:py-28">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          className="absolute -top-1/4 -left-1/4 size-[800px] opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="0.5" />
        </svg>
        <svg
          className="absolute -right-1/4 -bottom-1/4 size-[600px] opacity-[0.03]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        {/* Live indicator */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-white/90">
            <Clock className="size-3.5" />
            Atendendo agora
          </span>
        </div>

        <h2 className="font-serif text-[24px] font-bold text-white md:text-[48px]">
          Tem alguém aqui pra te ajudar agora.
        </h2>

        <p className="mt-4 text-base text-white/80 md:text-lg">
          Você escolhe. A gente resolve o resto.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp - Atendimento 24h"
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#1a3a2a] shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all duration-200 hover:bg-gray-100 hover:shadow-[0_6px_32px_rgba(0,0,0,0.25)]"
        >
          <MessageCircle className="size-5" />
          Falar pelo WhatsApp
        </a>

        <p className="mt-4 text-[13px] text-white/60">
          Sem burocracia. Atendimento 24h, inclusive feriados.
        </p>

        {/* Trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="flex items-center gap-1.5 text-[13px] text-white/50">
            <Lock className="size-3.5" />
            Conexão segura SSL
          </span>
          <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-1.5 text-[13px] text-white/50">
            <CreditCard className="size-3.5" />
            Pix · Cartão de Crédito/Débito
          </span>
          <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
          <span className="flex items-center gap-1.5 text-[13px] text-white/50">
            <Clock className="size-3.5" />
            Entrega em até 1 hora
          </span>
        </div>
      </div>
    </section>
  );
}
