import { IconHandStop, IconEye } from "@tabler/icons-react";
import { Heading } from "@/components/ui/heading";
// import { ProjectGrid } from "@/components/project-grid";
import { LinkOut } from "@/components/link-out";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { projects } from "@/lib/data/projects";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@/components/ui/item";
import React from "react";

// function ProjectGrid() {
// 	return (
// 		<ItemGroup id="projects">
// 			{projects.map((project) => (
// 				<Item key={project.id} variant="muted" render={<Link href={project.path} />}>
// 					{project.logo && (
// 						<ItemMedia variant="image">
// 							<img src={project.logo} alt="" />
// 						</ItemMedia>
// 					)}
// 					<ItemContent>
// 						<ItemTitle>{project.title}</ItemTitle>
// 						<ItemDescription>{project.description}</ItemDescription>
// 					</ItemContent>
// 					<ItemActions>
// 						<IconArrowRight className="size-4 text-muted-foreground" />
// 					</ItemActions>
// 				</Item>
// 			))}
// 		</ItemGroup>
// 	);
// }

export default function Home() {
	return (
		<div className="mt-10 grid gap-8">
			{/* <img
				src="/assets/blob.png"
				alt=""
				className="pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[100vmin] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80 sm:left-3/4"
			/> */}
			<div>
				<p className="font-medium">Robert Weisbecker</p>
				<p className="text-muted-foreground">Systems & Product Designer</p>
			</div>
			<Separator className="max-w-20 min-h-0.5" />
			<p className="text-muted-foreground">Work</p>

			<ItemGroup id="projects">
				{projects.map((project, index) => (
					<React.Fragment key={project.id}>
						<Item key={project.id} size="lg" render={<Link href={project.path} />}>
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
						{index !== projects.length - 1 && <ItemSeparator />}
					</React.Fragment>
				))}
			</ItemGroup>
		</div>
	);
}
