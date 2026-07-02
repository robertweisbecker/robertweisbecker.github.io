"use client";

import dynamic from "next/dynamic";
import { IconArrowUpRight } from "@tabler/icons-react";
import { DemoContainer } from "@/components/demo";
import { Code } from "@/components/ui/code";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { LinkButton } from "@/components/ui/link-button";
import { PlaygroundSection } from "@/components/playground/playground-section";
import { ChromeTabsDemo } from "@/components/playground/verisimilitude/chrome-tabs-demo";
import { GroupedPopupsDemo } from "@/components/playground/verisimilitude/grouped-popups-demo";

const SiteSearch = dynamic(() => import("@/components/site-search").then((module) => ({ default: module.SiteSearch })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading site search…</p>,
});

const PhoneDeviceFrameDemo = dynamic(
  () =>
    import("@/components/playground/verisimilitude/phone-device-frame-demo").then((module) => ({ default: module.PhoneDeviceFrameDemo })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading phone frame…</p>,
  }
);

const BrowserDeviceFrameDemo = dynamic(
  () =>
    import("@/components/playground/verisimilitude/browser-device-frame-demo").then((module) => ({
      default: module.BrowserDeviceFrameDemo,
    })),
  {
    loading: () => <p className="text-sm text-muted-foreground">Loading browser frame…</p>,
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
