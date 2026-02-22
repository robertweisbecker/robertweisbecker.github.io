"use client";

import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { projects } from "@/lib/data/projects";
import { Heading } from "@/components/ui/heading";

export function ProjectGrid() {
  return (
    <div
      id="projects"
      className="rounded-2xl border border-border/50 bg-background/40 ps-4 pe-6 shadow-lg backdrop-blur-[80px]"
    >
      {projects.map((project, index) => (
        <Link
          key={project.id}
          href={project.path}
          className="group flex items-center gap-3 border-b border-border/50 py-5 pe-2 transition-all duration-300 last:border-none hover:translate-x-4 hover:border-border"
        >
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              className="size-10 shrink-0 self-start rounded-lg border border-transparent bg-background p-1 opacity-80 transition-all duration-200 scale-[0.8] group-hover:scale-[1.2] group-hover:border-border group-hover:bg-card group-hover:opacity-100 group-hover:shadow-sm dark:brightness-[1.2] dark:group-hover:brightness-100"
            />
          )}
          <div className="flex flex-1 flex-wrap items-baseline">
            <Heading level={3}>{project.title}</Heading>
            <span className="flex-1 text-sm text-muted-foreground">
              {project.description}
            </span>
          </div>
          <RiArrowRightLine className="size-4 shrink-0 opacity-100" />
        </Link>
      ))}
    </div>
  );
}
