import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/home/index";
import styles from "./utils/styles/normalize.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import tasksReducer from "./features/tasks";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home className={styles} />
    </Provider>
  </React.StrictMode>
);
