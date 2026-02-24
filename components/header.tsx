"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconHome, IconInfoCircle } from "@tabler/icons-react";
import { ModeToggle } from "@/components/mode-toggle";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Separator } from "./ui/separator";

export function Header() {
	const pathname = usePathname();
	const isHome = pathname === "/";

	return (
		<nav className={cn("sticky top-0 z-50")}>
			<div className="flex items-center gap-1 px-4 py-2 w-full max-w-4xl mx-auto h-12 sm:px-6">
				<Button
					render={<Link href="/" />}
					nativeButton={false}
					size="sm"
					variant="ghost"
					className="font-semibold font-mono text-muted-foreground">
					<span
						data-icon="inline-start"
						className="size-4 grid place-items-center text-lg -top-1 leading-5 relative"
						aria-hidden="true">
						◳
					</span>{" "}
					bob.fyi
				</Button>
				<Separator className="mx-1 h-4 my-auto" orientation="vertical" />

				<Button
					variant="ghost"
					size="sm"
					render={<Link href="/about" />}
					nativeButton={false}
					aria-current={pathname === "/about" ? "true" : "false"}
					className="max-md:hidden text-muted-foreground aria-current:bg-accent/64 aria-current:text-accent-foreground">
					About
				</Button>
				<Button variant="ghost" size="sm" render={<Link href="/components" />} nativeButton={false} className="hidden">
					Components
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant="ghost" size="sm" />}
						className="text-muted-foreground group/trigger"
						openOnHover={true}>
						<span className="hidden md:block">Work</span>
						<span className="md:hidden">Menu</span>
						<IconChevronDown
							className={cn("transition-transform duration-100 rotate-0 group-data-pressed/trigger:rotate-180")}
							data-icon="inline-end"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Projects</DropdownMenuLabel>
							{projects.map((project) => (
								<DropdownMenuItem
									key={project.id}
									render={<Link href={project.path} />}
									nativeButton={false}
									aria-current={pathname === project.path ? "true" : "false"}
									className="aria-current:bg-accent/64">
									{project.nickname}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator className="md:hidden" />

						<DropdownMenuItem render={<Link href="/" />} nativeButton={false} className="md:hidden">
							<IconHome />
							Home
						</DropdownMenuItem>
						<DropdownMenuItem render={<Link href="/about" />} nativeButton={false} className="md:hidden">
							<IconInfoCircle />
							About
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<ModeToggle className="ml-auto" />
			</div>
			<div
				className={cn(
					"pointer-events-none absolute inset-0 -z-1 h-20",
					"backdrop-blur-xs",
					"bg-linear-to-b from-sidebar via-sidebar/80 via-35% from-0% to-sidebar/0",
					"mask-b-from-50%",
				)}></div>
		</nav>
	);
}
