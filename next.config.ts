import type { NextConfig } from "next";

const SUPPORTED_CITIES = ["bh", "sp", "rj"] as const;
const ACTIVE_CITY = process.env.NEXT_PUBLIC_CITY ?? "bh";

if (!SUPPORTED_CITIES.includes(ACTIVE_CITY as (typeof SUPPORTED_CITIES)[number])) {
  throw new Error(
    `NEXT_PUBLIC_CITY inválido: "${ACTIVE_CITY}". Valores aceitos: ${SUPPORTED_CITIES.join(", ")}`,
  );
}

const activeCityPath = `./src/data/cities/${ACTIVE_CITY}`;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coroadefloresnobre.com.br",
      },
      {
        protocol: "https",
        hostname: "nobre-coroa-fotos.s3.us-east-1.amazonaws.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    inlineCss: true,
    optimizeCss: true,
  },
  turbopack: {
    resolveAlias: {
      "@/active-city/config": `${activeCityPath}/config.ts`,
      "@/active-city/contact.json": `${activeCityPath}/contact.json`,
      "@/active-city/locations.json": `${activeCityPath}/locations.json`,
      "@/active-city/testimonials.json": `${activeCityPath}/testimonials.json`,
      "@/active-city/faq.json": `${activeCityPath}/faq.json`,
      "@/active-city/regions.json": `${activeCityPath}/regions.json`,
    },
  },
};

export default nextConfig;
