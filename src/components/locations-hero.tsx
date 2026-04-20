import { SectionOrnament } from "@/components/section-ornament";

export function LocationsHero() {
  return (
    <section className="flex w-full items-center justify-center bg-[#F5F0EB] pt-28 pb-12 md:pt-32 md:pb-14">
      <div className="px-4 text-center">
        <h1 className="font-serif text-[26px] leading-tight font-extrabold text-[#1A1A1A] sm:text-[36px] md:text-[48px]">
          Locais de Entrega
        </h1>
        <SectionOrnament className="mt-4" />
        <p className="mx-auto mt-4 max-w-[560px] text-base text-[#555555] md:text-lg">
          Entregamos coroas de flores em Belo Horizonte e em toda a região
          metropolitana, em até 1 hora.
        </p>
      </div>
    </section>
  );
}
