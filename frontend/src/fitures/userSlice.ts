import { createSlice } from "@reduxjs/toolkit";
import { UserPayload } from "../types/typing";


const initialState = {
  user  : {
    userId : "",
    username : "",
    image : ""
  } 
}

const userSlice = createSlice({
  name : "user",
  initialState,
  reducers : {
    setUser : (state, {payload}:{payload : UserPayload}) =>{
      state.user = payload;
    },

    resetUser : (state) => {
      state.user = {
        userId : "",
        username : "",
        image : ""
      }
    }

  }
})

export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;