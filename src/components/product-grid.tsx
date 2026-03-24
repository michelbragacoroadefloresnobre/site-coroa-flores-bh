"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import products from "@/data/products.json";
import { ProductQuickOrderModal } from "@/components/product-quick-order-modal";

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

const CATEGORIES = [
  {
    key: "tradicionais",
    anchor: "tradicional",
    title: "Tradicional",
    description:
      "Coroas clássicas com crisântemos e flores naturais. A escolha mais comum para homenagens sinceras.",
  },
  {
    key: "ouro",
    anchor: "ouro",
    title: "Ouro",
    description:
      "Rosas nacionais e importadas com acabamento sofisticado. Para quem quer ir além do tradicional.",
  },
  {
    key: "diamante",
    anchor: "diamante",
    title: "Diamante",
    description:
      "Orquídeas, lírios e rosas importadas em arranjos de luxo. Uma homenagem à altura.",
  },
  {
    key: "platina",
    anchor: "platina",
    title: "Platina",
    description:
      "Flores nobres importadas em grande escala. O mais alto padrão de elegância e respeito.",
  },
  {
    key: "especiais",
    anchor: "especial",
    title: "Especial",
    description:
      "Formatos diferenciados como coração, cruz e meia lua. Para homenagens únicas e personalizadas.",
  },
] as const;

function ProductCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[16px] font-bold text-[#1C1C1C]">
          {product.name}
        </h3>
        <p className="mt-1 text-[15px] font-bold text-[#2D5A3D]">
          {product.price}
        </p>
        <p className="mt-1.5 text-[14px] leading-snug text-[#6B6B6B]">
          {product.description}
        </p>

        <button
          onClick={() => onSelect(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="size-4" />
          Ver detalhes e pedir
        </button>
        <p className="mt-2 text-center text-[12px] text-[#A0A0A0]">
          A gente te responde em minutos.
        </p>
      </div>
    </div>
  );
}

export function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const allProducts = products as Product[];

  return (
    <div className="bg-white">
      {CATEGORIES.map((category) => {
        const categoryProducts = allProducts.filter(
          (p) => p.category === category.key
        );

        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={category.key}
            id={category.anchor}
            className="px-4 py-16 md:px-6 md:py-20"
          >
            <div className="mx-auto max-w-[1200px]">
              <div className="text-center">
                <h2 className="font-serif text-[28px] font-bold text-[#1C1C1C] md:text-[32px]">
                  {category.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[600px] text-[16px] leading-relaxed text-[#555]">
                  {category.description}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <ProductQuickOrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
