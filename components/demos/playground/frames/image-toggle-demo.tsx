"use client";

import * as React from "react";
import { ImageToggle } from "@/components/blocks/image-toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import luminance from "@/public/assets/oklch/luminance.png";
import luminanceBw from "@/public/assets/oklch/luminance-bw.png";

type ImageToggleMode = "tabs" | "slider" | "comparison";

const IMAGE_TOGGLE_MODES: { value: ImageToggleMode; label: string }[] = [
  { value: "tabs", label: "Tabs" },
  { value: "slider", label: "Slider" },
  { value: "comparison", label: "Comparison" },
];

export function ImageToggleDemo() {
  const [mode, setMode] = React.useState<ImageToggleMode>("tabs");
  const selectedLabel = IMAGE_TOGGLE_MODES.find((option) => option.value === mode)?.label;

  return (
    <div className="grid w-full gap-3">
      <Select value={mode} onValueChange={(nextMode) => setMode(nextMode as ImageToggleMode)}>
        <SelectTrigger size="sm" aria-label="Image toggle variant" className="justify-self-end">
          <SelectValue>{selectedLabel}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {IMAGE_TOGGLE_MODES.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ImageToggle mode={mode === "tabs" ? undefined : mode} before={luminance} after={luminanceBw} tab1="Color" tab2="Grayscale" />
    </div>
  );
}
