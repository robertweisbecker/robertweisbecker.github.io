import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  ScrollRestoration,
  // // Switch,
  // createBrowserHistory,
} from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import {
  ChakraProvider,
  Box,
  Container,
  SkipNavLink,
  SkipNavContent,
} from "@chakra-ui/react";
import Header from "./components/header";
import Footer from "./components/footer";
import { Home, About, Engage, Furnace, UDL, DSF, Forge, NPR } from "./pages";

// import { Achieve } from "./pages/achieve";
// import * as components from "./theme";
// import { typographyOverrides } from "./theme/typography";
// import { theme as proTheme } from "@chakra-ui/pro-theme";
// import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

import { theme } from "./theme";

// export const theme = extendTheme({
//   colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
//   ...typographyOverrides,

//   components: {
//     ...components,
//   },
// });

const App: React.FC = () => {
  const location = useLocation();
  return (
    <ChakraProvider theme={theme}>
      <SkipNavLink id="content">Skip to Main</SkipNavLink>
      <Header />
      <AnimatePresence>
        <Container as="main" pb={16} maxW="container.lg" mx="auto">
          <SkipNavContent id="content" />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/unified-design-language" element={<UDL />} />
            <Route path="/forge" element={<Forge />} />
            <Route path="/furnace" element={<Furnace />} />
            <Route path="/everfi-engage" element={<Engage />} />
            {/* <Route path="/everfi-achieve" element={<Achieve />} /> */}
            <Route path="/everfi-data-science" element={<DSF />} />
            <Route path="/npr-maps" element={<NPR />} />
          </Routes>
        </Container>
      </AnimatePresence>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
