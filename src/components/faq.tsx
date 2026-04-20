"use client";

import { MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import faqItems from "@/data/faq.json";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";
import { SectionOrnament } from "@/components/section-ornament";

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.serviceQuestion);

export function Faq() {
  return (
    <section className="relative overflow-hidden bg-[#F5F0E8] px-4 py-20 md:py-24">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -right-16 top-16 size-72 opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="85" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="35" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[900px]">
        {/* Header */}
        <h2 className="text-center font-serif text-[24px] font-bold text-[#1C1C1C] md:text-[40px]">
          Perguntas que a gente recebe bastante
        </h2>
        <SectionOrnament className="mt-4" />

        {/* Accordion */}
        <Accordion className="mt-10 md:mt-12" defaultValue={[0]}>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={index}
              className="border-b border-[#E0D8CC]"
            >
              <AccordionTrigger className="py-5 text-[17px] font-medium text-[#1C1C1C] hover:text-[#2D5A3D] hover:no-underline md:py-6 **:data-[slot=accordion-trigger-icon]:text-[#6B6B6B] **:data-[slot=accordion-trigger-icon]:size-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="pb-5 text-[15px] leading-[1.7] text-[#6B6B6B] md:pb-6">
                  {item.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer */}
        <div className="mt-10 text-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tirar dúvidas pelo WhatsApp"
            className="inline-flex items-center gap-2 rounded-full border border-[#2D5A3D] px-6 py-3 text-[15px] font-medium text-[#2D5A3D] transition-colors hover:bg-[#2D5A3D] hover:text-white"
          >
            <MessageCircle className="size-4" />
            Ainda tem dúvida? Fala com a gente
          </a>
          <p className="mt-2 text-sm text-[#9B9B9B]">
            É mais rápido do que você imagina.
          </p>
        </div>
      </div>
    </section>
  );
}
