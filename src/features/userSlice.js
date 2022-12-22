import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
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

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.username;
export const selectCurrentToken = (state) => state.user.token;