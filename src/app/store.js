import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./api/tasksSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    [tasksSlice.reducerPath]: tasksSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksSlice.middleware),
  devTools: true, //! mudar para false quando for para producao (preferencialmente usar env)
});
