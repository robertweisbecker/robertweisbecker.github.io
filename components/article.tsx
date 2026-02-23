import { BackButton } from "@/components/back-button";
import { PageHeader } from "@/components/page-header";
import type { ProjectFrontmatter } from "@/lib/types";

interface ArticleWithFrontmatter {
	children: React.ReactNode;
	frontmatter: ProjectFrontmatter;
	pageKey?: never;
}

interface ArticleWithPageKey {
	children: React.ReactNode;
	pageKey: string;
	frontmatter?: never;
}

type ArticleProps = ArticleWithFrontmatter | ArticleWithPageKey;

export function Article({ children, ...props }: ArticleProps) {
	return (
		<div className="flex max-w-4xl flex-col items-start gap-10">
			<div className="h-4" />
			<BackButton />
			{"frontmatter" in props && props.frontmatter ? (
				<PageHeader frontmatter={props.frontmatter} />
			) : (
				<PageHeader pageKey={props.pageKey!} />
			)}
			<div className="prose flex max-w-2xl flex-col [&_h2]:w-full [&_h3]:w-full">
				{children}
			</div>
			<div className="h-4" />
		</div>
	);
}
