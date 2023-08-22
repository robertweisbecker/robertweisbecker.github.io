import React from "react";
import { IconButton } from "@chakra-ui/react";
import { DoubleArrowUpIcon } from "@radix-ui/react-icons";

export const ScrollButton = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      icon={<DoubleArrowUpIcon />}
      onClick={handleClick}
      isRound
      aria-label="Scroll to top"
    />
  );
};
