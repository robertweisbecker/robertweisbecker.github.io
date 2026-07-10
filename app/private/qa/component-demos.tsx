"use client";

import { BackButton } from "@/components/back-button";
import { AnimateHeight } from "@/components/animation/animate-height";
import { MotionText } from "@/components/animation/MotionText";
import { CodeBlock } from "@/components/code-block";
import { ColorSwatchGroup } from "@/components/theme/color-swatch-group";
import { Demo, DemoContainer } from "@/components/blocks/demo";
import { CardFan } from "@/components/demos/card-fan";
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import {
  BaseUiIcon,
  CssIcon,
  CursorIcon,
  FigmaIcon,
  GithubIcon,
  LinkedinIcon,
  NextJsIcon,
  ShadcnIcon,
  TailwindIcon,
} from "@/components/icons";
import { MorphIcon } from "@/components/icons/morph-icon";
import { Image } from "@/components/image";
import { ImageModal, ImageModalDrawer } from "@/components/blocks/image-modal";
import forgeBeforeDemo from "@/public/assets/forge/forge-before.png";
import { IndexList, type IndexListItem } from "@/components/blocks/index-list";
import { Pagination } from "@/components/blocks/pagination";
import { InfoTip } from "@/components/info-tip";
import { LinkOut } from "@/components/link-out";
import { Mark, MarkNote } from "@/components/mark-note";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { NumberSlider } from "@/components/number-slider";
import { PixelIconMatrix } from "@/components/demos/pixels/pixel-icons-matrix";
import { Stats } from "@/components/blocks/stats";
import { TableOfContents } from "@/components/table-of-contents";
import { Theme, ThemeNeutralColorField, ThemePrimaryColorField, ThemeRadiusField, ThemeResetAllButton } from "@/components/theme";
import { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/components/ui/autocomplete";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Code } from "@/components/ui/code";
import { ColorCode } from "@/components/ui/color-code";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { CopyButton } from "@/components/ui/copy-button";
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
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { LinkButton } from "@/components/ui/link-button";
import { Loader } from "@/components/ui/loader";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider, SliderControl, SliderGroup, SliderLabel, SliderValue } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Video } from "@/components/video";
import { IconAlertTriangle, IconFolderOff, IconInfoCircle, IconSearch, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";
import { Section } from "@/components/blocks/section";

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
];

const DEMO_SWATCHES = [
  { value: "#ef4444", label: "Red", color: "#ef4444" },
  { value: "#f97316", label: "Orange", color: "#f97316" },
  { value: "#eab308", label: "Yellow", color: "#eab308" },
  { value: "#22c55e", label: "Green", color: "#22c55e" },
  { value: "#3b82f6", label: "Blue", color: "#3b82f6" },
  { value: "#8b5cf6", label: "Violet", color: "#8b5cf6" },
  { value: "#ec4899", label: "Pink", color: "#ec4899" },
];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_ALT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const TOC_DEMO_ITEMS = [
  { id: "toc-demo-overview", text: "Overview", depth: 2 },
  { id: "toc-demo-installation", text: "Installation", depth: 2 },
  { id: "toc-demo-client-component", text: "Client component", depth: 3 },
  { id: "toc-demo-server-component", text: "Server component", depth: 3 },
  { id: "toc-demo-options", text: "Options", depth: 2 },
];

const INDEX_LIST_DEMO_ITEMS: IndexListItem[] = [
  {
    id: "index-list-demo-foundations",
    title: "Foundations",
    description: "Tokens, color, spacing, and shared UI primitives.",
    date: "2026",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-navigation",
    title: "Navigation",
    description: "Menus, tabs, breadcrumbs, and index pages.",
    date: "2026",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-content",
    title: "Content",
    description: "MDX layouts, code blocks, callouts, and image treatment.",
    date: "2025",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-motion",
    title: "Motion",
    description: "Interaction feedback and low-friction transitions.",
    date: "2025",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-media",
    title: "Media",
    description: "Responsive images, modal viewing, and video embeds.",
    date: "2024",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-forms",
    title: "Forms",
    description: "Inputs, switches, sliders, and field composition.",
    date: "2024",
    path: "/private/qa",
  },
  {
    id: "index-list-demo-feedback",
    title: "Feedback",
    description: "Alerts, tooltips, badges, and status indicators.",
    date: "2023",
    path: "/private/qa",
  },
];

