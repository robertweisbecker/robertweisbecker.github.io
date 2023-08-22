import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import React from "react";
import ReactDOMServer from "react-dom/server";

// Serialize the SVG React component to a string using React.createElement instead of JSX
const svgString = ReactDOMServer.renderToStaticMarkup(
  React.createElement(ArrowTopRightIcon)
);
// Encode the SVG string to use it in CSS
const encodedSvg = encodeURIComponent(svgString);

// ... (the rest of your code)

const baseStyle = {
  fontWeight: "",

  textDecoration: "underline",
  textDecorationColor: "subtle",
  textDecorationThickness: ".08em",

  display: "inline-flex",
  alignItems: "baseline",
  _hover: {
    color: "accent",
  },
};

const isExternal = {
  _after: {
    content: `url('data:image/svg+xml,${encodedSvg}')`,
    color: "red",
  },
};

const variants = {
  menu: () => ({
    borderRadius: "lg",
    p: "2",
    _hover: {
      textDecoration: "none",
      bg: "bg-subtle",
    },
    _active: {
      textDecoration: "none",
      bg: "bg-active",
    },
    _activeLink: {
      fontWeight: "bold",
      bg: "bg-active",
    },
  }),
  external: {
    _after: {
      content: `url('data:image/svg+xml,${encodedSvg}')`,
    },
  },
};

export default {
  isExternal: {
    color: "red",
  },
  variants,
  baseStyle,
};
