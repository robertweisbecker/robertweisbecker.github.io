"use client";

import { IconBold, IconItalic, IconAlignLeft, IconAlignRight } from "@tabler/icons-react";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
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
import { LayoutGrid } from "@/components/layout-grid";
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toolbar } from "@/components/ui/toolbar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className="flex flex-col gap-2 items-start">
			<Heading level={2}>{title}</Heading>
			{children}
		</section>
	);
}

export default function ComponentsPage() {
	return (
		<div className="mt-10 flex flex-col gap-12 prose">
			<LayoutGrid variant="oneThird">
				<Heading level={1}>Components</Heading>
				<p className="text-muted-foreground">
					A kitchen sink of UI components. Use this page to preview and test components across light and dark themes.
				</p>
			</LayoutGrid>

			<Section title="Button">
				<div className="flex flex-wrap gap-2">
					<Button>Default</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button variant="destructive">Destructive</Button>
					<Button variant="elevated">Elevated</Button>
					<Button disabled>Disabled</Button>
				</div>
				<div className="flex flex-wrap gap-2">
					<Button size="sm">Small</Button>
					<Button size="default">Default</Button>
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
				<div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
					<Card>
						<CardHeader>
							<CardTitle>Card Title</CardTitle>
							<CardDescription>A short description for this card.</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground">Card content goes here. You can put any content inside.</p>
						</CardContent>
						<CardFooter>
							<Button size="sm">Action</Button>
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

			<Section title="Form & Input">
				<div className="max-w-md space-y-4">
					<Field>
						<FieldLabel>Email</FieldLabel>
						<Input type="email" placeholder="name@example.com" />
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
							<SelectItem value="apple">Apple</SelectItem>
							<SelectItem value="banana">Banana</SelectItem>
							<SelectItem value="orange">Orange</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</Section>

			<Section title="Toggle & ToggleGroup">
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
							<IconBold />
							Bold
						</Toolbar.Button>
						<Toolbar.Button>
							<IconItalic />
							Italic
						</Toolbar.Button>
					</Toolbar.Group>
					<Toolbar.Separator />
					<Toolbar.Group>
						<Toolbar.Button>
							<IconAlignLeft />
						</Toolbar.Button>
						<Toolbar.Button>
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
						<p className="text-sm text-muted-foreground">
							Dialog content goes here. Close with the X or the button below.
						</p>
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
						<div className="flex gap-2 mt-2">
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

			<Section title="Separator">
				<div className="space-y-2">
					<p className="text-sm">Content above</p>
					<Separator />
					<p className="text-sm">Content below</p>
					<div className="flex gap-4 items-center">
						<span>Left</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Center</span>
						<Separator orientation="vertical" className="h-4" />
						<span>Right</span>
					</div>
				</div>
			</Section>

			<Section title="Scroll Area">
				<ScrollArea className="h-32 w-64 rounded-lg border p-4">
					<p className="text-sm leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
						ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur.
					</p>
					<p className="mt-4 text-sm leading-relaxed">
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
						laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
					</p>
				</ScrollArea>
			</Section>

			<Section title="Heading Levels">
				<Heading level={1}>Heading 1</Heading>
				<Separator />
				<Heading level={2}>Heading 2</Heading>
				<Separator />
				<Heading level={3}>Heading 3</Heading>
				<Separator />
				<Heading level={4}>Heading 4</Heading>
				<Separator />
				<Heading level={5}>Heading 5</Heading>
				<Separator />
				<Heading level={6}>Heading 6</Heading>
			</Section>
		</div>
	);
}
