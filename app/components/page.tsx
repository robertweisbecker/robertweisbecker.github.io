"use client";
  import { BackButton } from "@/components/back-button"
  import { ChromeTabs } from "@/components/chrome-tabs"
  import { CodeBlock } from "@/components/code-block"
  import { ColorSwatchGroup } from "@/components/color-swatch-group"
  import { Demo } from "@/components/demo"
  import { DeviceFrame } from "@/components/device-frame"
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
  } from "@/components/icons"
  import { Image } from "@/components/image"
  import { ImageModal } from "@/components/image-modal"
  import { ImageToggle } from "@/components/image-toggle"
  import { InfoTip } from "@/components/info-tip"
  import { LinkOut } from "@/components/link-out"
  import { ModeToggle } from "@/components/mode-toggle"
  import { NumberSlider } from "@/components/number-slider"
  import { Stats } from "@/components/stats"
  import { Alert,AlertAction,AlertContent,AlertDescription,AlertTitle } from "@/components/ui/alert"
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
  } from "@/components/ui/alert-dialog"
  import { Avatar,AvatarFallback,AvatarGroup,AvatarGroupCount,AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { ButtonGroup } from "@/components/ui/button-group"
  import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card"
  import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselToolbar
  } from "@/components/ui/carousel"
  import { Checkbox } from "@/components/ui/checkbox"
  import { Code } from "@/components/ui/code"
  import { ColorCode } from "@/components/ui/color-code"
  import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
  } from "@/components/ui/combobox"
  import { CopyButton } from "@/components/ui/copy-button"
  import { DataList } from "@/components/ui/data-list"
  import { DescriptionList,DescriptionListLabel,DescriptionListValue } from "@/components/ui/description-list"
  import {
    Dialog,
    DialogBody,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu"
  import { Field,FieldDescription,FieldLabel } from "@/components/ui/field"
  import { Heading } from "@/components/ui/heading"
  import { Input } from "@/components/ui/input"
  import { InputGroup,InputGroupAddon,InputGroupInput,InputGroupText } from "@/components/ui/input-group"
  import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription as ItemDesc,
    ItemGroup,
    ItemMedia,
    ItemTitle,
  } from "@/components/ui/item"
  import { Kbd,KbdGroup } from "@/components/ui/kbd"
  import { Label } from "@/components/ui/label"
  import {
    NumberField,
    NumberFieldDecrement,
    NumberFieldGroup,
    NumberFieldIncrement,
    NumberFieldInput,
  } from "@/components/ui/number-field"
  import { Popover,PopoverContent,PopoverHeader,PopoverTitle,PopoverTrigger } from "@/components/ui/popover"
  import { ScrollArea } from "@/components/ui/scroll-area"
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Separator } from "@/components/ui/separator"
  import { Slider } from "@/components/ui/slider"
  import { Switch } from "@/components/ui/switch"
  import { Tabs,TabsContent,TabsList,TabsTrigger } from "@/components/ui/tabs"
  import { Textarea } from "@/components/ui/textarea"
  import { Toggle } from "@/components/ui/toggle"
  import { ToggleGroup,ToggleGroupItem } from "@/components/ui/toggle-group"
  import { Toolbar } from "@/components/ui/toolbar"
  import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "@/components/ui/tooltip"
  import { Video } from "@/components/video"
  import { cn } from "@/lib/utils"
  import { Collapsible } from "@base-ui/react/collapsible"
  import {
    IconAlertTriangle,
    IconAlignLeft,
    IconAlignRight,
    IconBold,
    IconChevronDown,
    IconCopy,
    IconHome,
    IconInfoCircle,
    IconItalic,
    IconSearch,
    IconUser
  } from "@tabler/icons-react"
  import React from "react"

