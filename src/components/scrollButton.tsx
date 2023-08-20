import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export const ScrollButton = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      icon={<ArrowUpIcon />}
      onClick={handleClick}
      aria-label="Scroll to top"
    />
  );
};
