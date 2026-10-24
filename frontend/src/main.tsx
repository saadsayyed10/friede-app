import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toast.tsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY!;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkKey}>
      <App />

      <Toaster />
    </ClerkProvider>
  </StrictMode>,
);
