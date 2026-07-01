"use client";

import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRafCommittedValue } from "@/hooks/use-raf-committed-value";
import { isOneOf } from "@/lib/is-one-of";
import { cn } from "@/lib/utils";
import * as React from "react";
import { getClipPathValue, getPathD, getTailwindBackgroundClass, getTailwindSizeClass } from "./geometry";
import { useClipPathEditor } from "./context";

const outputTabs = ["tailwind", "svg", "css"] as const;
type OutputTab = (typeof outputTabs)[number];

export function ClipPathEditorOutput({ className }: React.ComponentProps<"div">) {
  const { state } = useClipPathEditor();
  const committedState = useRafCommittedValue(state, state.isDragging);
  const [activeTab, setActiveTab] = React.useState<OutputTab>("tailwind");
  const pathD = getPathD(committedState);
  const clipPathValue = getClipPathValue(committedState);

  const activeOutput = React.useMemo(() => {
    switch (activeTab) {
      case "css":
        return {
          code: `span {\n  width: ${committedState.shapeSize}px;\n  height: ${committedState.shapeSize}px;\n  background-color: ${committedState.color};\n  clip-path: ${clipPathValue};\n}`,
          filename: "clip-path.css",
          language: "css" as const,
        };
      case "svg":
        return {
          code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${committedState.shapeSize}" height="${committedState.shapeSize}" fill="${committedState.color}">\n  <path d="${pathD}" />\n</svg>`,
          filename: "path.svg",
          language: "html" as const,
        };
      case "tailwind":
        return {
          code: `<div className="${getTailwindBackgroundClass(committedState.color)} ${getTailwindSizeClass(committedState.shapeSize)} [clip-path:${clipPathValue.replace(/\s+/g, "_")}]" />`,
          filename: "tailwind",
          language: "ts" as const,
        };
    }
  }, [activeTab, clipPathValue, committedState.color, committedState.shapeSize, pathD]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(next) => {
        if (isOneOf(next, outputTabs)) setActiveTab(next);
      }}
      className={cn("w-full", className)}
    >
      <TabsList variant="line">
        <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
        <TabsTrigger value="svg">SVG</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab} className="mt-2">
        <CodeBlock
          code={activeOutput.code}
          filename={activeOutput.filename}
          language={activeOutput.language}
          lineNumbers={activeTab === "tailwind"}
          selectAll={activeTab === "svg"}
          isUpdating={state.isDragging}
        />
      </TabsContent>
    </Tabs>
  );
}
