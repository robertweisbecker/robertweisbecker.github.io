"use client";

import * as React from "react";
import { ChromeTabs } from "@/components/chrome-tabs";
import { CursorArrowIcon, Favicon, GithubIcon, VercelIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function ChromeTabDvdPanel({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
}) {
  return (
    <ChromeTabs.Panel value={value} className="relative overflow-hidden">
      <div className={cn("mx-auto flex min-h-40 w-full flex-col items-center justify-center gap-1 overflow-hidden p-1", className)}>
        <div className="relative flex w-full max-w-36 flex-col gap-4 rounded-sm bg-card p-3 text-card-foreground shadow-border-sm">
          <div className="flex items-center gap-2">
            <Icon className="size-3 opacity-20 **:fill-current" />
            <span className="font-pixel text-2xs uppercase">{label}</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-1.5 w-[60%] rounded-full bg-muted-foreground/40" />
            <div className="h-1.5 w-[90%] rounded-full bg-muted-foreground/20" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 rounded-sm border" />
            <div className="h-4 rounded-sm border" />
            <div className="h-4 w-full rounded-sm bg-linear-to-b from-primary/80 to-primary" />
          </div>
        </div>
      </div>
      <div className="absolute top-1/4 left-2/3 grid-stack border p-2">
        <CursorArrowIcon className="absolute -top-3 -left-3 size-4 drop-shadow-xs drop-shadow-black/50 *:fill-(--info-500) *:stroke-white" />

        <div className="rounded-full bg-(--info-500) px-2 py-0.5 text-2xs whitespace-nowrap text-white shadow-sm outline -outline-offset-1 outline-border">
          {label}
        </div>
      </div>
    </ChromeTabs.Panel>
  );
}

export function ChromeTabsDemo() {
  return (
    <ChromeTabs defaultValue="preview" className="max-w-md border border-border/50 dark:bg-black">
      <ChromeTabs.List>
        <ChromeTabs.Tab value="preview" className="w-fit">
          <Favicon className="-ms-1 size-4" />
          bob.fyi
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="code" className="w-fit">
          <GithubIcon className="-ms-1 size-4" />
          Github
        </ChromeTabs.Tab>
        <ChromeTabs.Tab value="output" className="w-fit" flush={false}>
          <VercelIcon className="-ms-1 size-4" />
          Vercel
        </ChromeTabs.Tab>
      </ChromeTabs.List>
      <ChromeTabDvdPanel value="preview" label="bob.fyi" icon={Favicon} />
      <ChromeTabDvdPanel value="code" label="Github" icon={GithubIcon} />
      <ChromeTabDvdPanel value="output" label="Vercel" icon={VercelIcon} />
    </ChromeTabs>
  );
}
