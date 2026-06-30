import { posts } from "@/lib/data/posts";
import { getProjectSlugs } from "@/lib/projects";
import type { MetadataRoute } from "next";

const SITE_URL = "https://bob.fyi";

const staticRoutes = ["/", "/about", "/posts"] as const;
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}${post.path}`,
    lastModified: new Date(),
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...postEntries, ...projectEntries];
}
