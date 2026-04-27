"use client";
import Link from "next/link";

const previews = [
  {
    href: "/private/device",
    title: "Device preview",
    description:
      "Composable Device.Phone, Device.Browser, Device.Desktop, and Shine overlay — scrolling, images, iframe, nested browser, video, and shine variants.",
    tags: ["Device UI", "Shine", "Private QA"],
    accent: "#22c55e",
  },
];

const directions = [
  {
    id: "A",
    href: "/private/testing/direction-a",
    title: "Bento Annotated",
    description:
      "An asymmetric bento grid where images are the primary content. Hover/focus reveals floating annotation overlays with prose excerpts.",
    tags: ["Bento grid", "Hover annotations", "via-smooth scrims"],
    accent: "#f97316",
  },
  {
    id: "B",
    href: "/private/testing/direction-b",
    title: "Film Strip / Gallery",
    description:
      "Full-height chapters with a hero image, prev/next slide buttons, a filmstrip sidebar, and a floating ↓ button to advance to the next chapter.",
    tags: ["Scroll chapters", "Prev/Next slides", "Chapter sidebar"],
    accent: "#6366f1",
  },
  {
    id: "C",
    href: "/private/testing/direction-c",
    title: "Mosaic with Dialogs",
    description:
      "An explicit-grid mosaic of images with diagram-style callout labels below each tile. Clicking opens a Dialog with narrative, before/after toggle, and image gallery.",
    tags: ["Mosaic grid", "Diagram callouts", "Dialog narratives"],
    accent: "#10b981",
  },
  {
    id: "D",
    href: "/private/testing/direction-d",
    title: "Annotated Diagram",
    description:
      "Images in cards with absolute-positioned numbered annotation dots. A single shared Popover re-anchors to each dot. Footer navigation cycles through all annotations.",
    tags: ["Shared popover", "Numbered annotations", "Inline navigation"],
    accent: "#ec4899",
  },
  {
    id: "E",
    href: "/private/testing/direction-e",
    title: "Card Stack Lightbox",
    description:
      "A fanned stack of tilted cards. Hover spreads the fan. Clicking any card opens a full-screen lightbox Dialog with a filmstrip and prev/next navigation.",
    tags: ["Tilted card fan", "Lightbox dialog", "Filmstrip"],
    accent: "#8b5cf6",
  },
];

export default function TestingIndex() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="mb-2 font-pixel text-[11px] text-muted-foreground">private/testing</p>
        <h1 className="mb-3 text-2xl font-semibold tracking-tight">Project page directions</h1>
        <p className="mb-12 text-muted-foreground">
          Five explorations of a photo-first project page layout. Pick one to develop further.
        </p>

        <div className="mb-10 flex flex-col gap-4">
          <p className="font-pixel text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
            Component previews
          </p>
          {previews.map((dir) => (
            <Link
              key={dir.href}
              href={dir.href}
              className="group flex gap-5 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: dir.accent }}
              >
                ◎
              </div>
              <div className="min-w-0">
                <div className="mb-1 font-semibold group-hover:underline">{dir.title}</div>
                <p className="mb-3 text-sm text-muted-foreground">{dir.description}</p>
                <div className="flex flex-wrap gap-2">
                  {dir.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-pixel text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {directions.map((dir) => (
            <Link
              key={dir.id}
              href={dir.href}
              className="group flex gap-5 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: dir.accent }}
              >
                {dir.id}
              </div>
              <div className="min-w-0">
                <div className="mb-1 font-semibold group-hover:underline">{dir.title}</div>
                <p className="mb-3 text-sm text-muted-foreground">{dir.description}</p>
                <div className="flex flex-wrap gap-2">
                  {dir.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 font-pixel text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
