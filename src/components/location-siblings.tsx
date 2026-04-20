import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import type { Location } from "@/types/location"

export function LocationSiblings({
  siblings,
  city,
}: {
  siblings: Location[]
  city: string
}) {
  if (siblings.length === 0) return null

  return (
    <section className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-serif text-[22px] font-bold text-[#1A1A1A] md:text-[30px]">
          Outros Locais de Entrega em {city}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locais/${loc.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-[#E8E4DE] bg-white p-4 transition-colors hover:border-[#2D5A3D]/30 hover:bg-[#F5F0EB]/50"
            >
              <MapPin className="size-4 shrink-0 text-[#2D5A3D]" />
              <span className="flex-1 text-[15px] text-[#1A1A1A]">
                {loc.name}
              </span>
              <ArrowRight className="size-4 shrink-0 text-[#C0B8AD] transition-colors group-hover:text-[#2D5A3D]" />
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/locais"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-[#2D5A3D] transition-opacity hover:opacity-80"
          >
            Ver todos os locais de entrega
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
