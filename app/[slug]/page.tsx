import { Article } from "@/components/article";
import { getProjectSlugs } from "@/lib/projects";

export function generateStaticParams() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);
	return {
		title: frontmatter.title,
		description: frontmatter.subtitle,
	};
}

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { default: Post, frontmatter } = await import(
		`@/content/projects/${slug}.mdx`
	);

	return (
		<Article frontmatter={frontmatter}>
			<Post />
		</Article>
	);
}
