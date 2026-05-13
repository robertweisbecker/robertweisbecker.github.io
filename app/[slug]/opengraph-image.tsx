import { createOgCard, ogContentType, ogSize } from "@/lib/og";
import { getProjectSlugs } from "@/lib/projects";

export const alt = "Project | bob.fyi";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamic = "force-static";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Template import: slug is from generateStaticParams only (dynamicParams = false).
  const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);

  return createOgCard({
    title: frontmatter.title,
  });
}
