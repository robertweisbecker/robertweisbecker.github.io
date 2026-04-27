"use client";

import { Badge } from "@/components/ui/badge";
import {
  BaseUiIcon,
  FigmaIcon,
  NextJsIcon,
  GithubIcon,
  LinkedinIcon,
  TreeIconCss,
  TreeIconNextJs,
  TreeIconReact,
  TreeIconTailwind,
} from "@/components/icons";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Image } from "@/components/image";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";
import { Code } from "@/components/ui/code";

export default function About() {
  return (
    <div className="mx-auto mt-10 grid max-w-3xl px-4">
      <div className="prose container">
        <h1>About</h1>
        <p>My birth certificate says Robert, but everyone calls me Bob.</p>
        <LayoutGrid variant="fit" className="mx-auto max-w-xl">
          <div className="prose columns-2 text-balance [&_p]:mt-0">
            <p>
              I&apos;m currently a principal designer at&nbsp;
              <LinkOut href="https://everfi.com" text="Everfi" />
              &nbsp;where I work on products & tooling to help drive social good through education. These things
              have&nbsp;
              <LinkOut
                href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year#:~:text=reached%20more%20than-,45%20million,-learners%20globally%2C%20in"
                text="allegedly"
              />
              &nbsp;reached more than 45 million learners{" "}
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="inline-block">
                <path
                  d="M8 1.5C8.24513 1.5 8.52037 1.61408 8.81641 1.90625C9.11457 2.20054 9.40657 2.65081 9.66211 3.24707C10.1725 4.43793 10.5 6.1181 10.5 8C10.5 9.8819 10.1725 11.5621 9.66211 12.7529C9.40657 13.3492 9.11457 13.7995 8.81641 14.0938C8.52037 14.3859 8.24513 14.5 8 14.5C7.75487 14.5 7.47963 14.3859 7.18359 14.0938C6.88543 13.7995 6.59343 13.3492 6.33789 12.7529C5.82752 11.5621 5.5 9.8819 5.5 8C5.5 6.1181 5.82752 4.43793 6.33789 3.24707C6.59343 2.6508 6.88543 2.20054 7.18359 1.90625C7.47963 1.61408 7.75487 1.5 8 1.5Z"
                  stroke="currentColor"
                />
                <path
                  d="M12.6706 12.5205C11.4317 11.886 9.79474 11.5 8 11.5C6.20526 11.5 4.56828 11.886 3.32938 12.5205M12.6706 12.5205C13.8031 11.3507 14.5 9.75676 14.5 8C14.5 6.56023 14.0319 5.22978 13.2396 4.15257M12.6706 12.5205C11.489 13.7412 9.83309 14.5 8 14.5C6.16691 14.5 4.51104 13.7412 3.32938 12.5205M3.32938 12.5205C2.19692 11.3507 1.5 9.75676 1.5 8C1.5 6.56023 1.96811 5.22978 2.76045 4.15257M13.2396 4.15257C11.9572 4.97908 10.085 5.5 8 5.5C5.91496 5.5 4.04283 4.97908 2.76045 4.15257M13.2396 4.15257C12.0563 2.54393 10.1501 1.5 8 1.5C5.84992 1.5 3.94367 2.54393 2.76045 4.15257"
                  stroke="currentColor"
                />
                <path d="M14 8.5H2" stroke="currentColor" />
              </svg>{" "}
              globally.
            </p>
            <p>
              Since 2021, I&apos;ve led the implementation of a shared design system across admin, educator, and
              learner-facing products. Read a bit about that process{" "}
              <Link href="/unified-design-language" className="link">
                here
              </Link>
              .
            </p>
          </div>

          <Image src="/assets/bob.png" aria-hidden="true" className="my-0 max-w-xs" />
        </LayoutGrid>

        <div className="prose mx-auto max-w-xl">
          <p>To get in touch, you can find or reach me here:</p>
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
        <Separator className="my-8" />

        <p>
          Beginning in 2018, I led the creation of our product org&apos;s{" "}
          <Link className="link" href="/unified-design-language">
            first design system
          </Link>
          , shepherding its transition from an unstyled SDK into an accessible component library with theming and
          tooling to support 80+ courses across a dozen branded product lines.
        </p>
        <p>Some other things I&apos;ve done:</p>
        <ul className="list-disc space-y-3 ps-5">
          <li>
            Led design efforts for financial &amp; K12 products at EVERFI, including{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/engage/" text="Engage" />, and{" "}
            <LinkOut href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/" text="Data Science" />
            .
          </li>
          <li>
            Worked on education products for customers such as Google, Meta, LinkedIn, Kroger, Beyond Meat, Truist, and
            more.
          </li>
          <li>
            Delivered a (now relevant!){" "}
            <Link className="link" href="/conversational-immigration-forms">
              thesis
            </Link>{" "}
            on chatbots and conversational interface design at{" "}
            <LinkOut href="https://www.mica.edu/graduate-programs/ux-design-mps/" text="MICA" />
          </li>
          <li>
            Built a{" "}
            <Link className="link" href="/npr-maps">
              mapping application
            </Link>{" "}
            at NPR when I wasn&apos;t busy{" "}
            <LinkOut href="https://youtu.be/lgmw41CY1Fo?t=36" text="standing awkwardly" /> in the background of Tiny
            Desk recordings
          </li>
          <li>
            Designed web &amp; iOS screens, performed user testing, and made graphics for{" "}
            <LinkOut href="https://www.parkingpanda.com" text="Parking Panda" />
          </li>
        </ul>

        <h2>Work</h2>
        <table>
          <thead className="sr-only">
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Principal UX Engineer,
                <wbr /> Design Systems{" "}
                <span className="relative ms-2 mb-px inline-block size-1 rounded-full bg-current align-middle text-success-primary after:absolute after:-inset-1 after:-z-1 after:animate-pulse after:rounded-full after:bg-success" />
              </td>
              <td>Everfi</td>
              <td>2025—now</td>
            </tr>
            <tr>
              <td>Principal Designer, Platform</td>
              <td>Blackbaud</td>
              <td>2022</td>
            </tr>
            <tr>
              <td>Sr. Interaction Designer</td>
              <td>Everfi</td>
              <td>2020</td>
            </tr>
            <tr>
              <td>Interaction Designer</td>
              <td>Everfi</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>Product UX Designer</td>
              <td>Everfi</td>
              <td>2017</td>
            </tr>
            <tr>
              <td>
                Design Intern,
                <wbr /> Research & Development
              </td>
              <td>NPR</td>
              <td>2017</td>
            </tr>
            <tr>
              <td>Product Design Intern</td>
              <td>Parking Panda</td>
              <td>2015</td>
            </tr>
          </tbody>
        </table>
        <h2>Education</h2>
        <table>
          <thead className="sr-only">
            <tr>
              <th>Degree</th>
              <th>School</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Master&apos;s, UX Design</td>
              <td>MICA</td>
              <td>2017</td>
            </tr>

            <tr>
              <td>
                BA, Cognitive Science
                <br />
                Minor, Art &amp; Design
              </td>
              <td>University of Michigan</td>
              <td>2016</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h2>Colophon</h2>
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
          <DescriptionListLabel>UI</DescriptionListLabel>
          <DescriptionListValue>
            <span className="flex items-center gap-1">
              <BaseUiIcon className="size-4" /> Base UI +
              <TreeIconTailwind className="size-4" />
              Tailwind
            </span>
          </DescriptionListValue>
        </DescriptionList>
      </div>
    </div>
  );
}
