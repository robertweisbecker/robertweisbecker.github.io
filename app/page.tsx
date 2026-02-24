import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { resources } from "@/lib/data/resources";
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
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
} from "@/components/ui/card";
import React from "react";
import { LinkOut } from "@/components/link-out";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div className="grid gap-16">
			<div className="mt-32">
				<h1 className="font-medium">Robert Weisbecker</h1>
				<p className="text-muted-foreground">Designing products & systems</p>
			</div>
			<div className="">
				<p className="text-balance">
					You can call me Bob. Here's my little corner of the internet.{" "}
				</p>
				<p>If you're reading this now, I made it for you.</p>
			</div>

			<Separator className="min-h-0.5 max-w-20" />
			<h2 className="text-muted-foreground text-sm" id="projects">
				Projects
			</h2>

			<ItemGroup>
				{projects.map((project, index) => (
					<React.Fragment key={project.id}>
						<Item
							key={project.id}
							size="lg"
							render={<Link href={project.path} />}
						>
							{project.logo && (
								<ItemMedia
									variant="image"
									className="p-1 shadow-black/20 outline-black/5"
								>
									<img src={project.logo} alt="" />
								</ItemMedia>
							)}
							<ItemContent>
								<ItemTitle>{project.title}</ItemTitle>
								<ItemDescription>{project.description}</ItemDescription>
							</ItemContent>
							<ItemActions>
								<IconArrowRight className="text-muted-foreground size-4" />
							</ItemActions>
						</Item>
						{index !== projects.length - 1 && <ItemSeparator />}
					</React.Fragment>
				))}
			</ItemGroup>

			{/* <Separator className=" min-h-0.5 max-w-20" />
			<h2 className="text-muted-foreground  text-sm" id="resources">
				Resources
			</h2>

			<div className="grid  grid-cols-1 gap-4 sm:grid-cols-3">
				{resources.map((resource) => (
					<Card
						key={resource.id}
						className="group/resource focus-within:ring-ring relative h-full transition-shadow focus-within:ring-2 hover:shadow-md"
					>
						<CardHeader>
							<CardTitle>
								<a
									href={resource.href}
									className="outline-none before:absolute before:inset-0"
									target="_blank"
									rel="noopener noreferrer"
								>
									{resource.title}
								</a>
							</CardTitle>
							<CardAction>
								<IconArrowRight className="text-muted-foreground size-4 shrink-0 opacity-0 transition-opacity group-hover/resource:opacity-100" />
							</CardAction>
						</CardHeader>
						{resource.thumbnail && (
							<img
								src={resource.thumbnail}
								alt=""
								className="bg-muted aspect-2/1 w-full object-cover"
							/>
						)}
						<CardContent>
							<CardDescription>{resource.description}</CardDescription>
						</CardContent>
					</Card>
				))}
			</div> */}
		</div>
	);
}
