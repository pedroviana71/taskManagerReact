import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, username, token, tasks } = action.payload;
      state.username = username;
      state.token = token;
      state.id = id;
      state.tasks = tasks;
    },
    logOut: (state) => {
      state.username = null;
      state.token = null;
    },
  },
  extraReducers: {},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.token;
