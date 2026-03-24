import { SectionOrnament } from "@/components/section-ornament";

export function CatalogHero() {
  return (
    <section className="flex w-full items-center justify-center bg-[#F5F0EB] pt-28 pb-12 md:pt-32 md:pb-14">
      <div className="px-4 text-center">
        <h1 className="font-serif text-[36px] leading-tight font-extrabold text-[#1C1C1C] md:text-[44px]">
          Catálogo de Coroas de Flores
        </h1>
        <SectionOrnament className="mt-4" />
        <p className="mt-4 text-lg text-[#8A8A8A]">
          Escolha a coroa que faz sentido. A gente cuida do resto.
        </p>
      </div>
    </section>
  );
}
