import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import { ImageModal } from "../components/imageModal";
import { ImageToggle } from "../components/imageToggle";
import { LinkOut } from "../components/linkOut";
import {
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
	StatGroup,
	Heading,
	Box,
	Text,
	Stack,
	ListItem,
	Code,
	UnorderedList,
} from "@chakra-ui/react";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Furnace: React.FC = () => {
	return (
		<Article pageKey="furnace">
			<ImageModal src="/assets/furnace/elements-home.png" />
			<Stack spacing={8}>
				<Heading as="h2">Background</Heading>
				<Text>
					EVERFI has a large portfolio of e-learning courses, ranging in subject from Early Literacy to Workplace
					Inclusivity to the crowd favorite, Bloodborne Pathogen Training. Historically, courses were one-offs designed
					by individual teams using building blocks provided by our SDK, styling and composing them in unique ways.
					However, there was no feedback loop to collate these stylesheets, templates, and interactions for later reuse,
					so each new course build started from scratch.
				</Text>
				<Text>
					Around 2018, as the company began to scale, there was a well-intentioned effort to do just that. Components
					were gathered from existing courses, their styles turned into variables, and custom stylesheets became themes
					that could be reused across product families.
				</Text>
				<Text>In theory.</Text>
				<Text>
					But the components were hyper-specific and inflexible. Styles were incomplete and context-dependent – font
					sizes were often hard-coded, a padding variable was available on one button but not another. Somehow,
					accordion chevrons were always pink.
				</Text>
				<Text>
					For the next year, we tried to make do, but without a style or UX foundation in place, designers and writers
					struggled to make square pegs designed for a past course fit into round holes posed by a new audience or
					topic.
				</Text>
				<Text>
					It became difficult to maintain, impossible to fully document, and risky to make even minor changes to. We'd
					have to break everything in order to fix it, so in early 2019, I began working on a proposal to rethink it
					from the ground up. By the end of the year, we'd built it.
				</Text>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Goals</Heading>
				<UnorderedList spacing={4}>
					<ListItem>
						<b>A centralized style system that supported widespread theming.</b> No more one-off component variables or
						CSS seeping in from other courses.
					</ListItem>
					<ListItem>
						<b>A fully-styled base theme with smart defaults.</b> Documentation and QA were nearly impossible because we
						had no underlying styles for the components. Instead, variables were set to values matching the course they
						were originally built for – leaving any documentation we created littered with mismatched fonts, white text
						on white, and a whole Skittles bag full of icon colors.
					</ListItem>
					<ListItem>
						<b>Responsive layout and type with additional flexibility.</b> We had 13 different layout components – none
						of which were a grid.
					</ListItem>
					<ListItem>
						<b> Standardized iconography.</b> Designers had to export recolored SVGs for each new theme.
					</ListItem>
					<ListItem>
						<b>Greater emphasis on utilities​.</b> It shouldn't require a feature request to override a text color or
						make something italic.
					</ListItem>
					<ListItem>
						<b>Improved naming conventions.</b> The lack of a consistent naming convention within our code made it
						difficult to predict the effect of a given class or variables and made it impossible to align our Figma
						library styles with themeable properties.
					</ListItem>
				</UnorderedList>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Introducing Primitives</Heading>
				<Text>
					I worked to distill all styling needed for a theme into seven categories that would power the system. These
					were Primitives, a constrained set of foundational design properties that are applied to each element in the
					design system.​
				</Text>
				<Text>
					​Changing one value affects all of its instances throughout the system, allowing for a consistent application
					of visual style in a scalable and maintainable way.​ Each component was refactored to utilize only these
					global variables for all of its styling:
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
				<ImageModal src="/assets/furnace/elements-primitives.png" />
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Color</Heading>
				<Text>
					The challenge of creating a theme-friendly color system comes in threading the needle between customizability
					and simplicity – too many options will slow both designers and developers creating themes.
				</Text>
				<Text>
					I wanted to bake as many smart defaults into the system as possible so that components and themes could shed
					the reputation of being unwieldy and unpredictable; instead you should only need to worry about your handful
					of primitives, and trust the system to put them in the right place.
				</Text>
				<Text>
					Each theme’s color system is constructed using four color palettes, which are limited in scope. These colors
					are then assigned to specific roles to ensure correct contrast and usability throughout a course. Palette
					colors are each generated as a utility class for font-color, border-color, and background-color. These can be
					used to override the color of elements throughout a course as needed.
				</Text>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h3" size="lg">
					Interactive Palette
				</Heading>
				<LayoutGrid variant="twoUp">
					<Text>
						To reduce complexity and help focus learner attention, a single primary color scale is used to indicate
						interactivity in a theme. These are ordered from lightest (100) to darkest (900), skipping 400 and 600. This
						is done to enforce visual separation between primary and secondary elements, since three dark and three
						light variants sufficiently covers the range of UI states.
					</Text>
					<ImageModal src="/assets/furnace/colors-interactive.png" caption="Interactive colors: Core theme" />
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h3" size="lg">
					Semantic Palette
				</Heading>
				<LayoutGrid variant="twoUp">
					<Stack>
						<Text>
							Semantic status colors convey meaning through convention or repeated use outside the primary interactive
							color. These are chiefly used for feedback or status indicators, covering Success, Warning, Error, and
							Informational contexts.
						</Text>
						<Text>
							These colors are intended to be distinct from a theme’s interactive palette so that their presence on a
							page clearly communicates the intended message to learners. For example, the default informational color
							is purple, but a theme with purple buttons should opt for a different semantic informational color like
							blue.
						</Text>
					</Stack>
					<ImageModal src="/assets/furnace/colors-semantic.png" caption="Semantic colors: Core theme" />
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h3" size="lg">
					Neutral Palette
				</Heading>
				<LayoutGrid variant="twoUp">
					<Stack>
						<Text>
							The neutral palette is used for text, borders, and surface states. It ranges from near-white (100) to
							near-black (900) non-linearly to avoid muddy middle greys that have poor contrast with white/black.
						</Text>
						<Text>
							In the base theme, neutral colors have a 4.5:1 contrast ratio with those five slots away – e.g., Neutrals
							100 and 600 have a 5.74 contrast ratio. Course designers are discouraged from overriding these colors
							without first verifying the relative contrast of a replacement palette.
						</Text>
					</Stack>
					<ImageModal src="assets/furnace/colors-neutral.png" caption="Default neutral colors" />
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h3" size="lg">
					Transparent Palette
				</Heading>
				<LayoutGrid variant="twoUp">
					<Stack>
						<Text>
							The transparent neutral palette is designed for subdued or disabled UI elements, dividers, or accents,
							typically using opacities of Neutral 900, but are defined separately for greater theme control.
						</Text>
						<Text>
							This separation allows theme designers to use handpicked colors for overlays and ensures that disabled
							colors, using a semi-transparent midtone, are visible on both light and dark backgrounds.
						</Text>
					</Stack>
					<ImageModal
						src="assets/furnace/colors-transparent.png"
						caption="Default transparent colors derived from opacities of Neutral palette."
					/>
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2" size="lg">
					Color Roles
				</Heading>
				<Text>
					With few exceptions, the colors specified in the palettes are not used directly inside components. Instead,
					they are assigned to two sets of color roles: backgrounds and text. Each background color role has a
					corresponding <Code>$text-on-[color]</Code> variable with which it is paired to ensure proper contrast.
				</Text>
				<LayoutGrid variant="twoUp">
					<ImageModal src="assets/furnace/color-roles.png" caption="Available color role variables in a theme." />
					<ImageModal
						src="assets/furnace/color-roles-flow.png"
						caption="Relationship between color palettes, color roles, and components."
					/>
				</LayoutGrid>
				<Stack>
					<Heading as="h4" size="sm">
						For example:
					</Heading>
					<Text>
						Although <Code>$text-on-ui-secondary</Code> and <Code>$text-interactive</Code> share the same color in the
						default theme, they are separate variables.{" "}
					</Text>
					<Text>
						This distinction is essential because <Code>$text-on-ui-secondary</Code> always pairs with{" "}
						<Code>$ui-secondary</Code> backgrounds, while <Code>$text-interactive</Code> is used for links that may
						appear on various background colors.
					</Text>
				</Stack>
				<Text>
					By defining the two colors separately, themes can flexibly change button colors without compromising the
					accessibility of links within a course.
				</Text>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Spacing</Heading>
				<Text>
					Spacing is calculated using a base unit (<Code>$spacing-xs</Code>) multiplied by different scales on mobile
					and desktop breakpoints.
				</Text>
				<Text>
					Themes do not have the ability to override a single component’s spacing – instead, responsive margin and
					padding are baked into components. Changing the base value in a theme will cause the new spacing scale to
					cascade down to each component.
				</Text>
				<ImageModal src="/assets/furnace/spacing.png" caption="Responsive spacing formula" />
				{/* <Text>
          We also added mixins and utility classes to easily apply themed
          spacing to components. Inspired by Nathan Curtis, we
        </Text>
        <ImageModal src="/assets/furnace/padding.png" /> */}
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Typography</Heading>
				<Text>Our existing text classes weren't responsive, so that was a priority for any new type system.</Text>

				<Text>
					However, it's not <em>fully</em> responsive – only headings are, which is by design. I waffled on this for
					some time, eventually coming to the realization that introducing another set of text size variables introduced
					more room for error and additional maintenance.
				</Text>

				<Text>
					Many of our products, especially in the K12 space, have a number of pages with short bits of content
					punctuated by visuals and interactions – there was really no need to shrink the font size. We might as well
					keep prose large and legible for young users.
				</Text>
				<Text>
					Plus, we could always add responsive body text in the future if we needed it. <br />
					<Box as="span" color="text-subdued">
						Spoiler alert: we didn't – it never once came up.
					</Box>
				</Text>
				<ImageModal
					src="assets/furnace/type.png"
					caption="Default type scale with responsive headings. The Core theme uses Lato, EVERFI's brand typeface."
				/>
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
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Layout</Heading>
				<Text>
					One of the biggest pain points in our old library was the lack of a flexible grid. While there were a number
					of layout components (13!), they were all variations of two-, three-, and four-column grids, and each of them
					simply stacked their children below the desktop breakpoint.
				</Text>
				<Text>
					To replace them, we created two CSS Grid layouts: a classic Boostrap-style 12-column grid for full
					flexibility, and another inspired by
					<LinkOut
						href="https://m2.material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins"
						text="Material Design 2"
					/>{" "}
					that dynamically renders different columns per breakpoint (4 on mobile, 8 on tablet, and 12 on desktop) for
					easier configuration.
				</Text>
				<LayoutGrid variant="twoUp" alignItems="center">
					<ImageModal
						src="/assets/furnace/grid.png"
						caption="Grid examples at the tablet breakpoint. Note that the Dynamic Grid maxes out at 8 columns, while the Static Grid displays 12."
					/>
					<ImageModal
						src="/assets/furnace/grid-table.png"
						caption="Documentation comparing responsive class behaviors within the two grids."
					/>
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Shadows</Heading>
				<LayoutGrid variant="twoUp">
					<Text>
						Shadows are defined as five gradually increasing elevations, corresponding to perceived z-index, or its
						relative distance “above” the page. Themes can customize these elevations, such as using 'none' for a flat
						theme or tinting shadows with a color from their palette. Some themes have even used layered box-shadows to
						add an additional border to elements upon interaction.
					</Text>
					<ImageModal src="assets/furnace/elevation.png" caption="Shadow elevations and z-index guidance" />
				</LayoutGrid>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Borders</Heading>
				<Text>
					Primitive variables also included <Code>border-width</Code> and <Code>border-radius</Code> values. Border
					colors were applied using color palette variables and generated classes.
				</Text>
				<ImageModal
					src="/assets/furnace/border-width-2.png"
					caption="We found that only three border-width values were sufficient to cover our needs."
				/>
				<ImageModal
					src="/assets/furnace/border-radius-2.png"
					caption="Radii variables were assigned according to a component's relative size. This allowed themes to deviate from the Core scale's semi-linear increments (above) to create rounded buttons, for instance."
				/>
			</Stack>
			<Stack spacing={8}>
				<Heading as="h2">Impact</Heading>

				<Heading as="h3" size="lg">
					Theming
				</Heading>
				<Text>
					Overall, we drastically simplified theming, while also elevating our visual design. Old themes contained 1,595
					variables spread across 58 files – with Primitives in place, themes became a single file containing just 63
					variables, while providing more comprehensive styling than we'd ever had.
				</Text>
				<Text>
					For the first time, we had a fully styled base theme, Core, that aligned 1:1 with our once-aspirational Figma
					component library.
				</Text>
				<ImageModal src="/assets/furnace/core.png" caption="Core theme with fully-styled base components" />
				<Text>
					This provided smart defaults for other designers and streamlined the creation of new themes, both in Figma and
					in code. Instead of starting from scratch, designers could duplicate the Core library and simply update the
					Figma styles to their chosen values.
				</Text>
				<Text>
					With styles in Figma aligned to our primitive variable names, designers were empowered to plug those values
					into an SCSS theme template and ship it off to a developer to push. The consistent naming also facilitated
					reusing designs from different courses, since designers could readily swap libraries.
				</Text>

				<ImageModal src="/assets/furnace/themes.png" caption="The wide variety of themes enabled by primitives" />
			</Stack>
			<Stack spacing="5">
				<Heading>Development</Heading>
				<Text>
					The creation of a base theme and the strict application of primitives provided a baseline that enabled regular
					visual, functional, and accessibility QA on each of our components prior to a release.{" "}
				</Text>
				<Text>
					For a sense of the difference this made, compare the two images below from our pre- and post-primitives QA
					environments:
				</Text>
				<ImageToggle before="/assets/furnace/drawer-before.png" after="/assets/furnace/drawer-after.png" />
				<Text>
					Previously, if a course wanted to use a new component, they would manually add and update its unique SCSS
					variables to their theme, then wait for a release before the changes would take effect. With global variables
					in place, implementers could simply drop any component onto a page without having to worry that its styles
					would be broken by a missing variable.
				</Text>
				<Text>
					Behind the scenes, we instituted <LinkOut href="https://getbem.com/naming/" text="BEM naming conventions" />{" "}
					throughout the SCSS and refactored component templates with proper semantic markup. We deprecated 20+
					components in favor of more flexible, general-purpose ones, such as our new responsive layout grid. We also
					upgraded our dependencies with an eye toward easier maintenance and scalability moving forward.
				</Text>
			</Stack>
			<Stack spacing="5">
				<Heading as="h3">Internationalization</Heading>
				<Text>
					The addition of new grid, typography, and spacing systems made internationalization of courses possible,
					satisfying a major business priority.
				</Text>
				<Text>
					With the removal of hard-coded dimensions and spacing, element sizing was now determined solely by the sum of
					its font-size, line-height, and padding. This approach accommodated localization and internationalization,
					since certain languages can greatly increase the length of content and the use of explicit dimensions
					inevitably leads to overflow or truncation issues.
				</Text>
				<Text>
					We also added RTL support to our grid, allowing it to flip based on the locale. Horizontal margin/padding also
					reverse in RTL, along with directional icons, such as arrows and chevrons.
				</Text>
				<Text>
					To ensure that courses are always able to be translated, we decided to override a theme's typeface when the
					locale switched to one with non-Latin characters, replacing it with Noto Sans, a Google font with wide
					multilingual support.
				</Text>
				<ImageModal
					src="assets/furnace/int.png"
					caption="Testing pseudo-localization in our QA environment (without translated content)"
				/>
			</Stack>
			<Stack spacing="5">
				<Heading as="h3">Accessibility</Heading>
				<Text>
					In early 2019, prior to the refactor, 352 accessibility issues in courses were attributed to components – an
					average of 88 per quarter. That dropped to 14 in the quarter after our release; by the next year, there were
					just 2 reported bugs in the same quarter.
				</Text>
				<Text>
					Prior to the launch of Furnace, none of our courses were fully compliant with WCAG Level A or AA criteria. By
					the end of 2020, we had five new courses that met all AA requirements, and 21 courses had reached full
					compliance in the next year.
				</Text>
				<Text>
					A 2021 accessibility audit revealed that 87% of our components were now fully accessible, with the remaining
					components having minor issues that were addressed in subsequent releases.
				</Text>
				<Text>
					The launch of Furnace and its emphasis on accessibility allowed the organization to develop a more mature and
					rigorous accessibility practice. For more insight into some of our processes and tooling, check out my
					colleague
					<LinkOut href="http://anniealvarado.com" text="Annie Alvarado" />
					's presentation for
					<LinkOut
						href="https://makeitfable.com/article/experts-with-fable-everfi-cvs-health/"
						text="Fable Accessibility"
					/>
					.
				</Text>
			</Stack>
			<Stack spacing="5">
				<Heading as="h2">By the numbers</Heading>
				<StatGroup>
					<Stat>
						<StatLabel>Variables per theme</StatLabel>
						<StatNumber>62</StatNumber>
						<StatHelpText>
							<StatArrow type="decrease" />
							-1,533 (-96%)
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Layout components</StatLabel>
						<StatNumber>2</StatNumber>
						<StatHelpText>
							<StatArrow type="decrease" />
							-10 (-83%)
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Unique spacing declarations</StatLabel>
						<StatNumber>6</StatNumber>
						<StatHelpText>
							<StatArrow type="decrease" />
							-136 (-96%)
						</StatHelpText>
					</Stat>
				</StatGroup>
				<StatGroup>
					<Stat>
						<StatLabel>Color combinations</StatLabel>
						<StatNumber>44</StatNumber>
						<StatHelpText>
							<StatArrow type="decrease" />
							-109 (-71%)
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Responsive courses</StatLabel>
						<StatNumber>74</StatNumber>
						<StatHelpText>
							<StatArrow type="increase" />
							+65 (720%)
						</StatHelpText>
					</Stat>
					<Stat>
						<StatLabel>Fully accessible components (AA)</StatLabel>
						<StatNumber>59</StatNumber>
						<StatHelpText>
							<StatArrow type="increase" />
							+53 (2580%)
						</StatHelpText>
					</Stat>
				</StatGroup>
			</Stack>
		</Article>
	);
};
