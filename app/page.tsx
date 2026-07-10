import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import nprTinyDesk from "@/public/assets/npr/npr-tiny-desk.jpeg";

import {
  BaseUiIcon,
  BeyondMeatIcon,
  CodexIcon,
  CursorIcon,
  GoogleIcon,
  KrogerIcon,
  LinkedinIcon,
  MetaIcon,
  NextJsIcon,
  VercelIcon,
} from "@/components/icons";
import { PixelMarkdown2Icon, PixelExternalIcon, PixelFigmaIcon } from "@/components/icons/pixel";
import { TreeIconClaude, TreeIconFile, TreeIconRichText, TreeIconTailwind } from "@/components/icons/tree";
import { LinkOut } from "@/components/link-out";
import { IndexList, type IndexListItem } from "@/components/blocks/index-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverDescription, PopoverTrigger } from "@/components/ui/popover";
import { resources } from "@/lib/data/resources";
import { cn } from "@/lib/utils";
import { posts, postIcons } from "@/lib/data/posts";
import { IconCalendar, IconFile, IconLink } from "@tabler/icons-react";
import { LayoutGrid } from "@/components/layout-grid";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { LinkButton } from "@/components/ui/link-button";
import { InfoTip } from "@/components/info-tip";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@/components/ui/preview-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CopyButton } from "@/components/ui/copy-button";
import { ArtCards } from "@/components/blocks/art-cards";
import { Letterboxd } from "@/components/blocks/letterboxd";
import { HomePortrait } from "@/components/blocks/home-portrait";
import { projects } from "@/lib/data/projects";

const postItems: IndexListItem[] = posts.map((post) => {
  const Icon = post.icon ? postIcons[post.icon] : IconFile;
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    date: post.date,
    path: post.path,
    icon: <Icon aria-hidden strokeWidth={1} className="opacity-72" />,
    tags: post.category ? (
      <Badge
        variant={"inherit"}
        className={cn(
          "font-pixel text-[11px] uppercase",
          post.category === "Snippet" && "text-info-foreground",
          post.category === "Demo" && "text-success-foreground",
          post.category === "Motion" && "text-ruby-500 dark:text-ruby-300"
        )}
      >
        {post.category}
      </Badge>
    ) : undefined,
  };
});

