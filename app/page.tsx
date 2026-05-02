"use client";
import { BaseUiIcon, FigmaIcon } from "@/components/icons";
import { LinkOut } from "@/components/link-out";
import { ProjectGrid, type ProjectGridItem } from "@/components/project-grid";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { resources } from "@/lib/data/resources";
import { PixelReveal } from "@/components/animation/shared";
import { PixelPortrait } from "@/components/animation/pixel-portrait";
import { PixelDino } from "@/components/animation/pixel-dino";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@gravity-ui/icons";
import { posts, postIcons } from "@/lib/data/posts";
import { IconFile } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { PixelShuffleIcon } from "@/components/icons";

const postItems: ProjectGridItem[] = posts.map((post) => {
  const Icon = post.icon ? postIcons[post.icon] : IconFile;
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.date,
    path: post.path,
    icon: <Icon aria-hidden strokeWidth={1} className="opacity-72" />,
    category: post.category ? (
      <Badge
        variant={"inherit"}
        className={cn(
          "font-pixel text-[11px] uppercase",
          post.category === "Snippet" && "text-info-foreground",
          post.category === "Demo" && "text-warning-foreground",
          post.category === "Motion" && "text-plum-500 dark:text-plum-300"
        )}
      >
        {post.category}
      </Badge>
    ) : undefined,
  };
});

export default function Home() {
  const [isDinoVisible, setIsDinoVisible] = React.useState(false);
  return (
    <div className={cn("mx-auto grid max-w-2xl gap-10")}>
      <div className="grid items-start gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <h1 className="-mb-1 block text-h1 text-foreground">Robert Weisbecker</h1>

          <p className="text-balance text-muted-foreground">
            You can call me&nbsp;
            <Popover>
              <PopoverTrigger openOnHover className="link text-secondary-foreground decoration-dotted">
                Bob
              </PopoverTrigger>
              <PopoverContent align="start" variant="tooltip" className="w-fit max-w-[unset]">
                <PopoverDescription className="inline">
                  We&apos;re all about efficiency here at bob dot fyi.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
            . I'm currently designing products & systems at{" "}
            <LinkOut href="https://everfi.com" text="Everfi" className="text-secondary-foreground" />.
          </p>
          <p className="text-muted-foreground">
            This is my little corner of the internet.
            <br />
            If you&apos;re here now, I made it for you.
          </p>
        </div>
        <div className="group/pixel relative order-first size-50 md:order-last md:ms-auto">
          <Button
            onClick={() => setIsDinoVisible((v) => !v)}
            variant="ghost"
            size="icon-xs"
            className="md:blur-2xs absolute inset-s-1 top-1 z-1 transform font-pixel text-[11px] uppercase transition-[opacity,translate,filter] duration-300 group-hover/pixel:translate-y-0 group-hover/pixel:opacity-100 group-hover/pixel:blur-none md:-translate-y-1 md:opacity-0"
          >
            {isDinoVisible ? "⟨" : <PixelShuffleIcon />}
          </Button>
          <PixelPortrait className="transition-all duration-300" />
          {isDinoVisible && (
            <PixelReveal className="absolute inset-0 size-50">
              <PixelDino />
            </PixelReveal>
          )}
        </div>
      </div>

      <Separator className="min-h-px max-w-20" />
      <div>
        <h2 className="font-pixel text-[11px]/none whitespace-pre uppercase" id="projects">
          ☆ Projects
        </h2>
      </div>
      <ProjectGrid />

      <Separator className="min-h-px max-w-14" />
      <h2 className="font-pixel text-[11px] uppercase" id="resources">
        ✧ Posts
      </h2>
      <ProjectGrid items={postItems} />

      <Separator className="max-w-20" />
      <h2 className="font-pixel text-[11px] uppercase" id="resources">
        ♥ Resources
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card variant="muted" size="sm">
          <CardHeader>
            <CardTitle>Base UI Starter Kit</CardTitle>
            <CardAction>
              <Badge variant="primary">Coming soon</Badge>
            </CardAction>
          </CardHeader>
          <div
            className="m-px grid-stack aspect-video w-[calc(100%-2px)] rounded-[inherit] bg-accent object-contain text-muted-foreground/50"
            data-slot="media"
          >
            <BaseUiIcon className="size-12" />
          </div>
        </Card>
        {resources.map((resource) => (
          <Card
            key={resource.id}
            size="sm"
            variant="muted"
            className="group/resource relative transition-shadow focus-within:ring-2 focus-within:ring-ring hover:outline hover:-outline-offset-1 hover:outline-primary"
          >
            <CardHeader>
              <CardTitle>
                <a
                  href={resource.href}
                  className="outline-none before:absolute before:inset-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.title}
                </a>
              </CardTitle>
              <CardAction>
                <div className="size-lh grid grid-cols-1 grid-rows-1">
                  <FigmaIcon className="ease col-1 row-1 size-3.5 shrink-0 translate-x-0 translate-y-0 opacity-100 transition-[opacity,translate] duration-150 group-hover/resource:translate-x-1/2 group-hover/resource:-translate-y-1/2 group-hover/resource:opacity-0" />
                  <ArrowUpRight className="ease col-1 row-1 size-4 shrink-0 -translate-x-1/2 translate-y-1/2 scale-50 text-muted-foreground opacity-0 transition-[opacity,translate,transform] duration-150 group-hover/resource:translate-0 group-hover/resource:scale-100 group-hover/resource:opacity-100" />
                </div>
              </CardAction>
            </CardHeader>
            {resource.thumbnail && (
              <img
                src={resource.thumbnail}
                alt=""
                className="m-px aspect-video w-[calc(100%-2px)] rounded-md object-contain shadow-border-xs -outline-offset-1 dark:brightness-50 dark:grayscale-50"
                data-slot="media"
              />
            )}
            {/* <CardFooter>
              <CardDescription>{resource.description}</CardDescription>
            </CardFooter> */}
          </Card>
        ))}
      </div>
    </div>
  );
}

// function AxisCursor() {
//   const [mouse, containerRef] = useMouse<HTMLDivElement>();
//   const xIntersecting = mouse.elementX > 0 && mouse.elementX < 200;
//   const yIntersecting = mouse.elementY > 0 && mouse.elementY < 200;
//   const isIntersecting = xIntersecting && yIntersecting;
//   return (
//     <div className="relative overflow-clip">
//       <div
//         className={cn(
//           "absolute top-0 h-screen w-px -translate-x-1/2 bg-border",
//           isIntersecting ? "opacity-100" : "opacity-0"
//         )}
//         style={{
//           left: `${mouse.elementX - 4}px`,
//         }}
//       />
//       <div
//         className={cn(
//           "absolute left-0 h-px w-screen -translate-y-1/2 bg-border",
//           isIntersecting ? "opacity-100" : "opacity-0"
//         )}
//         style={{
//           top: `${mouse.elementY - 4}px`,
//         }}
//       />
//       <div
//         className="absolute h-0.5 w-0.5 -translate-x-1/2 -translate-y-1/2 animate-caret-blink bg-primary"
//         style={{
//           top: `${mouse.elementY - 4}px`,
//           left: `${mouse.elementX - 4}px`,
//         }}
//       />
//       <div className="size-50 bg-info" ref={containerRef} />
//     </div>
//   );
// }
