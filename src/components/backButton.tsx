import * as React from "react";
// import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { Button, Icon } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
	// let history = useHistory();
	return (
		<Button
			as={HashLink}
			// onClick={() => history.goBack()}
			preventScrollReset
			size="sm"
			colorScheme="brand"
			variant="link"
			borderRadius="full"
			leftIcon={<Icon as={ArrowLeftIcon} />}
			to="/#projects"
			fontWeight="regular"
			aria-label="Back">
			Back
		</Button>
	);
};
