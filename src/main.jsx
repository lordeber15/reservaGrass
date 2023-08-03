import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <HashRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </HashRouter>
    </React.StrictMode>
  </QueryClientProvider>
);
