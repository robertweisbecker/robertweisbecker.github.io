import { CodeBlock } from "@/components/code-block";
import { DemoContainer } from "@/components/blocks/demo";
import { CheckIconStraight } from "@/components/icons";
import { Theme, ThemeResetAllButton, ThemeSettingsPanel } from "@/components/theme";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "@/components/ui/code";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { IconHeartFilled, IconSend, IconSettings, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

function ThemeDemo() {
  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="default" size="sm">
          <IconSend data-icon="inline-start" />
          Send
        </Button>
        <Button variant="secondary" size="sm">
          <IconSettings data-icon="inline-start" />
          Settings
        </Button>
        <Button variant="outline" size="sm">
          <IconHeartFilled data-icon="inline-start" className="text-destructive opacity-100!" />
          Like
        </Button>
        <Button variant="success" size="sm">
          <CheckIconStraight className="size-3" data-icon="inline-start" />
          Success
        </Button>
        <Button variant="destructive" size="sm">
          <IconTrash data-icon="inline-start" />
          Delete
        </Button>
      </div>
      <Separator />
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Neutral</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="bg-neutral-500 text-white">
          Neutral
        </Badge>
        <Badge variant="secondary" className="bg-info-primary text-white">
          Info
        </Badge>
        <Badge variant="secondary" className="bg-success-primary text-white">
          Success
        </Badge>
        <Badge variant="secondary" className="bg-warning-primary text-white">
          Warning
        </Badge>
        <Badge variant="secondary" className="bg-destructive text-white">
          Error
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-neutral-400" />
          Neutral
        </Badge>
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-info-primary" />
          Info
        </Badge>
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-success-primary" />
          Success
        </Badge>
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-warning-primary" />
          Warning
        </Badge>
        <Badge variant="outline">
          <span className="size-2 rounded-full bg-destructive" />
          Error
        </Badge>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Alert variant="neutral">Neutral</Alert>
        <Alert variant="secondary">Brand</Alert>
        <Alert variant="info">Info</Alert>
        <Alert variant="success">Success</Alert>
        <Alert variant="warning">Warning</Alert>
        <Alert variant="error">Error</Alert>
      </div>
    </div>
  );
}

