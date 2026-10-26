import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { getRouter } from "./router";
import { RouterProvider } from "@tanstack/react-router";
import "./styles.css";

const router = getRouter();

const rootElement = document.getElementById("root")!;

if (rootElement.innerHTML) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}