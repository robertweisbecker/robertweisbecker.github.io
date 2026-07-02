export type PlaygroundRoute = {
  slug: string;
  href: string;
  label: string;
};

export const playgroundRoutes: PlaygroundRoute[] = [
  { slug: "motion", href: "/playground/motion", label: "Motion" },
  { slug: "svg", href: "/playground/svg", label: "SVG" },
  { slug: "ui", href: "/playground/ui", label: "UI" },
  { slug: "buttons", href: "/playground/buttons", label: "Buttons" },
  { slug: "verisimilitude", href: "/playground/verisimilitude", label: "Verisimilitude" },
];
