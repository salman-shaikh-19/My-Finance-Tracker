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
    expenseLimit:10000, // custom user choice expense max limit
    isSidebarOpen:true,
    isCalculatorOpen:false,
    input: "",
    result: "",
    justCalculated: false,
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
     setIsSidebarOpen(state, action) {
      // console.log(action.payload);
      state.isSidebarOpen = action.payload;
    },
    setIsCalculatorOpen(state, action) {
      state.isCalculatorOpen = action.payload;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setJustCalculated(state, action) {
      state.justCalculated = action.payload;
    },
    clearCalculator: (state) => {
      state.input = "";
      state.result = "";
      state.justCalculated = false;
    },
    resetSettings: (state) => {
      state.theme = "light";
 
      state.userCurrency = "INR";
     
      state.expenseLimit = 10000;
      state.isSidebarOpen = true;
      state.isCalculatorOpen = false;
      state.input = "";
      state.result = "";
      state.justCalculated = false;
    },
  },
});

export const { setTheme, setGetStarted,setIsSidebarOpen, setLoggedInUserId,setUserCurrency,setExpenseLimit,setIsCalculatorOpen,setInput,setResult,setJustCalculated,clearCalculator,resetSettings } =
  commonSlice.actions;
export default commonSlice.reducer;
