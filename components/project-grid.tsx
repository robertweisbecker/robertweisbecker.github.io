"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { projects } from "@/lib/data/projects";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";

export function ProjectGrid() {
	return (
		<ItemGroup id="projects">
			{projects.map((project) => (
				<Item key={project.id} variant="muted" render={<Link href={project.path} />}>
					{project.logo && (
						<ItemMedia variant="image">
							<img src={project.logo} alt="" />
						</ItemMedia>
					)}
					<ItemContent>
						<ItemTitle>{project.title}</ItemTitle>
						<ItemDescription>{project.description}</ItemDescription>
					</ItemContent>
					<ItemActions>
						<IconArrowRight className="size-4 text-muted-foreground" />
					</ItemActions>
				</Item>
			))}
		</ItemGroup>
	);
}
