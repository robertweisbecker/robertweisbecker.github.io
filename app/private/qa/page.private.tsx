"use client";
import { useState } from "react";
import { ChromeTabs } from "@/components/chrome-tabs";
import { LinkOut } from "@/components/link-out";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible } from "@base-ui/react/collapsible";
import { IconAlignLeft, IconAlignRight, IconBold, IconChevronDown, IconCopy, IconHome, IconItalic } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { Section } from "@/components/blocks/section";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceFrame } from "@/components/device-frame";
import { Favicon } from "@/components/icons";
import { ButtonGroup } from "@/components/ui/button-group";
import { DataList } from "@/components/ui/data-list";
import { TableOfContents } from "@/components/table-of-contents";
import type { TocItem } from "@/lib/types";

const ComponentDemos = dynamic(() => import("./component-demos").then((module) => ({ default: module.ComponentDemos })), {
  loading: () => <p className="text-sm text-muted-foreground">Loading additional component demos…</p>,
});

export default function QaPage() {
  const [isLoading, setLoading] = useState(false);
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="not-prose self-start max-lg:hidden lg:sticky lg:top-20">
        <TableOfContents toc={QA_TOC} title="QA" />
      </aside>

      <main className="min-w-0">
        <header className="mb-8">
          <Heading level={1}>QA</Heading>
          <p className="text-sm text-muted-foreground">Private component QA surface.</p>
        </header>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Badge variant="beta">ßeta</Badge>
          <Button
            loading={isLoading}
            onClick={() => {
              setLoading(true);
              window.setTimeout(() => setLoading(false), 2000);
            }}
          >
            Loading
          </Button>
        </div>

        <section className="grid gap-4">
          <Heading level={2} id="ui-components">
            UI components
          </Heading>
          <Section title="Button" className="gap-4">
            <div className="flex flex-wrap gap-2">
              <div className="size-20 rounded-xl bg-destructive squircle"></div>
              <button
                type="button"
                className="focus-visible:outline-focus flex items-center gap-x-2 rounded-md bg-popover px-3.5 py-[calc(5/16*1rem)] text-neutral-500 shadow-[0_1px_rgba(0,0,0,0.04),0_1px_5px_-4px_rgba(0,0,0,0.4),0_2px_5px_rgba(0,0,0,0.06)] ring-1 ring-neutral-900/10 outline-none dark:shadow-[0_-1px_rgba(255,255,255,0.06),0_4px_8px_rgba(0,0,0,0.05),0_1px_6px_-4px_#000] dark:ring-white/10"
              >
                Clerk
              </button>
              <button type="button" className="rounded-md bg-foreground/80 px-4 py-2 text-background shadow-button">
                Default
              </button>
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="elevated">Elevated</Button>
              <Button variant="elevated-old">elevated-old</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="md">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🔔</Button>
            </div>
          </Section>
          <Section title="Badge">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="ghost">Ghost</Badge>
              <Badge variant="link">Link</Badge>
            </div>
          </Section>
          <Section title="Card">
            <div className="grid max-w-2xl gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>A short description for this card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here. You can put any content inside.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" rounded className="px-3">
                    Action
                  </Button>
                </CardFooter>
              </Card>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>Small Card</CardTitle>
                  <CardDescription>Compact variant.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Less padding, smaller typography.</p>
                </CardContent>
              </Card>
            </div>
          </Section>
          <Section title="Device Frame">
            <p className="text-xs text-muted-foreground">Phone</p>
            <DeviceFrame.Phone island toolbar address="bob.fyi" gutter>
              <p className="flex items-center justify-center p-6 text-center text-sm">
                Preview content inside the frame. Use for screenshots, demos, or embedding app/website mockups.
              </p>
            </DeviceFrame.Phone>
            <DeviceFrame.Phone island toolbar gutter>
              <ScrollArea className="h-full w-full" scrollFade>
                <div className="space-y-4">
                  {Array.from({ length: 24 }, (_, i) => (
                    <p key={i} className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nulla vitae nisl condimentum tempor.
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </DeviceFrame.Phone>
            <p className="text-xs text-muted-foreground">Browser</p>
            <DeviceFrame.Browser address="bob.fyi">
              <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
                <Favicon className="mr-2 size-4" />
                Browser frame preview
              </div>
            </DeviceFrame.Browser>
          </Section>
          <Section title="Button Group" id="button-group">
            <div className="flex flex-wrap gap-4">
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
            </div>
          </Section>
          <Section title="Form & Input" id="form-input">
            <div className="max-w-md space-y-4">
              <Field data-invalid={true}>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="name@example.com" aria-invalid="true" data-slot="input" />
                <FieldDescription>We&apos;ll never share your email.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Message</FieldLabel>
                <Textarea placeholder="Type your message here." />
              </Field>
              <div className="space-y-2">
                <Label htmlFor="standalone">Standalone input</Label>
                <Input id="standalone" placeholder="No field wrapper" />
              </div>
            </div>
          </Section>
          <Section title="Select">
            <Select defaultValue="apple">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Pick a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Banana">Banana</SelectItem>
                  <SelectItem value="Orange">Orange</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Section>
          <Section title="Toggle & ToggleGroup" id="toggle-togglegroup">
            <div className="flex flex-wrap gap-4">
              <Toggle aria-label="Toggle single">Single</Toggle>
              <Toggle aria-label="Toggle outline" variant="outline">
                Outline
              </Toggle>
              <ToggleGroup defaultValue={["a"]}>
                <ToggleGroupItem value="a" aria-label="A">
                  A
                </ToggleGroupItem>
                <ToggleGroupItem value="b" aria-label="B">
                  B
                </ToggleGroupItem>
                <ToggleGroupItem value="c" aria-label="C">
                  C
                </ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup multiple defaultValue={["bold"]}>
                <ToggleGroupItem value="bold" aria-label="Bold">
                  Bold
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  Italic
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  Underline
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Section>
          <Section title="Toolbar">
            <Toolbar.Root>
              <Toolbar.Group>
                <Toolbar.Button>
                  <IconBold data-icon="inline-start" />
                  Bold
                </Toolbar.Button>
                <Toolbar.Button>
                  <IconItalic data-icon="inline-start" />
                  Italic
                </Toolbar.Button>
              </Toolbar.Group>
              <Toolbar.Separator />
              <Toolbar.Group>
                <Toolbar.Button size="icon-sm">
                  <IconAlignLeft />
                </Toolbar.Button>
                <Toolbar.Button size="icon-sm">
                  <IconAlignRight />
                </Toolbar.Button>
              </Toolbar.Group>
              <Toolbar.Separator />
              <Toolbar.Input placeholder="Font" className="min-w-28" />
            </Toolbar.Root>
          </Section>
          <Section title="Tabs">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Account</TabsTrigger>
                <TabsTrigger value="tab2">Password</TabsTrigger>
                <TabsTrigger value="tab3">Settings</TabsTrigger>
              </TabsList>
              <div className="mt-4 rounded-lg border p-4">
                <TabsContent value="tab1">Account settings and profile.</TabsContent>
                <TabsContent value="tab2">Change your password.</TabsContent>
                <TabsContent value="tab3">App preferences and notifications.</TabsContent>
              </div>
            </Tabs>
          </Section>
          <Section title="Chrome Tabs">
            <div className="w-full max-w-md">
              <ChromeTabs>
                <ChromeTabs.List>
                  <ChromeTabs.Tab value="before">
                    <IconHome />
                    Before
                  </ChromeTabs.Tab>
                  <ChromeTabs.Tab value="after">After</ChromeTabs.Tab>
                  <ChromeTabs.Tab value="more">Tab 3</ChromeTabs.Tab>
                </ChromeTabs.List>
                <ChromeTabs.Panel value="before">
                  <p>Before state content. Use for comparisons or step-by-step views.</p>
                </ChromeTabs.Panel>
                <ChromeTabs.Panel value="after">
                  <p>After state content. Pairs with the Before tab for before/after demos.</p>
                </ChromeTabs.Panel>
                <ChromeTabs.Panel value="more">
                  <p>Additional tabs get the same chrome styling and rounded panel.</p>
                </ChromeTabs.Panel>
              </ChromeTabs>
            </div>
            <p>With clip-path(shape)</p>
            <div className="flex items-end">
              <Button variant="secondary" className="rounded-b-none">
                <div
                  className="absolute right-full bottom-0 aspect-square h-(--button-radius) bg-inherit"
                  style={{
                    clipPath: "shape(from bottom left, curve to 100% 0 with 100% 100%, vline to 100%, hline to 0)",
                  }}
                />
                Button
                <div
                  className="absolute bottom-0 left-full aspect-square h-(--button-radius) bg-inherit"
                  style={{
                    clipPath: "shape(from bottom right, curve to 0 0 with 0% 100%, vline to 100%, hline to 100%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-full aspect-square h-[calc(var(--button-radius)+2px)] bg-destructive"
                  style={{
                    clipPath: "shape(from bottom right, vline to 98%, curve to 2% 98% with 0% 100%, vline to 100%, hline to 100%)",
                  }}
                />
              </Button>
              <Button variant="ghost">Button 2</Button>
            </div>
          </Section>
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogPopup>
                  <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                    <DialogDescription>This is a dialog. It has a title, description, and can contain any content.</DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <p>Dialog content goes here. Close with the X or the button below.</p>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                    <DialogClose render={<Button />}>Save</DialogClose>
                  </DialogFooter>
                </DialogPopup>
              </DialogContent>
            </Dialog>
          </Section>
          <Section title="Alert Dialog">
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone. This will permanently delete the item.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Section>
          <Section title="Dropdown Menu">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" className="justify-start" />}>Open menu</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Section>
          <Section title="Popover">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Popover title</PopoverTitle>
                  <p className="text-sm text-muted-foreground">Popover description or content.</p>
                </PopoverHeader>
                <div className="mt-2 flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="ghost">
                    Dismiss
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Separator />
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
              <PopoverContent variant="annotation" arrow={false}>
                <PopoverHeader>
                  <PopoverTitle>Popover title</PopoverTitle>
                  <p>Popover description or content.</p>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </Section>
          <Section title="Tooltip">
            <TooltipProvider>
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
                  <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger render={<Button variant="secondary" />}>Another tooltip</TooltipTrigger>
                  <TooltipContent side="bottom">Shown below</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </Section>
          <Section title="Collapsible">
            <Collapsible.Root className="grid w-full grid-cols-[1fr_auto_1fr] grid-rows-[auto_var(--collapsible-panel-height)] items-center">
              <Separator className="row-2 flex-1" />
              <Collapsible.Trigger render={<Button variant="outline" size="xs" />} className="group row-2 justify-start rounded-full">
                <IconChevronDown
                  data-icon="inline-start"
                  className="transition-all delay-50 duration-200 ease-out group-data-panel-open:rotate-180"
                />
                <span className="group-data-panel-open:hidden">Show more</span>
                <span className="hidden group-data-panel-open:block">Show less</span>
              </Collapsible.Trigger>
              <Separator className="row-2 flex-1" />
              <Collapsible.Panel className="col-span-3 row-1 flex h-(--collapsible-panel-height) flex-col overflow-hidden text-sm opacity-100 transition-[height,opacity] duration-200 ease-out data-ending-style:h-0 data-ending-style:opacity-0 data-starting-style:h-0 data-starting-style:opacity-0 [&[hidden]:not([hidden='until-found'])]:hidden">
                <div className="mt-1 flex cursor-text flex-col gap-2 rounded-sm p-2">
                  <div>alien-bean-pasta</div>
                  <div>wild-irish-burrito</div>
                  <div>horse-battery-staple</div>
                </div>
              </Collapsible.Panel>
            </Collapsible.Root>
          </Section>
          <Section title="Separator">
            <div className="space-y-2">
              <p className="text-sm">Content above</p>
              <Separator />
              <p className="text-sm">Content below</p>
              <div className="flex items-center gap-4">
                <span>Left</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Center</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Right</span>
              </div>
            </div>
          </Section>
          <Section title="Scroll Area">
            <ScrollArea className="h-32 w-64 rounded-md border" innerClass="p-4">
              <p className="text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </ScrollArea>
          </Section>
          <Section title="Data List" id="data-list">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">orientation=&quot;horizontal&quot; (default)</p>
                <DataList.Root>
                  <DataList.Item className="items-center">
                    <DataList.Label className="min-w-22">Status</DataList.Label>
                    <DataList.Value>
                      <Badge variant="secondary">Authorized</Badge>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label className="min-w-22">ID</DataList.Label>
                    <DataList.Value>
                      <div className="flex items-center gap-2">
                        <Badge variant="ghost">u_2J89JSA4GJ</Badge>
                        <Button size="icon-xs" aria-label="Copy value" variant="ghost">
                          <IconCopy />
                        </Button>
                      </div>
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label className="min-w-22">Name</DataList.Label>
                    <DataList.Value>Vlad Moroz</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label className="min-w-22">Email</DataList.Label>
                    <DataList.Value>
                      <LinkOut href="mailto:vlad@workos.com" text="vlad@workos.com" />
                    </DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label className="min-w-22">Company</DataList.Label>
                    <DataList.Value>
                      <LinkOut href="https://workos.com" text="WorkOS" />
                    </DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground">orientation=&quot;vertical&quot;</p>
                <DataList.Root orientation="vertical" size="sm">
                  <DataList.Item>
                    <DataList.Label>Status</DataList.Label>
                    <DataList.Value>Active</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Role</DataList.Label>
                    <DataList.Value>Principal Designer</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label>Location</DataList.Label>
                    <DataList.Value>Washington, DC</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
              </div>
            </div>
          </Section>
          <Section title="Description List" id="description-list">
            <DescriptionList>
              <DescriptionListLabel>Status</DescriptionListLabel>
              <DescriptionListValue>Active</DescriptionListValue>
              <DescriptionListLabel>Role</DescriptionListLabel>
              <DescriptionListValue>Principal Designer</DescriptionListValue>
              <DescriptionListLabel>Location</DescriptionListLabel>
              <DescriptionListValue>Washington, DC</DescriptionListValue>
            </DescriptionList>
          </Section>
        </section>

        <ComponentDemos />
      </main>
    </div>
  );
}

/** Inline demos in this page (`components/ui` + a few shared shells). */
const UI_TOC_ITEMS = [
  { id: "button", text: "Button" },
  { id: "badge", text: "Badge" },
  { id: "card", text: "Card" },
  { id: "device-frame", text: "Device Frame" },
  { id: "button-group", text: "Button Group" },
  { id: "form-input", text: "Form & Input" },
  { id: "select", text: "Select" },
  { id: "toggle-togglegroup", text: "Toggle & ToggleGroup" },
  { id: "toolbar", text: "Toolbar" },
  { id: "tabs", text: "Tabs" },
  { id: "chrome-tabs", text: "Chrome Tabs" },
  { id: "dialog", text: "Dialog" },
  { id: "alert-dialog", text: "Alert Dialog" },
  { id: "dropdown-menu", text: "Dropdown Menu" },
  { id: "popover", text: "Popover" },
  { id: "tooltip", text: "Tooltip" },
  { id: "collapsible", text: "Collapsible" },
  { id: "separator", text: "Separator" },
  { id: "scroll-area", text: "Scroll Area" },
  { id: "data-list", text: "Data List" },
  { id: "description-list", text: "Description List" },
];

/** Additional `components/ui` demos loaded from `component-demos.tsx`. */
const MORE_UI_TOC_ITEMS = [
  { id: "drawer", text: "Drawer" },
  { id: "alert", text: "Alert" },
  { id: "avatar", text: "Avatar" },
  { id: "autocomplete", text: "Autocomplete" },
  { id: "checkbox", text: "Checkbox" },
  { id: "code", text: "Code" },
  { id: "combobox", text: "Combobox" },
  { id: "copy-button", text: "Copy Button" },
  { id: "empty", text: "Empty" },
  { id: "input-group", text: "Input Group" },
  { id: "item", text: "Item" },
  { id: "kbd", text: "Kbd" },
  { id: "link-button", text: "Link Button" },
  { id: "loader", text: "Loader" },
  { id: "number-field", text: "Number Field" },
  { id: "resizable", text: "Resizable" },
  { id: "skeleton", text: "Skeleton" },
  { id: "slider", text: "Slider" },
  { id: "switch", text: "Switch" },
  { id: "heading-levels", text: "Heading Levels" },
];

/** `components/animation` + pixel matrix (not pixel morph). */
const ANIMATION_TOC_ITEMS = [
  { id: "animate-height", text: "Animate Height" },
  { id: "motion-text", text: "Motion Text" },
  { id: "pixel-icons-post-hero", text: "Pixel Icons Post Hero" },
];

/** `components/blocks` demos. */
const BLOCKS_TOC_ITEMS = [
  { id: "demo", text: "Demo" },
  { id: "index-list", text: "Index List" },
  { id: "image-modal", text: "Image Modal" },
  { id: "image-toggle", text: "Image Toggle" },
  { id: "pagination", text: "Pagination" },
  { id: "stats", text: "Stats" },
];

/** `components/theme` demos. */
const THEME_TOC_ITEMS = [
  { id: "mode-toggle", text: "Mode Toggle" },
  { id: "color-swatch-group", text: "Color Swatch Group" },
  { id: "theme-settings", text: "Theme Settings" },
];

/** `components/icons` demos. */
const ICONS_TOC_ITEMS = [
  { id: "icons", text: "Icons" },
  { id: "morph-icon", text: "Morph Icon" },
];

/** Root-level / content helpers that stay outside folder groups. */
const CONTENT_TOC_ITEMS = [
  { id: "table-of-contents", text: "Table of Contents" },
  { id: "link-out", text: "Link Out" },
  { id: "back-button", text: "Back Button" },
  { id: "code-block", text: "Code Block" },
  { id: "card-fan", text: "Card Fan" },
  { id: "info-tip", text: "Info Tip" },
  { id: "number-slider", text: "Number Slider" },
  { id: "image", text: "Image" },
  { id: "mark-note", text: "Mark Note" },
  { id: "video", text: "Video" },
];

const QA_TOC: TocItem[] = [
  { id: "ui-components", text: "UI components", depth: 2 },
  ...UI_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "more-ui", text: "More UI", depth: 2 },
  ...MORE_UI_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "animation", text: "Animation", depth: 2 },
  ...ANIMATION_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "blocks", text: "Blocks", depth: 2 },
  ...BLOCKS_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "theme", text: "Theme", depth: 2 },
  ...THEME_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "icons-group", text: "Icons", depth: 2 },
  ...ICONS_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
  { id: "content", text: "Content", depth: 2 },
  ...CONTENT_TOC_ITEMS.map((item) => ({ ...item, depth: 3 })),
];
