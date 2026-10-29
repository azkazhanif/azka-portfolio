import type { MetadataRoute } from "next";
import { portfolios } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...portfolios.map((project) => ({
      url: `${SITE_URL}/portfolio/${project.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
