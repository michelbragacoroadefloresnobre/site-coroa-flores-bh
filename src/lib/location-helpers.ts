import type { Location } from "@/types/location"
import { city, resolveSubregionCity } from "@/lib/city"

const locations = city.locations

const locationsBySlug = new Map(locations.map((loc) => [loc.slug, loc]))

export function getAllLocations(): Location[] {
  return locations
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locationsBySlug.get(slug)
}

export function getLocationsByCity(cityName: string): Location[] {
  return locations.filter((loc) => loc.city === cityName)
}

export function getSiblingLocations(
  location: Location,
  limit = 6
): Location[] {
  return locations
    .filter((loc) => loc.city === location.city && loc.slug !== location.slug)
    .slice(0, limit)
}

export function getAllSlugs(): string[] {
  return locations.map((loc) => loc.slug)
}

export function getLocationsBySubregion(subregionSlug: string): Location[] {
  const cityName = resolveSubregionCity(subregionSlug)
  if (!cityName) return []
  return locations.filter((loc) => loc.city === cityName)
}
