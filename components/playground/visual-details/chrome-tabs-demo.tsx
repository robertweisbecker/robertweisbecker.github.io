"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ChromeTabs } from "@/components/chrome-tabs";
import { DvdAnimationRoot, DvdAnimationStage } from "@/components/animation/dvd-animation";
import { Favicon, GithubIcon, VercelIcon } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const CHROME_TAB_DVD_COLORS = ["currentColor"];

function ChromeTabDvdPanel({
  value,
  label,
  icon: Icon,
  className,
}: {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className: string;
}) {
  return (
    <ChromeTabs.Panel value={value} className="overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        className={cn("mx-auto h-36 w-72 overflow-hidden border border-dashed", className)}
      >
        <DvdAnimationRoot
          duration={42}
          width={288}
          height={144}
          logoScale={0.22}
          logoAspectRatio={1}
          colors={CHROME_TAB_DVD_COLORS}
          className="size-full"
        >
          <DvdAnimationStage logoViewBox="0 0 16 16" aria-label={`${label} bouncing icon`}>
            <Icon width="100%" height="100%" />
          </DvdAnimationStage>
        </DvdAnimationRoot>
      </motion.div>
    </ChromeTabs.Panel>
  );
}

export function ChromeTabsDemo() {
  return (
    <ChromeTabs defaultValue="preview" className="max-w-md border border-border/50 dark:bg-black">
      <ChromeTabs.List>
        <ChromeTabs.Tab value="preview" className="w-fit">
          <Avatar className="-ms-1.5 size-4.5">
            <AvatarImage src="https://github.com/robertweisbecker.png" alt="bob's avatar" />
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
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
      <ChromeTabDvdPanel value="preview" label="bob.fyi" icon={Favicon} className="border bg-accent text-muted-foreground" />
      <ChromeTabDvdPanel
        value="code"
        label="Github"
        icon={GithubIcon}
        className="border-violet-400 bg-violet-25 text-violet-500 dark:border-violet-600 dark:bg-violet-950 dark:text-violet-400"
      />
      <ChromeTabDvdPanel value="output" label="Vercel" icon={VercelIcon} className="border-white bg-black text-white" />
    </ChromeTabs>
  );
}
