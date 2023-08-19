import * as React from "react";
// import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";

import { IconButton } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

function BackButton() {
  return (
    <IconButton
      as={HashLink}
      preventScrollReset
      size="md"
      colorScheme="brand"
      variant="ghost"
      borderRadius="full"
      icon={<ArrowLeftIcon />}
      to="/#projects"
      fontWeight="regular"
      aria-label="Back"
    />
  );
}

export default BackButton;
