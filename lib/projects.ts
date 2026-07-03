import fs from "fs";
import path from "path";
import type { TocItem } from "./types";
import type { ProjectFrontmatter } from "./types";
import { slugify } from "./utils";

const projectsDir = path.join(process.cwd(), "content", "projects");

function getDedupedHeadingId(text: string, usedIds: Map<string, number>) {
  const id = slugify(text);
  const count = usedIds.get(id) ?? 0;
  usedIds.set(id, count + 1);
  return count === 0 ? id : `${id}-${count + 1}`;
}

export function getProjectSlugs(): string[] {
  const slugs: string[] = [];
  for (const file of fs.readdirSync(projectsDir)) {
    if (file.endsWith(".mdx")) slugs.push(path.basename(file, ".mdx"));
  }
  return slugs;
}

export function getProjectToc(slug: string): TocItem[] {
  const source = fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), "utf-8");
  const cleaned = source.replace(/^---[\s\S]*?---\n/, "").replace(/```[\s\S]*?```/g, "");
  const usedIds = new Map<string, number>();
  return [...cleaned.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((m) => {
    const text = m[2].trim();
    return {
      depth: m[1].length,
      text,
      id: getDedupedHeadingId(text, usedIds),
    };
  });
}

export async function getProjectFrontmatter(slug: string): Promise<ProjectFrontmatter> {
  const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);

  return frontmatter as ProjectFrontmatter;
}
