import * as React from "react";
import PropTypes from "prop-types";
import { NavHashLink, genericHashLink } from "react-router-hash-link";
import {
	// Spacer,
	Box,
	// Image,
	Heading,
	Text,
	Stack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	VStack,
	UnorderedList,
	ListItem,
	GridItem,
} from "@chakra-ui/react";
// import { ArrowTopRightIcon, DrawingPinIcon } from "@radix-ui/react-icons";
import { pageData } from "../data/pages";
import { LayoutGrid } from "./layout";
// import { BackButton } from "./backButton";
import { LinkOut } from "./linkOut";

type PageData = {
	title: string;
	description?: string;
	subtitle?: string;
	role?: string;
	team?: { [key: string]: any }[];
	date?: string;
	imageUrl?: string;
};

type PageDataMap = {
	[key: string]: PageData;
};

const typedPageData: PageDataMap = pageData;

type PageHeaderProps = {
	pageKey: string;
};

const PageHeader = ({ pageKey }: PageHeaderProps) => {
	const page = typedPageData[pageKey];

	if (!page) {
		return (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>404</AlertTitle>
				<AlertDescription>Page data not found for pageKey: {pageKey}</AlertDescription>
			</Alert>
		);
	}

	return (
		<LayoutGrid variant="twoUp" alignItems="baseline" mb="10">
			<GridItem>
				<Heading display="inline" flexGrow="1" as="h1" size="3xl">
					{page.title}{" "}
				</Heading>
				<Text as="span" display="inline" textStyle="subtitle" mb={8}>
					{page.subtitle}
				</Text>
				{/* <Image src={page.imageUrl} mb="3" /> */}
			</GridItem>
			<GridItem as="aside" gap={2}>
				<Stack gap={4} mt={5}>
					<VStack align="start" spacing={0}>
						<Text textStyle="title-sm">Role</Text>
						<Text>{page.role}</Text>
					</VStack>

					<VStack align="start" spacing={0}>
						<Text textStyle="title-sm">Team</Text>
						<UnorderedList spacing="1" ms="0">
							{page.team &&
								page.team.map((member) => (
									<ListItem key={member.name} display="flex" alignItems="center" gap={0} flexWrap="wrap">
										{member.url ? (
											<LinkOut href={member.url} text={member.name} />
										) : (
											<Box as="span" fontWeight="semibold" color="fg.emphasized">
												{member.name}
											</Box>
										)}
										{member.role && (
											<Text ms="1" color="fg.muted">
												∙ {member.role}
											</Text>
										)}
									</ListItem>
								))}
						</UnorderedList>
					</VStack>
					<VStack align="start" spacing={0}>
						<Text textStyle="title-sm">When</Text>
						<Text textStyle="date">{page.date}</Text>
					</VStack>
				</Stack>
				{/* <Text fontSize="xl" color="fg.subdued" mb={5}>
          {page.subtitle}
        </Text> */}
				{/* <Text fontSize="lg" lineHeight="tall">
          {page.description}
        </Text> */}
			</GridItem>
		</LayoutGrid>
	);
};

// Define PropTypes for PageHeader component
// This is optional since you are using TypeScript
PageHeader.propTypes = {
	pageKey: PropTypes.string.isRequired,
};

export default PageHeader;
