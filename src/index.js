import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import Register from "./components/register/index.js";
import Login from "./components/login";
import EditTask from "./components/tasks/editTask";
import CreateTask from "./components/tasks/createTask";
import Tasks from "./components/tasks";
import Logout from "./components/logout";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <Tasks /> },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "edit/:id", element: <EditTask /> },
      { path: "create-task", element: <CreateTask /> },
      { path: 'logout', element: <Logout /> }
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
