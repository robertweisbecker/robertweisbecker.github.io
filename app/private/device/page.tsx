"use client";

import { ChromeTabs } from "@/components/chrome-tabs";
import { Device, DeviceProvider } from "@/components/device";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs } from "@base-ui/react/tabs";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

export default function DevicePreviewPage() {
  return (
    <DeviceProvider>
      <div className="min-h-screen bg-background px-6 py-12">
        <div className="mx-auto max-w-5xl space-y-14">
          <header className="space-y-2 border-b pb-8">
            <p className="font-pixel text-[11px] text-muted-foreground">private/device</p>
            <h1 className="text-2xl font-semibold tracking-tight">Device preview</h1>
            <p className="max-w-prose text-muted-foreground">
              Content scenarios for <code className="rounded bg-muted px-1 py-0.5 text-xs">Device.Phone</code>,{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">Device.Browser</code>,{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">Device.Desktop</code>, and composable{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">Device.Shine</code>. Compare with the legacy{" "}
              <Link href="/components#device-frame" className="link font-medium">
                Device Frame
              </Link>{" "}
              section on the components page.
            </p>
          </header>

          {/* 1 */}
          <Scenario title="Phone · empty" description="Baseline frame with island + toolbar; no inner content.">
            <Device.Phone />
          </Scenario>

          {/* 2 */}
          <Scenario title="Phone · scrolling text" description="ScrollArea inside screen with gutter padding.">
            <Device.Phone island toolbar address="bob.fyi" gutter>
              <ScrollArea className="h-full">
                <div className="space-y-4 p-4">
                  {Array.from({ length: 24 }, (_, i) => (
                    <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {LOREM}
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </Device.Phone>
          </Scenario>

          {/* 3 */}
          <Scenario
            title="Phone · image only"
            description="Full-bleed asset behind chrome (no gutter, so the image fills the entire screen)."
          >
            <Device.Phone>
              <div className="relative size-full min-h-[200px]">
                <Image src="/assets/forge/forge-before.png" alt="" fill className="object-cover object-top" sizes="400px" />
              </div>
            </Device.Phone>
          </Scenario>

          {/* 4 */}
          <Scenario title="Phone · Shine (sweep)" description="Specular sweep overlay as last child.">
            <Device.Phone gutter>
              <div className="relative size-full">
                <div className="flex items-center justify-center bg-sidebar p-6">
                  <p className="text-center text-sm text-muted-foreground">Portfolio screenshot area</p>
                </div>
                <Device.Shine variant="sweep" />
              </div>
            </Device.Phone>
          </Scenario>

          {/* 5 */}
          <Scenario title="Browser · shorthand" description="toolbar + address props; prose in body.">
            <Device.Browser toolbar address="bob.fyi" gutter>
              <p className="text-sm leading-relaxed text-muted-foreground">{LOREM}</p>
            </Device.Browser>
          </Scenario>

          {/* 6 */}
          <Scenario
            title="Browser · ChromeTabs (tabs slot)"
            description="Tab list sits in the outer chrome beside traffic lights; each panel hosts its own Browser.Window with NavBar + content."
          >
            <Tabs.Root defaultValue="one">
              <Device.Browser
                tabs={
                  <ChromeTabs.List>
                    <ChromeTabs.Tab value="one">Overview</ChromeTabs.Tab>
                    <ChromeTabs.Tab value="two">Screenshots</ChromeTabs.Tab>
                  </ChromeTabs.List>
                }
              >
                <Tabs.Panel value="one">
                  <Device.Browser.Window address="projects/bob-fyi" gutter>
                    <p className="text-sm text-muted-foreground">{LOREM}</p>
                  </Device.Browser.Window>
                </Tabs.Panel>
                <Tabs.Panel value="two">
                  <Device.Browser.Window address="projects/bob-fyi/shots" gutter>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-sm">
                      <Image
                        src="/assets/engage/engage-desktop.png"
                        alt=""
                        fill
                        className="object-cover object-top"
                        sizes="(max-width:768px)100vw,640px"
                      />
                    </div>
                  </Device.Browser.Window>
                </Tabs.Panel>
              </Device.Browser>
            </Tabs.Root>
          </Scenario>

          {/* 7 */}
          <Scenario title="Browser · iframe" description="Remote page in iframe, flush with the chrome (no gutter).">
            <Device.Browser toolbar address="example.com" className="max-w-3xl">
              <iframe
                title="Example"
                src="https://example.com"
                className="block aspect-video w-full bg-background"
                sandbox="allow-scripts allow-same-origin"
              />
            </Device.Browser>
          </Scenario>

          {/* 8 */}
          <Scenario title="Desktop · wallpaper only" description="Gradient wallpaper; no extra chrome beyond menu + notch.">
            <DesktopWallpaper />
          </Scenario>

          {/* 9 */}
          <Scenario title="Desktop · Shine (glow)" description="Radial glow variant over wallpaper.">
            <Device.Desktop appName="Safari">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, oklch(0.35 0.08 260), oklch(0.28 0.06 300)), url(/assets/udl/foundry-light.png)",
                }}
              />
              <Device.Shine variant="glow" />
            </Device.Desktop>
          </Scenario>

          {/* 10 */}
          <Scenario title="Desktop · nested Browser" description="Browser chrome inside macOS desktop frame.">
            <Device.Desktop appName="Finder" gutter toolbar island className="min-h-[320px]">
              <div className="relative flex min-h-0 flex-1 flex-col px-3 pt-1 pb-3">
                <Device.Browser toolbar address="bob.fyi" gutter className="flex min-h-0 flex-1 flex-col overflow-hidden shadow-lg">
                  <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-[inherit] bg-background">
                    <Image src="/assets/forge/course-edit-after.png" alt="" fill className="object-cover object-top" sizes="900px" />
                  </div>
                </Device.Browser>
              </div>
            </Device.Desktop>
          </Scenario>

          {/* 11 */}
          <Scenario title="Desktop · video" description="Poster + controls inside desktop content area.">
            <Device.Desktop appName="QuickTime Player" gutter>
              <video className="absolute inset-0 size-full object-cover" controls playsInline poster="/assets/forge/forge-before.png">
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" type="video/mp4" />
              </video>
            </Device.Desktop>
          </Scenario>

          {/* 12 */}
          <Scenario title="Minimal chrome · Phone / Browser / Desktop" description="No island, no toolbar — frames only.">
            <div className="grid gap-8 md:grid-cols-3">
              <Device.Phone island={false} toolbar={false}>
                <div className="flex items-center justify-center p-8 text-xs text-muted-foreground">Screen</div>
              </Device.Phone>
              <Device.Browser toolbar={false}>
                <p className="text-xs text-muted-foreground">{LOREM}</p>
              </Device.Browser>
              <Device.Desktop island={false} toolbar={false}>
                <div className="flex items-center justify-center bg-muted/30 p-8 text-xs text-muted-foreground">Wallpaper</div>
              </Device.Desktop>
            </div>
          </Scenario>

          {/* 13 */}
          <Scenario title="Shine variants · Desktop row" description="Same wallpaper; sweep / glow / ambient / none.">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {(["sweep", "glow", "ambient", "none"] as const).map((variant) => (
                <figure key={variant} className="space-y-2">
                  <Device.Desktop appName="Finder">
                    <div className="absolute inset-0 bg-linear-to-br from-neutral-900 via-neutral-800 to-neutral-950" />
                    <Device.Shine variant={variant} />
                  </Device.Desktop>
                  <figcaption className="text-center font-pixel text-[10px] text-muted-foreground">{variant}</figcaption>
                </figure>
              ))}
            </div>
          </Scenario>
        </div>
      </div>
    </DeviceProvider>
  );
}

function DesktopWallpaper() {
  return (
    <Device.Desktop appName="Finder">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, oklch(0.2 0.02 260 / 0.3), transparent), url(/assets/udl/foundry-light.png)`,
        }}
      />
    </Device.Desktop>
  );
}

function Scenario({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-10 space-y-3">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        {description ? <p className="mt-1 max-w-prose text-xs text-muted-foreground">{description}</p> : null}
      </div>
      <div className="rounded-xl border bg-muted/25 p-6">{children}</div>
    </section>
  );
}
