 import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'; // ✅ Tailwind directives must be imported first
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: You can use reportWebVitals to measure performance
reportWebVitals();
