import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { LocationPageHero } from "@/components/location-page-hero"
import { LocationInfo } from "@/components/location-info"
import { LocationTribute } from "@/components/location-tribute"
import { LocationProducts } from "@/components/location-products"
import { LocationSiblings } from "@/components/location-siblings"
import { LocationMap } from "@/components/location-map"
import { LocationCta } from "@/components/location-cta"
import {
  getAllSlugs,
  getLocationBySlug,
  getSiblingLocations,
} from "@/lib/location-helpers"
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildServiceSchema,
} from "@/lib/structured-data"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)
  if (!location) return {}

  const title = `${location.title} | Coroa de Flores Nobre`
  const description =
    location.introduction.length > 155
      ? location.introduction.slice(0, 152) + "..."
      : location.introduction

  return {
    title,
    description,
    alternates: {
      canonical: `/locais/${location.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/locais/${location.slug}`,
      siteName: "Coroa de Flores Nobre",
      locale: "pt_BR",
      type: "website",
    },
  }
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) notFound()

  const siblings = getSiblingLocations(location)

  const jsonLd = [
    buildLocalBusinessSchema(location),
    buildBreadcrumbSchema(location),
    buildServiceSchema(location),
  ]

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Locais de Entrega", href: "/locais" },
          { label: location.name },
        ]}
      />

      <LocationPageHero location={location} />
      <LocationInfo location={location} />
      <LocationMap name={location.name} city={location.city} />
      <LocationTribute location={location} />
      <LocationProducts locationName={location.name} />
      <LocationSiblings siblings={siblings} city={location.city} />
      <LocationCta locationName={location.name} />
    </main>
  )
}
