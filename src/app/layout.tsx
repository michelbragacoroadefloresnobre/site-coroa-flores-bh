import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { getBaseUrl } from "@/lib/base-url";
import { Analytics } from "@vercel/analytics/next";

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
    default: "Coroa de Flores Nobre | Entrega em Belo Horizonte e Região",
    template: "%s | Coroa de Flores Nobre",
  },
  description:
    "Entrega de coroa de flores em Belo Horizonte e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
  icons: {
    icon: [
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Coroa de Flores Nobre | Entrega em Belo Horizonte e Região",
    description:
      "Entrega de coroa de flores em Belo Horizonte e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
    url: "/",
    siteName: "Coroa de Flores Nobre",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coroa de Flores Nobre — Entrega em Belo Horizonte e Região",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coroa de Flores Nobre | Entrega em Belo Horizonte e Região",
    description:
      "Entrega de coroa de flores em Belo Horizonte e região metropolitana. Atendimento 24h, entrega em até 1 hora com foto antes da entrega.",
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
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KRM7BLFS');`,
        }}
      />
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        <FloatingWhatsapp />
      </body>
      <Analytics />
    </html>
  );
}
