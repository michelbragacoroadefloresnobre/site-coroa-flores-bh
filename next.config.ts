import type { NextConfig } from "next";

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
};

export default nextConfig;
