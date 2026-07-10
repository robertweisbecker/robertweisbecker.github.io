"use client";

import dynamic from "next/dynamic";
import { IconArrowUpRight } from "@tabler/icons-react";
import { DemoContainer } from "@/components/blocks/demo";
import { Code } from "@/components/ui/code";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { LinkButton } from "@/components/ui/link-button";
import { PlaygroundSection } from "@/components/blocks/playground-section";
import { Loader } from "@/components/ui/loader";

const ChromeTabsDemo = dynamic(
  () => import("@/components/demos/playground/verisimilitude/chrome-tabs-demo").then((module) => ({ default: module.ChromeTabsDemo })),
  {
    loading: () => <Loader />,
  }
);

const GroupedPopupsDemo = dynamic(
  () =>
    import("@/components/demos/playground/verisimilitude/grouped-popups-demo").then((module) => ({ default: module.GroupedPopupsDemo })),
  {
    loading: () => <Loader />,
  }
);

const SiteSearch = dynamic(() => import("@/components/blocks/site-search").then((module) => ({ default: module.SiteSearch })), {
  loading: () => <Loader />,
});

const PhoneDeviceFrameDemo = dynamic(
  () =>
    import("@/components/demos/playground/verisimilitude/phone-device-frame-demo").then((module) => ({
      default: module.PhoneDeviceFrameDemo,
    })),
  {
    loading: () => <Loader />,
  }
);

const BrowserDeviceFrameDemo = dynamic(
  () =>
    import("@/components/demos/playground/verisimilitude/browser-device-frame-demo").then((module) => ({
      default: module.BrowserDeviceFrameDemo,
    })),
  {
    loading: () => <Loader />,
  }
);

