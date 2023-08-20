import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  ScrollRestoration,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ColorModeScript } from "@chakra-ui/react";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorModeScript initialColorMode="system" />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