function Section({
  title,
  className,
  id,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  title: string;
  children: React.ReactNode;
}) {
  const sectionId =
    id ??
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  return (
    <section
      id={sectionId}
      className={cn("not-prose flex w-full flex-col items-start gap-2 not-last:mb-10", className)}
      {...props}
    >
      <Heading level={2} className="w-full">
        {title}
      </Heading>
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-background p-4">{children}</div>
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <div className="container mx-auto grid min-h-screen grid-rows-[auto_1fr_auto]">
      <header className="border-x border-t bg-muted p-4">
        <Heading level={1}>Components</Heading>
        <p className="text-muted-foreground">
          A kitchen sink of UI components. Use this page to preview and test components across light and dark themes.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[240px_1fr_240px]">
        <aside className="order-2 border-s border-t bg-muted p-4 md:order-1">
          <Sidebar />
        </aside>

        <main className="order-1 border-x border-t p-4 md:order-2">
          <Section title="Playground">
            <ChromeTabs>
              <ChromeTabs.List>
                <ChromeTabs.Tab value="tab1">
                  <GithubIcon />
                  GitHub
                </ChromeTabs.Tab>
                <ChromeTabs.Tab value="tab2">
                  <FigmaIcon />
                  Figma
                </ChromeTabs.Tab>
                <ChromeTabs.Tab value="tab3">Tab 3</ChromeTabs.Tab>
              </ChromeTabs.List>
              <ChromeTabs.Panel value="tab1">
                <p>Tab 1 content</p>
              </ChromeTabs.Panel>
              <ChromeTabs.Panel value="tab2">
                <p>Tab 2 content</p>
              </ChromeTabs.Panel>
              <ChromeTabs.Panel value="tab3">
                <p>Tab 3 content</p>
              </ChromeTabs.Panel>
            </ChromeTabs>
            <ImageToggle
              mode="comparison"
              before="/assets/forge/forge-before.png"
              after="/assets/forge/forge-after.png"
              tab1="Before"
              tab2="After"
            />
            {/* <ImageToggle mode="slider" before="/assets/forge/forge-before.png" after="/assets/forge/forge-after.png" /> */}
          </Section>
          <Section title="Button" className="gap-4">
            <div className="flex flex-wrap gap-2">
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
            <DeviceFrame island toolbar address="bob.fyi" gutter>
              <p className="flex items-center justify-center p-6 text-center text-sm">
                Preview content inside the frame. Use for screenshots, demos, or embedding app/website mockups.
              </p>
            </DeviceFrame>
            <DeviceFrame island toolbar gutter>
              <ScrollArea
                className="h-full w-full"
                scrollFade
                //   scrollbarGutter
                // innerClass="p-4"
              >
                <div className="space-y-4">
                  {Array.from({ length: 24 }, (_, i) => (
                    <p key={i} className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget nulla vitae nisl
                      condimentum tempor.
                    </p>
                  ))}
                </div>
              </ScrollArea>
            </DeviceFrame>
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
                    clipPath:
                      "shape(from bottom right, vline to 98%, curve to 2% 98% with 0% 100%, vline to 100%, hline to 100%)",
                  }}
                />
              </Button>
              <Button variant="ghost" className="">
                Button 2
              </Button>
            </div>
          </Section>
          <Section title="Dialog">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    This is a dialog. It has a title, description, and can contain any content.
                  </DialogDescription>
                </DialogHeader>
                <DialogBody>
                  <p>Dialog content goes here. Close with the X or the button below.</p>
                </DialogBody>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
                  <DialogClose render={<Button />}>Save</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Section>
          <Section title="Alert Dialog">
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the item.
                  </AlertDialogDescription>
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
              <DropdownMenuTrigger render={<Button variant="outline" />}>Open menu</DropdownMenuTrigger>
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
              <Collapsible.Trigger
                render={<Button variant="outline" size="xs" />}
                className="group row-2 justify-start rounded-full"
              >
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </p>
              <p className="mt-4 text-sm leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                laudantium.
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
          <Section title="Carousel">
            <div className="mx-auto w-full">
              <Carousel>
                <CarouselContent>
                  {Array.from({ length: 4 }, (_, i) => (
                    <CarouselItem key={i}>
                      <div className="flex aspect-video items-center justify-center rounded-xl border bg-[url('/assets/udl/foundry-light.png')] bg-cover bg-center text-2xl font-medium">
                        {i + 1}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* <CarouselPrevious />
                <CarouselNext /> */}
                <CarouselToolbar />
              </Carousel>
            </div>
          </Section>
          <Section title="Checkbox">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked />
                Accept terms and conditions
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox />
                Send me marketing emails
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <Checkbox disabled />
                Disabled option
              </label>
            </div>
          </Section>
          <Section title="Code">
            <div className="flex flex-wrap items-center gap-4">
              <Code>npm install</Code>
              <Code value="npx shadcn@latest add" copyValue />
              <Code variant="plain">variant=&quot;plain&quot;</Code>
            </div>
            <p className="text-sm">
              Use the <Code variant="inline">cn()</Code> utility for class merging. The{" "}
              <Code variant="inline">inline</Code> variant wraps text in backticks. Or use the color code component for
              inline HEX <ColorCode value="#000000" />.
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
                    <ItemDesc>Senior Designer at Acme Inc.</ItemDesc>
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
                    <ItemDesc>Engineering Manager</ItemDesc>
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
              <label className="flex items-center gap-3 text-sm">
                <Switch defaultChecked />
                Airplane mode
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Switch size="sm" />
                Small switch
              </label>
              <label className="flex items-center gap-3 text-sm text-muted-foreground">
                <Switch disabled />
                Disabled
              </label>
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
  <div className="min-w-[44rem] space-y-3">
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
                caption="Content wraps naturally within the card — no scrolling, no resize handle."
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
          <Section title="Info Tip">
            <div className="flex items-center gap-2 text-sm">
              <span>Hover for more info</span>
              <InfoTip
                title="Info Tip"
                description="This is a small popover that appears on hover, useful for inline help text."
              />
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
              <Image src="/assets/forge/forge-before.png" alt="Sample image with card wrapper" />
            </div>
          </Section>
          <Section title="Image Modal">
            <div className="max-w-md">
              <ImageModal src="/assets/forge/forge-before.png" caption="Click the expand icon to view fullscreen." />
            </div>
          </Section>
          <Section title="Video">
            <p className="text-sm text-muted-foreground">
              Custom video player built on <Code variant="inline">media-chrome</Code> with themed toolbar controls,
              play/pause overlay, fullscreen, and optional volume.
            </p>
            <div className="max-w-lg">
              <Video
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
                caption="Themed video player component."
              />
            </div>
          </Section>
        </main>
        <aside className="order-3 hidden border-e border-t bg-muted p-4 lg:block">Right</aside>
      </div>
      <footer className="border p-4">Footer</footer>
    </div>
  );
}

