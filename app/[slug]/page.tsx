import { getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Template import: slug is from generateStaticParams only (dynamicParams = false); MDX is resolved at build time.
  const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);
  return {
    title: frontmatter.title,
    description: frontmatter.subtitle,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Template import: slug is from generateStaticParams only (dynamicParams = false).
  const { default: Post } = await import(`@/content/projects/${slug}.mdx`);
  return <Post />;
}
