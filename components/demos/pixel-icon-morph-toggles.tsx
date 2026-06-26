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
    label: "Mute",
  },
  {
    from: "PixelPlayIcon",
    to: "PixelPauseIcon",
    label: "Play",
  },
  {
    from: "PixelClipboardIcon",
    to: "PixelClipboardCheckIcon",
    label: "Copy",
  },
  {
    from: "PixelFolderIcon",
    to: "PixelFolderOpenIcon",
    label: "Open",
  },
  {
    from: "PixelComputerOutlineIcon",
    to: "PixelIphoneXIcon",
    label: "Device",
  },
  {
    from: "PixelEyeIcon",
    to: "PixelEyeClosedIcon",
    label: "Hide",
  },
];

const ANIMATION: PixelIconMorphAnimation = "spring";

export function PixelIconMorphToggles({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("grid grid-cols-3 gap-2", className)}>
        {TOGGLES.map((item) => (
          <PixelIconMorphToggle key={`${item.from}-${item.to}`} item={item} />
        ))}
      </div>
    </>
  );
}

function PixelIconMorphToggle({ item }: { item: PixelIconMorphToggleItem }) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} aria-label={item.label} size="lg" className="" shape="column">
      <PixelIconMorph
        className="size-[33px]"
        from={item.from}
        to={item.to}
        active={pressed}
        animation={ANIMATION}
        duration={0.05}
        stagger={0.005}
      />
      {item.label}
    </Toggle>
  );
}
