import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./api/apiSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [tasksSlice.reducerPath]: tasksSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksSlice.middleware),
  devTools: true, //! mudar para false quando for para producao (preferencialmente usar env)
});