export default function Home() {
  // Titles live in lib/data/projects.ts and are kept in sync with MDX frontmatter manually.
  // Importing frontmatter here would pull every project MDX file (and its images) into the
  // homepage compile graph.
  const projectItems: IndexListItem[] = projects
    .filter((project) => project.published ?? true)
    .map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      date: project.date,
      path: project.path,
      icon: project.icon,
    }));

  return (
    <div className={cn("mx-auto grid max-w-2xl animate-stagger-enter gap-16 md:gap-32")}>
      <section>
        <div className="grid w-full min-w-0 animate-stagger-enter grid-cols-1 items-start gap-x-8 gap-y-4 [--stagger:1] sm:grid-cols-[auto_1fr]">
          <h1 className="-ms-1 mb-4 text-h1 max-sm:self-end sm:col-span-2">
            Robert
            <br /> Weisbecker
          </h1>
          <HomePortrait />
          <div className="w-full space-y-3.5 text-base text-muted-foreground max-sm:col-span-2">
            <p className="text-pretty">
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
            <p className="text-pretty">
              I&apos;m a principal designer at <LinkOut href="https://everfi.com" text="Everfi" className="text-foreground" /> working on
              products, tools, and systems to help drive social good through education.
            </p>
            <div className="text-balance">
              These things have&nbsp;
              <PreviewCard>
                <PreviewCardTrigger
                  render={
                    <LinkOut
                      href="https://everfi.com/press-releases/everfis-suite-of-k-12-educational-content-receives-prestigious-digital-promise-research-based-product-design-certification/#:~:text=Everfi%E2%80%99s%20Impact%2Das%2Da%2DServiceTM%C2%A0solution%20and%20digital%20educational%20content%20have%20reached%20more%20than%2045%20million%20learners%20globally."
                      text="allegedly"
                      className="decoration-wavy"
                    />
                  }
                />
                <PreviewCardPopup className="max-w-sm p-2" side="top" align="start">
                  <Avatar>
                    <AvatarImage src="/assets/logos/everfi-new-purp.png" alt="Everfi logo" />
                    <AvatarFallback>
                      <TreeIconFile />
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full space-y-2">
                    <p className="text-xs font-medium">
                      Everfi’s Suite of K-12 Educational Content Receives Prestigious Digital Promise Research-Based Product Design
                      Certification
                    </p>
                    <blockquote
                      className="mb-3 block text-xs text-muted-foreground [quotes:initial]"
                      cite="https://everfi.com/press-releases/everfis-suite-of-k-12-educational-content-receives-prestigious-digital-promise-research-based-product-design-certification/#:~:text=Everfi%E2%80%99s%20Impact%2Das%2Da%2DServiceTM%C2%A0solution%20and%20digital%20educational%20content%20have%20reached%20more%20than%2045%20million%20learners%20globally."
                    >
                      “Founded in 2008, Everfi’s Impact-as-a-Service™ solution and digital educational content have reached more than <br />
                      <mark data-hue="yellow">45 million</mark> learners globally.”
                    </blockquote>
                    <span className="flex items-center gap-1 text-2xs">
                      <IconLink className="size-3" /> everfi.com
                    </span>
                  </div>
                </PreviewCardPopup>
              </PreviewCard>
              &nbsp;reached more than 45 million learners worldwide.
            </div>
            <p>
              This is my little slice of the internet.
              <br /> Have a look around.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-pixel text-[11px]/none whitespace-pre uppercase" id="projects">
          I. Work
        </h2>
        <IndexList items={projectItems} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="font-pixel text-[11px] uppercase" id="resources">
          II. Posts
        </h2>
        <IndexList items={postItems} maxVisibleItems={3} />
      </section>

      <section className="flex flex-col gap-5">
        <div className="mb-3 flex w-full items-center justify-between gap-2">
          <h2 className="font-pixel text-[11px] uppercase" id="resources">
            III. Resources
          </h2>
          <span className="ease text-sm text-muted-foreground opacity-72 hover:opacity-100">
            View on <LinkOut href="https://www.figma.com/@yobob" text="Figma" />
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resources.map((resource) => (
            <Card
              key={resource.id}
              size="sm"
              variant="muted"
              className="group/resource relative gap-0.5 outline outline-border transition-shadow focus-within:ring-2 focus-within:ring-ring hover:-outline-offset-1 hover:outline-primary dark:outline-black"
            >
              <CardHeader>
                <CardTitle className="truncate font-normal">
                  <a href={resource.href} className="outline-none before:absolute before:inset-0" target="_blank" rel="noopener noreferrer">
                    {resource.title}
                  </a>
                </CardTitle>
                <CardAction>
                  <div className="size-lh -me-0.5 -mt-px grid-stack self-center text-muted-foreground">
                    <PixelFigmaIcon
                      scale={1}
                      className="ease shrink-0 translate-x-0 translate-y-0 opacity-100 transition-[opacity,translate] duration-150 group-hover/resource:translate-x-1/2 group-hover/resource:-translate-y-1/2 group-hover/resource:opacity-0"
                      aria-label="Figma Community"
                    />
                    <span
                      className="ease shrink-0 -translate-x-1/2 translate-y-1/2 scale-50 font-pixel opacity-0 transition-[opacity,translate,transform] duration-150 group-hover/resource:translate-0 group-hover/resource:scale-100 group-hover/resource:opacity-100"
                      aria-hidden
                    >
                      <PixelExternalIcon scale={1} />
                    </span>
                  </div>
                </CardAction>
              </CardHeader>
              <Image
                src={resource.thumbnail}
                alt=""
                width={320}
                height={180}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="pointer-events-none m-px aspect-video w-[calc(100%-2px)] rounded-md object-contain shadow-border-xs -outline-offset-1 dark:brightness-50 dark:grayscale-50"
                data-slot="media"
              />
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-pixel text-[11px] uppercase" id="art">
          IV. Art
        </h2>
        <ArtCards />
      </section>

      <section className="flex flex-col gap-3" id="about">
        <h2 className="scroll-mt-20 font-pixel text-[11px] uppercase" id="about">
          V. About
        </h2>
        <LayoutGrid variant="twoUp" className="text-sm/6">
          <p className="max-w-prose text-muted-foreground">
            I&apos;m from Baltimore, MD, and now live in southern CA. Since 2021, I&apos;ve led the implementation of a shared design system
            for e-learning admin, educator, and learner-facing products. Recently, I&apos;ve been designing a new platform for educators,
            diving deep into color spaces, exploring animation in React, and working with agents.
          </p>
          <p className="max-w-prose text-muted-foreground">
            Before that, I worked on financial, K12 to higher education, &amp; workplace compliance products for Everfi, including{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
            <ProjectLink href="/everfi-engage" text="Engage" />
            , and <LinkOut href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/" text="Data Science" />. Plus many
            more for partners like{" "}
            <span className="whitespace-nowrap text-foreground">
              <GoogleIcon className="mx-px -mt-0.5 inline-block size-3.5 opacity-50 grayscale" /> Google
            </span>
            ,{" "}
            <span className="whitespace-nowrap text-foreground">
              <MetaIcon className="mt-[-3px] inline-block size-4 opacity-50 grayscale" />
               Meta
            </span>
            ,{" "}
            <span className="whitespace-nowrap text-foreground">
              <LinkedinIcon className="-mt-0.5 inline-block size-3.5 fill-muted-foreground/50" />
               LinkedIn
            </span>
            ,{" "}
            <span className="whitespace-nowrap text-foreground">
              <KrogerIcon className="-mt-1 inline-block size-4 fill-muted-foreground/50" /> Kroger
            </span>
            , and{" "}
            <span className="whitespace-nowrap text-foreground">
              <BeyondMeatIcon className="me-0.5 -mt-0.5 inline-block size-3.5 fill-muted-foreground/50" />
               Beyond Meat
            </span>
            .
          </p>
          <div>
            <p className="mb-2 text-muted-foreground">Some other things I&apos;ve done:</p>

            <ul className="max-w-prose list-disc space-y-2 ps-4 text-muted-foreground marker:text-muted-foreground/50">
              <li>
                Delivered a (prescient?) <ProjectLink href="/conversational-immigration-forms" text="thesis" /> exploring chatbots and
                conversational interface design patterns.{" "}
              </li>
              <li>
                Built a <ProjectLink href="/npr-maps" text="mapping application" /> at NPR when I wasn&apos;t busy{" "}
                <PreviewCard>
                  <PreviewCardTrigger delay={0} render={<LinkOut href="https://youtu.be/lgmw41CY1Fo?t=36" text="standing awkwardly" />} />
                  <PreviewCardPopup className="p-0.5">
                    <Image src={nprTinyDesk} alt="Tiny Desk Recording" loading="eager" className="rounded-sm" />
                  </PreviewCardPopup>
                </PreviewCard>
                in the background of Tiny Desk recordings.
              </li>
              <li>
                Designed web &amp; iOS screens, performed user testing, and made some wacky graphics for{" "}
                <PreviewCard>
                  <PreviewCardTrigger
                    render={<LinkOut href="https://blog.spothero.com/spothero-acquires-parking-panda" text="Parking Panda" />}
                  />
                  <PreviewCardPopup className="flex-col">
                    <p className="font-medium">SpotHero Acquires Parking Panda</p>

                    <p className="text-xs text-muted-foreground italic">
                      SpotHero has acquired Parking Panda, the leader in US event parking reservations and the #1 parking reservation
                      service in Canada.
                    </p>
                    <Badge variant="ghost">
                      <IconCalendar data-icon="inline-start" className="opacity-50" /> April 13, 2017
                    </Badge>
                  </PreviewCardPopup>
                </PreviewCard>{" "}
                (acq. by SpotHero).
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">You can find or reach me here:</p>
            <ul className="flex flex-col gap-1 text-sm">
              <li>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground/64">Email</span>
                  <span className="after-dots"></span>
                  <LinkButton href="mailto:yo@bob.fyi" variant="link" size="sm">
                    yo@bob.fyi
                  </LinkButton>
                  <CopyButton value="yo@bob.fyi" size="icon-xs" variant="ghost" />
                </span>
              </li>

              <li className="flex items-center gap-1">
                <span className="text-muted-foreground/64">LinkedIn</span>
                <span className="after-dots" />
                <LinkButton href="https://www.linkedin.com/in/robertweisbecker/" variant="link" size="sm">
                  @robertweisbecker
                </LinkButton>
              </li>

              <li>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground/64">GitHub</span>
                  <span className="after-dots" />
                  <LinkButton href="https://github.com/robertweisbecker" variant="link" size="sm">
                    @robertweisbecker
                  </LinkButton>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground/64">Figma</span>
                  <span className="after-dots" />
                  <LinkButton href="https://figma.com/@yobob" variant="link" size="sm">
                    @yobob
                  </LinkButton>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1">
                  <span className="text-muted-foreground/64">Letterboxd</span>
                  <span className="after-dots" />
                  <LinkButton href="https://letterboxd.com/weisbecker/" variant="link" size="sm">
                    @weisbecker
                  </LinkButton>
                </span>
              </li>
            </ul>
          </div>
        </LayoutGrid>
      </section>

      <section>
        {" "}
        <p className="mb-5 text-sm text-muted-foreground">And, since you made it this far, here&apos;s what I&apos;ve been watching:</p>
        {/* <div className="mb-2 flex w-full items-center justify-between gap-2">
          <h3 className="font-pixel text-[11px] text-muted-foreground/50 uppercase">Logged</h3>
          <LinkButton href="https://letterboxd.com/weisbecker/" variant="ghost" size="sm" className="-me-(--button-x)">
            <LetterboxdLogo data-icon="inline-start" />
            View on Letterboxd
          </LinkButton>
        </div> */}
        <Letterboxd maxFilms={4} />
      </section>
      <section>
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="font-pixel text-[11px] uppercase">VI. CV</h2>
          <LinkButton href="/BOB.md" variant="link" size="sm">
            <PixelMarkdown2Icon data-icon="inline-start" scale={1.5} />
            View BOB.md
          </LinkButton>
        </div>
        <h3 className="my-10 font-pixel text-[11px] text-muted-foreground/50 uppercase">─── Experience</h3>
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
              <DescriptionListLabel>2024—now</DescriptionListLabel>
              <DescriptionListValue>Principal UX Engineer, Design Systems</DescriptionListValue>
              <DescriptionListLabel>2023</DescriptionListLabel>
              <DescriptionListValue>Principal Designer, Design Systems</DescriptionListValue>
              <DescriptionListLabel>2022</DescriptionListLabel>
              <DescriptionListValue>Principal Designer, Platform</DescriptionListValue>
            </DescriptionList>
          </DescriptionListValue>

          <DescriptionListLabel className="flex items-center gap-2 self-start uppercase">
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
              <AvatarImage src="/assets/logos/npr-square.webp" alt="NPR" />
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
        <h3 className="my-10 font-pixel text-[11px] text-muted-foreground/50 uppercase">─── Education</h3>
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

      {/* <Separator className="max-w-14" /> */}
      <section className="flex flex-col gap-6">
        <h2 className="font-pixel text-[11px] uppercase">VII. Colophon</h2>
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
            <ul className="space-y-1">
              <li>
                Default: <LinkOut href="https://tabler.io" text="Tabler" />
              </li>
              <li>
                Duotone: <LinkOut href="https://trees.software/" text="Trees" /> by{" "}
                <LinkOut href="https://github.com/pierrecomputer/pierre" text="Pierre Co." />
              </li>
              <li>Pixel: me</li>
              <li>
                Logos: <LinkOut href="https://svgl.app/" text="svgl" />
              </li>
            </ul>
          </DescriptionListValue>
          <DescriptionListLabel>Clankers</DescriptionListLabel>
          <DescriptionListValue>
            <span className="flex items-center gap-1.5">
              <CursorIcon className="size-4" /> Cursor,
              <TreeIconClaude className="size-4" />
              Claude, and{" "}
              <span className="inline-flex size-4 items-center justify-center rounded-sm bg-white p-0.5 shadow-button">
                <CodexIcon className="size-3 fill-indigo-400 squircle" />
              </span>
              Codex
            </span>
          </DescriptionListValue>
        </DescriptionList>
        <div className="text-xs text-muted-foreground">
          <p>
            Misc…Carousels use <LinkOut href="https://embla-carousel.com/" text="Embla" /> with styling inspired by{" "}
            <LinkOut href="https://joshpuckett.me/pasito" text="Pasito" />. Resizing handled by{" "}
            <LinkOut href="https://react-resizable-panels.vercel.app/" text="react-resizable-panels" />. Syntax highlighting courtesy of{" "}
            <LinkOut href="https://github.com/huozhi/sugar-high" text="Sugar High" />. Motion is powered by, well,{" "}
            <LinkOut href="https://motion.dev/" text="Motion" />. Shoutout to these essential reference manuals:{" "}
            <LinkOut href="https://animations.dev/" text="Animations.dev" />,{" "}
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

function ProjectLink({ href, text, ...props }: React.ComponentProps<typeof Link> & { text: string }) {
  return (
    <Badge variant="link" render={<Link href={href} {...props} />} style={{ fontSize: "inherit", lineHeight: "inherit" }}>
      <TreeIconRichText data-icon="inline-start" className="opacity-50" />
      {text}
    </Badge>
  );
}
