"use client";

import * as React from "react";
import Link from "next/link";

import { Section } from "@/components/blocks/section";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem, ToggleGrid } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { IconSearch } from "@tabler/icons-react";

type SwipeDirection = "up" | "right" | "down" | "left";
type ModalMode = "true" | "false" | "trap-focus";
type SnapMode = "none" | "thirds" | "half";
type SizePreset = "default" | "narrow" | "wide" | "tall";

const SNAP_POINTS: Record<Exclude<SnapMode, "none">, Array<number | string>> = {
  thirds: [0.3, 0.6, 1],
  half: [0.5, 1],
};

const SIZE_CLASS: Record<SizePreset, string> = {
  default: "",
  narrow: "data-[swipe-axis=x]:[--drawer-content-width:18rem] data-[swipe-axis=y]:max-w-sm data-[swipe-axis=y]:mx-auto",
  wide: "data-[swipe-axis=x]:[--drawer-content-width:32rem] data-[swipe-axis=y]:max-w-2xl data-[swipe-axis=y]:mx-auto",
  tall: "data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-2rem)]",
};

function modalFromMode(mode: ModalMode): boolean | "trap-focus" {
  switch (mode) {
    case "true":
      return true;
    case "false":
      return false;
    case "trap-focus":
      return "trap-focus";
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

function DrawerBodyCopy({ direction }: { direction: SwipeDirection }) {
  return (
    <div className="prose flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto p-4 *:max-w-xs">
      <p>
        Swipe direction is <code>{direction}</code>. Drag the panel or handle to dismiss when enabled.
      </p>
      <ul>
        <li>Focus stays managed by Base UI.</li>
        <li>
          Overlay appears only when modal is <code>true</code>.
        </li>
        <li>Snap points apply to the active axis.</li>
      </ul>
    </div>
  );
}

function ConfigurableDrawerDemo() {
  const [swipeDirection, setSwipeDirection] = React.useState<SwipeDirection>("down");
  const [showSwipeHandle, setShowSwipeHandle] = React.useState(true);
  const [modalMode, setModalMode] = React.useState<ModalMode>("true");
  const [snapMode, setSnapMode] = React.useState<SnapMode>("none");
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(null);
  const [sizePreset, setSizePreset] = React.useState<SizePreset>("default");
  const [open, setOpen] = React.useState(false);

  const snapPoints = snapMode === "none" ? undefined : SNAP_POINTS[snapMode];
  const modal = modalFromMode(modalMode);

  function handleSnapModeChange(value: string | null) {
    if (value == null) return;
    const next = value as SnapMode;
    setSnapMode(next);
    setSnapPoint(next === "none" ? null : SNAP_POINTS[next][0]);
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Swipe direction</FieldLegend>
          <ToggleGrid
            columns={2}
            value={[swipeDirection]}
            onValueChange={(value) => {
              const next = value[0] as SwipeDirection | undefined;
              if (next) setSwipeDirection(next);
            }}
          >
            {(["up", "left", "right", "down"] as const).map((direction) => (
              <ToggleGroupItem key={direction} value={direction} aria-label={direction}>
                {direction}
              </ToggleGroupItem>
            ))}
          </ToggleGrid>
        </FieldSet>

        <FieldSet>
          <FieldLegend variant="label">Modal</FieldLegend>
          <ToggleGroup
            value={[modalMode]}
            onValueChange={(value) => {
              const next = value[0] as ModalMode | undefined;
              if (next) setModalMode(next);
            }}
          >
            <ToggleGroupItem value="true">modal</ToggleGroupItem>
            <ToggleGroupItem value="false">non-modal</ToggleGroupItem>
            <ToggleGroupItem value="trap-focus">trap-focus</ToggleGroupItem>
          </ToggleGroup>
        </FieldSet>

        <Field orientation="horizontal" className="items-center gap-3">
          <Switch checked={showSwipeHandle} onCheckedChange={setShowSwipeHandle} id="drawer-swipe-handle" />
          <FieldLabel htmlFor="drawer-swipe-handle">Show swipe handle</FieldLabel>
        </Field>

        <Field>
          <FieldLabel>Snap points</FieldLabel>
          <Select value={snapMode} onValueChange={handleSnapModeChange}>
            <SelectTrigger className="w-auto">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="thirds">0.3 / 0.6 / 1</SelectItem>
                <SelectItem value="half">0.5 / 1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>Custom size</FieldLabel>
          <Select value={sizePreset} onValueChange={(value) => setSizePreset(value as SizePreset)}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="narrow">Narrow</SelectItem>
                <SelectItem value="wide">Wide</SelectItem>
                <SelectItem value="tall">Tall (y-axis)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>

      <Drawer
        open={open}
        onOpenChange={setOpen}
        swipeDirection={swipeDirection}
        showSwipeHandle={showSwipeHandle}
        modal={modal}
        snapPoints={snapPoints}
        snapPoint={snapPoint}
        onSnapPointChange={setSnapPoint}
      >
        <DrawerTrigger render={<Button variant="outline" />}>Open configurable drawer</DrawerTrigger>
        <DrawerContent className={cn(SIZE_CLASS[sizePreset])}>
          <DrawerHeader className="flex">
            <DrawerTitle>Configurable drawer</DrawerTitle>
            <DrawerDescription className="text-base">
              Exercise swipe direction, handle, modal mode, snap points, and size presets.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBodyCopy direction={swipeDirection} />
          <DrawerFooter>
            <DrawerClose render={<Button />}>Done</DrawerClose>
            <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function NestedDrawerDemo() {
  return (
    <Drawer showSwipeHandle swipeDirection="down">
      <DrawerTrigger render={<Button variant="outline" />}>Open nested stack</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex gap-2">
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription className="inline text-base">Open a nested drawer to see stacking and peek behavior.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <p className="text-sm text-muted-foreground">Each nested root stays independently focus-managed.</p>
          <Drawer showSwipeHandle swipeDirection="down">
            <DrawerTrigger render={<Button />}>Security settings</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="flex">
                <div className="flex h-button w-full items-center gap-2 rounded-full bg-sidebar px-3 text-sm text-sidebar-foreground">
                  <IconSearch className="size-4" />
                  Placeholder
                </div>
                <DrawerTitle>Security</DrawerTitle>
                <DrawerDescription className="inline text-base">Review sign-in activity and update preferences.</DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                  <li>Passkeys enabled</li>
                  <li>2FA via authenticator app</li>
                  <li>3 signed-in devices</li>
                </ul>
                <Drawer showSwipeHandle swipeDirection="down">
                  <DrawerTrigger render={<Button variant="secondary" />}>Advanced options</DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="flex gap-2">
                      <DrawerTitle>Advanced</DrawerTitle>
                      <DrawerDescription>Taller nested content for variable-height stacking.</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                      <p className="text-sm text-muted-foreground">
                        Nested drawers dim and scale the parent while the frontmost panel stays interactive.
                      </p>
                      <p className="text-sm text-muted-foreground">Use the swipe handle or close button to dismiss one level at a time.</p>
                    </div>
                    <DrawerFooter>
                      <DrawerClose render={<Button />}>Done</DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function PositionGalleryDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {(["down", "up", "left", "right"] as const).map((direction) => (
        <Drawer key={direction} swipeDirection={direction} showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" size="sm" />}>{direction}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="flex">
              <DrawerTitle>{direction} drawer</DrawerTitle>
              <DrawerDescription className="inline text-base">
                Quick position check for swipeDirection=&quot;{direction}&quot;.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerBodyCopy direction={direction} />
            <DrawerFooter>
              <DrawerClose render={<Button />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}

export default function DrawerPrivatePage() {
  return (
    <div className="mx-auto grid w-full max-w-4xl gap-10 px-4 py-8">
      <header className="grid gap-2">
        <p className="font-pixel text-[11px] text-muted-foreground">private/drawer</p>
        <Heading level={1}>Drawer</Heading>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Configurable demos for the Base UI drawer wrapper in <code className="text-foreground">components/ui/drawer.tsx</code>. See also{" "}
          <Link className="text-primary underline-offset-4 hover:underline" href="/private/qa#drawer">
            QA · Drawer
          </Link>
          .
        </p>
      </header>

      <Section title="Configurable" id="configurable" description="Controls map to Drawer root props and content size presets.">
        <ConfigurableDrawerDemo />
      </Section>

      <Section title="Positions" id="positions" description="One-shot triggers for each swipeDirection.">
        <PositionGalleryDemo />
      </Section>

      <Section title="Nested" id="nested" description="Stacked drawers using the design-system composition API.">
        <NestedDrawerDemo />
      </Section>
    </div>
  );
}
