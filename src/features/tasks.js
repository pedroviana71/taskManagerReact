import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setTask } = tasksSlice.actions;

export default tasksSlice.reducer;
