import fs from "fs";
import path from "path";
import type { TocItem } from "./types";
import { slugify } from "./utils";

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(projectsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));
}

export function getProjectToc(slug: string): TocItem[] {
  const source = fs.readFileSync(path.join(projectsDir, `${slug}.mdx`), "utf-8");
  const cleaned = source.replace(/^---[\s\S]*?---\n/, "").replace(/```[\s\S]*?```/g, "");
  return [...cleaned.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((m) => ({
    depth: m[1].length,
    text: m[2].trim(),
    id: slugify(m[2].trim()),
  }));
}
