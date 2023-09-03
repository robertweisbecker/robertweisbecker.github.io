// 1. Imports
import * as React from "react";
import PropTypes from "prop-types";

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
		<Box display="inline-block" fontSize="1em" verticalAlign="bottom">
			<Flex gap={1} align="center" h="calc(1em * lineHeights.base)">
				{src && (
					<Image
						src={src}
						alt={`${text} Logo`}
						h="1.25em"
						w="auto"
						boxShadow="inner"
						rounded="full"
						borderWidth=".5px"
						borderColor="border-subdued"
						bg="surface-frosted"
						p="0.5"
						mx={0.5}
					/>
				)}
				<Link
					href={href}
					{...rest}
					color="emphasized"
					fontWeight="semibold"
					colorScheme="brand"
					isExternal
					rel="noopener noreferrer">
					{" "}
					{text} <Icon opacity=".5" as={ArrowTopRightIcon} />
				</Link>{" "}
			</Flex>
		</Box>
	);
};
