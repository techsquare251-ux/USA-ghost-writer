import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/src/data/services";
import { blogPosts } from "@/src/data/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://liblit.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/packages",
    "/portfolio",
    "/testimonials",
    "/blog",
    "/contact-us",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const serviceEntries = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const blogEntries = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
