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
	inline?: boolean;
};

// Extend the Chakra UI component props (BoxProps in this case)
// with your custom props type
type props = LinkOutProps & LinkProps;

// 3. Component Definition

export const LinkOut: React.FC<props> = ({ text, href, src, inline, ...rest }) => {
	return (
		<Box as="span" display="inline-block" fontSize="inherit" verticalAlign="bottom" className="group">
			<Flex gap={1} align="end" minH="1lh">
				{src && (
					<>
						{" "}
						<Image
							src={src}
							alt={`${text} Logo`}
							h="1em"
							w="auto"
							boxShadow="inner"
							rounded="0"
							outline=".5px solid"
							outlineColor="red"
							bg="bg.frosted"
							px="0.5"
							me={0.5}
						/>
					</>
				)}
				<Link href={href} {...rest} colorScheme="brand" isExternal rel="noopener noreferrer">
					{text}{" "}
					{!inline && (
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
					)}{" "}
				</Link>
			</Flex>
		</Box>
	);
};
