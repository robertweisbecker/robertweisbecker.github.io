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
  List,
  ListItem,
  Code,
  Spacer,
  Wrap,
  UnorderedList,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
} from "@chakra-ui/react";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Furnace: React.FC = () => {
  return (
    <Article pageKey="furnace">
      <Stack spacing={10} pb={20}>
        <Heading as="h2">Background</Heading>
        <Text>
          Everfi has a large portfolio of e-learning courses, ranging in subject
          from Early Literacy to Workplace Inclusivity to the crowd favorite,
          Bloodborne Pathogen Training. Historically, courses were one-offs
          designed by individual teams using building blocks provided by our
          SDK, styling and composing them in unique ways. However, there was no
          feedback loop to collate these stylesheets, templates, and
          interactions for later reuse, so each new course build started from
          scratch.
        </Text>
        <Text>
          Around 2018, as the company began to scale, there was a
          well-intentioned effort to do just that. Components were gathered from
          existing courses, their styles turned into variables, and custom
          stylesheets became themes that could be reused across product
          families.
        </Text>
        <Text>In theory.</Text>
        <Text>
          But the components were hyper-specific and inflexible. Styles were
          incomplete and context-dependent – font sizes were often hard-coded, a
          padding variable was available on one button but not another. Somehow,
          accordion chevrons were always pink.
        </Text>
        <Text>
          For the next year, we tried to make do, but without a style or UX
          foundation in place, designers and writers struggled to make square
          pegs designed for a past course fit into round holes posed by a new
          audience or topic.
        </Text>
        <Text>
          It became difficult to maintain, impossible to fully document, and
          risky to make even minor changes to. We'd have to break everything in
          order to fix it, so in early 2019, I began working on a proposal to
          rethink it from the ground up. By the end of the year, we'd built it.
        </Text>
        <Heading as="h2">Goals</Heading>
        <UnorderedList spacing={4}>
          <ListItem>
            A centralized style system that supported widespread theming. No
            more one-off component variables or CSS seeping in from other
            courses.
          </ListItem>
          <ListItem>
            A fully-styled base theme with smart defaults. Documentation and QA
            were nearly impossible because we had no underlying styles for the
            components. Instead, variables were set to values matching the
            course they were originally built for – leaving any documentation we
            created littered with mismatched fonts, white text on white, and a
            whole Skittles bag full of icon colors.
          </ListItem>
          <ListItem>
            Responsive layout and type with additional flexibility. We had 13
            different layout components – none of which were a grid.
          </ListItem>
          <ListItem>
            Standardized iconography. Designers had to export recolored SVGs for
            each new theme.
          </ListItem>
          <ListItem>
            Greater emphasis on utilities​. It shouldn't require a feature
            request to override a text color or make something italic.
          </ListItem>
          <ListItem>Improved naming conventions</ListItem>
        </UnorderedList>
        <Heading as="h2">Primitives</Heading>
        <Text>
          I worked to distill all styling needed for a theme into seven
          categories that would power the system. These were Primitives, a
          constrained set of foundational design properties that are applied to
          each element in the design system.​ ​Changing one value affects all of
          its instances throughout the system, allowing for a consistent
          application of visual style in a scalable and maintainable way.​
        </Text>
        <Text>
          Each component would then be refactored to pull all of its styles from
          global variables for:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>Color</ListItem>
          <ListItem>Typography</ListItem>
          <ListItem>Spacing</ListItem>
          <ListItem>Border Radius</ListItem>
          <ListItem>Border Width</ListItem>
          <ListItem>Shadows</ListItem>
          <ListItem>Layout</ListItem>
        </UnorderedList>
        Here's a look at where we ended up:
        <Image src="assets/furnace/colors-semantic.png" />
        <Heading as="h2">Color</Heading>
        <Text>
          The challenge of creating a theme-friendly color system comes in
          threading the needle between customizability and simplicity – too many
          options will slow both designers and developers creating themes.
        </Text>
        <Text>
          I wanted to bake as many smart defaults into the system as possible so
          that components and themes could shed the reputation of being unwieldy
          and unpredictable; instead you should only needed to worry about your
          handful of primitives, and trust the system to put them in the right
          place.
        </Text>
        <Text>
          Each theme’s color system is constructed using four color palettes,
          which are limited in scope. These colors are are then assigned to
          specific roles to ensure correct contrast contrast and usability
          throughout a course. Palette colors are each generated as a utility
          class for font-color, border-color, and background-color. These can be
          used to override the color of elements throughout a course as needed.
        </Text>
        <Heading as="h3" size="lg">
          Interactive Palette
        </Heading>
        <Text>
          To reduce complexity and help focus learner attention, a single
          primary color scale is used to indicate interactivity in a theme.
          These are ordered from lightest (100) to darkest (900), skipping 400
          and 600. This is done to enforce visual separation between primary and
          secondary elements, since three dark and three light variants
          sufficiently covers the range of UI states.
        </Text>
        <Image src="/assets/furnace/colors-interactive.png" />
        <Heading as="h3">Semantic Palette</Heading>
        <Text>
          Semantic status colors convey meaning through convention or repeated
          use outside the primary interactive color. These are chiefly used for
          feedback or status indicators, covering Success, Warning, Error, and
          Informational contexts.
        </Text>
        <Image src="assets/furnace/colors-semantic.png" />
        <Text>
          These colors are intended to be distinct from a theme’s interactive
          palette so that their presence on a page clearly communicates the
          intended message to learners. For example, the default informational
          color is purple, but a theme with purple buttons should opt for a
          different semantic informational color like blue.
        </Text>
        <Heading as="h3" size="lg">
          Neutral Palette
        </Heading>
        <Text>
          The neutral palette is used for text, borders, and surface states. It
          ranges from near-white (100) to near-black (900) non-linearly to avoid
          muddy middle greys that have poor contrast with white/black.
        </Text>
        <Image src="assets/furnace/colors-neutral.png" />
        <Text>
          In the base theme, neutral colors have a 4.5:1 contrast ratio with
          those five slots away – e.g., Neutrals 100 and 600 have a 5.74
          contrast ratio. Course designers are discouraged from overriding these
          colors without first verifying the relative contrast of a replacement
          palette.
        </Text>
        <Heading as="h3" size="lg">
          Transparent Palette
        </Heading>
        <Text>
          The transparent neutral palette is designed for subdued or disabled UI
          elements, dividers, or accents, typically using opacities of Neutral
          900, but are defined separately for greater theme control.
        </Text>
        <Text>
          This separation allows theme designers to use handpicked colors for
          overlays and ensures that disabled colors, using a semi-transparent
          midtone, are visible on both light and dark backgrounds.
        </Text>
        <Image src="assets/furnace/colors-transparent.png" />
        <Heading as="h2" size="lg">
          Color Roles
        </Heading>
        <Text>
          With few exceptions, the colors specified in the palettes are not used
          directly inside components. Instead, they are assigned to assigned to
          two sets of color roles: backgrounds and text. Each background color
          role has a corresponding <Code>$text-on-[color]</Code> variable with
          which it is paired to ensure proper contrast.
        </Text>
        <Image src="assets/furnace/color-roles.png" />
        <Stack>
          <Heading as="h4" size="sm">
            For example:
          </Heading>
          <Text lineHeight="taller">
            Although <Code>$text-on-ui-secondary</Code> and{" "}
            <Code>$text-interactive</Code> share the same color in the default
            theme, they are separate variables.{" "}
          </Text>
          <Text>
            This distinction is essential because{" "}
            <Code>$text-on-ui-secondary</Code> always pairs with{" "}
            <Code>$ui-secondary</Code> backgrounds, while{" "}
            <Code>$text-interactive</Code> is used for links that may appear on
            various background colors.
          </Text>
          <Image src="assets/furnace/color-roles-flow.png" />
        </Stack>
        <Text>
          By defining the two colors separately, themes can flexibly change
          button colors without compromising the accessibility of links within a
          course.
        </Text>
        <Heading as="h2">Spacing</Heading>
        <Text>
          Spacing is calculated using a base unit (<Code>$spacing-xs</Code>){" "}
          multiplied by different scales on mobile and desktop breakpoints.
        </Text>
        <Text>
          Themes do not have the ability to override a single component’s
          spacing – instead, responsive margin and padding are baked into
          components. Changing the base value in a theme will cause the new
          spacing scale to cascade down to each component.
        </Text>
        <Image src="assets/furnace/spacing.png" />
        <Heading as="h2">Typography</Heading>
        <Text>
          Our existing text classes weren't responsive, so that was a priority
          for any new type system.
        </Text>
        <Text>
          However, it's not <em>fully</em> responsive – only headings are, which
          is by design. I waffled on this for some time, eventually coming to
          the realization that introducing another set of text size variables
          introduced more room for error and additional maintenance.
        </Text>
        <Image src="assets/furnace/type.png" />
        <Text>
          Many of our products, especially in the K12 space, have a number of
          pages with short bits of context punctuated by visuals and
          interactions – there was really no need to shrink the font size. We
          might as well keep prose large and legible for young users.
        </Text>
        <Text>
          Plus, we could always add responsive body text in the future if we
          needed it. <br />
          <Box as="span" color="subtle">
            Spoiler alert: we didn't – it never once came up.
          </Box>
        </Text>
        {/* <Text>
          A common issue in our legacy courses was the incorrect use of heading
          levels – ie. using a different semantic element for a smaller heading
          style. This wasn’t something we could enforce from a systems level,
          but we could at least provide cues to nudge product teams in the right
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
        </Text> */}
        <Heading as="h2">Shadows</Heading>
        <Text>
          Shadows are defined as five gradually increasing elevations,
          corresponding to perceived z-index, or its relative distance “above”
          the page. Themes can customize these elevations, such as using 'none'
          for a flat theme or tinting shadows with a color from their palette.
          Some themes have even used layered box-shadows to add an additional
          border to elements upon interaction.
        </Text>
        <Image src="assets/furnace/elevation.png" />
        <Heading as="h2">Impact</Heading>
        <Heading as="h3">Theming</Heading>
        <Text>
          In all, we drastically simplified theming, while also elevating our
          visual design. Old themes contained 1,595 variables spread across 58
          files – with Primitives in place, themes became a single file
          containing 63 variables.
        </Text>
        <Text>
          For the first time, we had a fully styled base theme, Core, that
          aligned 1:1 with our once-aspirational Figma component library.
        </Text>
        <Text>
          This provided smart defaults for other designers and streamlined the
          creation of new themes, both in Figma and in code. Instead of starting
          from scratch, designers could duplicate the Core library and simply
          update the Figma styles to their chosen values.{" "}
        </Text>
        <Text>
          With Figma style names matching our variables', designers were
          empowered to plug those values into an SCSS theme template and ship it
          off to a developer to push. The consistent naming also facilitated
          reusing designs from different courses, since designers could readily
          swap libraries.
        </Text>
        <Heading>Development</Heading>
        <Text>
          If a new component was created, its styling would be fully determined
          by theme variables from the onset. This let us perform visual,
          functional, and accessibility QA on each of our components – since we
          could now actually see them on the page.
        </Text>
        <Text>
          Previously, if a course wanted to use a new component, they would have
          manually add and update its unique SCSS variables to its theme, then
          wait for a release to see those reflected. With global variables in
          place, they could simply drop it on a page, since the theme's
          primitive overrides cascaded downward to the component.
        </Text>
        <Text>
          Behind the scenes, we also implemented BEM naming convention for our
          classes, refactored components to use proper semantic markup, and
          upgraded our dependencies, with an eye toward easier maintenance and
          scalability moving forward.
        </Text>
        <Heading as="h3">Internationalization</Heading>
        <Text>
          The addition of new grid, typography, and spacing systems made
          internationalization of courses possible, satisfying a major business
          priority.
        </Text>
        <Text>
          With the removal of hard-coded dimensions and spacing, element sizing
          was now determined solely by the sum of its font-size, line-height,
          and padding. This approach accommodated localization and
          internationalization, since certain languages can greatly increase the
          length of content and the use of explicit dimensions inevitably leads
          to overflow or truncation issues.
        </Text>
        <Text>
          We also added RTL support to our grid, allowing it to flip based on
          the locale. Horizontal margin/padding also reverse in RTL.
        </Text>
        <Text>
          To ensure that courses are always able to be translated, we decided to
          override a theme's typeface when the locale switched to one with
          non-Latin characters, replacing it with Noto Sans, a Google font with
          wide multilingual support.
        </Text>
        <Stack>
          <Image src="assets/furnace/int.png" />
          <Text textStyle="caption">
            Testing pseudo-localization in our QA environment (without
            translated content)
          </Text>
        </Stack>
        <Heading as="h3">Accessibility</Heading>
        <Text>
          In early 2019, prior to the refactor, 352 accessibility issues in
          courses were attributed to components – an average of 88 per quarter.
          That dropped to 14 in the quarter after our release; by the next year,
          there were just 2 reported bugs in the same quarter.
        </Text>
        <Text>
          Prior to the launch of Furnace, none of our courses were fully
          compliant with WCAG Level A or AA criteria. By the end of 2020, we had
          five new courses that met all AA requirements, and 21 courses had
          reached full compliance in the next year.
        </Text>
        <Text>
          A 2021 accessibility audit revealed that 87% of our components were
          now fully accessible, with the remaining components having minor
          issues that were addressed in subsequent releases.
        </Text>
      </Stack>
    </Article>
  );
};
