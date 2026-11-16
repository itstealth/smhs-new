import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  async redirects() {
    return [
      { source: "/SMHS_Prospectus.pdf", destination: "/contact-us", permanent: false },
      { source: "/academics", destination: "/curriculum", permanent: true },
      { source: "/mandatory-disclosures", destination: "/mandatory-disclosure", permanent: true },
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
