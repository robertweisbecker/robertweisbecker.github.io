"use client";
import * as React from "react";
import {
  BaseUiIcon,
  FigmaIcon,
  GithubIcon,
  LinkedinIcon,
  NextJsIcon,
  TreeIconFile,
  TreeIconTailwind,
  CursorIcon,
  TreeIconClaude,
  TreeIconRichText,
  MarkdownIcon,
  VercelIcon,
} from "@/components/icons";
import Link from "next/link";
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
import { Float } from "@/components/animation/float";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@gravity-ui/icons";
import { posts, postIcons } from "@/lib/data/posts";
import { IconCalendar, IconFile, IconLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PixelShuffleIcon } from "@/components/icons";
import { LayoutGrid } from "@/components/layout-grid";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { LinkButton } from "@/components/ui/link-button";
import { InfoTip } from "@/components/info-tip";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/components/ui/preview-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";

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
          post.category === "Motion" && "text-ruby-500 dark:text-ruby-300"
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
    <div className={cn("mx-auto grid max-w-2xl gap-12")}>
      <h1 className="-ms-1 -mb-6 text-h1">
        Robert
        <br /> Weisbecker
      </h1>
      <div className="grid items-start gap-10 sm:grid-cols-[auto_1fr]">
        <Float
          className="group/pixel relative isolate w-fit rounded-xs bg-card p-1 shadow-border-lg"
          speed={0.38}
          amplitude={[2, 8, 4]}
          rotationRange={[0, 0, 3]}
        >
          <div className="relative size-50 bg-background">
            <PixelPortrait className="outline-2 outline-card transition-all duration-300" />
            {isDinoVisible && (
              <PixelReveal className="absolute inset-0 size-50">
                <PixelDino />
              </PixelReveal>
            )}
          </div>
          <Button
            onClick={() => setIsDinoVisible((v) => !v)}
            variant="ghost"
            size="icon-xs"
            className="md:blur-2xs absolute inset-s-2 top-2 z-100 transform font-pixel text-[11px] uppercase transition-[opacity,translate,filter] duration-300 group-hover/pixel:translate-y-0 group-hover/pixel:opacity-100 group-hover/pixel:blur-none md:-translate-y-1 md:opacity-0"
          >
            {isDinoVisible ? "⟨" : <PixelShuffleIcon />}
          </Button>
        </Float>
        <div className="w-full max-w-xs space-y-3.5 text-sm">
          <p className="">
            You can call me{" "}
            <Popover>
              <PopoverTrigger openOnHover className="link text-foreground decoration-dotted">
                Bob
              </PopoverTrigger>
              <PopoverContent align="start" variant="tooltip" className="w-fit max-w-[unset]">
                <PopoverDescription className="inline">We&apos;re all about efficiency here at bob dot fyi.</PopoverDescription>
              </PopoverContent>
            </Popover>
            .
          </p>
          <p className="">
            I'm a principal designer at <LinkOut href="https://everfi.com" text="Everfi" className="text-foreground" /> working on products,
            tools, and systems to help drive social good through education.
          </p>
          <p>
            These things have&nbsp;
            <PreviewCard>
              <PreviewCardTrigger
                render={
                  <LinkOut
                    href="https://everfi.com/press-releases/everfis-suite-of-k-12-educational-content-receives-prestigious-digital-promise-research-based-product-design-certification/#:~:text=Everfi%E2%80%99s%20Impact%2Das%2Da%2DServiceTM%C2%A0solution%20and%20digital%20educational%20content%20have%20reached%20more%20than%2045%20million%20learners%20globally."
                    className="decoration-wavy"
                  />
                }
              >
                allegedly
              </PreviewCardTrigger>
              <PreviewCardPopup className="p-2" side="top" align="start">
                <Avatar>
                  <AvatarImage src="/assets/logos/everfi-new-purp.png" alt="Everfi logo" />
                  <AvatarFallback>
                    <TreeIconFile />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full space-y-2">
                  <p className="line-clamp-2 text-xs font-medium">
                    Everfi’s Suite of K-12 Educational Content Receives Prestigious Digital Promise Research-Based Product Design
                    Certification
                  </p>
                  <blockquote
                    className="mb-3 block text-xs text-muted-foreground [quotes:initial]"
                    cite="https://everfi.com/press-releases/everfis-suite-of-k-12-educational-content-receives-prestigious-digital-promise-research-based-product-design-certification/#:~:text=Everfi%E2%80%99s%20Impact%2Das%2Da%2DServiceTM%C2%A0solution%20and%20digital%20educational%20content%20have%20reached%20more%20than%2045%20million%20learners%20globally."
                  >
                    “Founded in 2008, Everfi’s Impact-as-a-Service™ solution and digital educational content have reached more than{" "}
                    <mark>45 million</mark> learners globally.”
                  </blockquote>
                  <span className="flex items-center gap-1 text-2xs">
                    <IconLink className="size-3" /> everfi.com
                  </span>
                </div>
              </PreviewCardPopup>
            </PreviewCard>
            &nbsp;reached more than 45 million learners globally.
          </p>
          <p className="">
            This is my little slice of the internet.
            <br /> Have a look around.
          </p>
          {/* <div className="flex gap-2">
            <LinkButton href="#about" variant="elevated" size="xs">
              More info <PixelDropdownIcon data-icon="inline-end" />
            </LinkButton>
          </div> */}
        </div>
      </div>

      <div>
        <h2 className="mt-8 -mb-4 font-pixel text-[11px]/none whitespace-pre uppercase" id="projects">
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
                <a href={resource.href} className="outline-none before:absolute before:inset-0" target="_blank" rel="noopener noreferrer">
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
                className="pointer-events-none m-px aspect-video w-[calc(100%-2px)] rounded-md object-contain shadow-border-xs -outline-offset-1 dark:brightness-50 dark:grayscale-50"
                data-slot="media"
              />
            )}
          </Card>
        ))}
      </div>
      <Separator className="max-w-20" />
      <section className="flex flex-col gap-6" id="about">
        <h2 className="scroll-mt-20 font-pixel text-[11px] uppercase">♦ About</h2>
        <LayoutGrid variant="twoUp">
          <p className="max-w-prose text-sm text-muted-foreground">
            I'm from Baltimore, MD, and now live in southern CA. Since 2021, I&apos;ve led the implementation of a shared design system for
            e-learning admin, educator, and learner-facing products. Recently, I've been designing a new platform for educators, diving deep
            into color spaces, exploring animation in React, and working with agents.
          </p>
          <p className="max-w-prose text-sm text-muted-foreground">
            Before that, I worked on financial &amp; K12 products for Everfi, including{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
            <ProjectLink href="/everfi-engage" text="Engage" />
            , and <LinkOut href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/" text="Data Science" />. Plus more
            for partners like{" "}
            <span className="whitespace-nowrap">
              <GoogleIcon className="-mt-px inline-block size-3 grayscale" /> Google
            </span>
            ,{" "}
            <span className="whitespace-nowrap">
              <MetaIcon className="-mt-px inline-block size-4 grayscale" />
               Meta
            </span>
            ,{" "}
            <span className="whitespace-nowrap">
              <LinkedinIcon className="-mt-px inline-block size-3.5 fill-muted-foreground/50" />
               LinkedIn
            </span>
            ,{" "}
            <span className="whitespace-nowrap">
              <KrogerIcon className="-mt-1 inline-block size-4 fill-muted-foreground/50" /> Kroger
            </span>
            ,{" "}
            <span className="whitespace-nowrap">
              <BeyondMeatIcon className="-mt-px inline-block size-3.5 fill-muted-foreground/50" />
               Beyond Meat
            </span>
            , among others.
          </p>
        </LayoutGrid>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Some other things I&apos;ve done:</p>

          <ul className="max-w-prose list-disc space-y-2 ps-6 text-sm text-muted-foreground marker:text-muted-foreground/50">
            <li>
              Delivered a (finally relevant!) thesis exploring chatbots and conversational interface design patterns.{" "}
              <Badge variant="link" render={<Link href="/conversational-immigration-forms" />} className="text-sm">
                <TreeIconRichText data-icon="inline-start" className="opacity-50" />
                Case study
              </Badge>
            </li>
            <li>
              Built a{" "}
              <Badge variant="link" render={<Link href="/npr-maps" />}>
                <TreeIconRichText data-icon="inline-start" className="opacity-50" />
                mapping application
              </Badge>{" "}
              at NPR when I wasn&apos;t busy <LinkOut href="https://youtu.be/lgmw41CY1Fo?t=36" text="standing awkwardly" /> in the
              background of Tiny Desk recordings.
            </li>
            <li>
              Designed web &amp; iOS screens, performed user testing, and made graphics for{" "}
              <PreviewCard>
                <PreviewCardTrigger
                  render={<LinkOut href="https://blog.spothero.com/spothero-acquires-parking-panda" text="Parking Panda" />}
                />
                <PreviewCardPopup className="flex-col">
                  <p className="font-medium">SpotHero Acquires Parking Panda</p>

                  <p className="text-xs text-muted-foreground italic">
                    SpotHero has acquired Parking Panda, the leader in US event parking reservations and the #1 parking reservation service
                    in Canada.
                  </p>
                  <Badge variant="ghost">
                    <IconCalendar data-icon="inline-start" className="opacity-50" /> April 13, 2017
                  </Badge>
                </PreviewCardPopup>
              </PreviewCard>{" "}
              (acq. by SpotHero)
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm text-muted-foreground">You can find or reach me here:</p>
          <ul className="flex flex-wrap items-center gap-2 text-sm">
            <li className="flex items-center justify-center gap-0.5">
              <LinkButton href="mailto:yo@bob.fyi" variant="link">
                yo@bob.fyi
              </LinkButton>
              <CopyButton value="yo@bob.fyi" />
            </li>
            ∙
            <li>
              <LinkButton href="https://www.linkedin.com/in/robertweisbecker/" variant="link">
                <LinkedinIcon /> LinkedIn
              </LinkButton>
            </li>
            ∙
            <li>
              <LinkButton href="https://github.com/robertweisbecker" variant="link">
                <GithubIcon /> GitHub
              </LinkButton>
            </li>
            ∙
            <li>
              <LinkButton href="https://figma.com/@yobob" variant="link">
                <FigmaIcon /> Figma
              </LinkButton>
            </li>
          </ul>
        </div>
      </section>
      <section className="flex flex-col gap-6">
        <div className="flex w-full justify-between gap-2">
          <h3 className="font-pixel text-[11px] uppercase">Experience</h3>
          <LinkButton href="/BOB.md" variant="ghost" size="sm" className="-me-(--button-x) -mt-(--button-y)">
            <MarkdownIcon data-icon="inline-start" />
            View BOB.md
          </LinkButton>
        </div>
        <DescriptionList>
          <DescriptionListLabel>
            <span className="flex items-center gap-2 self-start">
              <Avatar size="sm">
                <AvatarImage src="/assets/logos/everfi-blue-icon.png" alt="Everfi" />
              </Avatar>{" "}
              Everfi /{" "}
              <Avatar size="sm">
                <AvatarImage src="/assets/logos/blackbaud-logo.png" alt="Blackbaud" />
              </Avatar>{" "}
              Blackbaud
            </span>
          </DescriptionListLabel>
          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2024</DescriptionListLabel>
              <DescriptionListValue>Principal UX Engineer, Design Systems</DescriptionListValue>
              <DescriptionListLabel>2023</DescriptionListLabel>
              <DescriptionListValue>Principal Designer, Design Systems</DescriptionListValue>
              <DescriptionListLabel>2022</DescriptionListLabel>
              <DescriptionListValue>Principal Designer, Platform</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>

          <DescriptionListLabel className="flex items-center gap-2 self-start">
            <Avatar size="sm">
              <AvatarImage src="/assets/logos/everfi-icon.png" alt="Everfi" />
            </Avatar>{" "}
            Everfi
          </DescriptionListLabel>
          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2020</DescriptionListLabel>
              <DescriptionListValue>Sr. Interaction Designer</DescriptionListValue>
              <DescriptionListLabel>2019</DescriptionListLabel>
              <DescriptionListValue>Interaction Designer</DescriptionListValue>
              <DescriptionListLabel>2017</DescriptionListLabel>
              <DescriptionListValue>Product UX Designer</DescriptionListValue>
              <DescriptionListLabel>2017</DescriptionListLabel>
              <DescriptionListValue>Product Design Intern</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>
          <DescriptionListLabel className="flex items-center gap-2 self-start">
            <Avatar size="sm">
              <AvatarImage src="/assets/thumb/npr-logo.png" alt="NPR" />
            </Avatar>{" "}
            NPR
          </DescriptionListLabel>

          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2017</DescriptionListLabel>
              <DescriptionListValue>Design Intern, Research & Development</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>
          <DescriptionListLabel>
            <span className="flex items-center gap-2 self-start">
              <Avatar size="sm">
                <AvatarImage src="/assets/logos/parking-panda-logo.jpeg" alt="Parking Panda" />
              </Avatar>{" "}
              Parking Panda <InfoTip description="Acquired by SpotHero in 2017." />
            </span>
          </DescriptionListLabel>
          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2015</DescriptionListLabel>
              <DescriptionListValue>UX/Design Intern</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>
        </DescriptionList>
        <h3 className="font-pixel text-[11px] uppercase">Education</h3>
        <DescriptionList>
          <DescriptionListLabel>Maryland Institute College of Art</DescriptionListLabel>
          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2017</DescriptionListLabel>
              <DescriptionListValue>Master&apos;s, UX Design</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>
          <DescriptionListLabel>University of Michigan</DescriptionListLabel>
          <DescriptionListValue>
            <DescriptionList>
              <DescriptionListLabel>2016</DescriptionListLabel>
              <DescriptionListValue>BA, Cognitive Science ∙ Minor, Art &amp; Design</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>
        </DescriptionList>
      </section>
      <Separator className="max-w-14" />
      <section className="flex flex-col gap-6">
        <h2 className="font-pixel text-[11px] uppercase">Colophon</h2>
        <DescriptionList className="not-prose">
          <DescriptionListLabel>Type</DescriptionListLabel>
          <DescriptionListValue>
            <span>
              <LinkOut href="https://displaay.net/typeface/season" text="Season Mix" />,{" "}
              <LinkOut href="https://departuremono.com/" text="Departure Mono" />
            </span>
          </DescriptionListValue>
          <DescriptionListLabel>Hosting</DescriptionListLabel>
          <DescriptionListValue>
            <VercelIcon className="size-4" />
            Vercel
          </DescriptionListValue>
          <DescriptionListLabel>Framework</DescriptionListLabel>
          <DescriptionListValue>
            <NextJsIcon className="size-4" />
            <LinkOut href="https://nextjs.com/" text="Next.js" />
          </DescriptionListValue>
          <DescriptionListLabel>Components</DescriptionListLabel>
          <DescriptionListValue>
            <span className="flex items-center gap-1.5">
              <BaseUiIcon className="size-4" /> Base UI +
              <TreeIconTailwind className="size-4" />
              Tailwind
            </span>
          </DescriptionListValue>
          <DescriptionListLabel>Icons</DescriptionListLabel>
          <DescriptionListValue>
            <ul>
              <li>
                Placeholders: <LinkOut href="https://tabler.io" text="Tabler" />
              </li>
              <li>
                Duotone: <LinkOut href="https://trees.software/" text="Trees" /> by{" "}
                <LinkOut href="https://github.com/pierrecomputer/pierre" text="Pierre Co." />
              </li>
            </ul>
          </DescriptionListValue>
          <DescriptionListLabel>Logos</DescriptionListLabel>
          <DescriptionListValue>
            <LinkOut href="https://svgl.app/" text="svgl" />
          </DescriptionListValue>
          <DescriptionListLabel>Clankers</DescriptionListLabel>
          <DescriptionListValue>
            <span className="flex items-center gap-1.5">
              <CursorIcon className="size-4" /> Cursor &
              <TreeIconClaude className="size-4" />
              Claude
            </span>
          </DescriptionListValue>
        </DescriptionList>
        <div className="text-sm text-muted-foreground">
          <p>
            Misc…Carousels use <LinkOut href="https://embla-carousel.com/" text="Embla" /> with styling inspired by{" "}
            <LinkOut href="https://joshpuckett.me/pasito" text="Pasito" />. Resizing handled by{" "}
            <LinkOut href="https://react-resizable-panels.vercel.app/" text="react-resizable-panels" />. Syntax highlighting courtesy of{" "}
            <LinkOut href="https://github.com/huozhi/sugar-high" text="Sugar High" />. Motion is powered by, well,{" "}
            <LinkOut href="https://motion.dev/" text="Motion" />.<br />
            Shoutout to these essential reference manuals: <LinkOut href="https://animations.dev/" text="Animations.dev" />,{" "}
            <LinkOut href="https://raunofrieberg.com/devouring-details" text="Devouring Details" />,{" "}
            <LinkOut href="https://www.interfacecraft.dev/" text="Interface Craft" />, and{" "}
            <LinkOut href="https://makingsoftware.com/" text="Making Software" />.
          </p>
        </div>
      </section>
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

// prettier-ignore
function GoogleIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg overflow="hidden" viewBox="0 0 268.152 273.883" {...props}><defs><linearGradient id="google__a"><stop offset={0} stopColor="#0fbc5c" /><stop offset={1} stopColor="#0cba65" /></linearGradient><linearGradient id="google__g"><stop offset=".231" stopColor="#0fbc5f" /><stop offset=".312" stopColor="#0fbc5f" /><stop offset=".366" stopColor="#0fbc5e" /><stop offset=".458" stopColor="#0fbc5d" /><stop offset=".54" stopColor="#12bc58" /><stop offset=".699" stopColor="#28bf3c" /><stop offset=".771" stopColor="#38c02b" /><stop offset=".861" stopColor="#52c218" /><stop offset=".915" stopColor="#67c30f" /><stop offset={1} stopColor="#86c504" /></linearGradient><linearGradient id="google__h"><stop offset=".142" stopColor="#1abd4d" /><stop offset=".248" stopColor="#6ec30d" /><stop offset=".312" stopColor="#8ac502" /><stop offset=".366" stopColor="#a2c600" /><stop offset=".446" stopColor="#c8c903" /><stop offset=".54" stopColor="#ebcb03" /><stop offset=".616" stopColor="#f7cd07" /><stop offset=".699" stopColor="#fdcd04" /><stop offset=".771" stopColor="#fdce05" /><stop offset=".861" stopColor="#ffce0a" /></linearGradient><linearGradient id="google__f"><stop offset=".316" stopColor="#ff4c3c" /><stop offset=".604" stopColor="#ff692c" /><stop offset=".727" stopColor="#ff7825" /><stop offset=".885" stopColor="#ff8d1b" /><stop offset={1} stopColor="#ff9f13" /></linearGradient><linearGradient id="google__b"><stop offset=".231" stopColor="#ff4541" /><stop offset=".312" stopColor="#ff4540" /><stop offset=".458" stopColor="#ff4640" /><stop offset=".54" stopColor="#ff473f" /><stop offset=".699" stopColor="#ff5138" /><stop offset=".771" stopColor="#ff5b33" /><stop offset=".861" stopColor="#ff6c29" /><stop offset={1} stopColor="#ff8c18" /></linearGradient><linearGradient id="google__d"><stop offset=".408" stopColor="#fb4e5a" /><stop offset={1} stopColor="#ff4540" /></linearGradient><linearGradient id="google__c"><stop offset=".132" stopColor="#0cba65" /><stop offset=".21" stopColor="#0bb86d" /><stop offset=".297" stopColor="#09b479" /><stop offset=".396" stopColor="#08ad93" /><stop offset=".477" stopColor="#0aa6a9" /><stop offset=".568" stopColor="#0d9cc6" /><stop offset=".667" stopColor="#1893dd" /><stop offset=".769" stopColor="#258bf1" /><stop offset=".859" stopColor="#3086ff" /></linearGradient><linearGradient id="google__e"><stop offset=".366" stopColor="#ff4e3a" /><stop offset=".458" stopColor="#ff8a1b" /><stop offset=".54" stopColor="#ffa312" /><stop offset=".616" stopColor="#ffb60c" /><stop offset=".771" stopColor="#ffcd0a" /><stop offset=".861" stopColor="#fecf0a" /><stop offset=".915" stopColor="#fecf08" /><stop offset={1} stopColor="#fdcd01" /></linearGradient><linearGradient xlinkHref="#google__a" id="google__s" x1="219.7" x2="254.467" y1="329.535" y2="329.535" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__b" id="google__m" cx="109.627" cy="135.862" r="71.46" fx="109.627" fy="135.862" gradientTransform="matrix(-1.93688 1.043 1.45573 2.55542 290.525 -400.634)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__c" id="google__n" cx="45.259" cy="279.274" r="71.46" fx="45.259" fy="279.274" gradientTransform="matrix(-3.5126 -4.45809 -1.69255 1.26062 870.8 191.554)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__d" id="google__l" cx="304.017" cy="118.009" r="47.854" fx="304.017" fy="118.009" gradientTransform="matrix(2.06435 0 0 2.59204 -297.679 -151.747)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__e" id="google__o" cx="181.001" cy="177.201" r="71.46" fx="181.001" fy="177.201" gradientTransform="matrix(-.24858 2.08314 2.96249 .33417 -255.146 -331.164)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__f" id="google__p" cx="207.673" cy="108.097" r="41.102" fx="207.673" fy="108.097" gradientTransform="matrix(-1.2492 1.34326 -3.89684 -3.4257 880.501 194.905)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__g" id="google__r" cx="109.627" cy="135.862" r="71.46" fx="109.627" fy="135.862" gradientTransform="matrix(-1.93688 -1.043 1.45573 -2.55542 290.525 838.683)" gradientUnits="userSpaceOnUse" /><radialGradient xlinkHref="#google__h" id="google__j" cx="154.87" cy="145.969" r="71.46" fx="154.87" fy="145.969" gradientTransform="matrix(-.0814 -1.93722 2.92674 -.11625 -215.135 632.86)" gradientUnits="userSpaceOnUse" /><filter id="google__q" width="1.097" height="1.116" x="-.048" y="-.058" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="1.701" /></filter><filter id="google__k" width="1.033" height="1.02" x="-.017" y="-.01" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation=".242" /></filter><clipPath id="google__i" clipPathUnits="userSpaceOnUse"><path d="M371.378 193.24H237.083v53.438h77.167c-1.241 7.563-4.026 15.003-8.105 21.786-4.674 7.773-10.451 13.69-16.373 18.196-17.74 13.498-38.42 16.258-52.783 16.258-36.283 0-67.283-23.286-79.285-54.928-.484-1.149-.805-2.335-1.197-3.507a81.115 81.115 0 0 1-4.101-25.448c0-9.226 1.569-18.057 4.43-26.398 11.285-32.897 42.985-57.467 80.179-57.467 7.481 0 14.685.884 21.517 2.648a77.668 77.668 0 0 1 33.425 18.25l40.834-39.712c-24.839-22.616-57.219-36.32-95.844-36.32-30.878 0-59.386 9.553-82.748 25.7-18.945 13.093-34.483 30.625-44.97 50.985-9.753 18.879-15.094 39.8-15.094 62.294 0 22.495 5.35 43.633 15.103 62.337v.126c10.302 19.857 25.368 36.954 43.678 49.988 15.997 11.386 44.68 26.551 84.031 26.551 22.63 0 42.687-4.051 60.375-11.644 12.76-5.478 24.065-12.622 34.301-21.804 13.525-12.132 24.117-27.139 31.347-44.404 7.23-17.265 11.097-36.79 11.097-57.957 0-9.858-.998-19.87-2.689-28.968Z" /></clipPath></defs><g clipPath="url(#google__i)" transform="matrix(.95792 0 0 .98525 -90.174 -78.856)"><path fill="url(#google__j)" d="M92.076 219.958c.148 22.14 6.501 44.983 16.117 63.424v.127c6.949 13.392 16.445 23.97 27.26 34.452l65.327-23.67c-12.36-6.235-14.246-10.055-23.105-17.026-9.054-9.066-15.802-19.473-20.004-31.677h-.17l.17-.127c-2.765-8.058-3.037-16.613-3.14-25.503Z" filter="url(#google__k)" /><path fill="url(#google__l)" d="M237.083 79.025c-6.456 22.526-3.988 44.421 0 57.161 7.457.006 14.64.888 21.45 2.647a77.662 77.662 0 0 1 33.424 18.25l41.88-40.726c-24.81-22.59-54.667-37.297-96.754-37.332Z" filter="url(#google__k)" /><path fill="url(#google__m)" d="M236.943 78.847c-31.67 0-60.91 9.798-84.871 26.359a145.533 145.533 0 0 0-24.332 21.15c-1.904 17.744 14.257 39.551 46.262 39.37 15.528-17.936 38.495-29.542 64.056-29.542l.07.002-1.044-57.335c-.048 0-.093-.004-.14-.004Z" filter="url(#google__k)" /><path fill="url(#google__n)" d="m341.475 226.379-28.268 19.285c-1.24 7.562-4.028 15.002-8.107 21.786-4.674 7.772-10.45 13.69-16.373 18.196-17.702 13.47-38.328 16.244-52.687 16.255-14.842 25.102-17.444 37.675 1.043 57.934 22.877-.016 43.157-4.117 61.046-11.796 12.931-5.551 24.388-12.792 34.761-22.097 13.706-12.295 24.442-27.503 31.769-45 7.327-17.497 11.245-37.282 11.245-58.734Z" filter="url(#google__k)" /><path fill="#3086ff" d="M234.996 191.21v57.498h136.006c1.196-7.874 5.152-18.064 5.152-26.5 0-9.858-.996-21.899-2.687-30.998Z" filter="url(#google__k)" /><path fill="url(#google__o)" d="M128.39 124.327c-8.394 9.119-15.564 19.326-21.249 30.364-9.753 18.879-15.094 41.83-15.094 64.324 0 .317.026.627.029.944 4.32 8.224 59.666 6.649 62.456 0-.004-.31-.039-.613-.039-.924 0-9.226 1.57-16.026 4.43-24.367 3.53-10.289 9.056-19.763 16.123-27.926 1.602-2.031 5.875-6.397 7.121-9.016.475-.997-.862-1.557-.937-1.908-.083-.393-1.876-.077-2.277-.37-1.275-.929-3.8-1.414-5.334-1.845-3.277-.921-8.708-2.953-11.725-5.06-9.536-6.658-24.417-14.612-33.505-24.216Z" filter="url(#google__k)" /><path fill="url(#google__p)" d="M162.099 155.857c22.112 13.301 28.471-6.714 43.173-12.977l-25.574-52.664a144.74 144.74 0 0 0-26.543 14.504c-12.316 8.512-23.192 18.9-32.176 30.72Z" filter="url(#google__q)" /><path fill="url(#google__r)" d="M171.099 290.222c-29.683 10.641-34.33 11.023-37.062 29.29a144.806 144.806 0 0 0 16.792 13.984c15.996 11.386 46.766 26.551 86.118 26.551.046 0 .09-.004.137-.004v-59.157l-.094.002c-14.736 0-26.512-3.843-38.585-10.527-2.977-1.648-8.378 2.777-11.123.799-3.786-2.729-12.9 2.35-16.183-.938Z" filter="url(#google__k)" /><path fill="url(#google__s)" d="M219.7 299.023v59.996c5.506.64 11.236 1.028 17.247 1.028 6.026 0 11.855-.307 17.52-.872v-59.748a105.119 105.119 0 0 1-17.477 1.461c-5.932 0-11.7-.686-17.29-1.865Z" filter="url(#google__k)" opacity=".5" /></g></svg>
  );
}

function MetaIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 171" width={16} height={16} {...props}>
      <defs>
        <linearGradient id="meta__a" x1="13.878%" x2="89.144%" y1="55.934%" y2="58.694%">
          <stop offset="0%" stopColor="#0064E1" />
          <stop offset="40%" stopColor="#0064E1" />
          <stop offset="83%" stopColor="#0073EE" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
        <linearGradient id="meta__b" x1="54.315%" x2="54.315%" y1="82.782%" y2="39.307%">
          <stop offset="0%" stopColor="#0082FB" />
          <stop offset="100%" stopColor="#0064E0" />
        </linearGradient>
      </defs>
      <path
        fill="#0081FB"
        d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815 27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
      />
      <path
        fill="url(#meta__a)"
        d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695 0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
      />
      <path
        fill="url(#meta__b)"
        d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
      />
    </svg>
  );
}

function KrogerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95.1 74.1" {...props} fill="light-dark(#084999, #418fde)" width={12} height={12}>
      <g>
        <path
          className="st0"
          d="M36.4,67.8c0,3.4-2.9,6.2-6.3,6.1c-3.4,0-6.2-2.9-6.1-6.3c0-3.4,2.8-6.1,6.2-6.1
		C33.6,61.5,36.4,64.3,36.4,67.8C36.4,67.7,36.4,67.8,36.4,67.8z"
        ></path>
        <ellipse className="st0" cx="81.6" cy="67.8" rx="6.2" ry="6.3"></ellipse>
        <path
          className="st0"
          d="M29.8,26.5c0-0.4,0.1-0.8,0.3-1.1c0.3-0.3,0.7-0.5,1.1-0.5h16.9c0.5,0,1,0.3,1.2,0.7c0.3,0.4,0.3,1,0,1.4
		l-8.7,15.2c-0.4,0.7-1.2,0.9-1.9,0.6c0,0,0,0,0,0c-0.1,0-0.2-0.1-0.2-0.2c-4.6-4-7.7-9.5-8.6-15.5C29.9,27,29.8,26.7,29.8,26.5z
		 M57.1,48.6c-4.1,0.4-8.3-0.3-12.1-1.9c-0.4-0.2-0.7-0.5-0.8-0.9c-0.1-0.4-0.1-0.8,0.1-1.2L54.3,27c0.4-0.7,1.2-0.9,1.9-0.5
		c0.2,0.1,0.4,0.3,0.5,0.5l9.7,17.1c0.4,0.7,0.2,1.6-0.5,1.9c0,0-0.1,0-0.1,0C63.2,47.5,60.2,48.3,57.1,48.6L57.1,48.6z M74.1,39.5
		c-0.6,0.8-1.3,1.5-2,2.1c-0.3,0.3-0.7,0.5-1.2,0.4c-0.4-0.1-0.8-0.3-1-0.7L61.8,27c-0.3-0.4-0.3-1,0-1.4c0.2-0.4,0.7-0.7,1.2-0.7
		h15.3c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.3,1.1C79.2,31.3,77.2,35.8,74.1,39.5L74.1,39.5z"
        ></path>
        <path
          className="st0"
          d="M84.8,24.9c-1,14.5-12.3,26.7-27.1,28c-16.4,1.5-31-10.8-32.5-27.4C23.8,10.5,14.2,0.7,0,0v10.5
		c8.8,0.6,14.1,6.3,15,16c1.9,21.1,19.5,37,40,37c1.2,0,2.5-0.1,3.7-0.2c20.1-1.9,35.4-18.6,36.4-38.4L84.8,24.9z"
        ></path>
      </g>
    </svg>
  );
}

function TruistIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 55 55" width={12} height={12} {...props}>
      <g>
        <g id="svg_1">
          <g id="truist-logo">
            <g id="global_x2F_truist-logo--purple">
              <path
                className="fill-current"
                id="tru_lg_hrz_rgb_pos"
                d="M50.4,50.4V30.2h-14v10h-5.3V14.8h5.3v10h14V4.6H4.6v20.2h14v-10h5.3v25.4h-5.3&#10;&#9;&#9;&#9;&#9;&#9;v-10h-14v20.2H50.4z M0,50V5c0-3.1,1.9-5,5-5H50c3.1,0,5,1.9,5,5V50c0,3.1-1.9,5-5,5H5C1.9,55,0,53.1,0,50z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

function BeyondMeatIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 257 257" width={16} height={16} {...props} fill="#6bc746">
      <g transform="matrix(.13333333 0 0 -.13333333 -352.63 424.27)">
        <path d="m4224.35 2206.98-3.24-.3c-9.09-.84-18.24-1.48-27.41-1.9-.47-.02-.94-.04-1.43-.06-4.06-.17-8.12-.32-12.17-.42-4.63-.1-9.28-.16-13.98-.16-.16 0-.32.01-.48.01-5.25 0-10.55.1-15.88.27-1.08.03-2.15.1-3.23.14-4.66.18-9.33.41-14.02.71-.77.05-1.54.12-2.32.17-11.25.79-22.59 1.92-33.95 3.44l-1.08.15-.91.06c-57.7 7.84-111.72 24.18-163.46 43.15-.2.08-.4.16-.6.24-6.53 2.58-13.05 5.23-19.63 7.91-13.81 5.68-27.59 11.47-41.37 17.25-47.32 19.89-96.26 40.45-146.57 56.3-37.85 11.94-76.61 18.3-115.2 19.05-.98.03-1.97.03-2.96.07-.32 0-.64.03-.96.03h-.29c-18.48.55-37.08-.42-55.88-3.27-21.48-2.69-43.22-7.11-65.09-13.2 6.51 8.22 12.94 16.54 19.21 24.96 11.89 15.92 21.21 36.06 28.48 61.55 2.58 9 8.56 29.96 1.22 50.71 1.4 1.27 2.77 2.57 4.18 3.83 11.9 7.66 22.56 16.46 31.98 26.45 35.58 27.19 74.58 49.91 116.36 67.21 64.28 26.59 141.92 43.79 229.69 34.95 233.02-23.49 322.83-72.96 487.12 108.7-165.45 262.58-457.93 437.08-791.22 437.08-373.88 0-696.43-219.58-845.86-536.79 41.21-39.82 124-79.35 285.46-43.08 32.19 17.42 69.01 27.33 108.18 27.33 39.12 0 75.94-9.86 108.13-27.33 279.43-62.77 323.55 101.41 323.55 101.41 0-116.18-46.36-167.4-116.64-188.74 6.03-2.35 11.06-4.75 15.14-7.38 14.99-9.58 17.63-22.09 10.98-45.29-5.08-17.79-12.26-36.24-23.19-50.88-26.7-35.83-56.18-69.63-84.57-104.22-.14-.27-.29-.13-.2-.93.6-5.78 5.51-8.66 10.78-6.2 1.54.72 3.06 1.45 4.57 2.18 47.8 23.11 96.57 38.76 146.14 44.95 17.01 2.15 34.14 3.17 51.39 2.97 36.12-.33 72.69-5.99 109.59-17.63 63.14-19.89 123.94-47.38 185.31-72.6 6.69-2.72 13.37-5.45 20.06-8.08 56.09-22.42 113.09-41.53 173.8-45.61 24.1-3.22 48.82-5.04 74.25-5.04 19.98 0 43.51.95 62.2 2.69.21-42.4.16-84.79 0-127.08v-417c.95-24.52-18.98-44.94-43.79-44.32-22.49.54-40.36 19.35-41.6 41.8l-2.81 50.32c-10.86 81.64-33.27 159.11-70.16 237.9-13.87-43.96-27.33-86.63-40.58-128.77-13.29-42.1-26.37-83.62-39.45-125.19l-14.61-49.15c-6.2-20.81-28.98-33.18-51.27-24.48-15.39 6.06-24.6 21.96-23.27 38.43 0 0 25.25 207.94 13.49 317.56-106.44-67.45-222.3-93.77-346.24-95.83-3.22-74.8-6.36-143.37-9.62-218.95v-4.67c0-23.14-19.77-41.51-43.13-39.44-18.78 1.68-33.43 17.12-35.86 35.77l-9.17 65.61c-7.89 50.6-15.68 100.75-23.48 150.82h-5.33c-6.81-48.59-13.62-97.25-20.59-146.81l-8.26-68.03c-2.76-22.82-24.14-39.13-47.5-34.91-18.91 3.39-32.44 20.3-33.17 39.5l-3.23 79.61c-2.61 54.11-5.21 107.43-8.14 160.72-.33 5.66-5.12 11.26-8.54 16.47-.17.25-.33.51-.5.76-31.78 48.08-56.26 100.6-72.75 155.82-11.97 40.09-25.75 86.46-34.89 117.84 30.5 11.81 59.07 34.59 63.03 41.19 4 6.62-4.05 13.84-11.93 9.13-9-5.66-33.85-15.8-45.61-16.8-28.02-2.39-56.38-1.44-84.57-1.08-34.5.46-56.09 22.79-57.33 57.3-.49 14.28.54 29.72-4.46 42.55-20.63 52.91-35.36 106.94-36.36 164.02-.2 11.11-3.75 15.93-11.55 17.42-21.51-.74-42.6-1.2-62.9-.9-95.48 1.41-174.78 19.12-208.88 98.57-44.21-108.65-68.63-227.47-68.63-352 0-516.14 418.42-934.56 934.57-934.56 516.14 0 934.56 418.42 934.56 934.56 0 41.22-2.69 81.8-7.87 121.61-67.94-56.83-171.6-118.36-311.6-132.12" />
      </g>
    </svg>
  );
}

function ProjectLink({ href, text, ...props }: React.ComponentProps<typeof Link> & { text: string }) {
  return (
    <Badge variant="link" render={<Link href={href} {...props} />} style={{ fontSize: "inherit", lineHeight: "inherit" }}>
      <TreeIconRichText data-icon="inline-start" className="opacity-80" />
      {text}
    </Badge>
  );
}
