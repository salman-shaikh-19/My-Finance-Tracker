import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    theme: "light",
    loggedInUserId: null,
    loading: false,
    error: null,
    userCurrency:'INR',
    isGetStarted: false,
    expenseLimit:10000,
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
      setExpenseLimit(state, action) {
      // console.log(action.payload);

      state.expenseLimit = action.payload;
    },
  },
});

export const { setTheme, setGetStarted, setLoggedInUserId,setUserCurrency,setExpenseLimit } =
  commonSlice.actions;
export default commonSlice.reducer;
