import type { Metadata } from "next";
import Link from "next/link";
import { SectionOrnament } from "@/components/section-ornament";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#F5F0EB] px-4 py-28 md:py-32">
      <div className="text-center">
        <p className="text-sm font-medium tracking-widest text-[#2D5A3D] uppercase">
          404
        </p>
        <h1 className="mt-2 font-serif text-[36px] leading-tight font-extrabold text-[#1A1A1A] sm:text-[44px]">
          Página não encontrada
        </h1>
        <SectionOrnament className="mt-4" />
        <p className="mx-auto mt-4 max-w-[420px] text-lg text-[#555555]">
          A página que você está procurando não existe ou foi removida.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
          >
            Voltar para o início
          </Link>
          <Link
            href="/contato"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-all hover:bg-muted hover:text-foreground"
          >
            Fale conosco
          </Link>
        </div>
      </div>
    </main>
  );
}
