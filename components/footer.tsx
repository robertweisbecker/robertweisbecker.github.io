"use client";

import { IconBrandLinkedin, IconCircleArrowUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons";

export function Footer() {
	return (
		<footer className="mx-auto max-w-4xl border-t px-4 py-5">
			<div className="flex flex-col items-center justify-between gap-2 md:flex-row">
				<p className="text-[0.625rem] text-muted-foreground">&copy; {new Date().getFullYear()} Robert Weisbecker</p>

				<div className="flex gap-1">
					<Button
						variant="link"
						size="icon"
						render={
							<a href="https://www.linkedin.com/in/robertweisbecker/" target="_blank" rel="noopener noreferrer" />
						}
						aria-label="LinkedIn"
						nativeButton={false}>
						<IconBrandLinkedin />
					</Button>
					<Button
						render={<a href="https://github.com/robertweisbecker" target="_blank" rel="noopener noreferrer" />}
						aria-label="GitHub"
						nativeButton={false}
						variant="link"
						size="icon">
						<GithubIcon />
					</Button>
					<Button
						variant="link"
						size="icon"
						render={<a onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" />}
						nativeButton={false}>
						<IconCircleArrowUp />
					</Button>
				</div>
			</div>
		</footer>
	);
}
