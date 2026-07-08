import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "../ui/button";
import { IconChevronCompactRight, IconChevronLeft, IconVideo, IconUserFilled } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

export function BubbleDemo() {
  return (
    <ScrollArea className="h-full w-full" scrollFade>
      <div className="relative w-full max-w-sm px-3 py-5">
        <div className="grid grid-cols-[auto_1fr_auto]">
          <Button variant="glass" size="icon-sm" rounded className="max-h-[12cqw] max-w-[12cqw]">
            <IconChevronLeft className="-ms-0.5 size-5 max-h-[6cqw] max-w-[6cqw]" strokeWidth={1.5} />
          </Button>
          <div className="flex flex-col items-center justify-center -space-y-1.5">
            <Avatar className="size-10 rounded-full">
              <AvatarFallback>
                <IconUserFilled />
              </AvatarFallback>
            </Avatar>
            <div className="-z-1 flex flex-col items-center justify-center rounded-lg bg-popover/50 px-2 pt-1 pb-0.5 text-center text-[4cqw] shadow-border-sm backdrop-blur-sm squircle">
              <p className="flex items-center font-bold whitespace-nowrap text-foreground">
                Mira
                <IconChevronCompactRight className="-ms-0.5 -me-3 size-3.5 text-muted-foreground/50" strokeWidth={3} />
              </p>
              <p className="text-[75%] text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>
          <Button variant="glass" size="icon-sm" rounded className="max-h-[12cqw] max-w-[12cqw]">
            <IconVideo className="size-5 max-h-[6cqw] max-w-[6cqw]" strokeWidth={1.5} />
          </Button>
        </div>

        <div className="flex flex-col gap-6 py-8">
          <Bubble align="end">
            <BubbleContent>can you indicate directionally good or bad? satya and others anxious</BubbleContent>
          </Bubble>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Directionally very bad</BubbleContent>
            </Bubble>
            <Bubble align="end">
              <BubbleContent>ok</BubbleContent>
              <BubbleReactions role="img" aria-label="Reaction: thumbs up">
                <span>👍</span>
              </BubbleReactions>
              <BubbleContent>can you wrap soon? lots of pressure from msft for an update</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <Bubble variant="muted">
            <BubbleContent>Sam this is very bad</BubbleContent>
          </Bubble>
        </div>
      </div>
    </ScrollArea>
  );
}