const FRAMEWORKS = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
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
      <NumberSlider
        label="Opacity"
        min={0}
        max={100}
        step={1}
        value={value}
        onValueChange={setValue}
        format="percent"
      />
    </div>
  );
}

const UI_LINKS: { href: string; label: string }[] = [
  { href: "#alert", label: "Alert" },
  { href: "#alert-dialog", label: "Alert Dialog" },
  { href: "#avatar", label: "Avatar" },
  { href: "#badge", label: "Badge" },
  { href: "#button", label: "Button" },
  { href: "#button-group", label: "Button Group" },
  { href: "#card", label: "Card" },
  { href: "#carousel", label: "Carousel" },
  { href: "#checkbox", label: "Checkbox" },
  { href: "#code", label: "Code" },
  { href: "#collapsible", label: "Collapsible" },
  { href: "#combobox", label: "Combobox" },
  { href: "#copy-button", label: "Copy Button" },
  { href: "#data-list", label: "Data List" },
  { href: "#description-list", label: "Description List" },
  { href: "#dialog", label: "Dialog" },
  { href: "#dropdown-menu", label: "Dropdown Menu" },
  { href: "#form-input", label: "Form & Input" },
  { href: "#heading-levels", label: "Heading" },
  { href: "#input-group", label: "Input Group" },
  { href: "#item", label: "Item" },
  { href: "#kbd", label: "Kbd" },
  { href: "#number-field", label: "Number Field" },
  { href: "#popover", label: "Popover" },
  { href: "#scroll-area", label: "Scroll Area" },
  { href: "#select", label: "Select" },
  { href: "#separator", label: "Separator" },
  { href: "#slider", label: "Slider" },
  { href: "#switch", label: "Switch" },
  { href: "#tabs", label: "Tabs" },
  { href: "#toggle-togglegroup", label: "Toggle" },
  { href: "#toolbar", label: "Toolbar" },
  { href: "#tooltip", label: "Tooltip" },
];

const CUSTOM_LINKS: { href: string; label: string }[] = [
  { href: "#back-button", label: "Back Button" },
  { href: "#chrome-tabs", label: "Chrome Tabs" },
  { href: "#code-block", label: "Code Block" },
  { href: "#color-swatch-group", label: "Color Swatch Group" },
  { href: "#device-frame", label: "Device Frame" },
  { href: "#icons", label: "Icons" },
  { href: "#image", label: "Image" },
  { href: "#image-modal", label: "Image Modal" },
  { href: "#info-tip", label: "Info Tip" },
  { href: "#link-out", label: "Link Out" },
  { href: "#mode-toggle", label: "Mode Toggle" },
  { href: "#number-slider", label: "Number Slider" },
  { href: "#stats", label: "Stats" },
  { href: "#video", label: "Video" },
];

function SidebarGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-1 font-medium text-muted-foreground">{title}</p>
      <ul className="flex flex-col gap-1">
        {links.map((link) => (
          <li key={link.href}>
            <a className="link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sidebar() {
  return (
    <nav className="sticky top-4 flex max-h-[calc(100vh-10rem)] flex-col gap-4 overflow-y-auto overscroll-contain pb-4 text-xs">
      <SidebarGroup title="UI" links={UI_LINKS} />
      <SidebarGroup title="Custom" links={CUSTOM_LINKS} />
    </nav>
  );
}
