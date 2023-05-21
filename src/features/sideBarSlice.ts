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
    typeClickOutsideAction: (state, action) => {
      state.typeClickOutside = action.payload;
    },
  },
});

export const { toggleSideBar, typeClickOutsideAction } = sideBarSlice.actions;

export default sideBarSlice.reducer;
