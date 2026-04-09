"use client";

  import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemMedia,
    ItemSeparator,
    ItemTitle,
  } from "@/components/ui/item"
  import { projects } from "@/lib/data/projects"
  import Link from "next/link"
  import React from "react"

export function ProjectGrid() {
  return (
    <ItemGroup>
      {projects.map((project, index) => (
        <React.Fragment key={project.id}>
          <Item
            render={<Link href={project.path} />}
            size="default"
            className="peer hover:text-secondary-foreground sm:-mx-3"
          >
            {project.logo && (
              <ItemMedia variant="image" className="p-1">
                <img src={project.logo} alt="" />
              </ItemMedia>
            )}
            <ItemContent>
              <ItemTitle>{project.title}</ItemTitle>
              <ItemDescription>{project.description}</ItemDescription>
            </ItemContent>
            <ItemDescription className="text-xs tabular-nums">{project.date}</ItemDescription>
            <ItemActions>{/* <IconArrowRight className="text-muted-foreground size-4" /> */}</ItemActions>
          </Item>
          {index !== projects.length - 1 && (
            <ItemSeparator className="group-hover/item-group:opacity-0 peer-hover:opacity-0" />
          )}
        </React.Fragment>
      ))}
    </ItemGroup>
  );
}
