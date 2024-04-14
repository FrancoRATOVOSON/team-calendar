import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { Toaster } from "./components/ui/sonner";

async function enableMocking() {
  const { worker } = await import("@/mock/browser");

  return worker.start();
}

async function setupReact() {
  const {Routes} = await import('@generouted/react-router')

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Routes/>
      <Toaster/>
    </React.StrictMode>
  );
}

// Comment this if use a real backend
enableMocking().then( async () => {setupReact()});

// Comment this to enable api mocking
// setupReact()
