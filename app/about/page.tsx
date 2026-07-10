"use client";

import { BaseUiIcon, FigmaIcon, NextJsIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { TreeIconTailwind } from "@/components/icons/tree";
import { DescriptionList, DescriptionListLabel, DescriptionListValue } from "@/components/ui/description-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto grid max-w-4xl px-4">
      <div className="prose container">
        <h1>About</h1>

        <LayoutGrid variant="fit" className="mx-auto max-w-xl">
          <div className="prose columns-2 text-balance [&_p]:mt-0">
            <p>
              I&apos;m currently a principal designer at&nbsp;
              <LinkOut href="https://everfi.com" text="Everfi" />
              &nbsp;where I work on products & tooling to help drive social good through education. These things have&nbsp;
              <LinkOut
                href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year#:~:text=reached%20more%20than-,45%20million,-learners%20globally%2C%20in"
                text="allegedly"
              />
              &nbsp;reached more than 45 million learners{" "}
              <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="inline-block">
                <path
                  d="M8 1.5C8.25 1.5 8.52 1.61 8.82 1.91C9.11 2.2 9.41 2.65 9.66 3.25C10.17 4.44 10.5 6.12 10.5 8C10.5 9.88 10.17 11.56 9.66 12.75C9.41 13.35 9.11 13.8 8.82 14.09C8.52 14.39 8.25 14.5 8 14.5C7.75 14.5 7.48 14.39 7.18 14.09C6.89 13.8 6.59 13.35 6.34 12.75C5.83 11.56 5.5 9.88 5.5 8C5.5 6.12 5.83 4.44 6.34 3.25C6.59 2.65 6.89 2.2 7.18 1.91C7.48 1.61 7.75 1.5 8 1.5Z"
                  stroke="currentColor"
                />
                <path
                  d="M12.67 12.52C11.43 11.89 9.79 11.5 8 11.5C6.21 11.5 4.57 11.89 3.33 12.52M12.67 12.52C13.8 11.35 14.5 9.76 14.5 8C14.5 6.56 14.03 5.23 13.24 4.15M12.67 12.52C11.49 13.74 9.83 14.5 8 14.5C6.17 14.5 4.51 13.74 3.33 12.52M3.33 12.52C2.2 11.35 1.5 9.76 1.5 8C1.5 6.56 1.97 5.23 2.76 4.15M13.24 4.15C11.96 4.98 10.09 5.5 8 5.5C5.91 5.5 4.04 4.98 2.76 4.15M13.24 4.15C12.06 2.54 10.15 1.5 8 1.5C5.85 1.5 3.94 2.54 2.76 4.15"
                  stroke="currentColor"
                />
                <path d="M14 8.5H2" stroke="currentColor" />
              </svg>{" "}
              globally.
            </p>
            <p>
              Since 2021, I&apos;ve led the implementation of a shared design system across admin, educator, and learner-facing products.
              Read a bit about that process{" "}
              <Link href="/unified-design-language" className="link">
                here
              </Link>
              .
            </p>
          </div>
        </LayoutGrid>

        <div className="prose mx-auto max-w-xl">
          <p>To get in touch, you can find or reach me here:</p>
          <div className="flex flex-wrap justify-stretch gap-2 max-sm:flex-col">
            <Button render={<a href="mailto:yo@bob.fyi" />} nativeButton={false} variant="elevated" size="sm">
              <IconMailFilled data-icon="inline-start" />
              yo@bob.fyi
            </Button>
            <Button
              render={<a href="https://www.linkedin.com/in/robertweisbecker/" target="_blank" rel="noopener noreferrer" />}
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
          , shepherding its transition from an unstyled SDK into an accessible component library with theming and tooling to support 80+
          courses across a dozen branded product lines.
        </p>
        <p>Some other things I&apos;ve done:</p>
        <ul className="list-disc space-y-3 ps-5">
          <li>
            Led design efforts for financial &amp; K12 products at EVERFI, including{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/" text="Achieve" />,{" "}
            <LinkOut href="https://everfi.com/financial-education/consumers/engage/" text="Engage" />, and{" "}
            <LinkOut href="https://everfi.com/courses/k-12/teaching-data-science-in-high-school/" text="Data Science" />.
          </li>
          <li>Worked on education products for customers such as Google, Meta, LinkedIn, Kroger, Beyond Meat, Truist, and more.</li>
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
            at NPR when I wasn&apos;t busy <LinkOut href="https://youtu.be/lgmw41CY1Fo?t=36" text="standing awkwardly" /> in the background
            of Tiny Desk recordings
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
