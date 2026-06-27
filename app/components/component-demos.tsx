"use client";

import { BackButton } from "@/components/back-button";
import { CodeBlock } from "@/components/code-block";
import { ColorSwatchGroup } from "@/components/color-swatch-group";
import { Demo } from "@/components/demo";
import { FocusPolaroidFan } from "@/components/demos/focus-polaroid-fan";
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
import { Image } from "@/components/image";
import { ImageModal, ImageModalDrawer } from "@/components/image-modal";
import forgeBeforeDemo from "@/public/assets/forge/forge-before.png";
import { InfoTip } from "@/components/info-tip";
import { LinkOut } from "@/components/link-out";
import { Mark, MarkNote } from "@/components/mark-note";
import { ModeToggle } from "@/components/mode-toggle";
import { NumberSlider } from "@/components/number-slider";
import { Stats } from "@/components/stats";
import { Theme } from "@/components/theme";
import { ThemeNeutralColorField, ThemePrimaryColorField, ThemeRadiusField, ThemeResetAllButton } from "@/components/theme-settings";
import { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Code } from "@/components/ui/code";
import { ColorCode } from "@/components/ui/color-code";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { CopyButton } from "@/components/ui/copy-button";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@/components/ui/number-field";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Video } from "@/components/video";
import { IconAlertTriangle, IconInfoCircle, IconSearch, IconUser } from "@tabler/icons-react";
import * as React from "react";
import { Section } from "./section";

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

const CAROUSEL_SLIDES = [
  { src: "/assets/udl/foundry-light.png", alt: "Foundry design system – light theme" },
  { src: "/assets/forge/course-edit-after.png", alt: "Forge – course edit redesign" },
  { src: "/assets/engage/engage-desktop.png", alt: "Engage – desktop layout" },
  { src: "/assets/udl/figma-colors.png", alt: "UDL – Figma color tokens" },
];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const LOREM_ALT =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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

