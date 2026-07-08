import { ColorSwatchGroup } from "@/components/color-swatch-group";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CobotButtonDemo() {
  const [highlightColor, setHighlightColor] = useState("var(--hue-300)");
  return (
    <>
      <button
        className={cn(
          "relative isolate m-10 inline-flex h-button-lg items-center rounded-full px-8 pb-0.5 font-medium text-white transition-[scale] duration-100 ease-out",

          "border-[0.5px] border-muted-foreground",
          "ring-[0.5px] ring-black/20",
          "inset-shadow-sm inset-shadow-neutral-300/50",
          "bg-linear-to-b from-white from-5% via-neutral-900 via-67% to-(--highlight-color) bg-center",
          "shadow-md text-shadow-[0px_1px_0px_hsl(0_0_100%/30%),0px_.25px_hsl(0_0_0_/_100%),0_0_1px_hsl(0_0_0_/_80%),0_.5px_.5px_hsl(0_0_100%_/_50%)]",
          "before:absolute before:inset-0.5 before:-z-1 before:rounded-full before:bg-(--highlight-color) before:bg-radial-[at_25%_-25%] before:from-neutral-300/80 before:via-neutral-400 before:to-neutral-600 before:bg-size-[200%_100%] before:shadow-lg before:shadow-(color:--highlight-color)/30 before:transition-all before:duration-100 before:ease-out",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          "active:translate-y-px active:scale-97 active:before:inset-[1.5px] active:before:blur-[.5px]"
        )}
        style={
          {
            "--highlight-color": highlightColor,
          } as React.CSSProperties
        }
      >
        Agent
      </button>
      <ColorSwatchGroup
        allowCustomColors={false}
        value={highlightColor}
        onValueChange={(value) => {
          setHighlightColor(value);
        }}
        colors={[
          {
            label: "Auto",
            color: "var(--hue-200)",
            value: "var(--hue-200)",
          },
          {
            label: "Pink",
            color: "var(--color-magenta-300)",
            value: "var(--color-magenta-300)",
          },
          {
            label: "cyan",
            color: "var(--color-cyan-300)",
            value: "var(--color-cyan-300)",
          },
          {
            label: "lime",
            color: "var(--color-lime-300)",
            value: "var(--color-lime-300)",
          },
          {
            label: "indigo",
            color: "var(--color-indigo-300)",
            value: "var(--color-indigo-300)",
          },
        ]}
        className="mt-4"
      />
    </>
  );
}