function ComboboxDemo() {
  return (
    <div className="max-w-xs">
      <Combobox>
        <ComboboxInput placeholder="Pick a framework..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
            {FRAMEWORKS.map((fw) => (
              <ComboboxItem key={fw.value} value={fw.value}>
                {fw.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

function ColorSwatchGroupDemo() {
  const [color, setColor] = React.useState("#3b82f6");

  return (
    <div className="space-y-3">
      <ColorSwatchGroup colors={DEMO_SWATCHES} value={color} onValueChange={setColor} />
      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        <Code variant="plain" style={{ color }}>
          {color}
        </Code>
      </p>
    </div>
  );
}

function NumberSliderDemo() {
  const [value, setValue] = React.useState(50);

  return (
    <div className="max-w-sm">
      <NumberSlider label="Opacity" min={0} max={100} step={1} value={value} onValueChange={setValue} format="percent" />
    </div>
  );
}

function ThemeSettingsFieldsDemo() {
  return (
    <Theme className="w-full max-w-2xl rounded-md border bg-background p-4">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <ThemePrimaryColorField display="swatches" />
          <ThemeNeutralColorField display="select" />
          <ThemeRadiusField />
        </div>
        <div className="flex min-h-36 flex-col justify-between rounded-md border bg-card p-4 shadow-border-xs">
          <div className="space-y-2">
            <div className="h-3 w-24 rounded-full bg-primary" />
            <div className="h-3 w-32 rounded-full bg-muted" />
            <div className="h-3 w-16 rounded-full bg-accent" />
          </div>
          <Button size="sm" className="w-fit">
            Action
          </Button>
        </div>
      </div>
      <ThemeResetAllButton variant="outline" size="sm" className="mt-5" />
    </Theme>
  );
}

function AnimateHeightDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="grid w-full max-w-xl gap-3">
      <Field orientation="horizontal" className="flex w-auto items-center gap-3 text-sm">
        <FieldLabel>
          <Switch checked={open} onCheckedChange={setOpen} />
          <FieldContent>Expanded</FieldContent>
        </FieldLabel>
      </Field>
      <AnimateHeight initialHeight="3.25rem" open={open} className="rounded-md border bg-card shadow-border-xs">
        <div className="space-y-3 p-4 text-sm leading-relaxed">
          <p>Measured content keeps the transition fluid as copy wraps across breakpoints.</p>
          <p className="text-muted-foreground">
            The closed state uses a CSS height value, so the preview can stay visible without item-level measurements.
          </p>
        </div>
      </AnimateHeight>
    </div>
  );
}

function MotionTextDemo() {
  const [replayKey, setReplayKey] = React.useState(0);
  const [loopRunning, setLoopRunning] = React.useState(true);
  const [scrambleKey, setScrambleKey] = React.useState(0);
  const [morphAlternate, setMorphAlternate] = React.useState(false);

  return (
    <div className="grid w-full max-w-4xl gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Reveal</CardTitle>
          <CardAction>
            <Button size="sm" variant="ghost" type="button" onClick={() => setReplayKey((key) => key + 1)}>
              Replay
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <MotionText.Reveal key={`css-${replayKey}`} className="text-xl font-semibold text-balance" duration={520} stagger={18}>
            CSS timing keeps editorial text crisp.
          </MotionText.Reveal>
          <MotionText.Reveal
            key={`motion-${replayKey}`}
            type="motion"
            as="p"
            className="text-sm text-muted-foreground"
            duration={420}
            stagger={24}
          >
            Motion mode uses variants for future composition.
          </MotionText.Reveal>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Effect</CardTitle>
          <CardAction>
            <Button size="sm" variant="ghost" type="button" onClick={() => setReplayKey((key) => key + 1)}>
              Replay
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <MotionText.Effect key={`effect-${replayKey}`} per="word" preset="fade-in-blur" className="text-xl font-semibold text-balance">
            Words can arrive with presets.
          </MotionText.Effect>
          <MotionText.Effect key={`effect-char-${replayKey}`} per="char" preset="slide" as="p" className="text-sm text-muted-foreground">
            Characters can move independently.
          </MotionText.Effect>
        </CardContent>
      </Card>

      <Card>
        <Field orientation="horizontal" className="flex w-auto items-center justify-between gap-3 text-sm">
          <FieldLabel>
            <Switch checked={loopRunning} onCheckedChange={setLoopRunning} />
            <FieldContent>Loop</FieldContent>
          </FieldLabel>
        </Field>
        <p className="text-xl font-semibold">
          Interfaces feel{" "}
          <MotionText.Loop trigger={loopRunning} interval={1.35} className="text-primary">
            {["fast", "calm", "clear"]}
          </MotionText.Loop>
          .
        </p>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3">
          <p className="font-pixel text-[11px] text-muted-foreground uppercase">Scramble</p>
          <Button size="xs" variant="ghost" type="button" onClick={() => setScrambleKey((key) => key + 1)}>
            Replay
          </Button>
        </div>
        <MotionText.Scramble key={scrambleKey} className="font-mono text-xl font-semibold" duration={0.9}>
          Signal locked
        </MotionText.Scramble>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wave</CardTitle>
          <CardAction>
            <Button size="sm" variant="ghost" type="button">
              Pause
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <MotionText.Wave className="text-xl font-semibold text-balance" yDistance={-3} zDistance={12} rotateYDistance={14}>
            Wave through every glyph
          </MotionText.Wave>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Morph</CardTitle>
          <CardAction>
            <Button size="sm" variant="ghost" type="button" onClick={() => setMorphAlternate((value) => !value)}>
              Swap
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <MotionText.Morph className="text-xl font-semibold">
            {morphAlternate ? "Motion text system" : "Modular text motion"}
          </MotionText.Morph>
        </CardContent>
      </Card>
    </div>
  );
}

function AutocompleteDemo() {
  const items = FRAMEWORKS.map((fw) => fw.label);

  return (
    <div className="max-w-xs">
      <Autocomplete items={items}>
        <AutocompleteInput placeholder="Search frameworks…" showTrigger showClear />
        <AutocompletePopup>
          <AutocompleteEmpty>No results found.</AutocompleteEmpty>
          <AutocompleteList>
            <AutocompleteCollection>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteCollection>
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}

function MorphIconDemo() {
  const [active, setActive] = React.useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button type="button" variant="outline" size="sm" onClick={() => setActive((value) => !value)}>
        <MorphIcon from="filter" to="chevronRight" active={active} data-icon="inline-start" />
        Toggle morph
      </Button>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <MorphIcon from="chevronDown" to="chevronUp" active={active} />
        <MorphIcon from="chevronLeft" to="chevronRight" active={active} />
        <MorphIcon from="none" to="filter" active={active} />
      </div>
    </div>
  );
}

export function ComponentDemos() {
  return (
    <>
      <Heading level={2} id="more-ui" className="mt-12">
        More UI
      </Heading>

      <Section
        title="Drawer"
        description={
          <>
            Basic composition smoke test. Full configurable demos live on{" "}
            <Link className="text-primary underline-offset-4 hover:underline" href="/private/drawer">
              /private/drawer
            </Link>
            .
          </>
        }
      >
        <Drawer showSwipeHandle swipeDirection="down">
          <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
              <DrawerDescription>Base UI drawer via the design-system wrapper.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 text-sm text-muted-foreground">Use the dedicated private page for direction, snap points, and nested stacks.</div>
            <DrawerFooter>
              <DrawerClose render={<Button />}>Close</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Section>

      <Section title="Alert">
        <div className="max-w-lg space-y-4">
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
          </Alert>
          <Alert variant="neutral">
            <IconInfoCircle />
            <AlertTitle>New update available</AlertTitle>
            <AlertDescription>A new version has been released with performance improvements.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <IconInfoCircle />
            <AlertTitle>New update available</AlertTitle>
            <AlertDescription>A new version has been released with performance improvements.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <IconAlertTriangle />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <IconAlertTriangle />
            <AlertContent>
              <AlertTitle>Destructive action</AlertTitle>
              <AlertDescription>This will permanently delete your account data.</AlertDescription>
              <AlertAction>
                <Button size="xs" variant="destructive">
                  Delete
                </Button>
                <Button size="xs" variant="outline">
                  Cancel
                </Button>
              </AlertAction>
            </AlertContent>
          </Alert>
        </div>
      </Section>

      <Section title="Avatar">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="/assets/bob-avatar.png" alt="Avatar" />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="/assets/bob-avatar.png" alt="Avatar" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </div>
      </Section>

      <Section title="Autocomplete">
        <AutocompleteDemo />
      </Section>

      {/* <Section title="Carousel">
        Covered by /private/testing/carousel and playground frames.
      </Section> */}

      <Section title="Checkbox">
        <div className="space-y-3">
          <Field orientation="horizontal" className="flex w-auto items-center gap-2 text-sm">
            <FieldLabel>
              <Checkbox defaultChecked />
              <FieldContent>Accept terms and conditions</FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex w-auto items-center gap-2 text-sm">
            <FieldLabel>
              <Checkbox />
              <FieldContent>Send me marketing emails</FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex w-auto items-center gap-2 text-sm text-muted-foreground">
            <FieldLabel>
              <Checkbox disabled />
              <FieldContent>Disabled option</FieldContent>
            </FieldLabel>
          </Field>
        </div>
      </Section>

      <Section title="Code">
        <div className="flex flex-wrap items-center gap-4">
          <Code>npm install</Code>
          <Code value="npx shadcn@latest add" copyValue />
          <Code variant="plain">variant=&quot;plain&quot;</Code>
        </div>
        <p className="text-sm">
          Use the <Code variant="inline">cn()</Code> utility for class merging. The <Code variant="inline">inline</Code> variant wraps text
          in backticks.
        </p>
        <ColorCode value="oklch(0.65 0.18 250)" />
      </Section>

      <Section title="Combobox">
        <ComboboxDemo />
      </Section>

      <Section title="Copy Button">
        <div className="flex items-center gap-4">
          <CopyButton value="Hello, world!" />
          <span className="text-sm text-muted-foreground">Click to copy &quot;Hello, world!&quot;</span>
        </div>
      </Section>

      <Section title="Empty">
        <Empty className="max-w-md border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconFolderOff />
            </EmptyMedia>
            <EmptyTitle>No results</EmptyTitle>
            <EmptyDescription>Try a different filter or clear your search.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm" variant="outline">
              Clear filters
            </Button>
          </EmptyContent>
        </Empty>
      </Section>

      <Section title="Input Group">
        <div className="max-w-md space-y-4">
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <IconSearch className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
          <InputGroup>
            <InputGroupInput placeholder="0.00" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Section>

      <Section title="Item">
        <div className="max-w-md">
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <IconUser />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Senior Designer at Acme Inc.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="secondary">Active</Badge>
              </ItemActions>
            </Item>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <IconUser />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Jane Smith</ItemTitle>
                <ItemDescription>Engineering Manager</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant="outline">Away</Badge>
              </ItemActions>
            </Item>
          </ItemGroup>
        </div>
      </Section>

      <Section title="Kbd">
        <div className="flex flex-wrap items-center gap-4">
          <Kbd>⌘</Kbd>
          <Kbd variant="elevated">⌘</Kbd>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </Section>

      <Section title="Link Button">
        <div className="flex flex-wrap gap-2">
          <LinkButton href="/private/qa">Internal</LinkButton>
          <LinkButton href="https://ui.shadcn.com" isExternal variant="outline">
            External
          </LinkButton>
          <LinkButton href="/playground" variant="ghost" size="sm">
            Ghost
          </LinkButton>
        </div>
      </Section>

      <Section title="Loader">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-2 text-primary">
            <Loader />
            Primary
          </span>
          <span className="inline-flex items-center gap-2 text-muted-foreground">
            <Loader />
            Muted
          </span>
          <Button loading size="sm">
            Loading
          </Button>
        </div>
      </Section>

      <Section title="Number Field">
        <div className="max-w-xs">
          <NumberField defaultValue={50} min={0} max={100}>
            <Label>Quantity</Label>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </div>
      </Section>

      <Section title="Resizable">
        <ResizablePanelGroup orientation="horizontal" className="min-h-40 max-w-lg rounded-lg border">
          <ResizablePanel defaultSize={55} className="grid place-items-center p-4 text-sm">
            Left
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} className="grid place-items-center bg-muted/40 p-4 text-sm">
            Right
          </ResizablePanel>
        </ResizablePanelGroup>
      </Section>

      <Section title="Skeleton">
        <div className="flex max-w-sm flex-col gap-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Section>

      <Section title="Slider">
        <div className="flex max-w-sm flex-col gap-6">
          <Slider defaultValue={[50]} />
          <Slider defaultValue={[25, 75]} />
          <Slider defaultValue={[40]} showValue orientation="horizontal" />
          <SliderGroup defaultValue={[64]} className="flex-col items-stretch gap-2">
            <SliderLabel className="flex items-center justify-between gap-3">
              <span>Composable value</span>
              <SliderValue>{(formattedValues) => `${formattedValues[0] ?? 0}%`}</SliderValue>
            </SliderLabel>
            <SliderControl />
          </SliderGroup>
        </div>
      </Section>

      <Section title="Switch">
        <div className="space-y-4">
          <Field orientation="horizontal" className="flex w-auto items-center gap-3 text-sm">
            <FieldLabel>
              <Switch defaultChecked />
              <FieldContent>Airplane mode</FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex w-auto items-center gap-3 text-sm">
            <FieldLabel>
              <Switch size="sm" />
              <FieldContent>Small switch</FieldContent>
            </FieldLabel>
          </Field>
          <Field orientation="horizontal" className="flex w-auto items-center gap-3 text-sm text-muted-foreground">
            <FieldLabel>
              <Switch disabled />
              <FieldContent>Disabled</FieldContent>
            </FieldLabel>
          </Field>
        </div>
      </Section>

      <Section title="Heading Levels" className="not-prose">
        <div>
          <Heading level={1}>Heading 1</Heading>
        </div>
        <div>
          <Heading level={2}>Heading 2</Heading>
        </div>
        <div>
          <Heading level={3}>Heading 3</Heading>
        </div>
        <div>
          <Heading level={4}>Heading 4</Heading>
        </div>
        <div>
          <Heading level={5}>Heading 5</Heading>
        </div>
      </Section>

      <Heading level={2} id="animation" className="mt-12">
        Animation
      </Heading>

      <Section title="Animate Height">
        <AnimateHeightDemo />
      </Section>

      <Section title="Motion Text">
        <MotionTextDemo />
      </Section>

      <Section title="Pixel Icons Post Hero" id="pixel-icons-post-hero">
        <PixelIconMatrix />
      </Section>

      <Heading level={2} id="blocks" className="mt-12">
        Blocks
      </Heading>

      <Section title="Demo">
        <div className="grid gap-6">
          <DemoContainer
            title="Overflow: wrap (default)"
            controls={<Badge variant="secondary">wrap</Badge>}
            caption="Long prose wraps naturally with centered layout disabled."
            centerContent={false}
            code={{
              filename: "demo-wrap.tsx",
              language: "tsx",
              value: `<DemoContainer title="Overflow: wrap" centerContent={false}>
  <article className="max-w-2xl space-y-3">
    <p>...lorem ipsum...</p>
    <p>...lorem ipsum...</p>
  </article>
</DemoContainer>`,
            }}
          >
            <article className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
            </article>
          </DemoContainer>

          <DemoContainer
            title="Overflow: scroll + maxHeight"
            controls={<Badge variant="secondary">scroll</Badge>}
            caption="Constrained height with vertical and horizontal scrolling support."
            maxHeight={220}
            overflowBehavior="scroll"
            centerContent={false}
            code={{
              filename: "demo-scroll.tsx",
              language: "ts",
              value: `<DemoContainer maxHeight={220} overflowBehavior="scroll" centerContent={false}>
  <div className="min-w-176 space-y-3">
    <p>...lorem ipsum...</p>
  </div>
</DemoContainer>`,
            }}
          >
            <div className="min-w-[44rem] space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
              <p>{LOREM}</p>
            </div>
          </DemoContainer>

          <DemoContainer
            title="Overflow: resize"
            controls={<Badge variant="secondary">resize</Badge>}
            caption="Drag the handle to resize horizontally and observe reflow."
            overflowBehavior="resize"
            centerContent={false}
            code={{
              filename: "demo-resize.tsx",
              language: "tsx",
              value: `<DemoContainer overflowBehavior="resize" centerContent={false}>
  <article className="space-y-3">
    <p>...lorem ipsum...</p>
  </article>
</DemoContainer>`,
            }}
          >
            <article className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
            </article>
          </DemoContainer>

          <DemoContainer
            title="Overflow: wrap (long line)"
            controls={<Badge variant="secondary">wrap</Badge>}
            caption="Content wraps naturally within the card - no scrolling, no resize handle."
            centerContent={false}
            code={{
              filename: "demo-wrap-long.tsx",
              language: "tsx",
              value: `<DemoContainer centerContent={false}>
  <p>...very long single line...</p>
</DemoContainer>`,
            }}
          >
            <p className="text-sm text-muted-foreground">{`${LOREM} ${LOREM_ALT}`}</p>
          </DemoContainer>

          <Demo.Root className="border border-dashed border-border/70 bg-secondary/35">
            <Demo.Header className="bg-card/70">
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0">
                <Demo.Title>Primitive composition</Demo.Title>
                <Demo.Description>responsive title metadata</Demo.Description>
                <Badge variant="secondary">Demo.Root</Badge>
              </div>
              <Badge variant="outline">slots</Badge>
            </Demo.Header>
            <Demo.Content variant="outline" overflowBehavior="scroll" maxHeight={180} centerContent={false} innerClass="grid gap-3">
              <p className="text-sm text-muted-foreground">
                This example styles the root, header, content, and footer independently while keeping the same resize and overflow options
                available to the legacy wrapper.
              </p>
              <div className="grid min-w-[36rem] grid-cols-4 gap-2 text-xs">
                {["Root", "Header", "Content", "Footer"].map((slot) => (
                  <div key={slot} className="rounded-md border border-border/70 bg-background px-3 py-2 font-medium text-foreground">
                    Demo.{slot}
                  </div>
                ))}
              </div>
            </Demo.Content>
            <Demo.Footer className="flex flex-wrap items-center justify-between gap-2">
              <span>Footer slot for captions or composed code blocks.</span>
              <Code className="text-[11px]">{'<Demo.Content overflowBehavior="scroll" />'}</Code>
            </Demo.Footer>
          </Demo.Root>
        </div>
      </Section>

      <Section title="Index List">
        <div className="max-w-2xl">
          <IndexList items={INDEX_LIST_DEMO_ITEMS} maxVisibleItems={5} />
        </div>
      </Section>

      <Section title="Image Modal">
        <div className="max-w-md">
          <ImageModal src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />
          <ImageModalDrawer src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />
        </div>
      </Section>

      <Section title="Pagination">
        <Pagination
          previous={{ href: "/private/qa", title: "Previous page" }}
          next={{ href: "/private/drawer", title: "Drawer demos" }}
          backHref="/private"
          backLabel="Private"
        />
      </Section>

      <Section title="Stats">
        <Stats
          data={[
            { label: "Revenue", value: "$45.2K", change: "12% from last month" },
            { label: "Users", value: "2,340", change: "8% from last month" },
            { label: "Bounce Rate", value: "24%", change: "3% from last month", down: true },
          ]}
        />
      </Section>

      <Heading level={2} id="theme" className="mt-12">
        Theme
      </Heading>

      <Section title="Mode Toggle">
        <div className="flex items-center gap-4">
          <ModeToggle />
          <span className="text-sm text-muted-foreground">Toggle between light and dark themes</span>
        </div>
      </Section>

      <Section title="Color Swatch Group">
        <ColorSwatchGroupDemo />
      </Section>

      <Section title="Theme Settings" id="theme-settings">
        <ThemeSettingsFieldsDemo />
      </Section>

      <Heading level={2} id="icons-group" className="mt-12">
        Icons
      </Heading>

      <Section title="Icons">
        <div className="flex flex-wrap items-center gap-4">
          {[
            { Icon: GithubIcon, name: "GitHub" },
            { Icon: FigmaIcon, name: "Figma" },
            { Icon: LinkedinIcon, name: "LinkedIn" },
            { Icon: BaseUiIcon, name: "Base UI" },
            { Icon: TailwindIcon, name: "Tailwind" },
            { Icon: NextJsIcon, name: "Next.js" },
            { Icon: ShadcnIcon, name: "shadcn" },
            { Icon: CursorIcon, name: "Cursor" },
            { Icon: CssIcon, name: "CSS" },
          ].map(({ Icon, name }) => (
            <TooltipProvider key={name}>
              <Tooltip>
                <TooltipTrigger className="grid size-10 place-items-center rounded-lg border bg-card">
                  <Icon className="size-5" />
                </TooltipTrigger>
                <TooltipContent>{name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </Section>

      <Section title="Morph Icon">
        <MorphIconDemo />
      </Section>

      <Heading level={2} id="content" className="mt-12">
        Content
      </Heading>

      <Section title="Table of Contents">
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,12rem)_minmax(0,12rem)_1fr]">
          <div>
            <p className="mb-2 font-pixel text-[11px] text-muted-foreground uppercase">All depths</p>
            <TableOfContents toc={TOC_DEMO_ITEMS} />
          </div>
          <div>
            <p className="mb-2 font-pixel text-[11px] text-muted-foreground uppercase">H2 only</p>
            <TableOfContents toc={TOC_DEMO_ITEMS} maxDepth={2} />
          </div>
          <article className="prose max-w-none">
            <Heading id="toc-demo-overview" level={2}>
              Overview
            </Heading>
            <p>{LOREM}</p>
            <Heading id="toc-demo-installation" level={2}>
              Installation
            </Heading>
            <p>{LOREM_ALT}</p>
            <Heading id="toc-demo-client-component" level={3}>
              Client component
            </Heading>
            <p>{LOREM}</p>
            <Heading id="toc-demo-server-component" level={3}>
              Server component
            </Heading>
            <p>{LOREM_ALT}</p>
            <Heading id="toc-demo-options" level={2}>
              Options
            </Heading>
            <p>{LOREM}</p>
          </article>
        </div>
      </Section>

      <Section title="Link Out" id="link-out">
        <div className="flex flex-wrap gap-4 text-sm">
          <LinkOut href="https://bob.fyi" text="bob.fyi" />
          <LinkOut href="mailto:hi@bob.fyi" text="hi@bob.fyi" />
        </div>
      </Section>

      <Section title="Back Button">
        <BackButton href="/private">Private index</BackButton>
      </Section>

      <Section title="Code Block">
        <CodeBlock
          code={`export function ButtonDemo() {\n  return <Button variant="elevated">Save</Button>;\n}`}
          language="tsx"
          filename="button-demo.tsx"
        />
      </Section>

      <Section title="Card Fan">
        <DemoContainer title="Forge gallery" description="Click to center a card" caption="Focus to center" innerClass="min-h-[600px]">
          <CardFan />
        </DemoContainer>
      </Section>

      <Section title="Info Tip">
        <div className="flex items-center gap-2 text-sm">
          <span>Hover for more info</span>
          <InfoTip title="Info Tip" description="This is a small popover that appears on hover, useful for inline help text." />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Help variant</span>
          <InfoTip help description="This uses the help icon variant." />
        </div>
      </Section>

      <Section title="Number Slider">
        <NumberSliderDemo />
      </Section>

      <Section title="Image">
        <div className="max-w-md">
          <Image src={forgeBeforeDemo} alt="Sample image with card wrapper" />
        </div>
      </Section>

      <Section title="Mark Note" id="mark-note">
        <div className="max-w-prose space-y-6 text-sm leading-relaxed">
          <MarkNote note="A target derived from our brand teal.">
            Each ramp is centered on a <Mark>500 step</Mark>, which sits at roughly 5.2:1 contrast vs white.
          </MarkNote>
          <MarkNote note="still can't believe we made this">
            <Mark>
              This approach to reactions led users to discover &lsquo;emoji battles&rsquo;, a spontaneous game hidden as a fun easter egg
              that a tiny physics engine drives on screen.
            </Mark>{" "}
            Friends intentionally caused these collisions, transforming reactions into something totally different.
          </MarkNote>
        </div>
      </Section>

      <Section title="Video">
        <p className="text-sm text-muted-foreground">
          Custom video player built on <Code variant="inline">media-chrome</Code> with themed toolbar controls, play/pause overlay,
          fullscreen, and optional volume.
        </p>
        <div className="max-w-lg">
          <Video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
            caption="Themed video player component."
          />
        </div>
      </Section>
    </>
  );
}

