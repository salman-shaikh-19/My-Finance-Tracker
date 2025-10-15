import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
export const getAllIncomes = createAsyncThunk(
  "income/getAllIncomes",
  async ({ userId, customWeakDate,wise='week' }, { rejectWithValue }) => {
    try {
      if(wise==='week'){
        
        const custDate = customWeakDate ? dayjs(customWeakDate) : dayjs();
        const startOfWeek = custDate.startOf("isoWeek").format("YYYY-MM-DD");
        const endOfWeek = custDate.endOf("isoWeek").format("YYYY-MM-DD");
  
        const { data, error } = await supabase
          .from("user_incomes")
          .select("*")
          .eq('user_id',userId)
           .gte("received_on", startOfWeek)
          .lte("received_on", endOfWeek)
          // .order("id", { ascending: false });
           .order("created_at", { ascending: false });
     
  
        if (error) throw error;
        return data; // return the fetched data
      }else if(wise==='year'){
        const custDate = customWeakDate ? dayjs(customWeakDate) : dayjs();
        const startOfYear = custDate.startOf("year").format("YYYY-MM-DD");
        const endOfYear = custDate.endOf("year").format("YYYY-MM-DD");
        const { data, error } = await supabase
          .from("user_incomes")
          .select("*")
          .eq('user_id',userId)
           .gte("received_on", startOfYear)
          .lte("received_on", endOfYear)
          // .order("id", { ascending: false });
           .order("created_at", { ascending: false });
     
  
        if (error) throw error;
        return data; // return the fetched data
        
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addIncome = createAsyncThunk(
  "income/addIncome",
  async ({ user_id, income_amount,income_category, received_on,income_note }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("user_incomes").insert([
        {
          user_id,
          income_amount,
          income_category,
        
          received_on,
          income_note
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

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (incomeId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("user_incomes")
        .delete()
        .eq("id", incomeId);
        

      if (error) throw error;
      // console.log("deleted income data:", data);
      
      // return data[0]; // return deleted income
      return { id: incomeId }; // return deleted income id
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateIncome = createAsyncThunk(
  "income/updateIncome",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_incomes")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;
      return data[0]; // return updated income
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload;
      })
      .addCase(getAllIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      } )
      .addCase(deleteIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = state.incomes.filter(
          (inc) => inc.id !== action.payload.id
        );
      })
   
      .addCase(deleteIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateIncome.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncome.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.incomes.findIndex(
          (inc) => inc.id === action.payload.id
        );
        if (index !== -1) {
          state.incomes[index] = action.payload;
        }
      })
      .addCase(updateIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}); 

export default incomeSlice.reducer;