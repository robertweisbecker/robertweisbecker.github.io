import { pageData } from "@/lib/data/pages";
import { LinkOut } from "@/components/link-out";
import type { ProjectFrontmatter } from "@/lib/types";

type PageData = {
	title: string;
	description?: string;
	subtitle?: string;
	role?: string;
	team?: { name?: string; role?: string; url?: string }[];
	date?: string;
	imageUrl?: string;
};

const typedPageData: Record<string, PageData> = pageData;

interface PageHeaderWithFrontmatter {
	frontmatter: ProjectFrontmatter;
	pageKey?: never;
}

interface PageHeaderWithPageKey {
	pageKey: string;
	frontmatter?: never;
}

type PageHeaderProps = PageHeaderWithFrontmatter | PageHeaderWithPageKey;

export function PageHeader(props: PageHeaderProps) {
	const page: PageData | undefined =
		"frontmatter" in props && props.frontmatter ? props.frontmatter : typedPageData[props.pageKey!];

	if (!page) {
		return (
			<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
				Page data not found for key: {props.pageKey}
			</div>
		);
	}

	return (
		<div className="mb-10 flex w-full items-start gap-16 max-sm:flex-col">
			<div className="flex-1 text-pretty pt-2 text-3xl tracking-tight">
				<h1 className="inline font-semibold">{page.title} </h1>
				<span className="inline text-muted-foreground">{page.subtitle}</span>
			</div>
			<aside className="flex flex-col gap-3 text-xs">
				<div className="flex flex-col">
					<p className="text-muted-foreground">Role</p>
					<p>{page.role}</p>
				</div>
				{page.team && page.team.length > 0 && (
					<div className="flex flex-col gap-1">
						<p className="text-muted-foreground">Team</p>
						<ul className="flex flex-col gap-1">
							{page.team.map((member) => (
								<li key={member.name ?? member.role} className="flex flex-wrap items-center gap-2">
									{member.url ? (
										<LinkOut href={member.url} text={member.name ?? ""} />
									) : (
										<span className="font-medium">{member.name}</span>
									)}
									{member.role && <span className="text-muted-foreground">{member.role}</span>}
								</li>
							))}
						</ul>
					</div>
				)}
				{page.date && (
					<div>
						<p className="text-muted-foreground">When</p>
						<p>{page.date}</p>
					</div>
				)}
			</aside>
		</div>
	);
}
