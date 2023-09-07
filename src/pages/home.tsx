import * as React from "react";
import { ReactComponent as Pattern } from "../blur.svg";
import ProjectGrid from "../components/projectGrid";
import { ImageSnap } from "../components/imageSnap";
import { LayoutGrid } from "../components/layout";
import { Squiggle } from "../components/images/squiggle";
import { LinkOut } from "../components/linkOut";

import { Heading, Center, Box, Text, Stack, Icon, HStack, Spacer, Image, Tooltip } from "@chakra-ui/react";
import { HandIcon, EyeOpenIcon, EyeClosedIcon, BackpackIcon, ArrowTopRightIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";

export const Home: React.FC = () => {
	return (
		<Stack spacing={10} mt={10}>
			<Image
				src="/assets/blob.png"
				position="fixed"
				mx="0"
				_dark={{
					opacity: ".8",
				}}
				boxSize={{ base: "100vmin" }}
				left={{ base: "50%", sm: "75%" }}
				top="50%"
				transform="translate(-50%, -50%)"
				maxW="unset"
				zIndex="-1"
			/>

			<Spacer />
			<HStack align="center" className="group">
				<Icon
					as={HandIcon}
					color="interactive"
					transform="scaleX(-1) rotate(30deg)"
					transition="transform 0.6s cubic-bezier(0.68, -1, 0.32, 2)"
					_groupHover={{
						transform: "scaleX(-1) rotate(-30deg)",
					}}
				/>

				<Heading as="h2" size="2xs" id="">
					Howdy partner
				</Heading>
			</HStack>

			<Box>
				<Text fontSize="2xl" color="text-frosted" fontWeight="light" lineHeight="tall" fontFamily="heading">
					I'm currently designing design systems
					<br /> & systems for designers at <br />
					<Box as="span" ms="-1">
						<LinkOut
							fontWeight="bold"
							src="/assets/logos/everfi-icon.png"
							href="https://www.everfi.com"
							text="EVERFI"
						/>
						<Tooltip label="(we got acquired)">
							<Box as="span" mx={2}>
								+
							</Box>
						</Tooltip>
						<LinkOut
							fontWeight="bold"
							src="/assets/logos/blackbaud-logo.png"
							href="https://www.blackbaud.com"
							text="Blackbaud"
						/>
					</Box>
				</Text>
			</Box>
			<Spacer />
			<HStack align="center">
				<Icon color="interactive" as={EyeOpenIcon} />
				<Heading as="h2" size="2xs" id="projects">
					Take a gander
				</Heading>
			</HStack>
			<ProjectGrid />
			<Spacer />
		</Stack>
	);
};

// export default Home;
