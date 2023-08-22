import * as React from "react";
// import { useHistory } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import { IconButton } from "@chakra-ui/react";

import { ArrowLeftIcon } from "@radix-ui/react-icons";

export const BackButton = () => {
  // let history = useHistory();
  return (
    <IconButton
      as={HashLink}
      // onClick={() => history.goBack()}
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
};
