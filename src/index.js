import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/home/index";
import styles from "./utils/styles/normalize.css";
// import { configureStore } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { tasks } from "./features/tasksSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

// const store = configureStore({
//   reducer: {
//     [tasks.reducerPath]: tasks.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(tasks.middleware),
// });

root.render(
  <React.StrictMode>
    <ApiProvider api={tasks}>
      {/* <Provider store={store}> */}
      <Home className={styles} />
      {/* </Provider> */}
    </ApiProvider>
  </React.StrictMode>
);
