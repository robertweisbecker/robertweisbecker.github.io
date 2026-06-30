"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "@/components/ui/field";
import { PixelMorph, type PixelMorphAnimation } from "@/components/pixel-morph";
import type { MorphablePixelIconName } from "@/components/icons-pixel";
import { Toggle } from "@/components/ui/toggle";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "../ui/input-group";
import { motion } from "framer-motion";

type PixelMorphToggleItem = {
  from: MorphablePixelIconName;
  to: MorphablePixelIconName;
  label: string;
};

const TOGGLES: PixelMorphToggleItem[] = [
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

const ANIMATION: PixelMorphAnimation = "spring";

export function PixelMorphToggles({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("grid grid-cols-3 gap-2", className)}>
        {TOGGLES.map((item) => (
          <PixelMorphToggle key={`${item.from}-${item.to}`} item={item} />
        ))}
      </div>
    </>
  );
}

function PixelMorphToggle({ item }: { item: PixelMorphToggleItem }) {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} aria-label={item.label} size="lg" className="" shape="column">
      <PixelMorph
        from={item.from}
        to={item.to}
        active={pressed}
        animation={ANIMATION}
        duration={0.05}
        stagger={0.005}
        scale={3}
        className="text-primary"
      />
      {item.label}
    </Toggle>
  );
}

export function PixelIconPasswordToggle({ className }: { className?: string }) {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Field>
      <FieldLabel>Password</FieldLabel>

      <InputGroup size="lg" className={cn("max-w-3xs", className)}>
        <InputGroupInput
          placeholder="Password"
          value="Password1234"
          type={pressed ? "text" : "password"}
          readOnly={true}
          render={<motion.input key={`pixel-password-input-${pressed}`} />}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            data-pressed={pressed}
            onClick={() => setPressed((prev) => !prev)}
            aria-label="Hide"
            className="aspect-square"
            size="icon-sm"

            // render={<Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Hide" size="lg" className="" shape="column" />}
          >
            <PixelMorph
              from="PixelEyeClosedIcon"
              to="PixelEyeIcon"
              active={pressed}
              animation={ANIMATION}
              duration={0.03}
              stagger={0.005}
              scale={1.5}
              className="shrink-0 text-foreground"
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}
