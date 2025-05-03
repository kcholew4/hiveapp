import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./ui";
import { Router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <Router />
    </Provider>
  </StrictMode>
);
