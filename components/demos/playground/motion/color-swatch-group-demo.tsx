"use client";

import * as React from "react";
import { ColorSwatchGroup } from "@/components/theme/color-swatch-group";
import { ColorCode } from "@/components/ui/color-code";

const DEMO_SWATCHES = [
  { value: "var(--color-red-500)", label: "Red", color: "var(--color-red-500)" },
  { value: "var(--color-yellow-300)", label: "Yellow", color: "var(--color-yellow-300)" },
  { value: "var(--color-green-500)", label: "Green", color: "var(--color-green-500)" },
  { value: "var(--color-blue-500)", label: "Blue", color: "var(--color-blue-500)" },
  { value: "var(--color-pink-500)", label: "Pink", color: "var(--color-pink-500)" },
];

export function ColorSwatchGroupDemo() {
  const [color, setColor] = React.useState("var(--color-blue-500)");

  return (
    <div className="flex flex-col justify-start gap-3">
      <ColorSwatchGroup colors={DEMO_SWATCHES} value={color} onValueChange={setColor} />
      <p className="w-[320px] max-w-full text-xs text-muted-foreground">
        Selected: <ColorCode value={color} />
      </p>
    </div>
  );
}
