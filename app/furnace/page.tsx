import { Article } from "@/components/article";
import { ImageModal } from "@/components/image-modal";
import { ImageToggle } from "@/components/image-toggle";
import { LayoutGrid } from "@/components/layout-grid";
import { LinkOut } from "@/components/link-out";
import { Heading } from "@/components/ui/heading";

export default function Furnace() {
  return (
    <Article pageKey="furnace">
      <ImageModal src="/assets/furnace/elements-home.png" />

      <div className="flex flex-col gap-8">
        <Heading>Background</Heading>
        <p>
          EVERFI has a large portfolio of e-learning courses, ranging in
          subject from Early Literacy to Workplace Inclusivity to the crowd
          favorite, Bloodborne Pathogen Training. Historically, courses were
          one-offs designed by individual teams using building blocks provided
          by our SDK, styling and composing them in unique ways. However, there
          was no feedback loop to collate these stylesheets, templates, and
          interactions for later reuse, so each new course build started from
          scratch.
        </p>
        <p>
          Around 2018, as the company began to scale, there was a
          well-intentioned effort to do just that. Components were gathered from
          existing courses, their styles turned into variables, and custom
          stylesheets became themes that could be reused across product
          families.
        </p>
        <p>In theory.</p>
        <p>
          But the components were hyper-specific and inflexible. Styles were
          incomplete and context-dependent — font sizes were often hard-coded, a
          padding variable was available on one button but not another. Somehow,
          accordion chevrons were always pink.
        </p>
        <p>
          For the next year, we tried to make do, but without a style or UX
          foundation in place, designers and writers struggled to make square
          pegs designed for a past course fit into round holes posed by a new
          audience or topic.
        </p>
        <p>
          It became difficult to maintain, impossible to fully document, and
          risky to make even minor changes to. We&apos;d have to break
          everything in order to fix it, so in early 2019, I began working on a
          proposal to rethink it from the ground up. By the end of the year,
          we&apos;d built it.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Goals</Heading>
        <ul className="list-disc space-y-4 ps-5">
          <li>
            <b>A centralized style system that supported widespread theming.</b>{" "}
            No more one-off component variables or CSS seeping in from other
            courses.
          </li>
          <li>
            <b>A fully-styled base theme with smart defaults.</b> Documentation
            and QA were nearly impossible because we had no underlying styles for
            the components.
          </li>
          <li>
            <b>Responsive layout and type with additional flexibility.</b> We had
            13 different layout components — none of which were a grid.
          </li>
          <li>
            <b>Standardized iconography.</b> Designers had to export recolored
            SVGs for each new theme.
          </li>
          <li>
            <b>Greater emphasis on utilities.</b> It shouldn&apos;t require a
            feature request to override a text color or make something italic.
          </li>
          <li>
            <b>Improved naming conventions.</b> The lack of a consistent naming
            convention made it difficult to predict the effect of a given class
            and impossible to align our Figma library styles with themeable
            properties.
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Introducing Primitives</Heading>
        <p>
          I worked to distill all styling needed for a theme into seven
          categories that would power the system. These were Primitives, a
          constrained set of foundational design properties that are applied to
          each element in the design system.
        </p>
        <p>
          Changing one value affects all of its instances throughout the system,
          allowing for a consistent application of visual style in a scalable
          and maintainable way. Each component was refactored to use only global
          variables from the following families:
        </p>
        <ul className="list-disc space-y-2 ps-5">
          <li>Color</li>
          <li>Typography</li>
          <li>Spacing</li>
          <li>Border Radius</li>
          <li>Border Width</li>
          <li>Shadows</li>
          <li>Layout</li>
        </ul>
        <ImageModal src="/assets/furnace/elements-primitives.png" />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Color</Heading>
        <p>
          The challenge of creating a theme-friendly color system comes in
          threading the needle between customizability and simplicity — too many
          options will slow both designers and developers creating themes.
        </p>
        <p>
          I wanted to bake as many smart defaults into the system as possible so
          that components and themes could shed the reputation of being unwieldy
          and unpredictable; instead you should only need to worry about your
          handful of primitives, and trust the system to put them in the right
          place.
        </p>
        <p>
          Each theme&apos;s color system is constructed using four color
          palettes, which are limited in scope. These colors are then assigned
          to specific roles to ensure correct contrast and usability throughout
          a course.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Interactive Palette</Heading>
        <LayoutGrid variant="twoUp">
          <p>
            To reduce complexity and help focus learner attention, a single
            primary color scale is used to indicate interactivity in a theme.
            These are ordered from lightest (100) to darkest (900), skipping 400
            and 600 to enforce visual separation between primary and secondary
            elements.
          </p>
          <ImageModal
            src="/assets/furnace/colors-interactive.png"
            caption="Interactive colors: Core theme"
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Semantic Palette</Heading>
        <LayoutGrid variant="twoUp">
          <div className="flex flex-col gap-4">
            <p>
              Semantic status colors convey meaning through convention or
              repeated use outside the primary interactive color. These are
              chiefly used for feedback or status indicators, covering Success,
              Warning, Error, and Informational contexts.
            </p>
            <p>
              These colors are intended to be distinct from a theme&apos;s
              interactive palette so that their presence on a page clearly
              communicates the intended message to learners.
            </p>
          </div>
          <ImageModal
            src="/assets/furnace/colors-semantic.png"
            caption="Semantic colors: Core theme"
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Neutral Palette</Heading>
        <LayoutGrid variant="twoUp">
          <div className="flex flex-col gap-4">
            <p>
              The neutral palette is used for text, borders, and surface states.
              It ranges from near-white (100) to near-black (900) non-linearly
              to avoid muddy middle greys that have poor contrast with
              white/black.
            </p>
            <p>
              In the base theme, neutral colors have a 4.5:1 contrast ratio with
              those five slots away — e.g., Neutrals 100 and 600 have a 5.74
              contrast ratio.
            </p>
          </div>
          <ImageModal
            src="/assets/furnace/colors-neutral.png"
            caption="Default neutral colors"
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Transparent Palette</Heading>
        <LayoutGrid variant="twoUp">
          <div className="flex flex-col gap-4">
            <p>
              The transparent neutral palette is designed for subdued or disabled
              UI elements, dividers, or accents, typically using opacities of
              Neutral 900, but are defined separately for greater theme control.
            </p>
            <p>
              This separation allows theme designers to use handpicked colors for
              overlays and ensures that disabled colors, using a semi-transparent
              midtone, are visible on both light and dark backgrounds.
            </p>
          </div>
          <ImageModal
            src="/assets/furnace/colors-transparent.png"
            caption="Default transparent colors derived from opacities of Neutral palette."
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Color Roles</Heading>
        <p>
          With few exceptions, the colors specified in the palettes are not used
          directly inside components. Instead, they are assigned to two sets of
          color roles: backgrounds and text. Each background color role has a
          corresponding <code>$text-on-[color]</code> variable with which it is
          paired to ensure proper contrast.
        </p>
        <LayoutGrid variant="twoUp">
          <ImageModal
            src="/assets/furnace/color-roles.png"
            caption="Available color role variables in a theme."
          />
          <ImageModal
            src="/assets/furnace/color-roles-flow.png"
            caption="Relationship between color palettes, color roles, and components."
          />
        </LayoutGrid>
        <div className="flex flex-col gap-4">
          <Heading level={4}>For example:</Heading>
          <p>
            Although <code>$text-on-ui-secondary</code> and{" "}
            <code>$text-interactive</code> share the same color in the default
            theme, they are separate variables.
          </p>
          <p>
            This distinction is essential because{" "}
            <code>$text-on-ui-secondary</code> always pairs with{" "}
            <code>$ui-secondary</code> backgrounds, while{" "}
            <code>$text-interactive</code> is used for links that may appear on
            various background colors.
          </p>
          <p>
            By defining the two colors separately, themes can flexibly change
            button colors without compromising the accessibility of links within
            a course.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Spacing</Heading>
        <p>
          Spacing is calculated using a base unit (
          <code>$spacing-xs</code>) multiplied by different scales on mobile and
          desktop breakpoints.
        </p>
        <p>
          Themes do not have the ability to override a single component&apos;s
          spacing — instead, responsive margin and padding are baked into
          components. Changing the base value in a theme will cause the new
          spacing scale to cascade down to each component.
        </p>
        <ImageModal
          src="/assets/furnace/spacing.png"
          caption="Responsive spacing formula"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Typography</Heading>
        <p>
          Our existing text classes weren&apos;t responsive, so that was a
          priority for any new type system.
        </p>
        <p>
          However, it&apos;s not <em>fully</em> responsive — only headings are,
          which is by design. Many of our products, especially in the K12 space,
          have a number of pages with short bits of content punctuated by visuals
          and interactions — there was really no need to shrink the font size.
          Reducing bloat would ease future maintenance, while keeping prose large
          and legible for young users.
        </p>
        <p>
          Plus, we could always add responsive body text in the future if we
          needed it.{" "}
          <span className="text-muted-foreground">
            Spoiler alert: we didn&apos;t — it never once came up.
          </span>
        </p>
        <ImageModal
          src="/assets/furnace/type.png"
          caption="Default type scale with responsive headings. The Core theme uses Lato, EVERFI's brand typeface."
        />
        <p>
          Resize the pen below to see the responsive type and spacing in action.
        </p>
        <iframe
          className="w-full max-w-full rounded-xl p-2"
          style={{ resize: "horizontal", height: 400 }}
          scrolling="no"
          title="Primitives Type & Spacing"
          src="https://codepen.io/weisbecker/embed/preview/eaOyKq?default-tab=result"
          frameBorder="0"
          loading="lazy"
          allowFullScreen
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Layout</Heading>
        <p>
          One of the biggest pain points in our old library was the lack of a
          flexible grid. While there were a number of layout components (13!),
          they were all variations of two-, three-, and four-column grids, and
          each of them simply stacked their children below the desktop
          breakpoint.
        </p>
        <p>
          To replace them, we created two CSS Grid layouts: a classic
          Bootstrap-style 12-column grid for full flexibility, and another
          inspired by{" "}
          <LinkOut
            href="https://m2.material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins"
            text="Material Design 2"
          />{" "}
          that dynamically renders different columns per breakpoint (4 on
          mobile, 8 on tablet, and 12 on desktop).
        </p>
        <LayoutGrid variant="twoUp">
          <ImageModal
            src="/assets/furnace/grid.png"
            caption="Grid examples at the tablet breakpoint. Note that the Dynamic Grid maxes out at 8 columns, while the Static Grid displays 12."
          />
          <ImageModal
            src="/assets/furnace/grid-table.png"
            caption="Documentation comparing responsive class behaviors within the two grids."
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Shadows</Heading>
        <LayoutGrid variant="twoUp">
          <div className="flex flex-col gap-8">
            <p>
              Shadows are defined as five gradually increasing elevations,
              corresponding to perceived z-index, or its relative distance
              &quot;above&quot; the page.
            </p>
            <p>
              Themes can customize these elevations, such as using{" "}
              <code>none</code> for a flat theme or tinting shadows with a color
              from their palette.
            </p>
          </div>
          <ImageModal
            src="/assets/furnace/elevation.png"
            caption="Shadow elevations and z-index guidance"
          />
        </LayoutGrid>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Borders</Heading>
        <p>
          Primitive variables also included <code>border-width</code> and{" "}
          <code>border-radius</code> values. Border colors were applied using
          color palette variables and generated classes.
        </p>
        <ImageModal
          src="/assets/furnace/border-width-2.png"
          caption="We found that only three border-width values were sufficient."
        />
        <ImageModal
          src="/assets/furnace/border-radius-2.png"
          caption="Radii variables were assigned according to a component's relative size."
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Impact</Heading>

        <Heading level={3}>Theming</Heading>
        <p>
          Overall, we drastically simplified theming, while also elevating our
          visual design. Old themes contained 1,595 variables spread across 58
          files — with Primitives in place, themes became a single file
          containing just 63 variables, while providing more comprehensive
          styling than we&apos;d ever had.
        </p>
        <p>
          For the first time, we had a fully styled base theme, Core, that
          aligned 1:1 with our once-aspirational Figma component library.
        </p>
        <ImageModal
          src="/assets/furnace/core.png"
          caption="Core theme with fully-styled base components"
        />
        <p>
          This provided smart defaults for other designers and streamlined the
          creation of new themes, both in Figma and in code. With styles in
          Figma aligned to our primitive variable names, designers were
          empowered to plug those values into an SCSS theme template and ship it
          off to a developer to push.
        </p>
        <ImageModal
          src="/assets/furnace/themes.png"
          caption="The wide variety of themes enabled by primitives"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Development</Heading>
        <p>
          The creation of a base theme and the strict application of primitives
          provided a baseline that enabled regular visual, functional, and
          accessibility QA on each of our components prior to a release.
        </p>
        <p>
          For a sense of the difference this made, compare the two images below
          from our pre- and post-primitives QA environments:
        </p>
        <ImageToggle
          before="/assets/furnace/drawer-before.png"
          after="/assets/furnace/drawer-after.png"
        />
        <p>
          Previously, if a course wanted to use a new component, they would
          manually add and update its unique SCSS variables to their theme, then
          wait for a release before the changes would take effect. With global
          variables in place, implementers could simply drop any component onto
          a page without having to worry that its styles would be broken by a
          missing variable.
        </p>
        <p>
          Behind the scenes, we instituted{" "}
          <LinkOut href="https://getbem.com/naming/" text="BEM naming conventions" />{" "}
          throughout the SCSS and refactored component templates with proper
          semantic markup. We deprecated 20+ components in favor of more
          flexible, general-purpose ones. We also upgraded our dependencies with
          an eye toward easier maintenance and scalability moving forward.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Internationalization</Heading>
        <p>
          The addition of new grid, typography, and spacing systems made
          internationalization of courses possible, satisfying a major business
          priority.
        </p>
        <p>
          With the removal of hard-coded dimensions and spacing, element sizing
          was now determined solely by the sum of its font-size, line-height,
          and padding. This approach accommodated localization and
          internationalization, since certain languages can greatly increase the
          length of content.
        </p>
        <p>
          We also added RTL support to our grid, allowing it to flip based on
          the locale. Horizontal margin/padding also reverse in RTL, along with
          directional icons.
        </p>
        <ImageModal
          src="/assets/furnace/int.png"
          caption="Testing pseudo-localization in our QA environment"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Accessibility</Heading>
        <p>
          In early 2019, prior to the refactor, 352 accessibility issues in
          courses were attributed to components — an average of 88 per quarter.
          That dropped to 14 in the quarter after our release; by the next year,
          there were just 2 reported bugs in the same quarter.
        </p>
        <p>
          Prior to the launch of Furnace, none of our courses were fully
          compliant with WCAG Level A or AA criteria. By the end of 2020, we had
          five new courses that met all AA requirements, and 21 courses had
          reached full compliance in the next year.
        </p>
        <p>
          A 2021 accessibility audit revealed that 87% of our components were
          now fully accessible. For more insight, check out my colleague{" "}
          <LinkOut href="http://anniealvarado.com" text="Annie Alvarado's" />{" "}
          presentation for{" "}
          <LinkOut
            href="https://makeitfable.com/article/experts-with-fable-everfi-cvs-health/"
            text="Fable Accessibility"
          />
          .
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>By the numbers</Heading>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Variables per theme", value: "62", change: "-1,533 (-96%)", down: true },
            { label: "Layout components", value: "2", change: "-10 (-83%)", down: true },
            { label: "Unique spacing declarations", value: "6", change: "-136 (-96%)", down: true },
            { label: "Color combinations", value: "44", change: "-109 (-71%)", down: true },
            { label: "Responsive courses", value: "74", change: "+65 (720%)", down: false },
            { label: "AA-compliant components", value: "59", change: "+53 (2580%)", down: false },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-light">{stat.value}</p>
              <p className="font-mono text-xs text-muted-foreground">
                <span className={stat.down ? "text-green-500" : "text-green-500"}>
                  {stat.down ? "↓" : "↑"}
                </span>{" "}
                {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Article>
  );
}
