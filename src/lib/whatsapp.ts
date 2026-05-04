import { city } from "@/lib/city";

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${city.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
