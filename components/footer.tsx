"use client";

import { IconBrandGithubFilled, IconBrandLinkedin, IconCircleArrowUpFilled } from "@tabler/icons-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function Footer() {
	return (
		<footer className="mx-auto max-w-4xl border-t border-border/50 px-4 py-5">
			<div className="flex flex-col items-center justify-between gap-2 md:flex-row">
				<p className="text-[0.625rem] text-muted-foreground">&copy; {new Date().getFullYear()} Robert Weisbecker</p>

				<div className="flex gap-1">
					<a
						href="https://www.linkedin.com/in/robertweisbecker/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
						className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
						<IconBrandLinkedin />
					</a>
					<a
						href="https://github.com/robertweisbecker"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
						<IconBrandGithubFilled />
					</a>
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						aria-label="Scroll to top">
						<IconCircleArrowUpFilled />
					</Button>
				</div>
			</div>
		</footer>
	);
}
