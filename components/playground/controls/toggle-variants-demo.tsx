"use client";

import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
  IconPoint,
} from "@tabler/icons-react";
import { ToggleGrid, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipGroup, TooltipTrigger } from "@/components/ui/tooltip";

export function ToggleGridDemo() {
  const corners = [
    { value: "up-left", label: "Top-left", icon: <IconArrowUpLeft /> },
    { value: "up", label: "Top", icon: <IconArrowUp /> },
    { value: "up-right", label: "Top-right", icon: <IconArrowUpRight /> },
    { value: "left", label: "Left", icon: <IconArrowLeft /> },
    { value: "center", label: "Center", icon: <IconPoint /> },
    { value: "right", label: "Right", icon: <IconArrowRight /> },
    { value: "down-left", label: "Bottom-left", icon: <IconArrowDownLeft /> },
    { value: "down", label: "Bottom", icon: <IconArrowDown /> },
    { value: "down-right", label: "Bottom-right", icon: <IconArrowDownRight /> },
  ];

  return (
    <div className="flex items-center justify-center">
      <TooltipGroup side="top" sideOffset={8} delay={100} closeDelay={0}>
        <ToggleGrid variant="elevated" columns={3} defaultValue={["center"]} className="w-40">
          {corners.map((corner) => (
            <TooltipTrigger
              key={corner.value}
              tooltip={corner.label}
              render={<ToggleGroupItem value={corner.value} aria-label={corner.label} />}
            >
              {corner.icon}
            </TooltipTrigger>
          ))}
        </ToggleGrid>
      </TooltipGroup>
    </div>
  );
}
