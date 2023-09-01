import * as React from "react";
import "./App.css";
import {
  Routes,
  Route,
  useLocation,
  ScrollRestoration,
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
import ScrollToTop from "./components/scrollToTop";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./theme";
import {
  Home,
  About,
  Engage,
  Furnace,
  UDL,
  DSF,
  Forge,
  NPR,
  Thesis,
} from "./pages";
import { usePageTracking } from "./tracking/tracking";
const App: React.FC = () => {
  const location = useLocation();
  // usePageTracking();
  return (
    <ChakraProvider theme={theme}>
      <SkipNavLink id="content">Skip to Main</SkipNavLink>
      <ScrollToTop />
      <ColorModeScript initialColorMode="system" />
      <Header />
      <Container as="main" pb={16} maxW="container.lg" mx="auto">
        <AnimatePresence>
          <SkipNavContent id="content" />
          <Routes location={location} key={location.pathname}>
            <Route path="/about" element={<About />} />
            <Route path="/unified-design-language" element={<UDL />} />
            <Route path="/forge" element={<Forge />} />
            <Route path="/furnace" element={<Furnace />} />
            <Route path="/everfi-engage" element={<Engage />} />
            {/* <Route path="/everfi-achieve" element={<Achieve />} /> */}
            <Route path="/everfi-data-science" element={<DSF />} />
            <Route path="/npr-maps" element={<NPR />} />
            <Route
              path="/conversational-immigration-forms"
              element={<Thesis />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </Container>
      <Footer />
    </ChakraProvider>
  );
};

export default App;
