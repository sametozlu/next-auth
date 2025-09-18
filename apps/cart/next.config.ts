import type { NextConfig } from "next";
// @ts-expect-error - plugin types optional
import withFederatedSidecar from "@module-federation/nextjs-mf/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "fakestoreapi.com" }],
  },
};

export default withFederatedSidecar({
  name: "cart",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./CartWidget": "./src/components/CartWidget",
  },
  remotes: {},
})(nextConfig);
