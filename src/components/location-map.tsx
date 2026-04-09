import { MapPin } from "lucide-react"

export function LocationMap({
  name,
  city,
}: {
  name: string
  city: string
}) {
  const query = encodeURIComponent(`${name} ${city} MG`)
  const src = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center gap-2.5">
          <MapPin className="size-5 text-[#2D5A3D]" />
          <h2 className="font-serif text-[26px] font-bold text-[#1A1A1A] md:text-[30px]">
            Localização de {name}
          </h2>
        </div>

        <p className="mt-3 text-[15px] text-[#6B6B6B]">
          Veja no mapa onde fica {name} em {city}, MG.
        </p>

        <div className="mt-6 overflow-hidden rounded-xl border border-[#E8E4DE]">
          <iframe
            title={`Mapa de ${name} em ${city}`}
            src={src}
            className="aspect-video w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
