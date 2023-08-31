import { tabsAnatomy } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  type StyleFunctionProps,
} from "@chakra-ui/styled-system";

const { definePartsStyle } = createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const indicator = definePartsStyle((props) => {
  return {
    tablist: {
      borderRadius: "full",
      overflow: "hidden",
      h: "auto",
      p: "1",
      px: "2",
      gap: "-1",
      borderWidth: "1px",
      w: "auto",
      justifyContent: "center",
      width: "max",
      mx: "auto",
      bg: "bg-canvas",
      position: "relative",
    },
    tab: {
      color: "subtle",
      fontSize: "xs",
      fontWeight: "normal",
      zIndex: 1,
      borderRadius: "full",
      px: "5",
      py: "1",
      h: "auto",
      mx: "-1",
      _hover: {
        bg: "surface-hover",
        color: "muted",
        zIndex: "0",
      },
      _selected: {
        color: "emphasis",
        fontWeight: "medium",
        zIndex: "10",
        _hover: {
          bg: "transparent",
        },
      },
    },
    indicator: {
      top: "1",
      bottom: "1",
      borderRadius: "full",
      boxShadow: "xs",
      bg: "surface-elevated",

      // _dark: {
      //   bg: "gray.700",
      // },
    },
  };
});
