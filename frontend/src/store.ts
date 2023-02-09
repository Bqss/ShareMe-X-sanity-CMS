
import {configureStore} from "@reduxjs/toolkit";
import sidebarSlice from "./fitures/sidebarSlice";
import userSlice from "./fitures/userSlice";
const store = configureStore({
  reducer : {
    user : userSlice,
    sidebar : sidebarSlice
  }
})


export type RootState = ReturnType<typeof store.getState>

export default store;