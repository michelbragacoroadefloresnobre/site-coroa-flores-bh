"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import products from "@/data/products.json";
import { ProductImageLightbox } from "@/components/product-image-lightbox";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { quickOrderMessage } from "@/lib/whatsapp-messages";
import {
  type Product,
  type SizeKey,
  SIZE_LABELS,
  formatPrice,
  getAvailableSizes,
  getSizeData,
  getDefaultSize,
} from "@/lib/product-utils";

const CATEGORIES = [
  {
    key: "tradicionais",
    anchor: "tradicional",
    title: "Tradicional",
    description:
      "Para você que está procurando coroas de flores para velório com pronta entrega e ótimo custo-benefício, compre Coroas Tradicionais.",
  },
  {
    key: "ouro",
    anchor: "ouro",
    title: "Ouro",
    description:
      "Mais que um gesto, as Coroas de Flores Ouro representam admiração e reverência. Com flores nobres e montagem sofisticada.",
  },
  {
    key: "platina",
    anchor: "platina",
    title: "Platina",
    description:
      "Com um acabamento imponente e visual refinado, as Coroas de Flores Platina oferecem uma homenagem memorável.",
  },
  {
    key: "diamante",
    anchor: "diamante",
    title: "Diamante",
    description:
      "As Coroas Diamante foram criadas para quem busca uma homenagem única e marcante. Com design imponente, elas expressam admiração e profundo respeito de forma elegante.",
  },
  {
    key: "especiais",
    anchor: "especial",
    title: "Especial",
    description:
      "Formatos diferenciados como coração, cruz e meia lua. Para homenagens únicas e personalizadas.",
  },
] as const;

function ProductCard({ product }: { product: Product }) {
  const [size, setSize] = useState<SizeKey>(getDefaultSize(product));
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const availableSizes = getAvailableSizes(product);
  const currentSize = getSizeData(product, size) ?? getSizeData(product, availableSizes[0])!;

  const handleOrder = () => {
    const message = quickOrderMessage({
      productName: product.name,
      sizeLabel: SIZE_LABELS[size],
      formattedPrice: formatPrice(currentSize.price),
    });
    window.open(buildWhatsappUrl(message), "_blank");
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden bg-gray-50"
        aria-label={`Ampliar imagem de ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-[2lh] text-[16px] font-bold text-[#1C1C1C]">
          {product.name}
        </h3>
        <p className="mt-1 text-[15px] font-bold text-[#2D5A3D]">
          {formatPrice(currentSize.price)}
        </p>
        <p className="mt-1.5 line-clamp-3 text-[14px] leading-snug text-[#6B6B6B]">
          {product.description}
        </p>

        <div className="mt-auto pt-3">
          <div className="mb-2">
            <span className="text-[12px] font-medium text-[#1C1C1C]">
              Tamanho
            </span>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {availableSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`rounded-lg py-1.5 text-[12px] font-medium transition-colors ${
                    size === s
                      ? "bg-[#2D5A3D] text-white"
                      : "bg-[#F5F5F5] text-[#1C1C1C] hover:bg-[#E8E8E8]"
                  }`}
                >
                  {SIZE_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOrder}
            className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2D5A3D] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-3.5" />
            Pedir pelo WhatsApp
          </button>
          <p className="mt-2 text-center text-[12px] text-[#A0A0A0]">
            A gente te responde em minutos.
          </p>
        </div>
      </div>

      <ProductImageLightbox
        imageSrc={product.image}
        imageAlt={product.name}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
}

export function ProductGrid() {
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
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
