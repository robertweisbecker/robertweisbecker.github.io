  import { BackButton } from "@/components/back-button"
  import { Pagination } from "@/components/pagination"
  import { ProjectMeta } from "@/components/project-meta"
  import { TableOfContents } from "@/components/table-of-contents"
  import { projects } from "@/lib/data/projects"
  import { getProjectToc } from "@/lib/projects"
  import type { ProjectFrontmatter } from "@/lib/types"
  import { resolveNeighbors } from "@/lib/utils"
  import React from "react"

export default async function MDXLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);
  const fm = frontmatter as ProjectFrontmatter;
  const toc = getProjectToc(slug);

  const neighbors = resolveNeighbors(
    projects.map((p) => ({ title: p.title, path: p.path })),
    `/${slug}`,
    { title: "Projects", href: "/#projects" }
  );

  return (
    <div className="container mx-auto grid grid-cols-[14rem_minmax(0,1fr)_14rem] gap-8 px-4 max-lg:flex max-lg:flex-col">
      <aside className="not-prose self-start max-lg:hidden lg:sticky lg:top-24">
        <BackButton href="/#projects">Projects</BackButton>
        <TableOfContents toc={toc} />
      </aside>

      <div className="col-start-2 mx-auto max-w-3xl min-w-0">
        <div className="mx-auto mb-6 grid max-w-xl items-baseline gap-2">
          <h1 className="scroll-mt-24 text-2xl font-[575] tracking-tight text-balance">{fm.title}</h1>
          <p className="max-w-prose text-xl leading-tight font-[450] tracking-tight text-balance">{fm.subtitle}</p>
        </div>

        <div className="prose group/article col-start-2 max-w-full min-w-0 sm:mb-96">{children}</div>
        <Pagination {...neighbors} backHref="/#projects" backLabel="Projects" />
      </div>
      <ProjectMeta role={fm.role} team={fm.team} date={fm.date} meta={fm.meta} />
    </div>
  );
}
