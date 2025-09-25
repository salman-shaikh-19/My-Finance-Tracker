import {  createSlice } from "@reduxjs/toolkit";


export const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "light",
    isUserLoggedIn: false,
 
    loading: false,
    error: null,
   
    isGetStarted:false,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setIsUserLoggedIn(state, action) {
      state.isUserLoggedIn = action.payload;
    },
   

    setGetStarted(state, action) {
      // console.log(action.payload);
      
      state.isGetStarted = action.payload;
    },

  },

});

export const { setTheme,  setIsUserLoggedIn,setGetStarted} = commonSlice.actions;
export default commonSlice.reducer;