import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

export const headingStyles = defineStyleConfig({
  baseStyle: {
    fontFamily: "heading",
    fontWeight: "", // make sure it's empty,
    lineHeight: "short",
    color: "emphasis",
    letterSpacing: "tight",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    "3xl": {
      fontSize: "3xl",
      fontWeight: "semibold",
      letterSpacing: "tighter",
      mb: "2",
    },
    "2xl": {
      fontSize: "2xl",
      fontWeight: "medium",
      lineHeight: "base",
      letterSpacing: "tight",
      mb: "8",
    },
    xl: {
      fontSize: "xl",
      fontWeight: "medium",
    },
    lg: {
      fontSize: "lg",
      lineHeight: "base",
      letterSpacing: "normal",
      fontWeight: "semibold",
      mt: "2em",
    },

    md: {
      fontSize: "md",
      fontWeight: "semibold",
      // mt: "2em",
    },
    sm: {
      fontSize: "sm",
      fontWeight: "semibold",
      my: ".5em",
    },
    xs: {
      fontSize: "sm",
      lineHeight: "1rem",
      fontWeight: "bold",
      my: ".5em",
    },
    "2xs": {
      fontSize: "xs",
      textTransform: "uppercase",
      color: "subtle",
      lineHeight: "1rem",
      letterSpacing: "wide",
    },
  },
  variants: {
    heading1: {
      textStyle: "h1",
    },
    heading2: {
      textStyle: "h2",
    },
    heading3: {
      textStyle: "h3",
    },
    h4: {
      textStyle: "h4",
    },
    h5: {
      textStyle: "h5",
    },
    h6: {
      textStyle: "h6",
    },
    subtitle: {
      fontSize: "lg",
      fontWeight: "medium",
      lineHeight: "shorter",
    },
  },
});

// const baseStyle = {
//   fontWeight: "regular",
//   color: "emphasized",
//   my: "4",
// };

// const sizes = {
//   "3xl": {
//     fontSize: "3xl",
//     lineHeight: "shorter",
//     fontWeight: "bold",
//   },

//   "2xl": {
//     textStyle: "h1",
//   },
//   xl: {
//     textStyle: "h1",
//   },
//   lg: {
//     textStyle: "h2",
//   },
//   sm: {
//     textStyle: "h3",
//   },
//   xs: {
//     textStyle: "h4",
//   },
//   "2xs": {
//     textStyle: "h5",
//   },
// };

// export default {
//   baseStyle,
//   sizes,
// };
