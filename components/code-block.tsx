"use client";

  import { Badge } from "@/components/ui/badge"
  import { Card,CardAction,CardContent,CardDescription,CardHeader } from "@/components/ui/card"
  import { CopyButton } from "@/components/ui/copy-button"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import { cn } from "@/lib/utils"
  import { IconLoader2 } from "@tabler/icons-react"
  import { AnimatePresence,motion } from "motion/react"
  import * as React from "react"
  import { highlight } from "sugar-high"
  import { css as cssPreset } from "sugar-high/presets"

export type CodeBlockProps = {
  code: string;
  filename?: string;
  language?: "css" | "html" | "js" | "ts" | "json" | "tsx" | "jsx" | "md" | "mdx" | "text";
  className?: string;
  lineNumbers?: boolean;
  isUpdating?: boolean;
  selectAll?: boolean;
};

export function CodeBlock({
  code,
  filename,
  language,
  className,
  lineNumbers = false,
  isUpdating = false,
  selectAll = false,
}: CodeBlockProps) {
  const highlightedHtml = React.useMemo(() => {
    if (!language) return null;
    return language === "css" ? highlight(code, cssPreset) : highlight(code);
  }, [code, language]);

  return (
    <Card size="sm" variant="muted" className={cn("not-prose relative pb-0", className)}>
      {filename && (
        <CardHeader className="border-b">
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
                  initial={{ opacity: 0, filter: "blur(2px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(2px)" }}
                  transition={{ duration: 0.2, ease: "easeIn" }}
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
      )}
      {!filename ? (
        <CopyButton
          value={code}
          size="icon-xs"
          variant="ghost"
          disabled={isUpdating}
          className="absolute top-2.5 right-2.5 z-1"
        />
      ) : null}
      <CardContent>
        <ScrollArea orientation="both" scrollbarGutter scrollFade>
          <pre
            className={cn("min-h-0 px-2 pb-2 text-xs/6", lineNumbers && "show-line-numbers", selectAll && "select-all")}
          >
            {highlightedHtml ? (
              <code className="font-mono" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
            ) : (
              <code className="font-mono">{code}</code>
            )}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
