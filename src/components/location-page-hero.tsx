import type { Location } from "@/types/location"

export function LocationPageHero({ location }: { location: Location }) {
  return (
    <section className="flex w-full items-center justify-center bg-[#F5F0EB] pt-6 pb-12 md:pt-8 md:pb-14">
      <div className="px-4 text-center">
        <h1 className="mx-auto max-w-[700px] font-serif text-[24px] leading-tight font-extrabold text-[#1A1A1A] sm:text-[32px] md:text-[42px]">
          {location.title}
        </h1>
      </div>
    </section>
  )
}
