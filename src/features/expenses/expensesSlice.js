import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async ({ userId, referenceDate }, { rejectWithValue }) => {
    try {
         const refDate = referenceDate ? dayjs(referenceDate) : dayjs();

      const startOfWeek = refDate.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = refDate.endOf("isoWeek").format("YYYY-MM-DD");

      const { data, error } = await supabase
        .from("user_expenses")
        .select("*")
        .eq('user_id',userId)
         .gte("expense_date", startOfWeek)
        .lte("expense_date", endOfWeek)
        // .order("id", { ascending: false });
         .order("expense_date", { ascending: true });
        // select all fields

      if (error) throw error;
      return data; // return the fetched data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({ userId, amount, category, date, method }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("user_expenses").insert([
        {
          user_id: userId,
          amount,
          expense_category:category,
          expense_date:date,
          payment_method:method,
        },
      ]);

      if (error) throw error;
      return data[0]; // return added expense
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
      })
      // add expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
       //add new expense at beginning of array
        // state.expenses.unshift(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add expense";
      });
  },

});

// export const { } = expensesSlice.actions;
export default expensesSlice.reducer;