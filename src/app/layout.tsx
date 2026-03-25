import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { getBaseUrl } from "@/lib/base-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Coroa de Flores Nobre | Entrega em São Paulo e Região",
    template: "%s | Coroa de Flores Nobre",
  },
  description:
    "Entrega de coroa de flores em São Paulo e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coroa de Flores Nobre | Entrega em São Paulo e Região",
    description:
      "Entrega de coroa de flores em São Paulo e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
    url: "/",
    siteName: "Coroa de Flores Nobre",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coroa de Flores Nobre — Entrega em São Paulo e Região",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coroa de Flores Nobre | Entrega em São Paulo e Região",
    description:
      "Entrega de coroa de flores em São Paulo e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
          <FloatingWhatsapp />
        </body>
    </html>
  );
}
