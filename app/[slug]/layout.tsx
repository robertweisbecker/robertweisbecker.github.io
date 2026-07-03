import * as React from "react";
import { BackButton } from "@/components/back-button";
import { Pagination } from "@/components/pagination";
import { ProjectMeta } from "@/components/project-meta";
import { TableOfContents } from "@/components/table-of-contents";
import { NAV_BACK_TRANSITION, TitleMorph, pageTitleTransitionName } from "@/components/view-transitions";
import { projects } from "@/lib/data/projects";
import { getProjectToc } from "@/lib/projects";
import type { ProjectFrontmatter } from "@/lib/types";
import { resolveNeighbors } from "@/lib/utils";

export default async function MDXLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Template import: slug is from generateStaticParams only (dynamicParams = false).
  const { frontmatter } = await import(`@/content/projects/${slug}.mdx`);
  const fm = frontmatter as ProjectFrontmatter;
  const toc = getProjectToc(slug);

  const neighbors = resolveNeighbors(
    projects.flatMap((p) => (p.published ? [{ title: p.title, path: p.path }] : [])),
    `/${slug}`,
    { title: "Projects", href: "/#projects" }
  );

  return (
    <div className="mx-auto max-w-7xl gap-8 max-lg:flex max-lg:flex-col lg:grid lg:grid-cols-[14rem_minmax(0,1fr)_14rem]">
      <aside id="toc" className="not-prose @container-[scroll-state] self-start max-lg:hidden lg:sticky lg:top-32">
        <BackButton href="/#projects" transitionTypes={NAV_BACK_TRANSITION}>
          Back
        </BackButton>

        <TableOfContents toc={toc} title={fm.title} />
      </aside>

      <div id="content-max" className="col-start-2 min-w-0">
        <div id="content-header" className="mx-auto flex max-w-xl flex-col items-start gap-4">
          <BackButton href="/#projects" className="mb-8 lg:hidden" transitionTypes={NAV_BACK_TRANSITION}>
            Projects
          </BackButton>

          <TitleMorph name={pageTitleTransitionName("project", slug)}>
            <h1 className="scroll-mt-16 text-h1 text-balance">{fm.title}</h1>
          </TitleMorph>
          <p className="mb-4 max-w-prose text-base leading-tight text-balance text-muted-foreground">{fm.subtitle}</p>
          <ProjectMeta
            role={fm.role}
            team={fm.team}
            date={fm.date}
            meta={fm.meta}
            className="mb-2 lg:hidden"
            size="sm"
            orientation="horizontal"
          />
        </div>

        <div
          id="content-body"
          className="prose group/article col-start-2 max-w-full min-w-0 overflow-visible sm:mb-96"
          style={{ anchorName: "--article" }}
        >
          {children}
        </div>
        <Pagination {...neighbors} backHref="/#projects" backLabel="Projects" />
      </div>

      <aside id="meta" className="not-prose max-lg:hidden max-md:order-2" style={{ anchorName: "--meta" }}>
        <ProjectMeta role={fm.role} team={fm.team} date={fm.date} meta={fm.meta} className="mt-auto" />
      </aside>
    </div>
  );
}
