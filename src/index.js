// Component imports
import App from "./App";

// React imports
import React from "react";
import { createRoot } from "react-dom/client";

// Routing imports
import {
  BrowserRouter as Router,
  Route,
  BrowserRouter,
} from "react-router-dom";

// Styling imports
import './style.css'
// MAIN
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
