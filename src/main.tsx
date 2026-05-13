import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { DocumentsProvider } from "./context/DocumentsProvider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DocumentsProvider>
      <Toaster position="top-center" />
      <App />
    </DocumentsProvider>
  </StrictMode>,
);
