import * as React from "react";
// import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Link, Icon } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
	// let history = useHistory();
	return (
		<Link
			as={HashLink}
			// onClick={() => history.goBack()}
			preventScrollReset
			size="sm"
			colorScheme="brand"
			fontFamily="heading"
			color="text-interactive"
			textDecoration="none"
			borderRadius="full"
			to="/#projects"
			gap="2"
			alignItems="center"
			fontWeight="regular"
			className="group">
			<Icon
				as={ArrowLeftIcon}
				transitionProperty="common"
				transitionTimingFunction=""
				transitionDuration="fast"
				_groupHover={{
					transform: "translateX(-.25em)",
				}}
			/>{" "}
			Back
		</Link>
	);
};
