import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  open : false
}

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers : {
    toggleSidebar : (state) => {
      state.open = !state.open;
    },
    closeSidebar : (state) => {
      state.open = false;
    }
  }
});




export const {toggleSidebar, closeSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;