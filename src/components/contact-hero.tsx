import { SectionOrnament } from "@/components/section-ornament";

export function ContactHero() {
  return (
    <section className="flex w-full items-center justify-center bg-[#F5F0EB] pt-28 pb-12 md:pt-32 md:pb-14">
      <div className="px-4 text-center">
        <h1 className="font-serif text-[36px] leading-tight font-extrabold text-[#1A1A1A] sm:text-[44px] md:text-[48px]">
          Contato
        </h1>
        <SectionOrnament className="mt-4" />
        <p className="mx-auto mt-4 max-w-[520px] text-lg text-[#555555]">
          Se preferir falar direto com a gente, este é o caminho mais rápido.
          <br />
          Atendimento humano, 24 horas, todos os dias.
        </p>
      </div>
    </section>
  );
}
