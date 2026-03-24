import { MapPin } from "lucide-react";
import regions from "@/data/regions.json";

export function LocationsGrid() {
  return (
    <section className="bg-white px-4 py-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2">
        {regions.map((region) => (
          <div
            key={region.slug}
            className="rounded-xl border border-[#E8E4DE] bg-white p-6 md:p-8"
          >
            <h2 className="font-serif text-[22px] font-bold text-[#1A1A1A] md:text-[26px]">
              {region.name}
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {region.cities.map((city) => (
                <span
                  key={city.slug}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#F5F0EB] px-3 py-2 text-[14px] text-[#444444]"
                >
                  <MapPin
                    className="size-3.5 shrink-0 text-[#2D5A3D]"
                    strokeWidth={2}
                  />
                  {city.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
