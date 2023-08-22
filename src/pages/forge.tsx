// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import { ImageToggle } from "../components/imageToggle";

import {
  Heading,
  Box,
  Text,
  Divider,
  Stack,
  SimpleGrid,
  Icon,
  Container,
  Link,
  GridItem,
  HStack,
  Image,
  Spacer,
  List,
  ListItem,
  UnorderedList,
  Code,
  OrderedList,
} from "@chakra-ui/react";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Forge: React.FC = () => {
  return (
    <Article pageKey="forge">
      <Stack spacing={10}>
        <Text>
          In early 2022, I was asked to assess the current state of Forge,
          Everfi's course builder app, and apply lessons learned from Furnace to
          propose a more scalable and user-friendly design framework.{"  "}
          <Box as="span" opacity=".5">
            I was trying to avoid typing the phrase "mini design system", but
            that's pretty much the gist.
          </Box>
        </Text>
        <Text>Here's a peek before we dive in:</Text>
        <ImageToggle
          before="/assets/forge/forge-before.png"
          after="/assets/forge/forge-after.png"
        />
        <Heading as="h2" size="xl">
          Context
        </Heading>
        <Text>
          Forge is the primary tool used by Everfi's Implementation team, who
          translate course designs into interactive e-learning products. It's a
          Git-connect Electron app that provides an interface for a local
          development environment. Forge leverages the Everfi SDK and component
          library (aka <Link href="/furnace">Furnace</Link>) to allow for course
          creation and ongoing maintenance.
        </Text>
        <Text>
          For much of its existence, Forge was largely a JSON content editing
          tool with a minimal interface. However, the launch of Furnace in early
          2020 hastened adoption by the product team, and requests for more
          powerful WYSIWYG-like features quickly outpaced design capacity.
        </Text>

        <Text>
          The pace of iteration left the app without polish and well-considered
          UX; behind the scenes, its interface was cobbled together with ad-hoc
          styles and a collection of one-off components.
        </Text>
        <Text>
          As the team began to work more in Forge, the rough edges started to
          hinder productivity and quality of life. Without additional design
          intervention, we anticipated that Forge would become a blocker, rather
          than an enabler​.
        </Text>
      </Stack>
      <Stack spacing={10}>
        <Heading as="h2" size="xl">
          Areas of Focus
        </Heading>
        <Heading as="h3" size="lg">
          Color & Contrast
        </Heading>
        <Text>
          In lieu of shadows, increasing lightness can visually communicate a
          surface as having been elevated. This is especially important in
          Forge, given the hierarchical parent-child nature of its editor views.
        </Text>
        <Text>
          Just one problem – Forge's styles included only five neutrals whose
          lightness topped out too quickly, making text virtually illegible
          after a few child views.
        </Text>
        <Text>
          Additional variables that fell outside the color scale were also added
          to the SCSS, leading to inconsistencies like{" "}
          <Code>$interactive-925</Code>.
        </Text>
        <Spacer />
        <LayoutGrid variant="twoUp">
          <GridItem>
            <Stack textStyle="caption">
              <Image borderRadius="xl" src="/assets/forge/colors-neutral.png" />
              <Text>Neutrals before and after</Text>
            </Stack>
          </GridItem>
          <GridItem textStyle="caption">
            <Stack textStyle="caption">
              <Image borderRadius="xl" src="/assets/forge/colors-teal.png" />
              <Text>Primary colors before and after</Text>
            </Stack>
          </GridItem>
        </LayoutGrid>
        <Spacer />
        <Text>
          The new color scale includes values ranging from 100 to 900, plus
          white and black. Each value falls within a similar lightness range as
          its siblings, so we can apply colors from different palettes in a more
          predictable and accessible manner.
        </Text>
        <Spacer />
        <Stack textStyle="caption" align="center">
          <Image borderRadius="xl" src="/assets/forge/colors-all.png" />
          <Text>Full color palette updates</Text>
        </Stack>
        <Spacer />

        <Text>
          Applied to typography and surfaces, the new color palettes fully
          resolved any contrast concerns:
        </Text>
        <LayoutGrid variant="twoUp" my={10}>
          <GridItem textStyle="caption">
            <Stack w="full">
              <Image borderRadius="xl" src="/assets/forge/contrast1.png" />
              <Text>Darker darks!</Text>
            </Stack>
          </GridItem>
          <GridItem textStyle="caption">
            <Stack w="full">
              <Image borderRadius="xl" src="/assets/forge/contrast2.png" />
              <Text>Lighter lights!</Text>
            </Stack>
          </GridItem>
        </LayoutGrid>
        <Spacer />
        <Text>
          The expanded color system also allowed more nuanced styling:
          consistent states, additional variants, and a more distinct difference
          between color modes.
        </Text>
        <Spacer />
        <Image borderRadius="xl" src="/assets/forge/button-modes.png" />
        <ImageToggle
          before="/assets/forge/dark.png"
          after="/assets/forge/light.png"
          tab1="Dark Mode"
          tab2="Light Mode"
        />
      </Stack>

      <Stack spacing={10}>
        <Heading as="h3" size="lg">
          2. Information Density
        </Heading>

        <Heading as="h4" size="md">
          Typography
        </Heading>
        <Text>
          The existing type styles used Source Sans Pro, a particularly tall
          typeface that was neither part of our brand nor well-suited to complex
          desktop applications.
        </Text>
        <Text>
          Starting fresh, I created a more dense type scale with Inter that
          offered a more native look & feel and better-supported the complex
          interface.
        </Text>
        <Spacer />
        <Stack textStyle="caption" align="center">
          <Image borderRadius="xl" src="/assets/forge/type.png" />
          <Text>
            New type scale, with variable names shifted from a web-based
            hierarchy to a more semantic convention
          </Text>
        </Stack>
        <Spacer />
        <Heading as="h4" size="md">
          Edit Forms
        </Heading>
        <Text>
          In addition to the type and its inconsistent application, form styling
          was a primary source of bloat. To combat this, inputs were made more
          compact, and help text was moved into a tooltip to improve
          scannability.
        </Text>
        <Stack w="full">
          <Image borderRadius="xl" src="/assets/forge/inputs.png" />
          <Text textStyle="caption">
            Dense spacing and type applied to input fields
          </Text>
        </Stack>
        <Text>
          With these changes in place, the length of various editor views
          decreased by more than 60%.
        </Text>
        <Stack textStyle="caption" align="center">
          <Image borderRadius="xl" src="/assets/forge/density-compare.png" />

          <Text>Before & after</Text>
        </Stack>
      </Stack>

      <Stack spacing={10}>
        <Heading as="h3" size="lg">
          3. Reorganization
        </Heading>

        <Text>
          A crucial aspect of Forge's utility derives from having its edit views
          auto-generated by page and component schema.
        </Text>

        <Text>
          The drawback, of course, is that this doesn't always conform to a
          user's mental model of content hierarchy. Organization that makes
          sense in code doesn't always make sense in a UI.
        </Text>

        <Text>
          Everything that wasn't related to editing content and parameters moved
          into a modal. At that point, you're editing the course itself – not
          the page you're looking at. Choosing to cover the course preview
          provided free real estate, since it's no longer relevant to the task,
          while simultaneously reinforcing the mental model of editing a
          higher-level view.
        </Text>
        <ImageToggle
          before="/assets/forge/edit-activity-before.png"
          after="/assets/forge/edit-activity-after.png"
        />
        <Text>
          This also benefitted performance and usability, since the old edit UI
          always opened another panel adjacent to the navigation, causing the
          live preview to resize and force a refresh. This was particularly
          frustrating when editing a page, since the page would shift between
          desktop and tablet breakpoints, causing you to lose context.
        </Text>
        <Text>
          Rather than opening in a panel beside the block list, the block editor
          would replace it to prevent resizing and remain consistent with the
          drilldown navigation pattern.
        </Text>
        <ImageToggle
          before="/assets/forge/edit-page-before.png"
          after="/assets/forge/edit-page-after.png"
        />
        <Text>
          Likewise, page actions were moved from a difficult-to-discover
          right-click menu on their parent activities to a dedicated dropdown
          when viewing the page's block list. Rather than editing a page in two
          places, the block list became the home for all page edit features.
        </Text>
        <Stack textStyle="caption" align="center">
          <Image borderRadius="xl" src="/assets/forge/sidebar.png" />

          <Text>Before & after of menu hierarchy and actions</Text>
        </Stack>
      </Stack>

      <Stack spacing={10}>
        <Heading as="h3" size="lg">
          4. Component Standardization
        </Heading>

        <Text>A look at some components with standardized styling:</Text>

        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/buttons.png" />
          <Text>Buttons</Text>
        </Stack>
        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/fields.png" />
          <Text>Inputs</Text>
        </Stack>
        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/nav.png" />
          <Text>Toolbar</Text>
        </Stack>
        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/dialogs.png" />
          <Text>Dialogs</Text>
        </Stack>
      </Stack>

      <Stack spacing={10}>
        <Heading as="h3" size="lg">
          Forge as a design system tool
        </Heading>
        <Text>
          Forge had long since moved away from being a code editor – we needed
          to embrace it as a tool for creation using our design system. Courses
          rely heavily on utility classes generated from system variables in
          order to apply or override theme styles; forcing Forge users to
          memorize and apply class names manually was doing them a disservice.
        </Text>
        <Text>
          To speed up style application and better represent the properties
          enabled by theme primitives, I diverged from the elements provided by
          ReactJsonSchema (which generates Forge's edit forms) and designed a
          collection of custom pickers, affectionately dubbed ~widgets~ by the
          engineers.
        </Text>

        <LayoutGrid variant="twoUp" alignItems="center">
          <GridItem>
            <Stack w="full">
              <Image borderRadius="xl" src="/assets/forge/widgets.png" />
              <Text textStyle="caption">Utility class widgets</Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack w="full">
              <Image borderRadius="xl" src="/assets/forge/theme-picker.png" />
              <Text textStyle="caption">Theme picker</Text>
            </Stack>
          </GridItem>
        </LayoutGrid>
        <Text>
          In addition to widgets, I explored some future-looking UI for editing
          content and saving repeated patterns as course-level components from
          within the app:
        </Text>
        <Stack w="full">
          <Image borderRadius="xl" src="/assets/forge/locale.png" />
          <Text textStyle="caption">In-context locale string editing</Text>
        </Stack>

        <Stack w="full">
          <Image borderRadius="xl" src="/assets/forge/template-logic.png" />
          <Text textStyle="caption">Template builder prototypes</Text>
        </Stack>
      </Stack>
    </Article>
  );
};
