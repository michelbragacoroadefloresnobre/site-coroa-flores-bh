import type { Metadata } from "next";
import { CatalogHero } from "@/components/catalog-hero";
import { CategoryNav } from "@/components/category-nav";
import { ProductGrid } from "@/components/product-grid";
import { CatalogCta } from "@/components/catalog-cta";
import { buildProductListSchema } from "@/lib/structured-data";
import products from "@/data/products.json";

export const metadata: Metadata = {
  title: "Catálogo de Coroas de Flores",
  description:
    "Veja nosso catálogo completo de coroas de flores para velório e funeral. Modelos a partir de R$315, com entrega em até 1 hora em São Paulo e região.",
  alternates: {
    canonical: "https://coroadefloresnobre.com.br/catalogo",
  },
  openGraph: {
    title: "Catálogo de Coroas de Flores | Coroa de Flores Nobre",
    description:
      "Veja nosso catálogo completo de coroas de flores para velório e funeral. Modelos a partir de R$315, com entrega em até 1 hora em São Paulo e região.",
    url: "https://coroadefloresnobre.com.br/catalogo",
    siteName: "Coroa de Flores Nobre",
    locale: "pt_BR",
    type: "website",
  },
};

export default function CatalogoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductListSchema(products)),
        }}
      />
      <CatalogHero />
      <CategoryNav />
      <ProductGrid />
      <CatalogCta />
    </main>
  );
}