export function VerisimilitudePlayground() {
  return (
    <div className="flex w-full flex-col gap-14">
      <PlaygroundSection id="verisimilitude" title="Verisimilitude">
        <DemoContainer
          caption={"CSS shape + masking for cutouts"}
          title="Chrome Tabs"
          variant="muted"
          className="lg:col-span-full lg:row-span-2"
          centerContent
          controls={
            <LinkButton variant="ghost" size="xs" href="/posts/clip-path-curve">
              Clip-path playground
              <IconArrowUpRight data-icon="inline-end" />
            </LinkButton>
          }
        >
          <ChromeTabsDemo />
        </DemoContainer>
        <DemoContainer
          title="Site search"
          caption="A Raycast-style command palette"
          variant="muted"
          centerContent
          className="lg:col-span-full"
        >
          <SiteSearch className="w-full max-w-xs" variant="input" />
        </DemoContainer>
        <DemoContainer title="Grouped Popups" variant="muted" centerContent className="lg:col-span-full" innerClass="min-h-[300px]">
          <GroupedPopupsDemo />
        </DemoContainer>
        <DemoContainer title="Keys" variant="muted" centerContent className="lg:col-span-full" innerClass="flex flex-col gap-2">
          <Kbd variant="elevated">⌘/</Kbd>
          <Kbd>⌘I</Kbd>
          <KbdGroup>
            <Kbd variant="big">⌘</Kbd>
            <Kbd variant="big">K</Kbd>
          </KbdGroup>
          <div className="relative isolate size-16 rounded-[35%] bg-black squircle">
            <div
              style={{
                // zIndex: '1',
                // pointerEvents: 'none',
                // position: 'absolute',
                background:
                  "radial-gradient(35% 35% at 0px 0px, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04) 50%, rgba(0, 0, 0, 0) 80%), radial-gradient(35% 35% at 100% 100%, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0) 80%)",
                // inset: '0px',
              }}
              className="pointer-events-none absolute inset-0 z-1"
            />
            <svg
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
              viewBox="0 0 64 64"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient id="glaze-app-icon-border-_r_u_" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.45" />
                  <stop offset="25%" stopColor="white" stopOpacity="0.12" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.06" />
                  <stop offset="75%" stopColor="white" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M0 28.16C0 18.30 0 13.38 1.92 9.60C3.61 6.31 6.31 3.61 9.60 1.92C13.38 0 18.30 0 28.16 0H35.84C45.70 0 50.62 0 54.40 1.92C57.69 3.61 60.39 6.31 62.08 9.60C64 13.38 64 18.30 64 28.16V35.84C64 45.70 64 50.62 62.08 54.40C60.39 57.69 57.69 60.39 54.40 62.08C50.62 64 45.70 64 35.84 64H28.16C18.30 64 13.38 64 9.60 62.08C6.31 60.39 3.61 57.69 1.92 54.40C0 50.62 0 45.70 0 35.84V28.16Z"
                stroke="url(#glaze-app-icon-border-_r_u_)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0 -z-1 size-full">
              <path
                fill="red"
                d="M0 28.16C0 18.30 0 13.38 1.92 9.60C3.61 6.31 6.31 3.61 9.60 1.92C13.38 0 18.30 0 28.16 0H35.84C45.70 0 50.62 0 54.40 1.92C57.69 3.61 60.39 6.31 62.08 9.60C64 13.38 64 18.30 64 28.16V35.84C64 45.70 64 50.62 62.08 54.40C60.39 57.69 57.69 60.39 54.40 62.08C50.62 64 45.70 64 35.84 64H28.16C18.30 64 13.38 64 9.60 62.08C6.31 60.39 3.61 57.69 1.92 54.40C0 50.62 0 45.70 0 35.84V28.16Z"
              />
            </svg>
          </div>
        </DemoContainer>
        <DemoContainer
          title="DeviceFrame · Phone"
          variant="muted"
          overflowBehavior="resize"
          centerContent
          className="lg:col-span-full lg:row-span-2"
          caption="A remix of Geist's Phone component. Responds to color mode and uses your device's clock and battery level (except on iOS)."
        >
          <PhoneDeviceFrameDemo />
        </DemoContainer>
        <DemoContainer title="DeviceFrame · Browser" variant="muted" className="lg:col-span-full" centerContent overflowBehavior="resize">
          <BrowserDeviceFrameDemo />
        </DemoContainer>
        <DemoContainer
          title="Custom mark styles"
          description="with CSS corner-shape"
          variant="muted"
          className="lg:col-span-full"
          innerClass="grid divide-y text-sm/6 text-muted-foreground sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          <div className="space-y-2 p-4 sm:ps-0">
            <p>
              The default mark styling is{" "}
              <mark className="bg-blend-none m-0 rounded-none bg-[mark] bg-none p-0 text-[markText] shadow-none text-shadow-none">
                dated
              </mark>
              . Let&apos;s make the shape a bit more <mark>realistic</mark> with <Code variant="inline">corner-shape</Code>.
            </p>

            <p>
              Then slap a <Code variant="plain">data-hue</Code> attribute on it for some classic highligter colors, like{" "}
              <mark data-hue="yellow">yellow</mark> or <mark data-hue="pink">pink</mark> or <mark data-hue="lime">lime</mark> or{" "}
              <mark data-hue="magenta">magenta</mark> or <mark data-hue="cyan">cyan</mark>.
            </p>
          </div>
          <div className="space-y-4 p-4">
            <p>
              The highlight shape also plays nice with long strings.{" "}
              <mark data-hue="indigo">
                It&apos;s got{" "}
                <Code variant="plain" className="inline wrap-anywhere">
                  box-decoration-break: clone
                </Code>{" "}
                applied to make the shape span line breaks.
              </mark>{" "}
              Notice how the nested <Code variant="inline-component">code</Code>&nbsp;inherited a little treatment too? I think that&apos;s
              a nice touch.
            </p>
          </div>
          <div className="space-y-4 p-4 sm:pe-0">
            <strong>Custom overrides</strong>
            <p>
              Don&apos;t like the default values? Override with classes, like this{" "}
              <mark className="text-foreground [--mark-bg:var(--color-gold-200)]">classic highlighter</mark> look.
            </p>
          </div>
        </DemoContainer>
      </PlaygroundSection>
    </div>
  );
}
