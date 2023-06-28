import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("Best_Shop"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);