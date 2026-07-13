import { MetadataRoute } from "next";
import { SITE, SERVICE_PAGES } from "./lib/constants";
import { getAllPosts } from "./lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceEntries: MetadataRoute.Sitemap = SERVICE_PAGES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...serviceEntries,
    { url: `${SITE.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
  ];
}