export function ComponentDemos() {
  return (
    <>
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

      {/* <Section title="Carousel">
        <div className="grid gap-8">
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Default — scroll</p>
            <Carousel>
              <CarouselViewport>
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselItem key={slide.src}>
                    <div
                      className="aspect-video rounded-xl border bg-cover bg-center"
                      style={{ backgroundImage: `url('${slide.src}')` }}
                      role="img"
                      aria-label={slide.alt}
                    />
                  </CarouselItem>
                ))}
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>

          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Autoplay — pill progress + play/pause</p>
            <Carousel autoplay={{ delay: 3000, defaultInteraction: false }}>
              <CarouselViewport>
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselItem key={slide.src}>
                    <div
                      className="aspect-video rounded-xl border bg-cover bg-center"
                      style={{ backgroundImage: `url('${slide.src}')` }}
                      role="img"
                      aria-label={slide.alt}
                    />
                  </CarouselItem>
                ))}
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>

          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Fade — crossfade transitions</p>
            <Carousel fade>
              <CarouselViewport>
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselItem key={slide.src}>
                    <div
                      className="aspect-video rounded-xl border bg-cover bg-center"
                      style={{ backgroundImage: `url('${slide.src}')` }}
                      role="img"
                      aria-label={slide.alt}
                    />
                  </CarouselItem>
                ))}
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>

          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Autoplay + Fade</p>
            <Carousel autoplay={{ delay: 3000, defaultInteraction: false }} fade>
              <CarouselViewport>
                {CAROUSEL_SLIDES.map((slide) => (
                  <CarouselItem key={slide.src}>
                    <div
                      className="aspect-video rounded-xl border bg-cover bg-center"
                      style={{ backgroundImage: `url('${slide.src}')` }}
                      role="img"
                      aria-label={slide.alt}
                    />
                  </CarouselItem>
                ))}
              </CarouselViewport>
              <CarouselToolbar />
            </Carousel>
          </div>
        </div>
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
          in backticks. Or use the color code component for inline HEX <ColorCode value="#000000" />.
        </p>
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

      <Section title="Slider">
        <div className="max-w-sm space-y-6">
          <Slider defaultValue={[50]} />
          <Slider defaultValue={[25, 75]} />
          <Slider defaultValue={[40]} showValue orientation="horizontal" />
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

      <Section title="Link Out" id="link-out">
        <div className="flex flex-wrap gap-4">
          <LinkOut href="https://github.com" text="GitHub" />
          <LinkOut href="https://figma.com" text="Figma" />
        </div>
      </Section>

      <Section title="Back Button">
        <div className="flex flex-wrap gap-4">
          <BackButton href="/#projects">Projects</BackButton>
          <BackButton href="/">Home</BackButton>
        </div>
      </Section>

      <Section title="Code Block">
        <div className="max-w-lg">
          <CodeBlock
            code={`.button {\n  background: var(--primary);\n  border-radius: var(--radius);\n  padding: 0.5rem 1rem;\n}`}
            language="css"
            filename="styles.css"
          />
        </div>
      </Section>

      <Section title="Demo">
        <div className="grid gap-6">
          <Demo
            title="Overflow: wrap (default)"
            controls={<Badge variant="secondary">wrap</Badge>}
            caption="Long prose wraps naturally with centered layout disabled."
            centerContent={false}
            code={{
              filename: "demo-wrap.tsx",
              language: "tsx",
              value: `<Demo title="Overflow: wrap" centerContent={false}>
  <article className="max-w-2xl space-y-3">
    <p>...lorem ipsum...</p>
    <p>...lorem ipsum...</p>
  </article>
</Demo>`,
            }}
          >
            <article className="max-w-2xl space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
            </article>
          </Demo>

          <Demo
            title="Overflow: scroll + maxHeight"
            controls={<Badge variant="secondary">scroll</Badge>}
            caption="Constrained height with vertical and horizontal scrolling support."
            maxHeight={220}
            overflowBehavior="scroll"
            centerContent={false}
            code={{
              filename: "demo-scroll.tsx",
              language: "ts",
              value: `<Demo maxHeight={220} overflowBehavior="scroll" centerContent={false}>
  <div className="min-w-176 space-y-3">
    <p>...lorem ipsum...</p>
  </div>
</Demo>`,
            }}
          >
            <div className="min-w-[44rem] space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
              <p>{LOREM}</p>
            </div>
          </Demo>

          <Demo
            title="Overflow: resize"
            controls={<Badge variant="secondary">resize</Badge>}
            caption="Drag the handle to resize horizontally and observe reflow."
            overflowBehavior="resize"
            centerContent={false}
            code={{
              filename: "demo-resize.tsx",
              language: "tsx",
              value: `<Demo overflowBehavior="resize" centerContent={false}>
  <article className="space-y-3">
    <p>...lorem ipsum...</p>
  </article>
</Demo>`,
            }}
          >
            <article className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>{LOREM}</p>
              <p>{LOREM_ALT}</p>
            </article>
          </Demo>

          <Demo
            title="Overflow: wrap (long line)"
            controls={<Badge variant="secondary">wrap</Badge>}
            caption="Content wraps naturally within the card - no scrolling, no resize handle."
            centerContent={false}
            code={{
              filename: "demo-wrap-long.tsx",
              language: "tsx",
              value: `<Demo centerContent={false}>
  <p>...very long single line...</p>
</Demo>`,
            }}
          >
            <p className="text-sm text-muted-foreground">{`${LOREM} ${LOREM_ALT}`}</p>
          </Demo>
        </div>
      </Section>

      <Section title="Focus Polaroid Fan">
        <Demo title="Forge gallery" description="Click to center a card" caption="Focus to center" innerClass="min-h-[600px]">
          <FocusPolaroidFan />
        </Demo>
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

      <Section title="Mode Toggle">
        <div className="flex items-center gap-4">
          <ModeToggle />
          <span className="text-sm text-muted-foreground">Toggle between light and dark themes</span>
        </div>
      </Section>

      <Section title="Number Slider">
        <NumberSliderDemo />
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

      <Section title="Color Swatch Group">
        <ColorSwatchGroupDemo />
      </Section>

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

      <Section title="Image">
        <div className="max-w-md">
          <Image src={forgeBeforeDemo} alt="Sample image with card wrapper" />
        </div>
      </Section>

      <Section title="Image Modal">
        <div className="max-w-md">
          <ImageModal src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />

          <ImageModalDrawer src={forgeBeforeDemo} caption="Click the expand icon to view fullscreen." />
        </div>
      </Section>

      <Section title="Theme Settings" id="theme-settings">
        <ThemeSettingsFieldsDemo />
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
