import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { formats: ["image/avif", "image/webp"] },
  serverExternalPackages: ["pg"],
};

export default nextConfig;
