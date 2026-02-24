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
		<div className="mx-auto max-w-4xl py-10">
			<div className="mx-auto mb-10 max-w-2xl">
				<BackButton className="sm:-ms-6!" />
			</div>
			{"frontmatter" in props && props.frontmatter ? (
				<PageHeader frontmatter={props.frontmatter} />
			) : (
				<PageHeader pageKey={props.pageKey!} />
			)}
			<div className="prose">{children}</div>
		</div>
	);
}
