import React from "react";
import ReactDOM from "react-dom/client";
// import { Routes } from "@generouted/react-router";

import "./styles.css";

async function enableMocking() {
  const { worker } = await import("@/mock/browser");

  return worker.start();
}

function setupReact(Router: () => React.JSX.Element) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <Router/>
    </React.StrictMode>
  );
}

enableMocking().then( async () => {
  const {Routes} = await import('@generouted/react-router')

  setupReact(Routes)
});

// setupReact()
