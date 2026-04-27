"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";
import { highlight } from "sugar-high";
import { css as cssPreset } from "sugar-high/presets";
import { Collapsible, CollapsibleContent, CollapsibleIcon, CollapsibleTrigger } from "./ui/collapsible";
import { Button } from "./ui/button";

/** Matches former `data-closed:h-64` (16rem). */
const COLLAPSED_MAX_HEIGHT_FALLBACK = "16rem";

export type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: "css" | "html" | "js" | "ts" | "json" | "tsx" | "jsx" | "md" | "mdx" | "text";
  className?: string;
  lineNumbers?: boolean;
  isUpdating?: boolean;
  selectAll?: boolean;
  /** When true (default), code can expand/collapse; when false, full-height scroll area only. */
  collapsible?: boolean;
  /** Collapsed panel max height in px, applied as `--initial-height`. Falls back to 16rem (same as former `h-64`) when omitted. Only used when `collapsible` is true. */
  initialHeight?: number;
};

export function CodeBlock({
  code,
  filename,
  language,
  className,
  lineNumbers = false,
  isUpdating = false,
  selectAll = false,
  collapsible = false,
  initialHeight,
}: CodeBlockProps) {
  const reduceMotion = useReducedMotion();

  const badgeTransition = React.useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : {
            type: "spring" as const,
            stiffness: 420,
            damping: 36,
            mass: 0.7,
          },
    [reduceMotion]
  );

  const highlightedHtml = React.useMemo(() => {
    if (!language) return null;
    return language === "css" ? highlight(code, cssPreset) : highlight(code);
  }, [code, language]);

  const contentPadding = !filename && "pe-8";

  const codeContent = (
    <ScrollArea orientation="both" scrollbarGutter scrollFade>
      <pre className={cn("min-h-0 px-1 text-xs/6", lineNumbers && "show-line-numbers", selectAll && "select-all")}>
        {highlightedHtml ? (
          <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
        ) : (
          <code className="font-mono">{code}</code>
        )}
      </pre>
    </ScrollArea>
  );

  return (
    <Card size="sm" variant="muted" className={cn("not-prose relative pb-0", className)}>
      {filename ? (
        <CardHeader className="border-b border-dashed">
          <CardDescription className="flex items-center gap-1 font-pixel text-[11px]">
            {/* <IconFileCodeFilled data-icon="inline-start" className="size-4 opacity-64" /> */}
            <span aria-hidden="true" className="mr-1">
              {"</>"}
            </span>
            {filename}
          </CardDescription>

          <CardAction className="gap-2">
            <AnimatePresence initial={false}>
              {isUpdating ? (
                <motion.div
                  key="codeblock-updating-badge"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 2, scale: 0.98 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -2, scale: 0.98 }}
                  transition={badgeTransition}
                >
                  <Badge variant="inherit" className="rounded-full">
                    <IconLoader2 className="animate-spin opacity-64" strokeWidth={3} data-icon="inline-start" />
                    Updating...
                  </Badge>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <CopyButton value={code} size="icon-xs" variant="ghost" disabled={isUpdating} />
          </CardAction>
        </CardHeader>
      ) : (
        <CopyButton
          value={code}
          size="icon-xs"
          variant="ghost"
          disabled={isUpdating}
          className="absolute top-3 right-2 z-1"
        />
      )}
      {collapsible ? (
        <Collapsible>
          <CardContent className={cn(contentPadding)}>
            <CollapsibleContent
              className="relative overflow-hidden data-open:h-(--collapsible-panel-height) data-closed:h-(--initial-height)!"
              style={
                {
                  "--initial-height": initialHeight !== undefined ? `${initialHeight}px` : COLLAPSED_MAX_HEIGHT_FALLBACK,
                } as React.CSSProperties
              }
              keepMounted
              hidden={false}
            >
              {codeContent}
            </CollapsibleContent>
          </CardContent>
          <CardFooter>
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />} className="w-full">
              <span className="in-data-panel-open:hidden">Expand</span>
              <span className="hidden in-data-panel-open:block">Collapse</span>
              <CollapsibleIcon side="inline-end" className="text-[11px]" />
            </CollapsibleTrigger>
          </CardFooter>
        </Collapsible>
      ) : (
        <CardContent className={cn(contentPadding)}>{codeContent}</CardContent>
      )}
    </Card>
  );
}
