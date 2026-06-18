import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/academics", destination: "/curriculum", permanent: false },
    ];
  },
  images: {
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
