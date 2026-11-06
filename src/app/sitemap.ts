import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pharmiq.online",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
