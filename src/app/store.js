import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./api/tasksSlice";
import userSlice from "../features/userSlice";
import { authSlice } from "./api/authSlice";

export const store = configureStore({
  reducer: {
    [tasksSlice.reducerPath]: tasksSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksSlice.middleware, authSlice.middleware),
  devTools: true, //! mudar para false quando for para producao (preferencialmente usar env)
});
