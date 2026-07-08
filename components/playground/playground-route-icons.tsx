import { IconGridDots, IconKeyframes, IconMonkeybar, IconRipple, IconLayoutCollage, IconZoomPan } from "@tabler/icons-react";
import type { ComponentType } from "react";

type PlaygroundRouteIconComponent = ComponentType<{ className?: string }>;

const playgroundRouteIcons: Record<string, PlaygroundRouteIconComponent> = {
  motion: IconRipple,
  svg: IconKeyframes,
  verisimilitude: IconLayoutCollage,
  pixels: IconGridDots,
  buttons: IconGridDots,
  ui: IconZoomPan,
};

export function getPlaygroundRouteIcon(slug: string): PlaygroundRouteIconComponent {
  return playgroundRouteIcons[slug] ?? IconMonkeybar;
}
