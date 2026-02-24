"use client";

import { useTheme } from "next-themes";
import { IconMoonFilled, IconSun, IconSunFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle(props: React.ComponentProps<typeof Button>) {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon-sm"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			aria-label="Toggle theme"
			className={cn(props.className)}
			{...props}>
			<IconSun className="dark:hidden text-muted-foreground" />
			<IconMoonFilled className="dark:block hidden" />
		</Button>
	);
}
