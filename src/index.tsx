import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Register from "./components/register/index";
import Login from "./components/login";
import CreateTask from "./components/createTask";
import Tasks from "./components/tasks";
import Logout from "./components/logout";
import Profile from "./components/profile";
import Category from "./components/category";
import CreateCategory from "./components/category/createCategory";
import NewPassword from "./components/resetPassword/newPassword";
import ResetPassword from "./components/resetPassword";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
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
      { path: "edit/:id", element: <CreateTask /> },
      { path: "create-task", element: <CreateTask /> },
      { path: "logout", element: <Logout /> },
      { path: "user/:id", element: <Profile /> },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        path: "reset-password/",
        element: <ResetPassword />,
      },
      {
        path: "reset-password/:userId/:token",
        element: <NewPassword />,
      },
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
