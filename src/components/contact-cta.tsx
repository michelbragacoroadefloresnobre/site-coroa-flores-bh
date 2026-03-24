import Link from "next/link";

export function ContactCta() {
  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-[1100px] rounded-2xl bg-[#F5F0EB] px-6 py-14 text-center md:px-12">
        <h2 className="font-serif text-[28px] leading-tight font-bold text-[#1A1A1A] sm:text-[32px] md:text-[36px]">
          Precisa resolver isso agora?
        </h2>
        <p className="mx-auto mt-4 max-w-[520px] text-base text-[#6B6B6B] md:text-lg">
          Veja o catálogo completo ou confirme se atendemos a sua região antes
          de falar com a gente.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center rounded-full bg-[#2D5A3D] px-7 py-3 text-base font-medium text-white transition-colors hover:bg-[#244A32]"
          >
            Ver catálogo
          </Link>
          <Link
            href="/locais"
            className="inline-flex items-center justify-center rounded-full border border-[#1A1A1A] bg-white px-7 py-3 text-base font-medium text-[#1A1A1A] transition-colors hover:bg-[#F5F5F5]"
          >
            Ver locais de entrega
          </Link>
        </div>
      </div>
    </section>
  );
}
