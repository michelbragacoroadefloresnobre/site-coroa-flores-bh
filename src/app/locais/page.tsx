import type { Metadata } from "next";
import { LocationsHero } from "@/components/locations-hero";
import { LocationsGrid } from "@/components/locations-grid";
import { LocationsCta } from "@/components/locations-cta";

export const metadata: Metadata = {
  title: "Locais de Entrega",
  description:
    "Entregamos coroas de flores em mais de 175 cemitérios, velórios e crematórios em São Paulo e região metropolitana. Confira todos os locais de entrega.",
  alternates: {
    canonical: "/locais",
  },
  openGraph: {
    title: "Locais de Entrega | Coroa de Flores Nobre",
    description:
      "Entregamos coroas de flores em mais de 175 cemitérios, velórios e crematórios em São Paulo e região metropolitana.",
    url: "/locais",
    siteName: "Coroa de Flores Nobre",
    locale: "pt_BR",
    type: "website",
  },
};

export default function LocationsPage() {
  return (
    <main>
      <LocationsHero />
      <LocationsGrid />
      <LocationsCta />
    </main>
  );
}
