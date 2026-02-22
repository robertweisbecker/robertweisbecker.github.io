import Link from "next/link";
import { Article } from "@/components/article";
import { ImageModal } from "@/components/image-modal";
import { ImageToggle } from "@/components/image-toggle";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";

export default function UDL() {
  return (
    <Article pageKey="unified-design-language">
      <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 9" }}>
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat dark:hidden"
          style={{ backgroundImage: "url(/assets/udl/foundry-light.png)" }}
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-top bg-no-repeat dark:block"
          style={{ backgroundImage: "url(/assets/udl/foundry-dark.png)" }}
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Context</Heading>
        <p>
          In late 2021, it became clear that EVERFI&apos;s products lacked a
          cohesive identity and experience; they looked like (and were) built by
          different teams.
        </p>
        <p>
          The journey from website → platform → product ping-ponged users from
          one interface to another, undermining the experience for admins,
          teachers, and learners. So we set out to define a singular point of
          view re: how an Everfi product should look, feel, and behave, and to
          codify it in a new shared design language.
        </p>
      </div>

      <p>We kicked it off with our own definition:</p>
      <p className="my-5 border-l-4 border-border px-6 text-lg leading-relaxed text-muted-foreground">
        A design language consists of an agreed-upon{" "}
        <span className="font-medium">visual and interaction</span> design
        foundation upheld in both{" "}
        <span className="font-medium">code and design</span> workflows to
        foster <span className="font-medium">consistency</span>,{" "}
        <span className="font-medium">intentionality</span>, and{" "}
        <span className="font-medium">predictability</span> within and across
        products.
      </p>

      <ImageModal
        src="/assets/udl/ecosystem.png"
        caption="All the different ways we display course content across products and platforms"
      />

      <div className="flex flex-col gap-8">
        <p>
          Different products rely on different tech stacks, each influencing
          their respective design direction at inception and ultimately dictating
          the degree to which they could share with one another.
        </p>
        <p>
          The question &quot;What does an EVERFI button look like?&quot; has a
          different answer depending on which product you look at. Multiply this
          kind of variation across a full library of styles and components per
          product — fields, cards, headers, footers, surveys, data viz — and
          layer in intentional theming of courses and platform tailored to
          content, network, and/or customer branding, and of course we end up
          with a disjointed experience.
        </p>
        <ImageModal
          src="/assets/udl/styles-foundry.png"
          caption="Foundry, the assigned learning platform, is powered by its own React design system, Alloy, which takes cues from Material Design"
        />
        <ImageModal
          src="/assets/udl/styles-homeroom.png"
          caption="Homeroom, the K12 platform, uses fully-custom styles that override its underlying legacy Bootstrap components. Its teacher-facing UI was redesigned in 2019, but other parts of the app remain untouched."
        />
        <ImageModal
          src="/assets/furnace/theme-previews.png"
          caption="EVERFI courses use Furnace, our product design system and SDK, to create custom themes that vary greatly depending on customer, audience, and learning style. The underlying base theme, Core, is a polished (and generic) theme that incorporates some aspects of EVERFI's branding."
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>How</Heading>
        <p>
          We began with our North Star not as a design system but a common
          design language that could guide our products closer together. The idea
          of sharing styles and components org-wide was unthinkable given the
          radically different natures of the respective codebases.
        </p>
        <p className="opacity-50">
          Spoiler alert: it became thinkable. Keep reading.
        </p>
        <p>
          Instead, we set out to establish core design principles that we could
          weave throughout experiences wherever technically feasible. But, first,
          we needed to get the lay of the land.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Audit</Heading>
        <p>
          To assess the existing design languages in use across products, I
          devised a set of benchmarks we could use to gauge the &quot;system
          health&quot; of our platforms, comparing their architecture to the
          more mature system in <Link href="/furnace">Furnace</Link>.
        </p>
        <p>
          We then set off on an old-fashioned visual audit cataloguing each step
          in a potential admin, teacher, or learner journey.
        </p>
        <ImageModal
          src="/assets/udl/audit.png"
          caption="A snippet of our UI audit & the system health report"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>The Great <span className="uppercase">Everfi</span> Component-Off</Heading>
        <p>
          The next step was to establish an opinion — to coalesce around a
          general visual style that reflected our brands, best practices, and,
          to an extent, our taste as a group of designers.
        </p>
        <p>
          That spurred the first — and hopefully last —{" "}
          <span className="font-medium">
            Great EVERFI Component-Off&trade;
          </span>
          . We pitted competing components from platforms and products against
          one another, holding working sessions to dissect their behavior,
          style, and utility. For each moment of consensus, we laid another brick
          in our growing foundations.
        </p>
        <div>
          <ImageToggle
            before="/assets/udl/off-before.png"
            after="/assets/udl/off-after.png"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            There can be only one <del>Highlander</del> popover
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Proof of Concept</Heading>
        <p>
          When we&apos;d reached a critical mass of solid decisions, I created a
          rough set of components to stress-test in various use cases across the
          organization. The goal was to further refine our approach and develop a
          proof of concept that we could pitch to leadership.
        </p>
        <ImageModal
          src="/assets/udl/login-after.png"
          caption="One sign-in screen to rule them all"
        />
        <ImageModal
          src="/assets/udl/create-after.png"
          caption="Aligning admin and K12 platform login flows"
        />
        <ImageModal
          src="/assets/udl/evaluations-after.png"
          caption="Evaluations in platform and course contexts"
        />
        <ImageToggle
          before="/assets/udl/data-before.png"
          after="/assets/udl/data-after.png"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Foundations</Heading>
        <p>
          The proof of concept helped to crystallize our new foundations. Key
          decisions included:
        </p>
        <ul className="list-disc space-y-4 ps-5">
          <li>
            Aligning on the use of Lato, our brand typeface, across products
          </li>
          <li>
            Replacing mixed and inconsistent iconography with a single icon
            library
          </li>
          <li>
            Shifting from bespoke color palettes per theme to a curated
            collection of accessible palettes extrapolated from our brand colors
          </li>
          <li>
            Introducing a layer of density theming, reflected in typography and
            spacing, to support varied tasks and content types across products
            and platforms
          </li>
        </ul>
        <ImageToggle
          before="/assets/udl/color-before.png"
          after="/assets/udl/color-after.png"
        />
        <ImageToggle
          before="/assets/udl/type-before.png"
          after="/assets/udl/type-after.png"
        />
        <ImageToggle
          before="/assets/udl/space-before.png"
          after="/assets/udl/space-after.png"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Implementation</Heading>
        <Heading level={3}>Moving to React</Heading>
        <p>
          We were given the green light to implement the new design language —
          and to rebuild Furnace in React, so that it could be integrated with
          Alloy into a new design system monorepo powering all of{" "}
          <span className="uppercase">Everfi</span>&apos;s front end. A tall
          task but a huge win.
        </p>

        <Heading level={3}>Design ➡️ Code</Heading>
        <p>
          We continued iterating on our foundations, arriving at a family of
          comprehensive design tokens that supported all our needs.
        </p>
        <ImageModal
          src="/assets/udl/docs-tokens.png"
          caption="Figma token documentation"
        />
        <ImageModal
          src="/assets/udl/base-tokens.png"
          caption="Some of our base (global) tokens"
        />
        <ImageModal
          src="/assets/udl/semantic-tokens.png"
          caption="Semantic color tokens"
        />
        <p>
          To ensure that tokens served as a single source of truth, I migrated
          our Figma styles to use{" "}
          <LinkOut href="https://tokens.studio/" text="Tokens Studio" /> to
          enable syncing with GitHub. Once imported, tokens were converted from
          JSON to TypeScript via{" "}
          <LinkOut
            href="https://amzn.github.io/style-dictionary/#/"
            text="Amazon Style Dictionary"
          />{" "}
          for consumption by the new React components.
        </p>
        <p>
          For products that weren&apos;t quite ready for React migration (like
          Homeroom, the K12 platform), we also generated SCSS variables so that
          we could refresh their styles to match their updated siblings.
        </p>
        <ImageModal src="/assets/udl/design-code.png" />
        <ImageModal
          src="/assets/udl/storybook-colors.png"
          caption="Base color palette tokens in Storybook"
        />
        <ImageModal
          src="/assets/udl/storybook-tokens.png"
          caption="Semantic color tokens in Storybook"
        />
        <p>
          With the help of the{" "}
          <LinkOut
            href="https://www.figma.com/community/plugin/1205622541257680763/EightShapes-Specs"
            text="EightShapes Specs"
          />{" "}
          Figma plugin from{" "}
          <LinkOut
            href="https://medium.com/eightshapes-llc/the-eightshapes-specs-figma-plugin-2892f21adc96"
            text="Nathan Curtis"
          />
          , I was able to create detailed component specs that included
          corresponding token and variable data.
        </p>
        <ImageModal src="/assets/udl/specs.png" />
        <ImageModal
          src="/assets/udl/figma.png"
          caption="Buttons in Figma"
        />
        <ImageModal
          src="/assets/udl/storybook.png"
          caption="Buttons in Storybook"
        />
      </div>
    </Article>
  );
}
