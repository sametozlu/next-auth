import type { NextConfig } from "next";
// @ts-expect-error - plugin types optional
import withFederatedSidecar from "@module-federation/nextjs-mf/plugin";

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

export default withFederatedSidecar({
  name: "home",
  filename: "static/chunks/remoteEntry.js",
  exposes: {},
  remotes: {
    cart: `cart@${process.env.CART_MF_URL ?? "http://localhost:3001/_next/static/chunks/remoteEntry.js"}`,
  },
})(nextConfig);
