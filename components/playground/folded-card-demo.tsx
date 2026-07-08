import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FoldedCardDemo() {
  return (
    <Card
      variant="plain"
      size="sm"
      className={cn(
        "ease z-2 max-w-3xs overflow-visible rounded-md border bg-[color-mix(in_srgb,var(--background),var(--card))] bg-clip-padding drop-shadow-[0_1px,-1px_2px] drop-shadow-black/4 transition-all duration-180 squircle hover:drop-shadow-[0_1px,-1px_3px_2px] hover:drop-shadow-black/8",
        "rounded-se-[26px] hover:rounded-se-[36px]",
        "hover:before:size-[42px] hover:before:border-input",
        "after:drop-shadow-black/32 hover:after:translate-x-0 hover:after:translate-y-0 hover:after:rounded-bl-[8px] hover:after:drop-shadow-md",

        "[mask-image-radial-gradient(white,black)] transition-180ms decoration-none relative z-2 m-0 block h-full w-full overflow-hidden border border-transparent bg-size-[100%_100%] p-[20px_16px_18px] inset-shadow-[0_0_0_1px_var(--border)] [border-image:initial]",
        "before:absolute before:top-0 before:right-0 before:z-3 before:size-7.5 before:translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-background before:shadow-[-1px_1px] before:shadow-[color-mix(in_srgb,var(--border)_75%,var(--background))] before:transition-[inherit]",

        "after:linear after:absolute after:top-0 after:right-0 after:z-2 after:size-7 after:translate-x-2 after:-translate-y-2 after:rounded-bl-[6px] after:bg-[color-mix(in_srgb,var(--border)_50%,var(--card))] after:shadow-[-.5px_.5px_0_.5px_var(--border)] after:transition-all after:duration-180"
      )}
    >
      <CardContent>
        <CardTitle>Card Title</CardTitle>
        <p>Card content goes here. You can put any content inside.</p>
      </CardContent>
    </Card>
  );
}
