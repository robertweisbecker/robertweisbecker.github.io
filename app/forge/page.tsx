import Link from "next/link";
import { Article } from "@/components/article";
import { ImageModal } from "@/components/image-modal";
import { ImageToggle } from "@/components/image-toggle";
import { LayoutGrid } from "@/components/layout-grid";
import { Heading } from "@/components/ui/heading";

export default function Forge() {
  return (
    <Article pageKey="forge">
      <div className="flex flex-col gap-8">
        <p>
          In early 2022, I was asked to assess the current state of Forge,
          EVERFI&apos;s course builder app, and apply lessons learned from
          Furnace to propose a more scalable and user-friendly design framework.{" "}
          <span className="opacity-50">
            I was trying to avoid typing the phrase &quot;mini design
            system&quot;, but that&apos;s pretty much the gist.
          </span>
        </p>
        <p>Here&apos;s a peek before we dive in:</p>
        <ImageToggle
          before="/assets/forge/forge-before.png"
          after="/assets/forge/forge-after.png"
        />

        <Heading>Context</Heading>
        <p>
          Forge is the primary tool used by EVERFI&apos;s Implementation team,
          who translate course designs into interactive e-learning products.
          It&apos;s a Git-connected Electron app that provides an interface for a
          local development environment. Forge leverages the EVERFI SDK and
          component library (aka <Link href="/furnace">Furnace</Link>) to allow
          for course creation and ongoing maintenance.
        </p>
        <p>
          For much of its existence, Forge was largely a JSON content editing
          tool with a minimal interface. However, the launch of Furnace in early
          2020 hastened adoption by the product team, and requests for more
          powerful WYSIWYG-like features quickly outpaced design capacity.
        </p>
        <p>
          The pace of iteration left the app without polish and well-considered
          UX; behind the scenes, its interface was cobbled together with ad-hoc
          styles and a collection of one-off components.
        </p>
        <p>
          As the team began to work more in Forge, the rough edges started to
          hinder productivity and quality of life. Without additional design
          intervention, we anticipated that Forge would become a blocker, rather
          than an enabler.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Heading>Areas of Focus</Heading>
        <Heading level={3}>Color &amp; Contrast</Heading>
        <p>
          In lieu of shadows, increasing lightness can visually communicate a
          surface as having been elevated. This is especially important in Forge,
          given the hierarchical parent-child nature of its editor views.
        </p>
        <p>
          Just one problem — Forge&apos;s styles included only five neutrals
          whose lightness topped out too quickly, making text virtually
          illegible after a few child views.
        </p>
        <p>
          Additional variables that fell outside the color scale were also added
          to the SCSS, leading to inconsistencies like{" "}
          <code>$interactive-925</code>.
        </p>
        <LayoutGrid variant="twoUp">
          <ImageModal
            src="/assets/forge/colors-neutral.png"
            caption="Neutrals before and after"
          />
          <ImageModal
            src="/assets/forge/colors-teal.png"
            caption="Primary colors before and after"
          />
        </LayoutGrid>
        <p>
          The new color scale includes values ranging from 100 to 900, plus
          white and black. Each value falls within a similar lightness range as
          its siblings, so we can apply colors from different palettes in a more
          predictable and accessible manner.
        </p>
        <ImageModal
          src="/assets/forge/colors-all.png"
          caption="Full color palette updates"
        />
        <p>
          Applied to typography and surfaces, the new color palettes fully
          resolved any contrast concerns:
        </p>
        <LayoutGrid variant="twoUp">
          <ImageModal
            src="/assets/forge/contrast1.png"
            caption="Darker darks!"
          />
          <ImageModal
            src="/assets/forge/contrast2.png"
            caption="Lighter lights!"
          />
        </LayoutGrid>
        <p>
          The expanded color system also allowed more nuanced styling: consistent
          states, additional variants, and a more distinct difference between
          color modes.
        </p>
        <ImageModal src="/assets/forge/button-modes.png" />
        <ImageToggle
          before="/assets/forge/dark.png"
          after="/assets/forge/light.png"
          tab1="Dark Mode"
          tab2="Light Mode"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>2. Information Density</Heading>

        <Heading level={4}>Typography</Heading>
        <p>
          The existing type styles used Source Sans Pro, a particularly tall
          typeface that was neither part of our brand nor well-suited to complex
          desktop applications.
        </p>
        <p>
          Starting fresh, I created a more dense type scale with Inter that
          offered a more native look &amp; feel and better-supported the complex
          interface.
        </p>
        <ImageModal
          src="/assets/forge/type.png"
          caption="New type scale, with variable names shifted from a web-based hierarchy to a more semantic convention"
        />

        <Heading level={4}>Edit Forms</Heading>
        <p>
          In addition to the type and its inconsistent application, form styling
          was a primary source of bloat. To combat this, inputs were made more
          compact, and help text was moved into a tooltip to improve
          scannability.
        </p>
        <ImageModal
          src="/assets/forge/inputs.png"
          caption="Dense spacing and type applied to input fields"
        />
        <p>
          With these changes in place, the length of various editor views
          decreased by more than 60%.
        </p>
        <ImageModal
          src="/assets/forge/density-compare.png"
          caption="Navigation and editor, before & after"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>3. Reorganization</Heading>
        <p>
          A crucial aspect of Forge&apos;s utility derives from having its edit
          views auto-generated by page and component schema.
        </p>
        <p>
          The drawback, of course, is that this doesn&apos;t always conform to a
          user&apos;s mental model of content hierarchy. Organization that makes
          sense in code doesn&apos;t always make sense in a UI.
        </p>
        <p>
          Everything that wasn&apos;t related to editing content and parameters
          moved into a modal. At that point, you&apos;re editing the course
          itself — not the page you&apos;re looking at. Choosing to cover the
          course preview provided free real estate, since it&apos;s no longer
          relevant to the task, while simultaneously reinforcing the mental model
          of editing a higher-level view.
        </p>
        <ImageToggle
          before="/assets/forge/edit-activity-before.png"
          after="/assets/forge/edit-activity-after.png"
        />
        <p>
          This also benefitted performance and usability, since the old edit UI
          always opened another panel adjacent to the navigation, causing the
          live preview to resize and force a refresh. This was particularly
          frustrating when editing a page, since the page would shift between
          desktop and tablet breakpoints, causing you to lose context.
        </p>
        <p>
          Rather than opening in a panel beside the block list, the block editor
          would replace it to prevent resizing and remain consistent with the
          drilldown navigation pattern.
        </p>
        <ImageToggle
          before="/assets/forge/edit-page-before.png"
          after="/assets/forge/edit-page-after.png"
        />
        <p>
          Likewise, page actions were moved from a difficult-to-discover
          right-click menu on their parent activities to a dedicated dropdown
          when viewing the page&apos;s block list. Rather than editing a page in
          two places, the block list became the home for all page edit features.
        </p>
        <ImageModal
          src="/assets/forge/sidebar.png"
          caption="Before & after of menu hierarchy and actions"
        />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>4. Component Standardization</Heading>
        <p>A look at some components with standardized styling:</p>
        <ImageModal src="/assets/forge/buttons.png" caption="Buttons" />
        <ImageModal src="/assets/forge/fields.png" caption="Redesigned inputs" />
        <ImageModal src="/assets/forge/nav.png" caption="Toolbar" />
        <ImageModal src="/assets/forge/dialogs.png" caption="Dialogs" />
      </div>

      <div className="flex flex-col gap-8">
        <Heading level={3}>Forge as a design system tool</Heading>
        <p>
          Forge had long since moved away from being a code editor — we needed to
          embrace it as a tool for creation using our design system. Courses rely
          heavily on utility classes generated from system variables in order to
          apply or override theme styles; forcing Forge users to memorize and
          apply class names manually was doing them a disservice.
        </p>
        <p>
          To speed up style application and better represent the properties
          enabled by theme primitives, I diverged from the elements provided by
          ReactJsonSchema (which generates Forge&apos;s edit forms) and designed
          a collection of custom pickers, affectionately dubbed ~widgets~ by the
          engineers.
        </p>
        <LayoutGrid variant="twoUp">
          <ImageModal
            src="/assets/forge/widgets.png"
            caption="Utility class widgets"
          />
          <ImageModal
            src="/assets/forge/theme-picker.png"
            caption="Theme picker"
          />
        </LayoutGrid>
        <p>
          In addition to widgets, I explored some future-looking UI for editing
          content and saving repeated patterns as course-level components from
          within the app:
        </p>
        <ImageModal
          src="/assets/forge/locale.png"
          caption="In-context locale string editing"
        />
        <ImageModal
          src="/assets/forge/template-logic.png"
          caption="Template builder prototypes"
        />
        <div className="flex flex-col gap-4">
          <p>
            And, for good measure, I also created icons for the production and
            development versions of the app:
          </p>
          <img src="/assets/forge/app-icon.png" alt="Forge app icons" />
        </div>
      </div>
    </Article>
  );
}
