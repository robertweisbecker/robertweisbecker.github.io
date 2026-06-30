import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
import { Button } from "../ui/button";
import { IconChevronCompactRight, IconChevronLeft, IconVideo } from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";

export function BubbleDemo() {
  return (
    <ScrollArea className="h-full w-full" scrollFade>
      <div className="relative w-full max-w-sm px-3 py-5">
        <div className="grid grid-cols-[auto_1fr_auto]">
          <Button variant="elevated" size="icon-sm" rounded className="max-h-[12cqw] max-w-[12cqw]">
            <IconChevronLeft className="-ms-0.5 size-5 max-h-[6cqw] max-w-[6cqw]" strokeWidth={1.5} />
          </Button>
          <div className="flex flex-col items-center justify-center">
            <Avatar>
              <AvatarImage src="/assets/bob-avatar.png" />
              <AvatarFallback>BW</AvatarFallback>
            </Avatar>
            <div className="squircle flex flex-col items-center justify-center rounded-lg bg-popover/50 px-2 py-0.5 text-center text-[4.5cqw] shadow-border-sm backdrop-blur-sm">
              <p className="flex items-center font-semibold whitespace-nowrap text-foreground">
                Bob
                <IconChevronCompactRight className="-me-3 size-3.5 text-muted-foreground/50" strokeWidth={2} />
              </p>
              <p className="text- text-[75%] text-muted-foreground">San Diego, CA</p>
            </div>
          </div>
          <Button variant="elevated" size="icon-sm" rounded className="max-h-[12cqw] max-w-[12cqw]">
            <IconVideo className="size-5 max-h-[6cqw] max-w-[6cqw]" strokeWidth={1.5} />
          </Button>
        </div>

        <div className="flex flex-col gap-6 py-8">
          <Bubble align="end">
            <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
          </Bubble>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>I can group messages, switch sides, and keep the whole thread easy to scan.</BubbleContent>
              <BubbleReactions role="img" aria-label="Reaction: thumbs up">
                <span>👍</span>
              </BubbleReactions>
            </Bubble>
          </BubbleGroup>
          <Bubble align="end">
            <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
          </Bubble>
          <Bubble variant="muted">
            <BubbleContent>Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.</BubbleContent>
            <BubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
              <span>👍</span>
              <span>🔥</span>
              <span>👀</span>
              <span>+2</span>
            </BubbleReactions>
          </Bubble>
        </div>
      </div>
    </ScrollArea>
  );
}
