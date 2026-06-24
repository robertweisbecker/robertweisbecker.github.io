"use client";

import { PixelIconMorph, type PixelIconMorphAnimation } from "@/components/pixel-icon-morph";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import type { MorphablePixelIconName } from "@/components/icons-pixel";
import * as React from "react";

type PixelIconMorphToggleItem = {
  from: MorphablePixelIconName;
  to: MorphablePixelIconName;
  label: string;
};

const TOGGLES: PixelIconMorphToggleItem[] = [
  {
    from: "PixelVolumeIcon",
    to: "PixelVolumeMutedIcon",
    label: "Toggle volume",
  },
  {
    from: "PixelPlayIcon",
    to: "PixelPauseIcon",
    label: "Toggle playback",
  },
  {
    from: "PixelCopyIcon",
    to: "PixelClipboardCheckIcon",
    label: "Toggle copied state",
  },
  {
    from: "PixelFolderIcon",
    to: "PixelFolderOpenIcon",
    label: "Open/close folder",
  },
  {
    from: "PixelComputerOutlineIcon",
    to: "PixelIphoneXIcon",
    label: "Toggle device type",
  },
  {
    from: "PixelEyeIcon",
    to: "PixelEyeClosedIcon",
    label: "Toggle visibility",
  },
];

const ANIMATION: PixelIconMorphAnimation = "ease";

export function PixelIconMorphToggles({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {TOGGLES.map((item) => (
        <PixelIconMorphToggle key={`${item.from}-${item.to}`} item={item} />
      ))}
    </div>
  );
}

function PixelIconMorphToggle({ item }: { item: PixelIconMorphToggleItem }) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} aria-label={item.label}>
      <PixelIconMorph from={item.from} to={item.to} active={pressed} animation={ANIMATION} duration={0.2} stagger={0.02} />
    </Toggle>
  );
}
