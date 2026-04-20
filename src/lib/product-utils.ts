export type ProductSize = {
  price: number;
  height: number;
  width: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  sizes: Record<string, ProductSize>;
  bestSeller?: boolean;
};

export type SizeKey = "default" | "big";

export const SIZE_LABELS: Record<SizeKey, string> = {
  default: "Padrão",
  big: "Grande",
};

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getAvailableSizes(product: Product): SizeKey[] {
  const sizes: SizeKey[] = [];
  if (product.sizes.default) sizes.push("default");
  if (product.sizes.big) sizes.push("big");
  return sizes;
}

export function getSizeData(
  product: Product,
  size: SizeKey
): ProductSize | undefined {
  return product.sizes[size];
}

export function getDefaultSize(product: Product): SizeKey {
  return product.sizes.big ? "big" : "default";
}
