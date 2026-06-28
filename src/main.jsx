import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import TheHealthWatchersWebsite from "./App.jsx";
import "./styles.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <TheHealthWatchersWebsite />
  </React.StrictMode>
);

// The homepage is prerendered to static HTML at build time
// (scripts/prerender-home.mjs), so hydrate the existing markup when present
// and fall back to a fresh render in dev where there is nothing to hydrate.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
