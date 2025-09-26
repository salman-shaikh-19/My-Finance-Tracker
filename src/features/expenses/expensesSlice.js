import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";

export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_expenses")
        .select("*")
        .eq('user_id',userId);
        // select all fields

      if (error) throw error;
      return data; // return the fetched data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
   initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {
   

  },
    extraReducers: (builder) => {
    builder
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload; // store data
      })
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },

});

// export const { } = expensesSlice.actions;
export default expensesSlice.reducer;