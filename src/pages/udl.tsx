import * as React from "react";
import { NavHashLink } from "react-router-hash-link";

import {
	Highlight,
	Box,
	Stack,
	Text,
	Link,
	Heading,
	Spacer,
	UnorderedList,
	ListItem,
	AspectRatio,
} from "@chakra-ui/react";
// import { LayoutGrid } from "../components/layout";
import { Article } from "../components/article";
import { ImageToggle } from "../components/imageToggle";
import { ImageModal } from "../components/imageModal";
import { LinkOut } from "../components/linkOut";
// import { Prose } from "../components/prose";

export const UDL: React.FC = () => {
	return (
		<>
			<Article pageKey="unified-design-language">
				<AspectRatio ratio={16 / 9} w="full" maxW="100%" rounded="xl" overflow="hidden">
					<Box
						bgImage="/assets/udl/foundry-light.png"
						_dark={{ bgImage: "/assets/udl/foundry-dark.png" }}
						backgroundSize="cover"
						backgroundPosition="top center"
						maxW="100%"
						backgroundRepeat="no-repeat"
					/>
				</AspectRatio>

				<Stack spacing="8">
					<Heading as="h2">Context</Heading>
					<Text>
						In late 2021, it became clear that EVERFI's products lacked a cohesive identity and experience; they looked
						like (and were) built by different teams.
					</Text>
					<Text>
						The journey from website → platform → product ping-ponged users from one interface to another, undermining
						the experience for admins, teachers, and learners. So we set out to define a singular point of view re: how
						an Everfi product should look, feel, and behave, and to codify it in a new shared design language.
					</Text>
				</Stack>
				<Text>We kicked it off with our own definition:</Text>
				<Text
					textStyle="subtitle"
					fontSize="lg"
					lineHeight="taller"
					color="fg.muted"
					borderLeft="4px"
					borderColor="border-muted"
					// sx={{ textWrap: "pretty" }}
					px={6}>
					<Highlight
						query={["visual and interaction", "code and design", "consistency", "intentionality", "predictability"]}
						styles={{ fontWeight: "medium" }}>
						A design language consists of an agreed-upon visual and interaction design foundation upheld in both code
						and design workflows to foster consistency, intentionality, and predictability within and across products.
					</Highlight>
				</Text>
				<ImageModal
					src="/assets/udl/ecosystem.png"
					caption="All the different ways we display course content across products and platforms"
				/>
				<Stack spacing="8">
					<Text>
						Different products rely on different tech stacks, each influencing their respective design direction at
						inception and ultimately dictating the degree to which they could share with one another.
					</Text>
					<Text>
						The question "What does an EVERFI button look like?" has a different answer depending on which product you
						look at. Multiply this kind of variation across a full library of styles and components per product —
						fields, cards, headers, footers, surveys, data viz — and layer in intentional theming of courses and
						platform tailored to content, network, and/or customer branding, and of course we end up with a disjointed
						experience.
					</Text>
					<Spacer />
					<ImageModal
						src="/assets/udl/styles-foundry.png"
						src2="/assets/udl/styles-foundry@2x.png"
						caption="Foundry, the assigned learning platform, is powered by
            its own React design system, Alloy, which takes cues from Material Design"
					/>
					<Spacer />
					<ImageModal
						src="/assets/udl/styles-homeroom.png"
						src2="/assets/udl/styles-homeroom@2x.png"
						caption="Homeroom, the K12 platform, uses fully-custom styles that override its underlying legacy Bootstrap components. Its teacher-facing UI was redesigned in 2019, but other
            parts of the app remain untouched."
					/>
					<Spacer />
					<ImageModal
						src="/assets/furnace/theme-previews.png"
						caption="EVERFI courses use Furnace, our product design system and SDK,
            to create custom themes that vary greatly depending on customer,
            audience, and learning style. The underlying base theme, Core,
            is a polished (and generic) theme that incorporates some aspects
            of EVERFI's branding."
					/>
				</Stack>
				<Spacer />
				<Stack spacing="8">
					<Heading as="h2">How</Heading>
					<Text>
						We began with our North Star not as a design system but a common design language that could guide our
						products closer together. The idea of sharing styles and components org-wide was unthinkable given the
						radically different natures of the respective codebases.
					</Text>
					<Text opacity=".5">Spoiler alert: it became thinkable. Keep reading.</Text>
					<Text>
						Instead, we set out to establish core design principles that we could weave throughout experiences wherever
						technically feasible. But, first, we needed to get the lay of the land.
					</Text>
				</Stack>
				<Spacer />
				<Stack spacing="8">
					<Heading as="h3" size="lg">
						Audit
					</Heading>
					<Text>
						To assess the existing design languages in use across products, I devised a set of benchmarks we could use
						to gauge the "system health" of our platforms, comparing their architecture to the more mature system in{" "}
						<Link as={NavHashLink} to="/furnace">
							Furnace
						</Link>
						.
					</Text>
					<Text>
						We then set off on an old-fashioned visual audit cataloguing each step in a potential admin, teacher, or
						learner journey.
						{/* In order to sell this idea, we first needed to know the cost of a
              style refactor in our platforms — at this stage, the best-case
              scenario was getting the green light to copy-paste variables from
              the theming system I'd devised for courses. I audited the SCSS
              used in our platforms and weighed it against a set of design
              system benchmarks to see just how far off we were. */}
					</Text>
					<ImageModal src="/assets/udl/audit.png" caption="A snippet of our UI audit & the system health report" />
				</Stack>
				<Stack spacing="8">
					<Heading as="h3" size="lg">
						The Great{" "}
						<Box as="span" textTransform="uppercase">
							Everfi
						</Box>{" "}
						Component-Off
					</Heading>
					<Text>
						The next step was to establish an opinion — to coalesce around a general visual style that reflected our
						brands, best practices, and, to an extent, our taste as a group of designers.
					</Text>
					<Text>
						That spurred the first — and hopefully last —{" "}
						<Box as="span" fontWeight="medium">
							Great EVERFI Component-Off™
						</Box>
						. We pitted competing components from platforms and products against one another, holding working sessions
						to dissect their behavior, style, and utility. For each moment of consensus, we laid another brick in our
						growing foundations.
					</Text>
					<Stack>
						<ImageToggle before="/assets/udl/off-before.png" after="/assets/udl/off-after.png" />
						<Text textStyle="caption">
							There can be only one <del>Highlander</del> popover
						</Text>
					</Stack>
				</Stack>
				<Stack spacing="8">
					<Heading as="h3" size="lg">
						Proof of Concept
					</Heading>
					<Text>
						When we'd reached a critical mass of solid decisions, I created a rough set of components to stress-test in
						various use cases across the organization. The goal was to further refine our approach and develop a proof
						of concept that we could pitch to leadership.
					</Text>
					<ImageModal src="/assets/udl/login-after.png" caption="One sign-in screen to rule them all" />
					<ImageModal src="/assets/udl/create-after.png" caption="Aligning admin and K12 platform login flows" />
					<ImageModal src="/assets/udl/evaluations-after.png" caption="Evaluations in platform and course contexts" />
					<ImageToggle before="/assets/udl/data-before.png" after="/assets/udl/data-after.png" />
				</Stack>
				<Stack spacing="8">
					<Heading as="h2">Foundations</Heading>
					<Text>The proof of concept helped to crytallize our new foundations. Key decisions included:</Text>
					<UnorderedList spacing="4">
						<ListItem>Aligning on the use of Lato, our brand typeface, across products</ListItem>
						<ListItem>Replacing mixed and inconsistent iconography with a single icon library</ListItem>
						<ListItem>
							Shifting from bespoke color palettes per theme to a curated collection of accessible palettes extrapolated
							from our brand colors
						</ListItem>
						<ListItem>
							Introducing a layer of density theming, reflected in typography and spacing, to support varied tasks and
							content types across products and platforms
						</ListItem>
					</UnorderedList>
					<ImageToggle before="/assets/udl/color-before.png" after="/assets/udl/color-after.png" />
					<ImageToggle before="/assets/udl/type-before.png" after="/assets/udl/type-after.png" />
					<ImageToggle before="/assets/udl/space-before.png" after="/assets/udl/space-after.png" />
				</Stack>

				<Stack spacing="8">
					<Heading as="h2">Implementation</Heading>

					<Heading as="h3" size="lg">
						Moving to React
					</Heading>
					<Text>
						We were given the green light to implement the new design language — and to rebuild Furnace in React, so
						that it could be integrated with Alloy into a new design system monorepo powering all of{" "}
						<Box as="span" textTransform="uppercase">
							Everfi
						</Box>
						's front end. A tall task but a huge win.
					</Text>
					{/* 
					<UnorderedList spacing={4}>
						<ListItem>
							<Link as={NavHashLink} to="/furnace">
								Furnace
							</Link>{" "}
							would be rebuilt from the ground up in React
						</ListItem>
						<ListItem>
							With the help of <LinkOut href="https://chakra-ui.com/" text="Chakra" />, we would use the rebuild to
							populate a library of new "Core" components to be shared across{" "}
							<Box as="span" textTransform="uppercase">
								Everfi
							</Box>
							's courses, platforms, and tooling
						</ListItem>
						<ListItem>
							Existing React components within Foundry and{" "}
							<Link as={NavHashLink} to="/forge">
								Forge
							</Link>{" "}
							would then be refactored to use Core components under the hood
						</ListItem>
					</UnorderedList>
						*/}

					<Heading as="h3" size="lg">
						Design ➡️ Code
					</Heading>
					<Text>
						We continued iterating on our foundations, arriving at a family of comprehensive design tokens that
						supported all our needs.
					</Text>
					<ImageModal
						src="/assets/udl/docs-tokens.png"
						src2="/assets/udl/docs-tokens.png"
						caption="Figma token documentation"
					/>
					<ImageModal
						src="/assets/udl/base-tokens.png"
						src2="/assets/udl/base-tokens2.png"
						caption="Some of our base (global) tokens"
					/>
					<ImageModal
						src="/assets/udl/semantic-tokens.png"
						src2="/assets/udl/semantic-tokens2.png"
						caption="Semantic color tokens"
					/>
					<Text>
						To ensure that tokens served as a single source of truth, I migrated our Figma styles to use{" "}
						<LinkOut href="https://tokens.studio/" text="Tokens Studio" /> to enable syncing with GitHub. Once imported,
						tokens were converted from JSON to Typescript via{" "}
						<LinkOut href="https://amzn.github.io/style-dictionary/#/" text="Amazon Style Dictionary" /> for consumption
						by the new React components.{" "}
					</Text>
					<Text>
						For products that weren't quite ready for React migration (like Homeroom, the K12 platform), we also
						generated SCSS variables so that we could refresh their styles to match their updated siblings.
					</Text>
					<ImageModal src="/assets/udl/design-code.png" />
					<ImageModal src="/assets/udl/storybook-colors.png" caption="Base color palette tokens in Storybook" />
					<ImageModal src="/assets/udl/storybook-tokens.png" caption="Semantic color tokens in Storybook" />

					<Text>
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
						, I was able to create detailed component specs that included corresponding token and variable data.
					</Text>
					<ImageModal src="/assets/udl/specs.png" />
					<ImageModal src="/assets/udl/figma.png" src2="/assets/udl/figma@2x" caption="Buttons in Figma" />
					<ImageModal src="/assets/udl/storybook.png" caption="Buttons in Storybook" />
				</Stack>
				{/* <Stack spacing="8">
					<Heading>Gallery</Heading>
					<Heading as="h3">Login</Heading>
					<ImageToggle before="/assets/udl/homeroom-login-before.png" after="/assets/udl/homeroom-login-after.png" />
					<ImageToggle before="/assets/udl/foundry-login-before.png" after="/assets/udl/foundry-login-after.png" />
					<Heading as="h3">Admin</Heading>
					<ImageToggle before="/assets/udl/homeroom-login-before.png" after="/assets/udl/homeroom-login-after.png" />
					<ImageToggle before="/assets/udl/foundry-login-before.png" after="/assets/udl/foundry-login-after.png" />
					<Heading as="h3">Admin</Heading>
					<ImageToggle before="/assets/udl/homeroom-login-before.png" after="/assets/udl/homeroom-login-after.png" />
					<ImageToggle before="/assets/udl/foundry-login-before.png" after="/assets/udl/foundry-login-after.png" />
				</Stack> */}
			</Article>
		</>
	);
};
