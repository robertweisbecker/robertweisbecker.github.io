"use client";

import * as React from "react";

import {
  DvdAnimationControls,
  DvdAnimationPlayButton,
  DvdAnimationRoot,
  DvdAnimationScore,
  DvdAnimationStage,
} from "@/components/animation/dvd-animation";
import { ColorSwatchGroup, type ColorSwatch } from "@/components/color-swatch-group";
import { Separator } from "@/components/ui/separator";

const DVD_LOADER_PALETTES = [
  {
    value: "rainbow",
    label: "Rainbow",
    color: "#0ff",
    colors: ["#0ff", "#ff0", "#0ff", "#f0f", "#0f0"],
  },
  {
    value: "cyan",
    label: "Cyan",
    color: "#22d3ee",
    colors: ["#22d3ee", "#67e8f9", "#06b6d4", "#a5f3fc", "#0891b2"],
  },
  {
    value: "lemon",
    label: "Lemon",
    color: "#facc15",
    colors: ["#facc15", "#fde047", "#fef08a", "#eab308", "#fef3c7"],
  },
  {
    value: "lime",
    label: "Lime",
    color: "#84cc16",
    colors: ["#84cc16", "#bef264", "#22c55e", "#a3e635", "#4ade80"],
  },
  {
    value: "blue",
    label: "Blue",
    color: "#60a5fa",
    colors: ["#60a5fa", "#38bdf8", "#818cf8", "#93c5fd", "#2563eb"],
  },
  {
    value: "pink",
    label: "Pink",
    color: "#f472b6",
    colors: ["#f472b6", "#fb7185", "#e879f9", "#f9a8d4", "#d946ef"],
  },
] as const;

type DvdLoaderPalette = (typeof DVD_LOADER_PALETTES)[number]["value"];

const DVD_LOADER_SWATCHES: ColorSwatch[] = DVD_LOADER_PALETTES.map(({ value, label, color, colors }) => ({
  value,
  label,
  color,
  preview: `conic-gradient(${colors.join(", ")})`,
}));

function isDvdLoaderPalette(value: string): value is DvdLoaderPalette {
  return DVD_LOADER_PALETTES.some((option) => option.value === value);
}

export function DvdLoaderDemo() {
  const [palette, setPalette] = React.useState<DvdLoaderPalette>("rainbow");
  const selectedPalette = DVD_LOADER_PALETTES.find((option) => option.value === palette) ?? DVD_LOADER_PALETTES[0];

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      <DvdAnimationRoot
        duration={60}
        width={640}
        height={640}
        logoScale={0.3}
        colors={[...selectedPalette.colors]}
        className="dark mx-auto w-full max-w-md bg-background"
        data-testid="dvd-loader-demo"
      >
        <DvdAnimationStage />
        <DvdAnimationControls className="dark! flex-col gap-3">
          <div className="flex items-center gap-2">
            <DvdAnimationPlayButton className="text-foreground" />
            <Separator orientation="vertical" className="h-button-xs" />
            <DvdAnimationScore />
          </div>
        </DvdAnimationControls>
      </DvdAnimationRoot>
      <ColorSwatchGroup
        colors={DVD_LOADER_SWATCHES}
        value={palette}
        onValueChange={(nextPalette) => setPalette(isDvdLoaderPalette(nextPalette) ? nextPalette : "rainbow")}
        allowCustomColors={false}
        className="bg-background/30 backdrop-blur"
      />
    </div>
  );
}
