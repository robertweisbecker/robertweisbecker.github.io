"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconChevronDown, IconHome, IconInfoCircle } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
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

export function Header() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const [open, setOpen] = useState(false);

	return (
		<nav className={cn("sticky top-0 z-50 h-12")}>
			<div className="mx-auto flex items-center gap-1 px-4 py-2">
				<Link href="/" className="text-xs font-semibold font-mono">
					bob.fyi
				</Link>

				<div className="flex-1" />
				<Button variant="ghost" size="sm" render={<Link href="/about" />} nativeButton={false}>
					About
				</Button>

				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger render={<Button variant="ghost" size="sm" />}>
						<span className="hidden md:block">Work</span>
						<span className="md:hidden">Menu</span>
						<IconChevronDown className={cn("transition-transform", open && "rotate-180")} data-icon="inline-end" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>Work</DropdownMenuLabel>
							{projects.map((project) => (
								<DropdownMenuItem key={project.id} render={<Link href={project.path} />} nativeButton={false}>
									{project.nickname}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator className="md:hidden" />
						<div className="md:hidden">
							<DropdownMenuItem render={<Link href="/" />} nativeButton={false}>
								<IconHome />
								home
							</DropdownMenuItem>
							<DropdownMenuItem render={<Link href="/about" />} nativeButton={false}>
								<IconInfoCircle />
								about
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>

				<ModeToggle />
			</div>
			<div
				className={cn(
					"pointer-events-none absolute inset-0 -z-1 h-20",
					// 'bg-gradient-to-b to-25%',
					// 'from-background to-transparent',
					// 'from-red/90 to-red/0 bg-gradient-to-b',
					// 'mask-b-from-background mask-b-from-50% mask-b-to-transparent',
					"backdrop-blur-xs",
					// 'from-background bg-gradient-to-b to-transparent',
					// 'mask-b-from-background mask-b-from-25% mask-b-to-transparent',

					"bg-linear-to-b from-sidebar via-sidebar/80 via-35% from-0% to-sidebar/0",
					"mask-b-from-50%",
				)}></div>
		</nav>
	);
}
