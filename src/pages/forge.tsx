// import Resume from '../components/resume';
import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";

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
        <Heading as="h2" size="xl">
          Background
        </Heading>
        <Text>
          For much of its existence, Forge was largely a JSON content editing
          tool with a minimal interface. However, the launch of our revamped
          product design system in early 2020 hastened adoption by the product
          team, and requests for more powerful WYSIWYG-like features quickly
          outpaced design capacity.
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
          Sometimes the most obvious solution works, and making the darks darker
          and the lights lighter resolved any contrast or legibility concerns:
        </Text>
        <LayoutGrid variant="twoUp" my={10}>
          <GridItem textStyle="caption">
            <Stack>
              <Image borderRadius="xl" src="/assets/forge/contrast1.png" />
              <Text>Darker darks!</Text>
            </Stack>
          </GridItem>
          <GridItem textStyle="caption">
            <Stack>
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
          Starting fresh, I created a more dense type scale using Inter{" "}
          <Box as="span" opacity=".5">
            (I couldn't resist!)
          </Box>{" "}
          that offered a native look & feel and better-supported the complex
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
          Editor Inputs
        </Heading>
        <Text></Text>
        <Stack textStyle="caption" align="center">
          <Image borderRadius="xl" src="/assets/forge/type.png" />

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
      </Stack>

      <Stack spacing={10}>
        <Heading as="h3" size="lg">
          Components
        </Heading>

        <Text>A look at the UI with the new system applied:</Text>
        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/fields.png" />
          <Text>Inputs</Text>
        </Stack>

        <Stack textStyle="caption">
          <Image borderRadius="xl" src="/assets/forge/buttons.png" />
          <Text>Buttons</Text>
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
            <Stack>
              <Image borderRadius="xl" src="/assets/forge/widgets.png" />
              <Text>Utility class widgets</Text>
              <Text> </Text>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack>
              <Image borderRadius="xl" src="/assets/forge/theme-picker.png" />
              <Text>Theme picker</Text>
              <Text> </Text>
            </Stack>
          </GridItem>
        </LayoutGrid>
        <Text>
          In addition to widgets, I explored some future-looking UI for editing
          content and saving repeated patterns as course-level components from
          within the app:
        </Text>
        <Stack>
          <Image borderRadius="xl" src="/assets/forge/locale.png" />
          <Text>In-context locale string editing</Text>
          <Text> </Text>
        </Stack>

        <Stack>
          <Image borderRadius="xl" src="/assets/forge/template-logic.png" />
          <Text>Template builder prototypes</Text>
          <Text> </Text>
        </Stack>
      </Stack>
    </Article>
  );
};
