import { defineStyleConfig } from "@chakra-ui/styled-system";

import {
  darken,
  mode,
  StyleFunctionProps,
  transparentize,
} from "@chakra-ui/theme-tools";

const baseStyle = {
  ":focus:not(:focus-visible)": {
    boxShadow: "none",
  },
  fontWeight: "medium",
  borderRadius: "lg",
  _hover: {
    textDecoration: "none",
  },
};

const sizes = {
  lg: {
    fontSize: "md",
  },
  xl: {
    h: "3.75rem",
    minW: "3.75rem",
    fontSize: "lg",
    px: 7,
  },
};

const variants = {
  primary: (props: StyleFunctionProps) =>
    props.theme.components["Button"]["variants"]["solid"]({
      ...props,
      variant: "solid",
      colorScheme: "brand",
    }),
  "primary-invert": () => ({
    bg: "brand.50",
    color: "brand.600",
    _hover: { bg: "brand.100" },
    _active: { bg: "brand.100" },
  }),
  secondary: (props: StyleFunctionProps) =>
    props.theme.components["Button"]["variants"]["outline"]({
      ...props,
      variant: "outline",
      colorScheme: "gray",
    }),
  "secondary-invert": {
    color: "white",
    borderColor: "brand.50",
    borderWidth: "1px",
    _hover: { bg: "whiteAlpha.200" },
    _active: { bg: "whiteAlpha.200" },
  },
  ghost: (props: StyleFunctionProps) => ({
    color: mode(`${props.colorScheme}.500`, `${props.colorScheme}.300`)(props),
    _hover: {
      color: mode(
        `${props.colorScheme}.600`,
        `${props.colorScheme}.200`
      )(props),
      bg: mode(`${props.colorScheme}.50`, `${props.colorScheme}.800`)(props),
    },
    _active: {
      color: mode(
        `${props.colorScheme}.700`,
        `${props.colorScheme}.100`
      )(props),
      bg: mode(`${props.colorScheme}.200`, `${props.colorScheme}.700`)(props),
    },
  }),
  outline: (props: StyleFunctionProps) => ({
    color: "emphasis",
    bg: "surface",
    borderColor: "border-subdued",
    _hover: {
      bg: "surface-hover",
      borderColor: "border",
    },
    _checked: {
      bg: "surface-active",
      borderColor: "border-muted",
    },
    _active: {
      bg: "surface-active",
      borderColor: "current",
    },
  }),
  neutral: (props: StyleFunctionProps) => ({
    color: "emphasized",
    bg: "surface-muted",
    _hover: {
      bg: "surface-hover",
    },
    _active: {
      bg: "surface-active",
    },
    _activeLink: {
      bg: "surface-active",
      fontWeight: "semibold",
    },
  }),
  "neutral-invert": (props: StyleFunctionProps) => ({
    color: "brand.50",
    _hover: {
      bg: transparentize("brand.500", 0.67)(props.theme),
    },
    _activeLink: {
      color: "white",
      bg: "bg-accent-subtle",
    },
  }),
  link: (props: StyleFunctionProps) => {
    if (props.colorScheme === "gray") {
      return {
        color: "muted",
        textDecoration: "none",
        fontWeight: "normal",
        rounded: "full",
        padding: 2,
        _hover: {
          bg: "surface-hover",
          color: "emphasis",
          textDecoration: "none",
        },
        _active: {
          bg: "surface-active",
          color: "emphasis",
        },
        _activeLink: {
          bg: "surface-active",
          color: "emphasis",
          fontWeight: "semibold",
        },
      };
    }
    return {
      color: mode(
        `${props.colorScheme}.500`,
        `${props.colorScheme}.300`
      )(props),
      _hover: {
        color: mode(
          `${props.colorScheme}.600`,
          `${props.colorScheme}.200`
        )(props),
        textDecoration: "none",
      },
      _active: {
        color: mode(
          `${props.colorScheme}.700`,
          `${props.colorScheme}.100`
        )(props),
      },
    };
  },
  "link-invert": () => {
    return {
      padding: 0,
      height: "auto",
      lineHeight: "normal",
      verticalAlign: "baseline",
      color: "brand.50",
      _hover: {
        color: "inverted",
      },
      _active: {
        color: "inverted",
      },
    };
  },
};

export default {
  baseStyle,
  variants,
  sizes,
};
