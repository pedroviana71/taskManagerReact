import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/home/index";
import styles from "./utils/styles/normalize.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home className={styles} />
  </React.StrictMode>
);
