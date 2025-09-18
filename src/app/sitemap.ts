import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return [
    { url: `${base}/tr`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/en`, changeFrequency: "daily", priority: 0.8 },
  ];
}


