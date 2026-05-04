"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { city } from "@/lib/city";
import { getLocationsBySubregion } from "@/lib/location-helpers";

const regions = city.regions;

export function LocationsGrid() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="bg-white px-4 py-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-7 md:grid-cols-2">
        {regions.map((region) => (
          <div
            key={region.slug}
            className="rounded-xl border border-[#E8E4DE] bg-white p-6 md:p-8"
          >
            <h2 className="font-serif text-[18px] font-bold text-[#1A1A1A] md:text-[26px]">
              {region.name}
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {region.cities.map((city) => {
                const key = `${region.slug}:${city.slug}`;
                const isOpen = openKey === key;
                const subregionLocations = getLocationsBySubregion(city.slug);
                const hasLocations = subregionLocations.length > 0;

                return (
                  <div key={city.slug} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        hasLocations && setOpenKey(isOpen ? null : key)
                      }
                      aria-expanded={isOpen}
                      aria-haspopup="listbox"
                      disabled={!hasLocations}
                      className="inline-flex w-full items-center justify-between gap-1.5 rounded-lg bg-[#F5F0EB] px-3 py-2 text-left text-[14px] text-[#444444] transition-colors hover:bg-[#ECE4DA] disabled:cursor-default disabled:opacity-70 disabled:hover:bg-[#F5F0EB]"
                    >
                      <span className="flex min-w-0 items-center gap-1.5">
                        <MapPin
                          className="size-3.5 shrink-0 text-[#2D5A3D]"
                          strokeWidth={2}
                        />
                        <span className="truncate">{city.name}</span>
                      </span>
                      {hasLocations && (
                        <ChevronDown
                          className={`size-3.5 shrink-0 text-[#6B6B6B] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={2}
                        />
                      )}
                    </button>

                    {isOpen && hasLocations && (
                      <ul
                        className="absolute left-0 right-0 top-full z-20 mt-1 max-h-72 overflow-auto rounded-lg border border-[#E8E4DE] bg-white py-1 shadow-lg"
                      >
                        {subregionLocations.map((loc) => (
                          <li key={loc.slug}>
                            <Link
                              href={`/${loc.slug}`}
                              className="block px-3 py-2 text-[13px] text-[#444444] transition-colors hover:bg-[#F5F0EB] hover:text-[#1A1A1A]"
                            >
                              {loc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
