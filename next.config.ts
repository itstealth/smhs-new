import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Isolate generated route types when building a release beside the active build.
  typescript: { tsconfigPath: process.env.NEXT_TSCONFIG_PATH || "tsconfig.json" },
  // Keep release builds from exhausting the shared Windows host.
  experimental: { cpus: 1 },
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  async redirects() {
    return [
      { source: "/SMHS_Prospectus.pdf", destination: "/contact-us", permanent: false },
      { source: "/academics", destination: "/curriculum", statusCode: 301 },
      { source: "/mandatory-disclosures", destination: "/mandatory-disclosure", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*.:ext(webp|jpg|jpeg|png|gif|svg|ico|mp4|webm|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'seedlingschools.com',
      },
      {
        protocol: 'https',
        hostname: 'pplx-res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
