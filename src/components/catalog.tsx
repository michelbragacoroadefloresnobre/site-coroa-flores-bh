"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import products from "@/data/products.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { ProductQuickOrderModal } from "@/components/product-quick-order-modal";
import { SectionOrnament } from "@/components/section-ornament";

const CATEGORY_ORDER = [
  "tradicionais",
  "ouro",
  "platina",
  "diamante",
  "especiais",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  tradicionais: "Tradicionais",
  ouro: "Ouro",
  diamante: "Diamante",
  platina: "Platina",
  especiais: "Especiais",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  tradicionais:
    "Para você que está procurando coroas de flores para velório com pronta entrega e ótimo custo-benefício, compre Coroas Tradicionais.",
  ouro:
    "Mais que um gesto, as Coroas de Flores Ouro representam admiração e reverência. Com flores nobres e montagem sofisticada.",
  diamante:
    "As Coroas Diamante foram criadas para quem busca uma homenagem única e marcante. Com design imponente, elas expressam admiração e profundo respeito de forma elegante.",
  platina:
    "Com um acabamento imponente e visual refinado, as Coroas de Flores Platina oferecem uma homenagem memorável.",
};

type ProductSize = {
  price: number;
  height: number;
  width: number;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  sizes: Record<string, ProductSize>;
};

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="line-clamp-2 min-h-[2lh] text-lg font-semibold text-[#1C1C1C]">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[15px] font-semibold text-[#2D5A3D]">
          {product.price}
        </p>
        <p className="mt-2 line-clamp-3 text-[14px] leading-snug text-[#6B6B6B]">
          {product.description}
        </p>

        <button
          onClick={() => onSelect(product)}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3 pt-4 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" />
          Ver detalhes e pedir
        </button>
      </div>
    </div>
  );
}

function CategoryCarousel({
  category,
  categoryProducts,
  onSelect,
}: {
  category: string;
  categoryProducts: Product[];
  onSelect: (product: Product) => void;
}) {
  return (
    <div>
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-[#1C1C1C] md:text-[28px]">
          {CATEGORY_LABELS[category]}
        </h3>
        {CATEGORY_DESCRIPTIONS[category] && (
          <p className="mt-2 text-[15px] text-[#6B6B6B]">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categoryProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[80%] pl-4 sm:basis-1/2 lg:basis-1/4"
            >
              <ProductCard product={product} onSelect={onSelect} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-4 md:-left-5" />
        <CarouselNext className="-right-4 md:-right-5" />
      </Carousel>
    </div>
  );
}

export function Catalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    products: (products as Product[]).filter((p) => p.category === category),
  })).filter(({ products: prods }) => prods.length > 0);

  return (
    <section id="catalogo" className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-24 md:pb-20">
      {/* Decorative background patterns */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -top-20 -left-20 size-[400px] opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="90" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="70" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
        <svg className="absolute -right-16 bottom-1/4 size-[300px] opacity-[0.03]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#2D5A3D" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="55" stroke="#2D5A3D" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-[1100px] text-center">
        <h2 className="font-serif text-[32px] font-bold text-[#1C1C1C] md:text-[40px]">
          Conheça nossas coroas de flores
        </h2>
        <SectionOrnament className="mt-4" />
        <p className="mt-4 text-[17px] text-[#6B6B6B]">
          Montadas com flores frescas e entregues em até 1 hora. Escolha a que
          faz sentido pra você.
        </p>
      </div>

      {/* Category Carousels */}
      <div className="mx-auto mt-12 max-w-[1100px] space-y-14 px-8 md:px-12">
        {productsByCategory.map(({ category, products: prods }) => (
          <CategoryCarousel
            key={category}
            category={category}
            categoryProducts={prods}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="mx-auto mt-14 max-w-[1100px] text-center">
        <Link
          href="/catalogo"
          className="inline-flex items-center rounded-full bg-[#2D5A3D] px-8 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Ver catálogo completo
        </Link>
        <p className="mt-3 text-sm text-[#6B6B6B]">
          Mais de 20 opções em 5 categorias, de R$ 350 a R$ 1.500.
        </p>
      </div>

      {/* Quick Order Modal */}
      <ProductQuickOrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
