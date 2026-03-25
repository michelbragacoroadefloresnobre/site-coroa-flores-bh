import { MessageCircle, Star, Users } from "lucide-react";
import { SectionOrnament } from "@/components/section-ornament";
import testimonials from "@/data/testimonials.json";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.generalHelp);

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 text-amber-400"
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] px-4 py-20 md:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -left-16 top-1/4 size-80 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="65" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
        <svg className="absolute -right-12 bottom-1/3 size-64 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-serif text-[32px] font-bold text-[#1C1C1C] md:text-[40px]">
            O que dizem sobre a Coroa de Flores Belo Horizonte
          </h2>
          <SectionOrnament className="mt-4" />
          <p className="mt-4 text-[17px] text-[#6B6B6B]">
            Depoimentos reais de quem usou nossos serviços.
          </p>
        </div>

        {/* Social proof counter */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[#2D5A3D]/10">
            <Users className="size-5 text-[#2D5A3D]" strokeWidth={1.5} />
          </div>
          <p className="text-[17px] text-[#4A4A4A]">
            <span className="font-bold text-[#2D5A3D]">+5.000</span> famílias
            atendidas com cuidado em Belo Horizonte
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
            >
              {/* Decorative quote */}
              <span
                className="pointer-events-none absolute -top-2 right-3 select-none font-serif text-[120px] leading-none text-[#2D5A3D]/4"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <Stars />

              {/* Text */}
              <p className="relative mt-3.5 text-[15px] leading-relaxed text-[#4A4A4A]">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-[#F0EBE3] pt-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4E8DC] text-sm font-bold text-[#2D5A3D]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1C1C1C]">
                    {testimonial.name}
                  </p>
                  <p className="text-[12px] text-[#9B9B9B]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#2D5A3D] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" />
            Falar pelo WhatsApp agora
          </a>
          <p className="mt-2.5 text-sm text-[#6B6B6B]">
            Atendemos você em minutos.
          </p>
        </div>
      </div>
    </section>
  );
}
