import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </ThemeProvider>
);
