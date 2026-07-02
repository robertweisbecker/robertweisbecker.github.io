"use client";

import { usePathname } from "next/navigation";

import { Favicon } from "@/components/icons";
import { LinkButton } from "@/components/ui/link-button";

export function HomeLink() {
  const pathname = usePathname();

  return (
    <LinkButton href="/" variant="ghost" size="sm" aria-current={pathname === "/" ? "true" : "false"} className="me-2 gap-2 font-pixel">
      <Favicon className="size-4 text-secondary-foreground" data-icon="inline-start" />

      <span className="text-[11px]/[10px] max-sm:hidden">
        {" "}
        bob
        <br />
        <span className="text-(--hue-500)">dot</span>
        <span className="text-muted-foreground">fyi</span>
      </span>
    </LinkButton>
  );
}
