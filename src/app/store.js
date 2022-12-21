import { configureStore } from "@reduxjs/toolkit";
import { tasksSlice } from "./api/tasksSlice";
import authSlice from "../features/authSlice";
import { userSlice } from "./api/userSlice";

export const store = configureStore({
  reducer: {
    [tasksSlice.reducerPath]: tasksSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksSlice.middleware, userSlice.middleware),
  devTools: true, //! mudar para false quando for para producao (preferencialmente usar env)
});
