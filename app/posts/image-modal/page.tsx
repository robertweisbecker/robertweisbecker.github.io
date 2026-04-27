"use client";

import { ImageModal, ImageModalMotion, ImageModalPopover, ImageModalPopover2 } from "@/components/image-modal";
import { Badge } from "@/components/ui/badge";
import { Code } from "@/components/ui/code";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import * as React from "react";

const TEST_IMAGE = "/assets/share.png";

function PrototypeSection({
  title,
  badge,
  description,
  pros,
  cons,
  children,
}: {
  title: string;
  badge?: string;
  description?: string;
  pros?: string[];
  cons?: string[];
  children?: React.ReactNode;
}) {
  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-2">
        <Heading level={2}>
          {title}
          <Badge variant="secondary" className="ms-2">
            {badge}
          </Badge>
        </Heading>
      </div>
      <p className="text-muted-foreground">{description}</p>
      {children && <div className="not-prose max-w-xl">{children}</div>}
      {pros && cons && (
        <div className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <p className="mb-1 font-medium text-green-600 dark:text-green-400">Pros</p>
            <ul className="list-disc space-y-0.5 pl-4 text-muted-foreground">
              {pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-1 font-medium text-red-600 dark:text-red-400">Cons</p>
            <ul className="list-disc space-y-0.5 pl-4 text-muted-foreground">
              {cons.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

const approaches: {
  approach: string;
  result: "works" | "broken" | "partial" | "no-effect";
  why: string;
}[] = [
  {
    approach: "layoutId on card wrapper, conditional swap (thumbnail unmounts)",
    result: "partial",
    why: 'Works on second open; first open collapses to ~40px because the <img> hasn\'t painted and the card has no height hint. Motion captures the FLIP "to" snapshot before the browser resolves intrinsic dimensions.',
  },
  {
    approach: "layoutId on card + aspectRatio on card wrapper",
    result: "works",
    why: "Fixes the first-open collapse. aspectRatio on the motion.div itself (not just the inner <img>) gives Motion a correct layout rect to snapshot, regardless of image load state.",
  },
  {
    approach: "layoutId on inner motion.img (not the card)",
    result: "broken",
    why: "Image animates but card styling (border-radius, shadow, padding) doesn't transition — it pops. Only the layoutId element gets the FLIP animation; the card wrapper is a different element.",
  },
  {
    approach: "layout on child motion.img inside layoutId parent",
    result: "broken",
    why: "Causes stretching/distortion. The child's layout animation applies its own scale correction that compounds with the parent's layoutId scale, creating a double-transform.",
  },
  {
    approach: 'layout="position" on motion.img',
    result: "partial",
    why: 'Position animates but size snaps instantly. layout="position" only animates translate, not scale. For a lightbox, the size change IS the animation.',
  },
  {
    approach: "layoutRoot on a fixed container wrapping the modal",
    result: "broken",
    why: "Broke centering and caused offset issues. layoutRoot accounts for page scroll inside fixed containers, but combined with Dialog.Viewport (also fixed with its own centering), it added an extra projection layer that warped coordinate math.",
  },
  {
    approach: "LayoutGroup wrapping thumbnail + modal",
    result: "no-effect",
    why: "No observable improvement. LayoutGroup synchronizes layout animations across sibling components that re-render independently. Here, thumbnail and modal are in the same React tree and re-render together via the same open state.",
  },
  {
    approach: "Parent motion.div with initial={{ opacity: 0 }} wrapping the layoutId card",
    result: "broken",
    why: "Modal appeared blank/invisible on open, then popped in. Motion's layoutId crossfade already manages opacity between old and new elements. A separate parent opacity animation compounded with the crossfade (0 × crossfade = invisible).",
  },
  {
    approach: "objectFit: contain on modal image",
    result: "broken",
    why: "Empty whitespace below/beside the image. object-fit: contain letterboxes the image when the container's aspect ratio doesn't exactly match. Since aspectRatio already ensures correct proportions, object-fit was redundant and harmful.",
  },
  {
    approach: "Dialog.Popup with h-full w-full + no centering on itself",
    result: "broken",
    why: "Modal card pinned to top-left, not centered. The Popup filled the entire viewport but had no items-center justify-center. The parent Viewport's centering applied to the Popup container, but the card inside sat at flex-start.",
  },
];

const resultColors: Record<string, string> = {
  works: "text-green-600 dark:text-green-400",
  broken: "text-red-600 dark:text-red-400",
  partial: "text-amber-600 dark:text-amber-400",
  "no-effect": "text-muted-foreground",
};

const resultLabels: Record<string, string> = {
  works: "Works",
  broken: "Broken",
  partial: "Partial",
  "no-effect": "No effect",
};

export default function ImageModalPostPage() {
  return (
    <div className="prose w-full">
      <p>
        Comparing three approaches to an image lightbox with smooth <Code variant="plain">layoutId</Code> transitions:
        Base UI Dialog, Base UI Popover, and pure Motion. The goal is a seamless expand/collapse animation without
        stretching, blank frames, or misalignment on first open.
      </p>

      <Separator />

      <PrototypeSection
        title="A. Dialog"
        badge="Dialog + layoutId"
        description="Base UI Dialog for accessibility. Conditional render swaps thumbnail for a hidden placeholder when open, so only one layoutId element exists at a time. aspectRatio on the card wrapper prevents collapsed-height snapshots. Skeleton fallback for loading polish."
        pros={["Full accessibility (focus trap, Escape, aria)", "Scrollable viewport", "Skeleton loading state"]}
        cons={["Conditional swap adds complexity", "Dialog wrapper hierarchy can interfere with Motion projection"]}
      >
        <ImageModal src={TEST_IMAGE} caption="Dialog prototype" />
      </PrototypeSection>

      <Separator />

      <PrototypeSection
        title="B. Popover"
        badge="Popover + layoutId"
        description="Base UI Popover with modal mode. Trigger stays in DOM (no swap). Positioner overridden to fixed-center. layoutId animates from anchor position to center."
        pros={["No conditional swap needed", "Anchor-aware positioning", "Trigger stays in DOM"]}
        cons={["Fighting Popover's positioning model", "Extra Positioner wrapper in DOM"]}
      >
        <ImageModalPopover src={TEST_IMAGE} caption="Popover prototype" />
      </PrototypeSection>

      <Separator />

      <PrototypeSection
        title="2b. Popover 2"
        badge="Popover + layoutId (motion.div)"
        description="Base UI Popover with modal mode. Trigger stays in DOM (no swap). Positioner overridden to fixed-center. layoutId animates from anchor position to center."
      >
        <ImageModalPopover2 src={TEST_IMAGE} caption="Popover prototype" />
      </PrototypeSection>

      <Separator />

      <PrototypeSection
        title="C. Pure Motion"
        badge="Motion + portal"
        description="No Base UI dialog/popover primitives for layout. layoutId with AnimatePresence and createPortal. Manual accessibility handling. Follows Motion's documented shared layout animation pattern."
        pros={[
          "Simplest DOM tree",
          "No wrapper interference with Motion projection",
          "Motion has full control of FLIP math",
        ]}
        cons={["Must handle accessibility manually", "No scroll-lock or focus-trap for free"]}
      >
        <ImageModalMotion src={TEST_IMAGE} caption="Pure Motion prototype" />
      </PrototypeSection>

      <Separator />

      <section className="grid gap-4">
        <Heading level={2}>What we tried</Heading>
        <p className="text-muted-foreground">
          A reference of every approach attempted across the full history of this component, documenting what worked,
          what broke, and why.
        </p>

        <DescriptionList className="not-prose">
          {approaches.map((a) => (
            <React.Fragment key={a.approach}>
              <DescriptionListLabel>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">{a.approach}</span>
                  <span className={`text-xs font-medium ${resultColors[a.result]}`}>{resultLabels[a.result]}</span>
                </div>
              </DescriptionListLabel>
              <DescriptionListValue>{a.why}</DescriptionListValue>
            </React.Fragment>
          ))}
        </DescriptionList>
      </section>
    </div>
  );
}
