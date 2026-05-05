"use client";
import {
  BaseUiIcon,
  FigmaIcon,
  BoxArrowUpRightIcon,
  BoxArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  NextJsIcon,
  TreeIconFile,
  TreeIconTailwind,
  TreeIconHtml,
  CursorIcon,
  ShadcnIcon,
  TreeIconClaude,
  TreeIconMarkdown,
} from "@/components/icons";
import Link from "next/link";
import { LinkOut } from "@/components/link-out";
import { ProjectGrid, type ProjectGridItem } from "@/components/project-grid";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { resources } from "@/lib/data/resources";
import { PixelReveal } from "@/components/animation/shared";
import { PixelPortrait } from "@/components/animation/pixel-portrait";
import { PixelDino } from "@/components/animation/pixel-dino";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@gravity-ui/icons";
import { posts, postIcons } from "@/lib/data/posts";
import { IconFile, IconMailFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { PixelShuffleIcon } from "@/components/icons";
import { LayoutGrid } from "@/components/layout-grid";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { LinkButton } from "@/components/ui/link-button";
import { DataList, DataListLabel, DataListValue } from "@/components/ui/data-list";
import { InfoTip } from "@/components/info-tip";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/components/ui/preview-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className={cn("mx-auto grid max-w-2xl gap-8")}>
      <div className="flex w-full items-baseline justify-between border-b border-dashed pb-4">
        <h1 className="-mb-1 block text-h1 text-foreground">Robert Weisbecker</h1>
        <p className="font-pixel text-[11px]">Systems & product design</p>
      </div>
      <div className="grid items-start gap-10 md:grid-cols-[1fr_200px]">
        <div className="w-full space-y-4 text-sm">
          <p className="text-muted-foreground">
            You can call me{" "}
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
            . I'm currently a principal designer at{" "}
            <LinkOut href="https://everfi.com" text="Everfi" className="text-secondary-foreground" />.
          </p>
          <p className="text-muted-foreground">
            There, I work on products & systems to help drive social good through education. These things have&nbsp;
            <PreviewCard>
              <PreviewCardTrigger
                render={
                  <LinkOut href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year#:~:text=reached%20more%20than-,45%20million,-learners%20globally%2C%20in" />
                }
              >
                allegedly
              </PreviewCardTrigger>

              <PreviewCardPopup className="p-2" side="top">
                <Avatar className="mt-1">
                  <AvatarImage src="/assets/logos/blackbaud-logo.png" alt="Blackbaud Logo" />
                  <AvatarFallback>
                    <TreeIconFile />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <p className="line-clamp-2 text-sm font-medium">
                    Blackbaud Acquires EVERFI, a SaaS Leader Powering Corporate ESG and CSR Initiatives that Reach
                    Millions of Learners Each Year
                  </p>
                  <p className="text-2xs text-muted-foreground">January 3, 2022</p>
                </div>
              </PreviewCardPopup>
            </PreviewCard>
            &nbsp;reached more than 45 million learners globally.
          </p>
          <p className="text-muted-foreground">
            This is my little slice of the internet.
            <br /> Have a look around.
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
          </Card>
        ))}
      </div>
      <Separator className="max-w-20" />
      <h2 className="font-pixel text-[11px] uppercase" id="about">
        ♦ About
      </h2>

      <LayoutGrid variant="twoUp">
        <p className="max-w-prose text-sm/6 text-muted-foreground">
          Since 2021, I&apos;ve led the implementation of a shared design system across admin, educator, and
          learner-facing products. Read a bit about that process{" "}
          <Link href="/unified-design-language" className="link">
            here
          </Link>
          . Recently, I've been working on a new K12 platform, diving deep into color spaces, and learning about web
          animation. You may notice some sprinkled throughout.
        </p>
        <p className="max-w-prose text-sm/6 text-muted-foreground">
          {" "}
          Beginning in 2018, I led the creation of our product org&apos;s{" "}
          <Link className="link" href="/unified-design-language">
            first design system
          </Link>
          , shepherding its transition from an unstyled SDK into an accessible component library with theming and
          tooling to support 80+ courses across a dozen branded product lines.
        </p>
      </LayoutGrid>

      <p className="max-w-prose text-sm text-muted-foreground">Some other things I&apos;ve done:</p>
      <ul className="max-w-prose list-disc space-y-4 ps-6 text-sm marker:text-muted-foreground/50">
        <li>
          Led product design efforts for financial &amp; K12 products, including{" "}
          <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
          <LinkOut href="https://everfi.com/financial-education/consumers/engage/" text="Engage" />, and{" "}
          <LinkOut href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/" text="Data Science" />.{" "}
          <Badge variant="link" render={<Link href="/everfi-engage" />}>
            <TreeIconFile data-icon="inline-start" /> Project
          </Badge>
        </li>
        <li>
          Worked on education products for customers such as Google, Meta, LinkedIn, Kroger, Beyond Meat, Truist, and
          more.
        </li>
        <li>
          Delivered a (finally relevant!) thesis on chatbots and conversational interface design at MICA.{" "}
          <Badge variant="link" render={<Link href="/conversational-immigration-forms" />}>
            <TreeIconFile data-icon="inline-start" /> Project
          </Badge>
        </li>
        <li>
          Built a mapping application at NPR when I wasn&apos;t busy{" "}
          <LinkOut href="https://youtu.be/lgmw41CY1Fo?t=36" text="standing awkwardly" /> in the background of Tiny Desk
          recordings.{" "}
          <Badge variant="link" render={<Link href="/npr-maps" />}>
            <TreeIconFile data-icon="inline-start" /> Project
          </Badge>
        </li>
        <li>
          Designed web &amp; iOS screens, performed user testing, and made graphics for{" "}
          <LinkOut href="https://www.parkingpanda.com" text="Parking Panda" />
        </li>
      </ul>
      <div>
        <p className="mb-2 text-muted-foreground">To get in touch, you can find or reach me here:</p>
        <div className="flex flex-wrap justify-stretch gap-2 max-sm:flex-col">
          <Button render={<a href="mailto:yo@bob.fyi" />} nativeButton={false} variant="elevated" size="sm">
            <IconMailFilled data-icon="inline-start" />
            yo@bob.fyi
          </Button>
          <Button
            render={
              <a href="https://www.linkedin.com/in/robertweisbecker/" target="_blank" rel="noopener noreferrer" />
            }
            nativeButton={false}
            variant="elevated"
            size="sm"
          >
            <LinkedinIcon data-icon="inline-start" />
            LinkedIn
          </Button>
          <Button
            render={<a href="https://github.com/robertweisbecker" target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            variant="elevated"
            size="sm"
          >
            <GithubIcon data-icon="inline-start" />
            GitHub
          </Button>

          <Button
            render={<a href="https://figma.com/@yobob" target="_blank" rel="noopener noreferrer" />}
            nativeButton={false}
            variant="elevated"
            size="sm"
          >
            <FigmaIcon data-icon="inline-start" className="size-3.5 opacity-100!" />
            Figma
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex w-full justify-between gap-2">
        <h3 className="font-pixel text-[11px] uppercase">CV</h3>
        <LinkButton href="/BOB.md" variant="ghost" size="sm" className="-my-2 -me-(--button-x)">
          <TreeIconMarkdown data-icon="inline-start" />
          View BOB.md
        </LinkButton>
      </div>

      <DataList.Root>
        <h3 className="font-medium">Experience</h3>
        <DataList.Item>
          <DataList.Label>Everfi</DataList.Label>
          <DataList.Value>
            Principal UX Engineer, Design Systems{" "}
            <span className="ms-auto text-end font-pixel text-[11px]">2024—Now</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item className="w-full">
          <DataList.Label className="flex items-center gap-1">
            Blackbaud{" "}
            <InfoTip help title="If this seems confusing, it is.">
              <PopoverDescription>
                Everfi was acquired by Blackbaud in 2021;{" "}
                <LinkOut href="https://www.sec.gov/newsroom/press-releases/2023-48" text="taken private" /> in 2024.
              </PopoverDescription>
            </InfoTip>
          </DataList.Label>
          <DataList.Value>
            Principal Designer, Design Systems <span className="ms-auto text-end font-pixel text-[11px]">2024</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item className="w-full">
          <DataList.Label className="flex items-center gap-1">Blackbaud</DataList.Label>
          <DataList.Value>
            Principal Designer, Platform UX <span className="ms-auto text-end font-pixel text-[11px]">2022</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Everfi</DataList.Label>
          <DataList.Value>
            Sr. Interaction Designer <span className="ms-auto text-end font-pixel text-[11px]">2020</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Everfi</DataList.Label>
          <DataList.Value>
            Interaction Designer <span className="ms-auto text-end font-pixel text-[11px]">2019</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Everfi</DataList.Label>
          <DataList.Value>
            Product UX Designer <span className="ms-auto text-end font-pixel text-[11px]">2017</span>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label>National Public Radio</DataList.Label>
          <DataList.Value>
            Design Intern, NPR Labs <span className="ms-auto text-end font-pixel text-[11px]">2017</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Parking Panda</DataList.Label>
          <DataList.Value>
            Product Design Intern <span className="ms-auto text-end font-pixel text-[11px]">2015</span>
          </DataList.Value>
        </DataList.Item>
        <h3 className="font-medium">Education</h3>
        <DataList.Item>
          <DataList.Label>Master&apos;s, UX Design</DataList.Label>
          <DataList.Value>
            MICA <span className="ms-auto text-end font-pixel text-[11px]">2016—2017</span>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>
            BA, Cognitive Science;
            <wbr />
            <wbr />
            Minor, Art &amp; Design
          </DataList.Label>
          <DataList.Value>
            University of Michigan <span className="ms-auto text-end font-pixel text-[11px]">2012—2016</span>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Separator className="max-w-14" />
      <h2 className="font-pixel text-[11px] uppercase">Colophon</h2>
      <DescriptionList className="not-prose">
        <DescriptionListLabel>Type</DescriptionListLabel>
        <DescriptionListValue>
          <LinkOut href="https://display.net/typeface/season" text="Season Mix" />+ system-ui
        </DescriptionListValue>
        <DescriptionListLabel>Framework</DescriptionListLabel>
        <DescriptionListValue>
          <NextJsIcon className="size-4" />
          Next.js
        </DescriptionListValue>
        <DescriptionListLabel>Components</DescriptionListLabel>
        <DescriptionListValue>
          <span className="flex items-center gap-1">
            <BaseUiIcon className="size-4" /> Base UI +
            <TreeIconTailwind className="size-4" />
            Tailwind
          </span>
        </DescriptionListValue>
        <DescriptionListLabel>Interns</DescriptionListLabel>
        <DescriptionListValue>
          <span className="flex items-center gap-1">
            <CursorIcon className="size-4" /> Cursor &
            <TreeIconClaude className="size-4" />
            Claude
          </span>
        </DescriptionListValue>
      </DescriptionList>
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
