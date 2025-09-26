import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "light",
    loggedInUserId: null,
    loading: false,
    error: null,
    userCurrency:'USD',
    isGetStarted: false,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setLoggedInUserId(state, action) {
      state.loggedInUserId = action.payload;
    },
    setUserCurrency(state,action){
        state.userCurrency = action.payload;
    },
    setGetStarted(state, action) {
      // console.log(action.payload);

      state.isGetStarted = action.payload;
    },
  },
});

export const { setTheme, setGetStarted, setLoggedInUserId,setUserCurrency } =
  commonSlice.actions;
export default commonSlice.reducer;
