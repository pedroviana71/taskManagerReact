import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: false,
};

const sideBarSlice = createSlice({
  name: "showSideBar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.showSideBar = !state.showSideBar;
    },
  },
});

export const { toggleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
