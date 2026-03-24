import { CatalogHero } from "@/components/catalog-hero";
import { CategoryNav } from "@/components/category-nav";
import { ProductGrid } from "@/components/product-grid";
import { CatalogCta } from "@/components/catalog-cta";

export default function CatalogoPage() {
  return (
    <main>
      <CatalogHero />
      <CategoryNav />
      <ProductGrid />
      <CatalogCta />
    </main>
  );
}
