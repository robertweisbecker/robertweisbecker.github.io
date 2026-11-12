import type { StaticImageData } from "next/image";

import forge from "@/media/assets/forge/forge-after.png";
import forgeActivity from "@/media/assets/forge/activity-edit.png";
import forgeType from "@/media/assets/forge/type.png";
import forgeWidgets from "@/media/assets/forge/widgets.png";
import forgeLocale from "@/media/assets/forge/locale.png";
import udl from "@/public/assets/udl/foundry-light.png";
import udlLogin from "@/media/assets/udl/login-after.png";
import udlEvaluations from "@/media/assets/udl/evaluations-after.png";
import udlTokens from "@/media/assets/udl/storybook-tokens.png";
import udlFigma from "@/media/assets/udl/figma.png";
import furnace from "@/media/assets/furnace/core.png";
import furnaceHome from "@/media/assets/furnace/elements-home.png";
import furnaceRoles from "@/media/assets/furnace/color-roles-flow.png";
import furnaceType from "@/media/assets/furnace/type.png";
import furnaceIntl from "@/media/assets/furnace/int.png";
import brent from "@/media/art/2025_br.jpeg";
import chicago from "@/media/art/2025_chi.jpeg";
import blueGirl from "@/media/art/2010_spray-cig.jpeg";
import otis from "@/media/art/2024_otis.jpeg";
import figure from "@/media/art/2012_man-enhanced.jpeg";
import christian from "@/media/art/2017_x.jpeg";
import { projects } from "@/lib/data/projects";

function slides(prefix: string, entries: [StaticImageData, string, string][]) {
  return entries.map(([image, title, alt], index) => ({ id: `${prefix}-${index}`, image, title, alt }));
}

// Curated directly from each case study; deliberately does not import MDX.
export const homeProjects = [
  {
    ...projects.find((project) => project.path === "/forge")!,
    role: "Design Systems Lead",
    summary:
      "A Git-connected Electron app for turning course designs into interactive e-learning products. A refresh of the editor's hierarchy, density, and component system.",
    items: slides("forge-preview", [
      [forge, "Forge, refreshed", "Refreshed Forge course builder interface"],
      [forgeActivity, "Activity editor", "Forge activity editing interface"],
      [forgeType, "A semantic type scale", "Forge typography scale with semantic variable names"],
      [forgeWidgets, "Utility widgets", "Utility widgets in the Forge editor"],
      [forgeLocale, "Editing in context", "In-context locale string editing in Forge"],
    ]),
  },
  {
    ...projects.find((project) => project.path === "/unified-design-language")!,
    role: "Design Systems Lead",
    summary:
      "Bringing Everfi's platform and product design systems into a shared language, with aligned interaction patterns and tokens that connect Figma and React.",
    items: slides("udl-preview", [
      [udl, "A shared design language", "Foundry platform interface with the unified design language"],
      [udlLogin, "Unified sign-in", "Redesigned shared sign-in screen"],
      [udlEvaluations, "Consistent evaluations", "Evaluation interfaces in platform and course contexts"],
      [udlTokens, "Semantic tokens", "Semantic color token documentation in Storybook"],
      [udlFigma, "Design meets code", "Unified button components in Figma"],
    ]),
  },
  {
    ...projects.find((project) => project.path === "/furnace")!,
    role: "Design Lead",
    summary:
      "An accessible component library with theming and tooling to support more than 80 courses across a dozen branded product lines.",
    items: slides("furnace-preview", [
      [furnace, "The Core theme", "Furnace Core theme with fully styled base components"],
      [furnaceHome, "System documentation", "Furnace Elements documentation home"],
      [furnaceRoles, "Color roles", "Relationship between palettes, color roles, and components"],
      [furnaceType, "Responsive typography", "Furnace default type scale with responsive headings"],
      [furnaceIntl, "Built for localization", "Pseudo-localization testing in the Furnace QA environment"],
    ]),
  },
];

export const homeArtwork = [
  {
    id: "art-brent",
    image: brent,
    title: "Brent and Nellie",
    description: "Digital, 2025",
    alt: "Digital portrait of Brent and Nellie",
    left: 18,
    top: 52,
    rotate: -16,
    layer: 2,
  },
  {
    id: "art-chicago",
    image: chicago,
    title: "Library, Chicago",
    description: "Digital, 2025",
    alt: "Digital painting of a library in Chicago",
    left: 32,
    top: 46,
    rotate: 4,
    layer: 1,
  },
  {
    id: "art-blue-girl",
    image: blueGirl,
    title: "Blue girl",
    description: "Spraypaint, 2011",
    alt: "Blue girl spraypaint portrait",
    left: 44,
    top: 39,
    rotate: -2,
    layer: 6,
  },
  {
    id: "art-otis",
    image: otis,
    title: "Otis",
    description: "Digital, 2024",
    alt: "Digital portrait of Otis the dog",
    left: 58,
    top: 47,
    rotate: 7,
    layer: 5,
  },
  {
    id: "art-figure",
    image: figure,
    title: "Figure study",
    description: "Charcoal, 2012",
    alt: "Charcoal figure study",
    left: 74,
    top: 52,
    rotate: 12,
    layer: 3,
  },
  {
    id: "art-christian",
    image: christian,
    title: "Christian",
    description: "Digital, 2017",
    alt: "Digital portrait of Christian",
    left: 86,
    top: 58,
    rotate: -9,
    layer: 4,
  },
];
