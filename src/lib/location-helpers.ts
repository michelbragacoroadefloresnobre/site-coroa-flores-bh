import type { Location } from "@/types/location"
import locationsData from "@/data/locations.json"

const locations = locationsData as Location[]

const locationsBySlug = new Map(locations.map((loc) => [loc.slug, loc]))

export function getAllLocations(): Location[] {
  return locations
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locationsBySlug.get(slug)
}

export function getLocationsByCity(city: string): Location[] {
  return locations.filter((loc) => loc.city === city)
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

const subregionToCity: Record<string, string> = {
  centro: "Belo Horizonte",
  "regiao-norte": "Belo Horizonte",
  "regiao-sul": "Belo Horizonte",
  "regiao-leste": "Belo Horizonte",
  "regiao-oeste": "Belo Horizonte",
  pampulha: "Belo Horizonte",
  contagem: "Contagem",
  betim: "Betim",
  ibirite: "Ibirité",
  "ribeirao-das-neves": "Ribeirão das Neves",
  "santa-luzia": "Santa Luzia",
  vespasiano: "Vespasiano",
  "lagoa-santa": "Lagoa Santa",
  sabara: "Sabará",
  "nova-lima": "Nova Lima",
  "juiz-de-fora": "Juiz de Fora",
  uberlandia: "Uberlândia",
}

export function getLocationsBySubregion(subregionSlug: string): Location[] {
  const city = subregionToCity[subregionSlug]
  if (!city) return []
  return locations.filter((loc) => loc.city === city)
}
