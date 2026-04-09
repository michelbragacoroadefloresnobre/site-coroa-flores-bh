"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MessageCircle, ArrowRight } from "lucide-react"
import products from "@/data/products.json"
import { ProductQuickOrderModal } from "@/components/product-quick-order-modal"

type ProductSize = {
  price: number
  height: number
  width: number
}

type Product = {
  id: string
  name: string
  category: string
  price: string
  description: string
  image: string
  sizes: Record<string, ProductSize>
}

const FEATURED_CATEGORIES = ["tradicionais", "ouro", "diamante", "platina"]

function getFeaturedProducts(): Product[] {
  const allProducts = products as Product[]
  const featured: Product[] = []

  for (const category of FEATURED_CATEGORIES) {
    const categoryProducts = allProducts.filter((p) => p.category === category)
    if (categoryProducts.length > 0) {
      featured.push(categoryProducts[0])
    }
  }

  return featured
}

export function LocationProducts({ locationName }: { locationName: string }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const featured = getFeaturedProducts()

  return (
    <section className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center">
          <h2 className="font-serif text-[26px] font-bold text-[#1A1A1A] md:text-[30px]">
            Coroas de Flores com Entrega em {locationName}
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-[#6B6B6B]">
            Confira algumas opções do nosso catálogo. Todas podem ser entregues
            neste local.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-2 min-h-[2lh] text-[16px] font-bold text-[#1C1C1C]">
                  {product.name}
                </h3>
                <p className="mt-1 text-[15px] font-bold text-[#2D5A3D]">
                  {product.price}
                </p>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#2D5A3D] px-5 py-3 pt-4 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="size-4" />
                  Ver detalhes e pedir
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2D5A3D] transition-opacity hover:opacity-80"
          >
            Ver catálogo completo
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <ProductQuickOrderModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  )
}
