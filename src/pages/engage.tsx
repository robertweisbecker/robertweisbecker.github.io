import { LayoutGrid } from "../components/layout";
import { LinkOut } from "../components/linkOut";
import { Article } from "../components/article";
import { Heading, Box, Text, Stack, Image } from "@chakra-ui/react";

import { ArrowTopRightIcon } from "@radix-ui/react-icons";

import { AnimatePresence, motion } from "framer-motion";

export const Engage: React.FC = () => {
	return (
		<Article pageKey="engage">
			<Stack spacing={10} py={0}>
				<Image src="/assets/engage/engage-1.png" />
				<Heading as="h2">About</Heading>
				<Text>
					Engage allows financial institutions to deliver in-person financial education to their customers and the
					community via guided workshop events at their branches. The product consists of 13 digital learning modules
					covering personal finance & money management, small business operations, and home ownership.
				</Text>
				<Heading as="h2">Audience</Heading>
				<Text>
					Engage workshops are geared toward low- to moderate-income adults, families, and small business owners. In
					order to help these users feel at ease with weighty topics, the visual design relied on soft colors and
					springy animation, and content was written in a casual and approachable tone.
				</Text>

				<Stack>
					<Image src="/assets/engage/bbva-1.png" />
					<Text textStyle="caption">Engage in-person workshops</Text>
				</Stack>

				<Heading as="h2">Component Library</Heading>
				<Text color="fg.muted">
					Upon joining the project, I had the team migrate existing designs from Adobe XD to Sketch, so that we could
					use it to build a reusable component library that would let us rapidly execute and iterate. That change in
					process led to the creation of a template library containing 40+ unique pages in mobile, tablet, and desktop
					sizes.
				</Text>
				<Stack>
					<Image src="/assets/engage/engage-components.png" borderRadius="lg" />
					<Text textStyle="caption">A collection of components recreated in Sketch</Text>
				</Stack>
				<Stack>
					<Image src="/assets/engage/engage-templates.png" />
					<Text textStyle="caption">Template library</Text>
				</Stack>
				<Heading as="h2">Interactions</Heading>
				<Text color="fg.muted">
					To prototype new interactions, I learned to use Flinto, Framer, and Invision Studio, and freshened up on
					HTML/CSS to ship code directly to developers.
				</Text>
				<Text color="fg.muted">A sampling of these are below:</Text>
				<LayoutGrid variant="twoUp">
					<Stack>
						<Box borderColor="emphasis" border="8px" borderRadius="2xl" overflow="hidden">
							<video width="100%" height="auto" controls>
								<source src="/assets/engage/engage-facilitator-script-drawer.mov" type="video/mp4" />
							</video>
						</Box>
						<Text textStyle="caption">
							Workshop facilitators can access their script at any time by tapping a persistent tab on the left edge.
						</Text>
					</Stack>
					<Stack>
						<Box borderColor="emphasis" border="8px" borderRadius="2xl" overflow="hidden">
							<video width="100%" height="auto" controls>
								<source src="/assets/engage/carousel.mov" type="video/mp4" />
							</video>
						</Box>
						<Text textStyle="caption">Carousel component with some light animation to focus users' attention</Text>
					</Stack>
					<Stack>
						<Box borderColor="emphasis" border="8px" borderRadius="2xl" overflow="hidden">
							<video width="100%" height="auto" controls>
								<source src="/assets/engage/card-expand.mov" type="video/mp4" />
							</video>
						</Box>
						<Text textStyle="caption">Maintaining continuity via animation</Text>
					</Stack>
					<Stack>
						<Box borderColor="emphasis" border="8px" borderRadius="2xl" overflow="hidden">
							<video width="100%" height="auto" controls>
								<source src="/assets/engage/Engage-Circle-Progression.mov" type="video/mp4" />
							</video>
						</Box>
						<Text textStyle="caption">Spicing up an ordered list</Text>
					</Stack>
				</LayoutGrid>
			</Stack>
			<Text>
				Read more about Engage on{" "}
				<LinkOut
					href="https://everfi-curriculums.s3.amazonaws.com/curriculums/engage-content/develop/index.html#"
					text="everfi.com"
				/>
			</Text>
		</Article>
	);
};
