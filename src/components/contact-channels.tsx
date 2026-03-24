import { MessageCircle, Phone, Mail } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";

function ChannelIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#F5F0EB]">
      {children}
    </div>
  );
}

export function ContactChannels() {
  const whatsappUrl = buildWhatsappUrl(
    "Olá! Gostaria de mais informações sobre coroas de flores."
  );

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3">
        {/* WhatsApp */}
        <div className="flex flex-col rounded-xl border border-[#E8E8E8] bg-white p-7">
          <ChannelIcon>
            <MessageCircle className="h-5 w-5 text-[#2D5A3D]" />
          </ChannelIcon>
          <h2 className="mt-5 text-[20px] font-bold text-[#1A1A1A]">
            WhatsApp
          </h2>
          <p className="mt-2 text-base text-[#6B6B6B]">
            Fale com a equipe e resolva tudo em poucos minutos.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center justify-center rounded-full bg-[#2D5A3D] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#244A32]"
          >
            Falar agora
          </a>
        </div>

        {/* Telefones */}
        <div className="flex flex-col rounded-xl border border-[#E8E8E8] bg-white p-7">
          <ChannelIcon>
            <Phone className="h-5 w-5 text-[#2D5A3D]" />
          </ChannelIcon>
          <h2 className="mt-5 text-[20px] font-bold text-[#1A1A1A]">
            Telefones
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-base text-[#6B6B6B]">0800 024 4349</p>
            <p className="text-base text-[#6B6B6B]">3003-7175</p>
            <p className="text-[15px] text-[#A0A0A0]">Atendimento 24 horas</p>
          </div>
        </div>

        {/* E-mail */}
        <div className="flex flex-col rounded-xl border border-[#E8E8E8] bg-white p-7">
          <ChannelIcon>
            <Mail className="h-5 w-5 text-[#2D5A3D]" />
          </ChannelIcon>
          <h2 className="mt-5 text-[20px] font-bold text-[#1A1A1A]">
            E-mail
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-base text-[#6B6B6B]">
              contato@coroadefloresnobre.com.br
            </p>
            <p className="text-[15px] text-[#A0A0A0]">
              Resposta rápida para dúvidas gerais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
