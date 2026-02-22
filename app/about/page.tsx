"use client";

import Link from "next/link";
import {
  RiUserLine,
  RiCameraLine,
  RiMagicLine,
  RiBriefcaseLine,
  RiBookmarkLine,
  RiCursorLine,
  RiMailLine,
  RiArticleLine,
  RiLinkedinBoxLine,
  RiGithubLine,
} from "@remixicon/react";
import { buttonVariants } from "@/components/ui/button";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function About() {
  return (
    <div className="mt-10 flex flex-col gap-10">
      <Heading level={1} className="sr-only">About</Heading>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="flex items-center gap-2">
          <RiUserLine className="size-4 text-primary" />
          <Heading level={6}>Who</Heading>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            I&apos;m currently a principal designer at{" "}
            <LinkOut href="https://everfi.com" text="Everfi" />, designing
            products, components, and tooling to help drive social good through
            education. These things have{" "}
            <a
              href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year"
              target="_blank"
              rel="noopener noreferrer"
            >
              allegedly
            </a>{" "}
            reached more than 45 million learners globally.
          </p>
          <p>
            Since 2021, I&apos;ve been leading the implementation of a unified
            design system across admin, educator, and learner products. Read a
            bit about that process{" "}
            <Link href="/unified-design-language">here</Link>.
          </p>
          <p>You can also find or reach me here:</p>
          <div className="mb-8 flex flex-wrap gap-4">
            <a href="mailto:yo@bob.fyi" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <RiMailLine className="size-3.5" />
              Email
            </a>
            <a href="https://read.cv/weisbecker" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <RiArticleLine className="size-3.5 rotate-20" />
              read.cv
            </a>
            <a href="https://www.linkedin.com/in/robertweisbecker/" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <RiLinkedinBoxLine className="size-3.5" />
              LinkedIn
            </a>
            <a href="https://github.com/robertweisbecker" target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
              <RiGithubLine className="size-3.5" />
              Github
            </a>
          </div>
        </div>
      </LayoutGrid>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="mb-5 flex items-center gap-2">
          <RiCameraLine className="size-4 text-primary" />
          <Heading level={6}>
            What{" "}
            <span className="font-normal text-muted-foreground">
              (I look like)
            </span>
          </Heading>
        </div>
        <div>
          <img
            src="/assets/headshot2.png"
            alt="Bob Weisbecker headshot"
            className="w-full max-w-sm rounded-2xl shadow-sm"
          />
          <p className="mt-2 text-xs italic text-muted-foreground">Moody!</p>
        </div>
      </LayoutGrid>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="mb-5 flex items-center gap-2">
          <RiMagicLine className="size-4 text-primary" />
          <Heading level={6}>
            What
            <span className="font-normal text-muted-foreground">
              {" "}
              (I&apos;ve done)
            </span>
          </Heading>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            Starting in 2018, I led the creation of our product
            organization&apos;s{" "}
            <Link href="/unified-design-language">first design system</Link>,
            shepherding its transition from an unstyled SDK into an accessible
            component library with theming and tooling to support 80+ courses
            across a dozen branded product lines.
          </p>
          <p>Some other things I&apos;ve done:</p>
          <ul className="list-disc space-y-3 ps-5">
            <li>
              Led design efforts for adult &amp; K12 e-learning courses at
              EVERFI, including{" "}
              <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />
              ,{" "}
              <LinkOut href="https://everfi.com/financial-education/consumers/engage/" text="Engage" />
              , and{" "}
              <LinkOut
                href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/"
                text="Data Science for High Schoolers"
              />
              .
            </li>
            <li>
              Worked on education products for customers such as Google, Meta,
              LinkedIn, Kroger, Beyond Meat, Truist, and more.
            </li>
            <li>
              Delivered a (now relevant!){" "}
              <Link href="/conversational-immigration-forms">thesis</Link> on
              chatbots and conversational interface design at{" "}
              <LinkOut href="https://www.mica.edu/graduate-programs/ux-design-mps/" text="MICA" />
            </li>
            <li>
              Built a <Link href="/npr-maps">mapping application</Link> at{" "}
              <LinkOut href="https://npr.org" text="NPR" /> when I wasn&apos;t
              busy{" "}
              <a
                href="https://youtu.be/lgmw41CY1Fo?t=36"
                target="_blank"
                rel="noopener noreferrer"
              >
                standing awkwardly
              </a>{" "}
              in the background of Tiny Desk recordings
            </li>
            <li>
              Designed web &amp; iOS screens, performed user testing, and made
              some{" "}
              <a
                href="https://twitter.com/ParkingPanda/status/617057417696833536?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                cheesy
              </a>{" "}
              social media assets for{" "}
              <LinkOut href="https://www.parkingpanda.com" text="Parking Panda" />
            </li>
          </ul>
        </div>
      </LayoutGrid>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="mb-5 flex items-center gap-2">
          <RiBriefcaseLine className="size-4 text-primary" />
          <Heading level={6}>
            Where{" "}
            <span className="font-normal text-muted-foreground">
              (I&apos;ve worked)
            </span>
          </Heading>
        </div>
        <div className="flex flex-col divide-y divide-border/50 text-sm">
          <p className="font-semibold text-base">Everfi from Blackbaud</p>
          <div className="flex items-center py-2">
            <span className="mr-1 size-2 rounded-full bg-green-500" aria-label="Current position" />
            <span>Principal Designer</span>
            <span className="flex-1" />
            <span className="font-mono text-muted-foreground">2024</span>
          </div>
          {[
            ["Principal Designer, Design Systems", "2022"],
            ["Principal Designer, Platform UX", "2022"],
          ].map(([title, year]) => (
            <div key={title} className="flex items-center py-2">
              <span>{title}</span>
              <span className="flex-1" />
              <span className="font-mono text-muted-foreground">{year}</span>
            </div>
          ))}
          <p className="mt-4 font-semibold text-base">Everfi</p>
          {[
            ["Senior Interaction Designer", "2020"],
            ["Interaction Designer", "2018"],
            ["UX Designer", "2017"],
            ["Product Design Intern", "2017"],
          ].map(([title, year]) => (
            <div key={title} className="flex items-center py-2">
              <span>{title}</span>
              <span className="flex-1" />
              <span className="font-mono text-muted-foreground">{year}</span>
            </div>
          ))}
          <p className="mt-4 font-semibold text-base">NPR Labs</p>
          <div className="flex items-center py-2">
            <span>Research &amp; Development Design Intern</span>
            <span className="flex-1" />
            <span className="font-mono text-muted-foreground">2017</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <p className="font-semibold text-base">Parking Panda</p>
            <span className="text-[0.625rem] tracking-wide">(acquired by SpotHero)</span>
          </div>
          <div className="flex items-center py-2">
            <span>UX/Design Intern</span>
            <span className="flex-1" />
            <span className="font-mono text-muted-foreground">2015</span>
          </div>
        </div>
      </LayoutGrid>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="mb-5 flex items-center gap-2">
          <RiBookmarkLine className="size-4 text-primary" />
          <Heading level={6}>
            Where{" "}
            <span className="font-normal text-muted-foreground">
              (I learned things)
            </span>
          </Heading>
        </div>
        <div className="flex flex-col divide-y divide-border/50 text-sm">
          <p className="font-semibold text-base">
            Maryland Institute College of Art
          </p>
          <div className="flex items-center py-2">
            <span>Master&apos;s, UX Design</span>
            <span className="flex-1" />
            <span className="font-mono text-muted-foreground">2016–2017</span>
          </div>
          <p className="mt-4 font-semibold text-base">
            University of Michigan, Ann Arbor
          </p>
          <div className="flex items-end py-2">
            <span>
              BA, Cognitive Science
              <br />
              Minor, Art &amp; Design
            </span>
            <span className="flex-1" />
            <span className="font-mono text-muted-foreground">2012–2016</span>
          </div>
        </div>
      </LayoutGrid>

      <div className="h-4" />

      <LayoutGrid variant="oneThird">
        <div className="mb-5 flex items-center gap-2">
          <RiCursorLine className="size-4 text-primary" />
          <Heading level={6}>
            What{" "}
            <span className="font-normal text-muted-foreground">
              (is this site?)
            </span>
          </Heading>
        </div>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            This is my little corner of the internet. If you&apos;re reading
            this now, I made it for you.
          </p>
          <p>
            You can also get here from{" "}
            <a href="https://bob.cash" target="_blank" rel="noopener noreferrer">bob.cash</a>,{" "}
            <a href="https://bob.computer" target="_blank" rel="noopener noreferrer">bob.computer</a>,{" "}
            <a href="https://robertweisbecker.com" target="_blank" rel="noopener noreferrer">robertweisbecker.com</a>,{" "}
            <a href="https://weisbecker.design" target="_blank" rel="noopener noreferrer">weisbecker.design</a>,{" "}
            <a href="https://weisbecker.co" target="_blank" rel="noopener noreferrer">weisbecker.co</a>.
            Someday, buying all those domains will have made sense.
          </p>
          <p>
            The current version of this site was built with{" "}
            <LinkOut href="https://nextjs.org" text="Next.js" /> and{" "}
            <LinkOut href="https://ui.shadcn.com" text="shadcn/ui" />, deployed
            on GitHub Pages. Icons come from{" "}
            <LinkOut href="https://remixicon.com" text="Remix Icon" />, and
            components are a mix of shadcn&apos;s and some home cooking. My
            buddy Claude helped me get it all working.
          </p>
        </div>
      </LayoutGrid>
    </div>
  );
}
