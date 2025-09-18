import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/cart/:path*",
          destination: "http://localhost:3001/:path*",
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
