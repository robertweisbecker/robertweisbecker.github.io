// 1. Imports
import * as React from "react";
import { NavHashLink } from "react-router-hash-link";

import { Link, Flex, Box, Icon, LinkProps, Image } from "@chakra-ui/react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

// 2. Type Definition for Props
type LinkOutProps = {
	text: string;
	href: string;
	src?: string;
};

// Extend the Chakra UI component props (BoxProps in this case)
// with your custom props type
type props = LinkOutProps & LinkProps;

// 3. Component Definition

export const LinkOut: React.FC<props> = ({ text, href, src, ...rest }) => {
	return (
		<Box display="inline-block" fontSize="1em" verticalAlign="bottom" className="group">
			<Flex gap={1} align="center" h="calc(1em * lineHeights.base)">
				{src && (
					<Image
						src={src}
						alt={`${text} Logo`}
						h="1.25em"
						w="auto"
						boxShadow="inner"
						rounded="lg"
						borderWidth=".5px"
						borderColor="border-subdued"
						bg="surface-frosted"
						p="0.5"
						mx={0.5}
					/>
				)}
				<Link href={href} {...rest} colorScheme="brand" isExternal rel="noopener noreferrer">
					{" "}
					{text}{" "}
					<Icon
						color="inherit"
						alignSelf="center"
						as={ArrowTopRightIcon}
						transitionProperty="common"
						transitionDuration="fast"
						transitionTimingFunction="ease-out"
						opacity=".5"
						_groupHover={{
							transform: "translateY(-2px) translateX(2px)",
						}}
					/>
				</Link>{" "}
			</Flex>
		</Box>
	);
};
