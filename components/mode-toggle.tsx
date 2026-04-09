"use client";

  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"
  import { IconMoonFilled,IconSunHighFilled } from "@tabler/icons-react"
  import { useTheme } from "next-themes"
  import { Tooltip,TooltipContent,TooltipTrigger } from "./ui/tooltip"

export function ModeToggle(props: React.ComponentProps<typeof TooltipTrigger>) {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="Toggle mode"
        className={cn(props.className)}
        {...props}
        render={<Button variant="ghost" size="icon-sm" />}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <IconSunHighFilled className="dark:hidden" strokeWidth={1.5} />
        <IconMoonFilled className="hidden dark:block" />
      </TooltipTrigger>
      <TooltipContent>Toggle mode</TooltipContent>
    </Tooltip>
  );
}
