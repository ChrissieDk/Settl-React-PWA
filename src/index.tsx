import React from "react";
import ReactDOM from "react-dom/client";
import "driver.js/dist/driver.css";
import "./index.css";
import App from "./App";
// @ts-ignore
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ThemeProvider } from "@material-tailwind/react";
import "react-tooltip/dist/react-tooltip.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Element with ID 'root' not found.");
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
