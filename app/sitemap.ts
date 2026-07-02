import { playgroundRoutes } from "@/lib/data/playground";
import { posts } from "@/lib/data/posts";
import { projects } from "@/lib/data/projects";
import type { MetadataRoute } from "next";

const SITE_URL = "https://bob.fyi";

const staticRoutes = ["/", "/about", "/posts", "/art", "/playground"] as const;
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

  const projectEntries: MetadataRoute.Sitemap = projects.flatMap((project) =>
    project.published
      ? [
          {
            url: `${SITE_URL}${project.path}`,
            lastModified: new Date(),
          },
        ]
      : []
  );

  const playgroundEntries: MetadataRoute.Sitemap = playgroundRoutes.map((route) => ({
    url: `${SITE_URL}${route.href}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...postEntries, ...projectEntries, ...playgroundEntries];
}
