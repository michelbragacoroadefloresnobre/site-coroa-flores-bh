import { SectionOrnament } from "@/components/section-ornament";

export function LocationsHero() {
  return (
    <section className="flex w-full items-center justify-center bg-[#F5F0EB] pt-28 pb-12 md:pt-32 md:pb-14">
      <div className="px-4 text-center">
        <h1 className="font-serif text-[36px] leading-tight font-extrabold text-[#1A1A1A] sm:text-[44px] md:text-[48px]">
          Locais de Entrega
        </h1>
        <SectionOrnament className="mt-4" />
        <p className="mx-auto mt-4 max-w-[560px] text-lg text-[#555555]">
          Entregamos coroas de flores em São Paulo e em toda a região
          metropolitana, em até 1 hora.
        </p>
      </div>
    </section>
  );
}
