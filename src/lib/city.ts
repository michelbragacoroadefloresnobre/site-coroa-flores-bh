import { config } from "@/active-city/config";
import contact from "@/active-city/contact.json";
import locationsData from "@/active-city/locations.json";
import testimonials from "@/active-city/testimonials.json";
import faq from "@/active-city/faq.json";
import regions from "@/active-city/regions.json";
import type { Location } from "@/types/location";

type Contact = {
  phone: string;
  whatsappNumber: string;
  email: string;
  phoneFormatted: string;
};

type Region = {
  name: string;
  slug: string;
  cities: Array<{ name: string; slug: string }>;
};

type FaqItem = {
  question: string;
  answer: string;
};

type Testimonial = {
  name: string;
  location: string;
  text: string;
};

const UF_TO_STATE: Record<string, string> = {
  MG: "Minas Gerais",
  SP: "São Paulo",
  RJ: "Rio de Janeiro",
};

const locations = locationsData as Location[];
const deliveryCities = Array.from(new Set(locations.map((l) => l.city)));
const subregionSlugToCityName = new Map<string, string>();
for (const region of regions as Region[]) {
  for (const sub of region.cities) {
    const matchByCitySlug = deliveryCities.find(
      (c) => slugify(c) === sub.slug,
    );
    subregionSlugToCityName.set(sub.slug, matchByCitySlug ?? config.capitalCityName);
  }
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const city = {
  config,
  contact: contact as Contact,
  locations,
  testimonials: testimonials as Testimonial[],
  faq: faq as FaqItem[],
  regions: regions as Region[],
  deliveryCities,
};

export function getStateNameByUf(uf: string): string {
  return UF_TO_STATE[uf] ?? uf;
}

export function resolveSubregionCity(subregionSlug: string): string | undefined {
  return subregionSlugToCityName.get(subregionSlug);
}
