import type { MetadataRoute } from "next"
import { getAllLocations } from "@/lib/location-helpers"
import { getBaseUrl } from "@/lib/base-url"

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = getBaseUrl()
  const locations = getAllLocations()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalogo`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/locais`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contato`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const locationPages: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${BASE_URL}/${location.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages]
}
