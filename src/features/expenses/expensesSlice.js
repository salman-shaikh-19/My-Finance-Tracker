import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async ({ userId, customWeakDate,category }, { rejectWithValue,dispatch }) => {
    try {
         const custDate = customWeakDate ? dayjs(customWeakDate) : dayjs();

      const startOfWeek = custDate.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = custDate.endOf("isoWeek").format("YYYY-MM-DD");

   
  let query = supabase
        .from("user_expenses")
        .select("*")
        .eq("user_id", userId)
        .gte("expense_date", startOfWeek)
        .lte("expense_date", endOfWeek)
        .order("created_at", { ascending: false });

      if (category) query = query.eq("expense_category", category);
        const { data, error } = await query;
      if (error) throw error;
      dispatch(getExpensesByCategory({ userId, customWeakDate }));
      return data; // return the fetched data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({ userId, amount, category, date, method,expense_note }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("user_expenses").insert([
        {
          user_id: userId,
          amount,
          expense_category:category,
          expense_date:date,
          payment_method:method,
          expense_note
        },
      ]);
      
      if (error) throw error;
      // getAllExpenses();
      return data[0]; // return added expense
    } catch (err) {

      return rejectWithValue(err.message);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (expenseId, { rejectWithValue }) => {
    try {
      const {  error } = await supabase.from("user_expenses").delete().eq('id',expenseId);

      if (error) throw error;
      // getAllExpenses();
      return  { id: expenseId };

    } catch (err) {

      return rejectWithValue(err.message);
    }
  }
);


//update expense
export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('user_expenses')
        .update(updatedData)
        .eq('id', id);

      if (error) {
        return rejectWithValue(error.message);
      }

      return data[0]; // return the updated record
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getExpensesByCategory = createAsyncThunk(
  "expenses/getExpensesByCategory",
  async ({ userId, customWeakDate }, { rejectWithValue }) => {
    try {
      const custDate = customWeakDate ? dayjs(customWeakDate) : dayjs();
      const startOfWeek = custDate.startOf("isoWeek").format("YYYY-MM-DD");
      const endOfWeek = custDate.endOf("isoWeek").format("YYYY-MM-DD");

      // fetch all expenses in date range
      const { data, error } = await supabase
        .from("user_expenses")
        .select("expense_category, amount")
        .eq("user_id", userId)
        .gte("expense_date", startOfWeek)
        .lte("expense_date", endOfWeek);

      if (error) throw error;

      // aggregate totals by category in JS
      const aggregated = data.reduce((acc, curr) => {
        if (!acc[curr.expense_category]) acc[curr.expense_category] = 0;
        acc[curr.expense_category] += curr.amount;
        return acc;
      }, {});

      const result = Object.entries(aggregated).map(([expense_category, total_amount]) => ({
        expense_category,
        total_amount,
      }));

      // console.log("Aggregated by category:", result);

      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const expensesSlice = createSlice({
  name: "expenses",
   initialState: {
    expenses: [],
    byCategory: [],
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

      //by category

            .addCase(getExpensesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExpensesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.byCategory = action.payload;
      })
      .addCase(getExpensesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch expenses by category";
      })
      // add expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.loading = false;
       //add new expense at beginning of array
           if (action.payload) {
          state.expenses.unshift(action.payload); // instantly show new expense
        }
        // getAllExpenses();
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add expense";
      })
      //deleteExpense
         .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          (exp) => exp.id !== action.payload.id
        );
      })

      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete expense";
      })

       .addCase(updateExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.expenses.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.expenses[index] = action.payload;
        }
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },

});

// export const { } = expensesSlice.actions;
export default expensesSlice.reducer;