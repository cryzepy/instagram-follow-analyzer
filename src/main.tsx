import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { LangProvider } from "./contexts/LangContext";
import logoUrl from "./assets/icons/logo.svg";

// Set favicon dynamically for singlefile compatibility
const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']") ?? document.createElement("link");
link.rel = "icon";
link.type = "image/svg+xml";
link.href = logoUrl;
document.head.appendChild(link);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
