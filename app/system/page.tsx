import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function System() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <Heading level={1}>bob.components</Heading>
      <Separator />
      <Heading>Tokens</Heading>
      <div className="flex flex-wrap gap-5 rounded-lg bg-muted p-4">
        <div className="h-20 w-40 rounded-sm bg-background shadow-xs" />
        <div className="h-20 w-40 rounded-sm bg-background shadow-sm" />
        <div className="h-20 w-40 rounded-sm bg-background shadow-md" />
        <div className="h-20 w-40 rounded-sm bg-background shadow-lg" />
        <div className="h-20 w-40 rounded-sm bg-background shadow-xl" />
      </div>
      <Separator />
      <Heading>Components</Heading>
      <div className="space-y-2 text-lg font-bold">
        <Heading level={3}>BackButton</Heading>
        <Heading level={3}>Footer</Heading>
        <Heading level={3}>Header</Heading>
        <Heading level={3}>Hello Tag</Heading>
        <Heading level={3}>Image Modal</Heading>
        <Heading level={3}>Image Toggle</Heading>
        <Heading level={3}>Image Snap</Heading>
        <Heading level={3}>Layout</Heading>
        <Heading level={3}>LinkOut</Heading>
        <Heading level={3}>PageHeader</Heading>
        <Heading level={3}>Peek</Heading>
        <Heading level={3}>Scroll Button</Heading>
      </div>
    </div>
  );
}
