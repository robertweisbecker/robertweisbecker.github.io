import { pageData } from "@/lib/data/pages";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";

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

export function PageHeader({ pageKey }: { pageKey: string }) {
	const page = typedPageData[pageKey];

	if (!page) {
		return (
			<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
				Page data not found for key: {pageKey}
			</div>
		);
	}

	return (
		<div className="mb-10 flex items-start gap-16 w-full">
			<div className="flex-1 text-balance text-3xl tracking-tight pt-2">
				<h1 className="inline font-semibold">{page.title} </h1>
				<span className="inline text-muted-foreground">{page.subtitle}</span>
			</div>
			<aside className="flex flex-col gap-3 text-xs">
				<div className="flex flex-col">
					<p className="text-muted-foreground">Role</p>
					<p className="">{page.role}</p>
				</div>
				{page.team && page.team.length > 0 && (
					<div className="flex gap-1 flex-col">
						<p className="text-muted-foreground">Team</p>
						<ul className="flex gap-1 flex-col">
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
						<p className="">{page.date}</p>
					</div>
				)}
			</aside>
		</div>
	);
}