export default function ThemingPostPage() {
  return (
    <>
      <section className="prose">
        <p>
          A working demo of the theming described in my{" "}
          <Link href="/projects/oklch" className="link">
            writeup
          </Link>{" "}
          of the okLCH color system I created for the{" "}
          <Link href="/projects/unified-design-language" className="link">
            Unified Design Language
          </Link>{" "}
          project. While that design system doesn&apos;t use Tailwind, I&apos;ve applied the same thinking to this site, so we end up with a
          pretty close approximation.
        </p>
        <p>
          You can play around below. The demo is scoped to its container, so it won&apos;t affect the rest of the page, but you can always
          change the whole site&apos;s theme in the header if you land on something you like.
        </p>

        <Alert>
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            It seems LightningCSS (used by Tailwind) now converts <Code variant="plain">oklch</Code> to <Code variant="plain">okLab</Code>{" "}
            when compiled as of Tailwind ~v4.2, so inspected values may not match what&apos;s in the code. Shouldn&apos;t really matter
            though, since the two convert cleanly, but just FYI.
          </AlertDescription>
        </Alert>
      </section>

      <Theme className="relative my-24 flex flex-col gap-2 justify-self-center border border-dashed border-purple-500 bg-[canvas] md:max-w-4xl lg:w-6xl">
        <div className="to-canvas absolute left-3 flex -translate-y-1/2 gap-x-1 bg-linear-to-b from-background from-50% to-50% px-2 text-[11px]">
          <div className="bg-purple-500 px-1 font-pixel leading-4 text-white uppercase">{`<Theme>`}</div>
        </div>

        {/* <p className="max-w-prose text-xs text-muted-foreground">
          Portaled elements (ie. popups) won't inherit theming from within a nested theme, unless a corresponding
          provider is present. Otherwise, they'll use the global theme.
        </p> */}

        <div className="grid w-full items-stretch gap-4 p-4 sm:grid-cols-5">
          <Card className="sm:col-span-2" variant="muted">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeSettingsPanel hueDisplay="swatches" neutralDisplay="swatches" />
            </CardContent>
            <CardFooter>
              <ThemeResetAllButton size="md" variant="outline" className="w-full flex-1" />
            </CardFooter>
          </Card>

          <DemoContainer title="Preview" className="sm:col-span-3">
            <ThemeDemo />
          </DemoContainer>
        </div>
      </Theme>

      {/* <p>
        As a thought experiment, I wanted to constrain myself to using only the out-of-the-box shadcn tokens. I
        understand their purpose (<em>here's dark mode from Next Themes for your vibe-coded dashboard app</em>), and
        their history (a side project adding defaults for Radix), but they've long befuddled me. I guess that's why he
        added Create. Anyway, they're too limited for any real use, and a tad confusing. Does secondary mean "secondary
        button" or "second background color"? Why is it always the same as "accent"? Why is "muted" darker in light mode
        and lighter in dark mode? Shouldn't it just always be quieter? Doesn't having{" "}
        <Code variant="plain">dark:bg-input/10</Code> on a button kind of defeat the point of semantic tokens?
      </p> */}
      <div className="prose mx-auto mt-4 flex max-w-xl flex-col gap-6">
        {/* ── How it works ──────────────────────────────────── */}
        <section>
          <Heading level={2}>How it works</Heading>
          <small className="m-2 block text-xs text-muted-foreground italic">* just on this site, not the actual project</small>
          <br />
          <p>
            Colors are controlled by <Code variant="plain">data-hue</Code> and <Code variant="plain">data-neutral</Code> attributes on the{" "}
            <Code variant="plain">{`<Theme>`}</Code> component, each of which assigns a given color ramp to the alias variables that feed
            into the theme. These will cascade down from any ancestor, so you can scope overrides to a section of the page.
          </p>
          <pre className="overflow-x-auto font-pixel text-[11px]/3.5 whitespace-pre-wrap text-foreground">
            {`                    
            ╔──────────────────╗            
            │    colors.css    │            
            ╚────────┬─────────╝            
                     │                        
      ╭──────────────┴──────────────╮
      │                             │
      ▼                             ▼
╔────────────────╗          ╔───────────────╗
│    hues.css    ├─ ─ ─ ─ ─►│  globals.css  │
╚────────────────╝          ╚──────┬────────╝
        │                          │
        │                       Tokens
        │                          │
        ╰──╮        ╭──────────────╯
           │        │ 
           │        ▼
  ╔╌╌╌╌╌╌╌╌│╌╌╌╌╌<Theme>╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╗
  ╎     ╭──▼───────╮ ╭──────────────╮     ╎
  ╠─────│ data-hue ├─┤ data-neutral │─────╣
  ╎  ╭──╯╌╌╌╌╌╌╌╌╌╌╰─╯╌╌╌╌╌╌╌╌╌╌╌╌╌╌╰──╮  ╎
  ╎  │         {children}              │  ╎
  ╎  ╰─────────────────────────────────╯  ╎
  ╚╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╝`}
          </pre>
        </section>

        {/* ── Colors ──────────────────────────────────────── */}
        <section className="prose">
          <Heading level={3}>Aliases</Heading>

          <div className="flex flex-col gap-4">
            <p>
              Raw oklch palettes are registered with Tailwind in <Code variant="plain">colors.css</Code>, making them available as both CSS
              variables and utility classes (<Code variant="plain">bg-ruby-500</Code>, <Code variant="plain">text-sand-200</Code>, etc.).
            </p>
            <p>
              Two alias scales, <Code variant="plain">--hue-*</Code> and <Code variant="plain">--neutral-*</Code>, help power theming beyond
              what the semantic tokens provide. This also lets us re-theme components without having to touch the semantic token definitions
              if we don&apos;t need to. By default, they both point to the <Code variant="plain">sand</Code> palette, but setting{" "}
              <Code variant="plain">data-hue</Code> or <Code variant="plain">data-neutral</Code> on any ancestor swaps the entire scale for
              another color ramp.
            </p>
            <Heading level={3}>File structure</Heading>
            <CodeBlock
              language="text"
              code={`app/
├─ colors.css             // ← raw oklch palettes (registered with @theme)
├─ hues.css               // ← --hue-* / --neutral-* aliases + data-attribute overrides
├─ globals.css            // ← semantic tokens + radius scale (on :root, [data-theme])
components/
├─ theme.tsx              // ← <Theme> context provider (renders data-* attrs + inline --radius)
├─ theme-settings.tsx     // ← settings panel UI (hue, neutral, radius controls)`}
            />

            <CodeBlock
              filename="hues.css"
              language="css"
              code={`/* Default */
:where(:root) {
  --neutral-25:  var(--color-sand-25);
  /* … */
  --neutral-975: var(--color-sand-975);

  --hue-25:  var(--neutral-25);
  /* … */
  --hue-975: var(--neutral-975);
}
/* Override */
[data-hue="blue"] {
  --hue-25:  var(--color-blue-25);
  /* … */
  --hue-975: var(--color-blue-975);
}`}
            />
            <Heading level={3}>Semantic tokens</Heading>
            <p>
              Semantic tokens like <Code variant="plain">--primary</Code>, <Code variant="plain">--background</Code>, and{" "}
              <Code variant="plain">--ring</Code> are declared on <Code variant="plain">:root, [data-theme]</Code> and reference these
              aliases. Because <Code variant="plain">[data-theme]</Code> is in the selector, the tokens re-evaluate whenever hue or neutral
              variables are overridden on a descendant.
            </p>
            <p>
              (I think they&apos;re too limited for practical use, but I&apos;m using shadcn tokens on this site. It&apos;s mostly a thought
              experiment to see how far I can push them / test how my colors work with them; this isn&apos;t what&apos;s used in the actual
              project.)
            </p>

            <CodeBlock
              filename="globals.css"
              language="css"
              code={`:root,
[data-theme] {
  --primary:    var(--hue-500);
  --secondary:  var(--hue-200);
  --background: var(--neutral-25);
  --foreground: var(--neutral-900);
  --ring:       var(--hue-500);
  /* … */
}`}
            />
          </div>
        </section>
        {/* ── Radius ──────────────────────────────────────── */}
        <section className="flex flex-col gap-2">
          <Heading level={3}>Radius</Heading>
          <p>Just for fun, I made the base radius = 10 for easier math, and I also wanted to play with odd-numbered radii.</p>
          <p>
            So you have the <Code variant="plain">--radius</Code> base value with these odd multipliers. Instances of{" "}
            <Code variant="plain">&lt;Theme&gt;</Code> will inject a new <Code variant="plain">--radius</Code> CSS variable, so updated
            values cascade down and re-scale instances.
          </p>
          <p>
            I also capped the values with some eyeballing to avoid overly large radii; I&apos;d prefer to use a more precise approach, but
            this is a quick and dirty solution.
          </p>

          <CodeBlock
            filename="globals.css"
            language="css"
            code={`:root,
[data-theme] {
  --radius: 0.625rem; /* 10px */
  --ellipse-factor: 1;
  --radius-xs: min(calc(var(--radius) * var(--ellipse-factor) * 0.3), 0.5rem);
  --radius-sm: min(calc(var(--radius) * var(--ellipse-factor) * 0.5), 0.75rem);
  --radius-md: min(calc(var(--radius) * var(--ellipse-factor) * 0.7), 1.25rem);
  --radius-lg: min(calc(var(--radius) * var(--ellipse-factor) * 0.9), 1.5rem);
  --radius-xl: min(calc(var(--radius) * var(--ellipse-factor) * 1.3), 1.75rem);
  --radius-2xl: min(calc(var(--radius) * var(--ellipse-factor) * 1.7), 2rem);
  --radius-3xl: min(calc(var(--radius) * var(--ellipse-factor) * 2.1), 2.25rem);
  --radius-4xl: min(calc(var(--radius) * var(--ellipse-factor) * 2.9), 2.5rem);
}`}
          />

          <p>
            PS — If you&apos;re wondering what the <Code variant="plain">--ellipse-factor</Code> is for, it has nothing to do with theming.
            I made a utility class for squircle corners, and that&apos;ll offset the radius variable to get the desired effect.
          </p>

          <CodeBlock
            filename="globals.css"
            language="css"
            code={`.squircle {
  @supports (corner-shape: squircle) {
    corner-shape: superellipse(1.4);
    --ellipse-factor: 1.4;
  }
}`}
          />
        </section>
      </div>
    </>
  );
}
