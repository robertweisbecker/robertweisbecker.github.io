"use client";

import { FigmaIcon, GithubIcon, LinkedinIcon } from "@/components/icons";
import { Image } from "@/components/image";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconMailFilled } from "@tabler/icons-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto mt-10 grid max-w-3xl px-4">
      <div className="prose container">
        <h1>About</h1>
        <LayoutGrid variant="twoThirds" className="mx-auto max-w-xl">
          <div className="prose">
            <p>My birth certificate says Robert, but everyone calls me Bob.</p>

            <p>
              I&apos;m currently a principal designer at <LinkOut href="https://everfi.com" text="Everfi" /> designing
              products, components, and tooling to help drive social good through education. These things have{" "}
              <LinkOut
                href="https://www.blackbaud.com/newsroom/article/blackbaud-acquires-everfi-a-saas-leader-powering-corporate-esg-and-csr-initiatives-that-reach-millions-of-learners-each-year#:~:text=reached%20more%20than-,45%20million,-learners%20globally%2C%20in"
                text="allegedly"
              />{" "}
              reached more than 45 million learners globally.
            </p>
            <p>
              Since 2021, I&apos;ve been leading the implementation of a unified design system across admin, educator,
              and learner-facing products. Read a bit about that process{" "}
              <Link href="/unified-design-language">here</Link>.
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
          Starting in 2018, I led the creation of our product organization&apos;s{" "}
          <Link className="link" href="/unified-design-language">
            first design system
          </Link>
          , shepherding its transition from an unstyled SDK into an accessible component library with theming and
          tooling to support 80+ courses across a dozen branded product lines.
        </p>
        <p>Some other things I&apos;ve done:</p>
        <ul className="list-disc space-y-3 ps-5">
          <li>
            Led design efforts for adult &amp; K12 e-learning courses at EVERFI, including{" "}
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
            Designed web &amp; iOS screens, performed user testing, and made some{" "}
            <LinkOut
              text="social media assets"
              href="https://twitter.com/ParkingPanda/status/617057417696833536?s=20"
            />{" "}
            for <LinkOut href="https://www.parkingpanda.com" text="Parking Panda" />
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
                Principal Designer, Design Systems Lead{" "}
                <span className="relative ms-2 mb-px inline-block size-1 rounded-full bg-current align-middle text-success-primary after:absolute after:-inset-1 after:-z-1 after:animate-pulse after:rounded-full after:bg-success" />
              </td>
              <td>Everfi</td>
              <td>2024—now</td>
            </tr>
            <tr>
              <td>Principal Designer, Platform</td>
              <td>Blackbaud</td>
              <td>2022—2024</td>
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
              <td>Design Intern, Research & Development</td>
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
              <td>2016—2017</td>
            </tr>

            <tr>
              <td>BA, Cognitive Science ∙ Minor, Art &amp; Design</td>
              <td>University of Michigan</td>
              <td>2012—2016</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
