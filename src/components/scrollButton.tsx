import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const ScrollButton = () => {
	const handleClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Tooltip label="Scroll to top">
			<IconButton
				icon={<ArrowUpIcon />}
				onClick={handleClick}
				variant="outline"
				isRound
				size="sm"
				// boxShadow="lg"
				aria-label="Scroll to top"
			/>
		</Tooltip>
	);
};
