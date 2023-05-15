import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./config/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
