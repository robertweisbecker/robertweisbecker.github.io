import {
  IconColorFilter,
  IconDragDrop,
  IconPalette,
  IconVectorBezier2,
  IconWindowMaximize,
  IconLivePhoto,
  IconTooltip,
  IconNut,
  IconIcons,
} from "@tabler/icons-react";

/** Serializable icon id → Tabler component. Use this map in UI; keep `Post.icon` as a string key. */
export const postIcons = {
  IconPalette,
  IconWindowMaximize,
  IconVectorBezier2,
  IconDragDrop,
  IconColorFilter,
  IconLivePhoto,
  IconTooltip,
  IconNut,
  IconIcons,
} as const;

export type PostIconName = keyof typeof postIcons;

export type Post = {
  id: string;
  title: string;
  description: string;
  category?: string;
  date?: string;
  path: string;
  icon?: PostIconName;
};

export const posts: Post[] = [
  {
    id: "pixel-icons",
    title: "28-Pixel Icons",
    description: "Creating animated 11x11 icons with Figma + Codex",
    category: "Demo",
    date: "06/11/2026",
    path: "/posts/pixel-icons",
    icon: "IconIcons",
  },
  {
    id: "theming",
    title: "Theming Demo",
    description: "How theming works on this site",
    category: "Demo",
    date: "04/02/2026",
    path: "/posts/theming",
    icon: "IconPalette",
  },
  {
    id: "via-smooth",
    title: "Smooth Gradients",
    description: "Adding easing curves to Tailwind gradients",
    category: "Snippet",
    date: "03/28/2026",
    path: "/posts/smooth-gradients",
    icon: "IconLivePhoto",
  },
  {
    id: "clip-path-curve",
    title: "Clip-Path Playground",
    description: "A little UI for concave clip-path curves",
    category: "Demo",
    date: "03/22/2026",
    path: "/posts/clip-path-curve",
    icon: "IconVectorBezier2",
  },
  {
    id: "tab-indicator",
    title: "CSS Pseudo-indicators",
    description: "Faking animated tab indicators with CSS",
    category: "Snippet",
    date: "11/01/2025",
    path: "/posts/tab-indicator",
    icon: "IconDragDrop",
  },
  {
    id: "native-popovers",
    title: "Native Popover Experiments",
    description: "HTML <popover>, anchoring, and starting-style",
    category: "Snippet",
    date: "08/26/2025",
    path: "/posts/native-popovers",
    icon: "IconTooltip",
  },
];
