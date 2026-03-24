import contact from "@/data/contact.json";

export function buildWhatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
