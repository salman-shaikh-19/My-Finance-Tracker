import {  createSlice } from "@reduxjs/toolkit";


export const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "light",
  
 
    loading: false,
    error: null,
   
    isGetStarted:false,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
  
   

    setGetStarted(state, action) {
      // console.log(action.payload);
      
      state.isGetStarted = action.payload;
    },

  },

});

export const { setTheme,setGetStarted} = commonSlice.actions;
export default commonSlice.reducer;