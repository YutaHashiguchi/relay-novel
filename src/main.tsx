// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // ← .js → .tsx に変更
import "./output.css";      // ← TailwindのCSSがここにビルドされる想定

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
