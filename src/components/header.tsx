"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/lib/whatsapp-messages";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Locais de Entrega", href: "/locais" },
] as const;

const WHATSAPP_URL = buildWhatsappUrl(whatsappMessages.generalHelp);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex h-(--header-height) max-w-[1200px] items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.webp"
            alt="Coroa de Flores Belo Horizonte"
            width={144}
            height={144}
            className="w-36 h-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-[#1C1C1C] transition-colors hover:text-[#2D5A3D]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar pelo WhatsApp"
          className="hidden items-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 md:inline-flex"
        >
          <MessageCircle className="size-4" />
          Falar pelo WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex size-10 items-center justify-center rounded-md text-[#1C1C1C] transition-colors md:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`absolute inset-x-0 top-(--header-height) z-40 grid border-t border-gray-100 bg-white transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-3 text-[15px] font-medium text-[#1C1C1C] transition-colors hover:bg-gray-50 hover:text-[#2D5A3D]"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar pelo WhatsApp"
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" />
              Falar pelo WhatsApp
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
