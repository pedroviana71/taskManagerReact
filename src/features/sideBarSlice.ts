import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideBar: false,
  typeClickOutside: "",
};

const sideBarSlice = createSlice({
  name: "showSideBar",
  initialState,
  reducers: {
    toggleSideBar: (state, action) => {
      state.showSideBar = action.payload;
    },
    typeClickOutside: (state, action) => {
      state.typeClickOutside = action.payload;
    },
  },
});

export const { toggleSideBar, typeClickOutside } = sideBarSlice.actions;

export default sideBarSlice.reducer;
