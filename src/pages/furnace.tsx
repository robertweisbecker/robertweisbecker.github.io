import ProjectGrid from "../components/projectGrid";

import { LayoutGrid } from "../components/layout";
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
  List,
  ListItem,
  Spacer,
  Wrap,
} from "@chakra-ui/react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { HandIcon, EyeOpenIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Furnace: React.FC = () => {
  return (
    <Stack spacing={16} py={20}>
      <Heading as="h1">Furnace</Heading>
      <Heading as="h2">Background</Heading>
      Prior to my arrival at Everfi, courses were largely It was difficult to
      maintain, impossible to fully document, and risky to make even minor
      changes to. We were left with a Catch-22: we wanted to create new and
      improved course themes, but doing so would break existing themes. The only
      way out of this mess was...to break everything. And so we did.
      <Heading as="h2">Approach</Heading>
      <List>
        <ListItem>
          A centralized style system. No more one-off component variables or CSS
          seeping in from other courses.
        </ListItem>
        <ListItem>
          A fully-styled base theme with smart defaults. Documentation and QA
          were nearly impossible because we had no underlying styles for the
          components. Instead, variables were set to values matching the course
          they were originally built for – leaving any documentation we created
          littered with mismatched fonts, white text on white, and a whole
          Skittles bag full of icon colors.
        </ListItem>
        <ListItem>
          Responsive layout and type with additional flexibility. We had 13
          different layout components
        </ListItem>
        <ListItem>Standardized iconography.</ListItem>
        <ListItem>Greater emphasis on utilities​.</ListItem>
        <ListItem>Upgraded dependencies.​</ListItem>
      </List>
      <Divider />
      <Heading as="h2">Proof of Concept</Heading>
      * Comparing existing design systems * Glitch and Codepen examples Some
      decisions: * full theming but *
      <Divider />
      <Heading as="h2">Primitives</Heading>I worked to all styling needed for a
      theme into seven categories of primitive variables that would serve as the
      system's foundations. Each component would be refactored to pull all of
      its styles from this single set of variables:
      <List>
        <ListItem>Typography</ListItem>
        <ListItem>Spacing</ListItem>
        <ListItem>Border</ListItem>
        <ListItem>Border Radius</ListItem>
        <ListItem>Border Width</ListItem>
        <ListItem>Shadows</ListItem>
        <ListItem>Iconography</ListItem>
        <ListItem>Layout</ListItem>
      </List>
      Here's a look at where we ended up:
      <Image src="placehold.co/800x400" />
      <Heading as="h2">Color</Heading>
      <Text>
        The challenge of creating a color system is threading the needle between
        customizability and simplicity – too many options will slow both
        designers and developers creating themes.
      </Text>
      <Text>
        I wanted to bake as many smart defaults into the system as possible so
        that components and themes could shed the reputation of being unwieldy
        and unpredictable; instead they would
      </Text>
      <Text>
        Each theme’s color system is built around a set of four color palettes.
        These colors are are then assigned to specific roles to ensure correct
        contrast contrast and usability throughout a course. Palette colors are
        each generated as a utility class for font-color, border-color, and
        background-color. These can be used to override the color of elements
        throughout a course as needed.
      </Text>
      <Heading as="h3"> Interactive Palette</Heading>
      <Text>
        To maintain learner focus, we stick to a single primary color scheme to
        indicate interactivity in a theme. Colors are ordered from lightest
        (100) to darkest (900), skipping 400 and 600. This is done to enforce
        visual separation between primary and secondary elements, since three
        dark and three light variants sufficiently covers the range of UI
        states.
      </Text>
      <Image src="placehold.co/800x400" />
      <Heading as="h3">Status Palette</Heading>
      <Text>
        Status colors convey meaning through convention or repeated use outside
        the primary interactive color. These are chiefly used for feedback or
        status indicators, covering Success, Warning, Error, and Informational
        contexts.
      </Text>
      <Text>
        These colors are intended to be distinct from a theme’s interactive
        palette so that their presence on a page clearly communicates the
        intended message to learners. For example, the default informational
        color is purple, but a theme with purple buttons should opt for a
        different semantic informational color like blue.
      </Text>
      <Image src="placehold.co/800x400" />
      <Heading as="h3">Neutral Palette</Heading>
      <Text>
        The neutral palette is used for text, borders, and surface states. It
        ranges from near-white (100) to near-black (900) non-linearly to avoid
        muddy middle greys that have poor contrast with white/black.
      </Text>
      <Text>
        In the base theme, neutral colors have a 4.5:1 contrast ratio with those
        five slots away – e.g., Neutrals 100 and 600 have a 5.74 contrast ratio.
        Course designers are discouraged from overriding these colors without
        first verifying the relative contrast of a replacement palette.
      </Text>
      <Image src="placehold.co/800x400" />
      <Heading as="h3">Transparent Palette</Heading>
      <Text>
        The transparent neutral palette is designed for subdued or disabled UI
        elements, dividers, or accents, typically using opacities of Neutral
        900, but defined separately for greater theme control.
      </Text>
      <Text>
        This separation allows theme designers to use handpicked colors for
        overlays and ensures that disabled colors, using a semi-transparent
        midtone, are visible on both light and dark backgrounds.
      </Text>
      <Image src="placehold.co/800x400" />
      <Heading as="h2">Color Roles</Heading>
      <Text>
        With few exceptions, the colors specified in the palettes are not used
        directly inside components. Instead, they are assigned to assigned to
        two sets of color roles: backgrounds and text. Each background color
        role has a corresponding `$text-on-[color]` variable with which it is
        paired to ensure proper contrast.
      </Text>
      <Heading as="h3">For example:</Heading>
      Although `$text-on-ui-secondary--default` and `$text-interactive` share
      the same color in the default theme, they are separate variables. This
      distinction is essential because `$text-on-ui-secondary--default` always
      pairs with `$ui-secondary--default` backgrounds, while `$text-interactive`
      is used for links that may appear on various background colors.
      <Text>
        By defining the two colors separately, themes can flexibly change button
        colors without compromising the accessibility of links within a course.
      </Text>
      <Heading as="h2">Spacing</Heading>
      <Text>
        Spacing is calculated using a base unit (xs) multiplied by different
        scales on mobile and desktop breakpoints.
      </Text>
      <Text>
        Themes do not have the ability to override a single component’s spacing
        – instead, responsive margin and padding are baked into components.
        Changing the base value in a theme will cause the new spacing scale to
        cascade down to each component.
      </Text>
      <Heading as="h2">Typography</Heading>
      <Text>
        Previously, our typography was not responsive, so that was a priority
        within the new system.
      </Text>
      <Text>
        A common issue in our legacy courses was the incorrect use of heading
        levels – ie. using a different semantic element for a smaller heading
        style. This wasn’t something we could enforce from a systems level, but
        we could at least provide cues to nudge product teams in the right
        direction.
      </Text>
      <Text>
        A system should provide the flexibility to accommodate those needs,
        instead of handcuffing designers to a fixed scale. But, as a product
        serving products, a design system should aim to include guardrails to
        nudge designers toward more accessible outcomes. In that sense, it's
        typically a good idea to decouple semantics from styles, lest you have
        designers revolting and detaching instances.
      </Text>
      <Text>
        To that end, I chose to name our heading primitives to match semantic
        HTML counterparts. This approach helps designers and developers
        recognize when utility classes should be used to adjust styles rather
        than skipping a level.
      </Text>
      <Heading as="h2">Shadows</Heading>
      <Text>
        Shadows are defined as five gradually increasing elevations,
        corresponding to perceived z-index, or its relative distance “above” the
        page. Themes can customize these elevations, such as using 'none' for a
        flat theme or tinting shadows with a color from their palette. Some
        themes have even used layered box-shadows to add an additional border to
        elements upon interaction.
      </Text>
      <Heading as="h2">Impact</Heading>
      <Text>
        For the first time, we had a fully styled base theme, Core, that matches
        our Figma component library.
      </Text>
      <Heading as="h3">Theming</Heading>
      <Text>
        In all, we drastically simplified theming, while also elevating our
        visual design. The previous version contained 1,595 variables spread
        across 58 files – with Primitives in place, themes became a single file
        containing 63 variables.
      </Text>
      Behind the scenes, we implemented BEM naming convention for our styles,
      refactored components to use proper semantic markup, and upgraded our
      dependencies, with an eye toward easier maintenance and scalability moving
      forward.
      <Heading as="h3">Internationalization</Heading>
      <Text>
        The addition of new grid, typography, and spacing systems made
        internationalization of courses possible.
      </Text>
      <Text>
        With the removal of hard-code dimensions and spacing, the size of an
        element is now determined solely by font-size, line-height, and padding.
        This approach accommodates localization and internationalization, as
        certain languages can greatly increase the length of content and would
        have caused overflow issues had we continued using explicit dimensions.
      </Text>
      <Text>
        We also added RTL language support to the new grid, allowing it to flip
        based on the locale. Left and right margin and padding also reverse when
        this happens.
      </Text>
      <Text>
        To ensure that courses were able to be translated, we now override a
        theme's typeface in favor of Noto Sans, which has wide multilingual
        support.
      </Text>
      <Heading as="h3">Accessibility</Heading>
      <Text>
        In 2019, prior to the refactor, 352 accessibility issues in courses were
        attributed to components – an average of 88 per quarter.
      </Text>
      <Text>
        That dropped to 14 in the quarter after our release; by the next year,
        there were just 2 reported bugs in the same quarter.
      </Text>
      <Text>
        Prior to the launch of Furnace, none of our courses were fully compliant
        with WCAG Level A or AA criteria. By the end of 2020, we had five new
        courses that met all AA requirements, and 21 courses had reached full
        compliance in the next year.
      </Text>
      <Text>
        A 2021 accessibility audit revealed that 87% of our components were now
        fully accessible, with the remaining components having minor issues that
        were addressed in subsequent releases.
      </Text>
    </Stack>
  );
};
