"use client";

import {
  ClipPathEditor,
  ClipPathEditorAdvanced,
  ClipPathEditorCanvas,
  ClipPathEditorOutput,
  ClipPathEditorResetControl,
  ClipPathEditorSettings,
  ClipPathEditorStyle,
} from "@/components/demos/clip-path-editor";
import { InfoTip } from "@/components/info-tip";
import { LinkOut } from "@/components/link-out";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Collapsible, CollapsibleIcon, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { IconLine, IconVectorBezier2, IconVectorSpline, IconX } from "@tabler/icons-react";

export default function ClipPathCurvePage() {
  return (
    <>
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <section className="flex flex-col gap-4">
          <p className="">
            A little UI for experimenting with and generating curves as CSS clip-path values using the{" "}
            <Code>
              shape(){" "}
              <InfoTip
                className="-ms-0.75 -translate-y-px"
                description={
                  <>
                    <Code variant="inline">
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/shape"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link text-primary!"
                      >
                        shape()
                      </a>
                    </Code>{" "}
                    is now baseline widely available as of 2026. May not work in legacy browsers.
                  </>
                }
              />
            </Code>{" "}
            function.
          </p>
          <p className="">
            Generate code as a Tailwind class, CSS, or a computed SVG. Use it for rounded corner cutouts or button addons as an alternative
            to masks.
          </p>
          <p className="">Here are some examples:</p>
        </section>
        <section className="flex flex-col gap-2">
          <div className="grid w-full items-stretch gap-4 md:grid-cols-3">
            <figure className="flex flex-col gap-2">
              <div className="flex h-24 items-end rounded border bg-muted/50">
                <div className="relative isolate mx-auto flex h-8 w-fit items-center gap-1 bg-accent text-xs">
                  <Avatar size="sm" className="-ms-2 me-1 shadow-none [--avatar-radius:var(--radius-xl)]">
                    <AvatarImage className="bg-card" src="https://github.com/robertweisbecker.png" />
                  </Avatar>
                  bob.fyi
                  <span className="ms-8 -me-1 rounded-full bg-accent p-0.5 text-accent-foreground">
                    <IconX className="size-2.5" strokeWidth={3} />
                  </span>
                  <div className="absolute inset-y-0 -left-8 -z-1 h-full w-8 bg-inherit [clip-path:shape(from_0%_100%,curve_to_100%_0%_with_75%_100%/25%_0%,vline_to_100%,hline_to_0%)]" />
                  <div className="absolute inset-y-0 -right-8 -z-1 h-full w-8 bg-inherit [clip-path:shape(from_100%_100%,curve_to_0%_0%_with_25%_100%/75%_0%,vline_to_100%,hline_to_100%)]" />
                </div>
              </div>
              <figcaption className="flex-1 text-xs text-muted-foreground">Curved tabs</figcaption>
            </figure>
            <figure className="flex flex-col gap-2">
              <div className="grid-stack h-24 rounded border bg-muted/50">
                <div className="relative -mb-2 w-fit rounded-full bg-popover px-3 py-1 text-sm drop-shadow-[0_1px_.5px_hsl(0_0%_0%/30%),var(--drop-shadow-md)]">
                  Copied!
                  <div className="absolute top-full left-1/2 flex -translate-x-1/2">
                    <div className="h-2 w-3 bg-popover [clip-path:shape(from_0%_0%,curve_to_100%_100%_with_50%_0%/50%_100%,vline_to_0%,hline_to_0%)]" />
                    <div className="h-2 w-3 bg-popover [clip-path:shape(from_100%_0%,curve_to_0%_100%_with_50%_0%/50%_100%,vline_to_0%,hline_to_100%)]" />
                  </div>
                </div>
              </div>
              <figcaption className="text-xs text-muted-foreground">Rounded arrows</figcaption>
            </figure>
            <figure className="flex flex-col gap-2">
              <div className="grid h-24 grid-cols-[auto_1fr_auto] rounded border bg-muted/50 p-2">
                <Badge variant="secondary" className="mt-auto">
                  Item 1
                </Badge>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  className="relative top-4 h-12 w-full text-primary"
                  fill="none"
                  preserveAspectRatio="none"
                  overflow="visible"
                >
                  <path
                    d="M 0 100 C 50 100 50 0 100 0"
                    strokeWidth={2}
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeDasharray="0 5"
                    strokeDashoffset="2.5"
                  />
                </svg>
                <Button variant="outline" size="sm">
                  Button
                </Button>
              </div>
              <figcaption className="text-xs text-muted-foreground">Annotation lines</figcaption>
            </figure>
          </div>
        </section>

        <Collapsible className="my-8">
          <h2 className="font-medium text-muted-foreground">
            <CollapsibleTrigger className="relative flex items-center gap-1.5 py-2 transition-colors hover:text-foreground md:-ms-5.5">
              {/* <IconChevronRight className="size-4 opacity-50 transition-all duration-150 ease-out group-hover/collapsible-trigger:opacity-100 in-data-panel-open:rotate-90" /> */}
              <CollapsibleIcon side="inline-start" />
              Instructions
            </CollapsibleTrigger>
          </h2>
          <CollapsiblePanel className="prose rounded-xl bg-foreground/2 p-4 md:-mx-4">
            <ul className="">
              <li>
                <strong>Start with a corner. </strong>
                For simple curves, choose an origin to quickly set the start point to a given corner. The end point will automatically
                adjust to the opposing corner to give you a diagonal starting shape.
              </li>
              <li>
                <strong>Set the curve mode. </strong>
                Choose between three different path types. Modes give you different control points with which to tweak curve strength and
                direction.
                <ol>
                  <li>
                    <IconLine className="inline-block size-5 rounded bg-accent px-1 text-muted-foreground" /> <strong>Linear</strong>: no
                    curve, a straight path from start to end
                  </li>
                  <li>
                    <IconVectorSpline className="inline-block size-5 rounded bg-accent px-1 text-muted-foreground" />{" "}
                    <strong>Quadratic</strong>: bézier with single control point, smooth curve
                  </li>
                  <li>
                    <IconVectorBezier2 className="inline-block size-5 rounded bg-accent px-1 text-muted-foreground" />{" "}
                    <strong>Cubic</strong>: bézier with two control points, replicates easing
                  </li>
                </ol>
                Quadratic works best for symmetrical curves that mimic border-radius, while cubic beziers can produce more organic curves.
              </li>
              <li>
                <strong>Custom coordinates: </strong>
                Use the <strong>Advanced</strong> settings to specify exact coordinates for the start, control, and end points.
              </li>
            </ul>
            <p>...or, just drag the points around the canvas. Go nuts.</p>
          </CollapsiblePanel>
        </Collapsible>
      </div>
      <ClipPathEditor className="w-full">
        <div className="grid items-stretch gap-2 sm:grid-cols-4">
          <Card className="self-start sm:col-span-2">
            <CardHeader>
              <CardTitle>Playground</CardTitle>
              <CardAction>
                <ClipPathEditorResetControl />
              </CardAction>
            </CardHeader>
            <CardContent className="mb-4">
              <ClipPathEditorCanvas />
            </CardContent>
          </Card>
          <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
            <Card variant="muted">
              <CardHeader>
                <CardTitle>Customize</CardTitle>
              </CardHeader>
              <CardContent>
                <ClipPathEditorSettings />
              </CardContent>
            </Card>
            <ClipPathEditorAdvanced />

            <Card variant="muted">
              <CardHeader>
                <CardTitle>Style</CardTitle>
              </CardHeader>
              <CardContent>
                <ClipPathEditorStyle />
              </CardContent>
            </Card>
          </div>
        </div>
        <ClipPathEditorOutput />
      </ClipPathEditor>
      <Separator variant="dotted" />
      <section className="prose">
        <h2 className="">Resources</h2>
        <ul>
          <li>
            <LinkOut href="https://bennettfeely.com/clippy/" text="Clippy" />, a CSS Clip-Path Generator by Bennett Feely
          </li>
          <li>
            <LinkOut href="https://frontendmasters.com/blog/modern-css-round-out-tabs/" text="Modern CSS Round-Out Tabs" /> by Chris Coyier
          </li>
          <li>
            <LinkOut
              href="https://css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs/"
              text="Better CSS Shapes Using shape() — Part 1: Lines and Arcs
"
            />{" "}
            from CSS Tricks
          </li>
          <li>
            <LinkOut href="https://www.joshwcomeau.com/svg/interactive-guide-to-paths/" text="An Interactive Guide to SVG Paths" /> and{" "}
            <LinkOut href="https://www.joshwcomeau.com/animation/dynamic-bezier-curves/" text="Dynamic Bézier Curves" /> by Josh Comeau
          </li>
        </ul>
      </section>
    </>
  );
}
