import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);
// export const getAllInvestments = createAsyncThunk(
//   "investments/getAllInvestments",
//   async ({ userId,  }, { rejectWithValue }) => {
//     try {

//       const { data, error } = await supabase
//         .from("user_investments")
//         .select("*")
//         .eq('user_id',userId)

//          .order("created_at", { ascending: false });
   

//       if (error) throw error;
//       return data; // return the fetched data
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );
export const getAllInvestments = createAsyncThunk(
  "investments/getAllInvestments",
  async ({ userId, year }, { rejectWithValue }) => {
    try {
      let query = supabase.from("user_investments").select("*").eq("user_id", userId);

      // if year passed then apply below filter
      if (year) {
        const start = `${year}-01-01`;
        const end = `${year}-12-31`;
        query = query.gte("start_date", start).lte("start_date", end);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const addInvestment = createAsyncThunk(
  "investments/addInvestment",
  async ({ user_id, investment_category,invested_amount, start_date,maturity_date,investment_note }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from("user_investments").insert([
        {
          user_id,
          investment_category,
          invested_amount,
        
          start_date,
          maturity_date,
          investment_note
        },
      ]);

      if (error) throw error;
      return data[0]; // return added expense
    } catch (err) {

      return rejectWithValue(err.message);
    }
  }
);

export const deleteInvestment = createAsyncThunk(
  "investments/deleteInvestment",
  async (investmentId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from("user_investments")
        .delete()
        .eq("id", investmentId);
        

      if (error) throw error;
     
      
      // return data[0]; // return deleted investment
      return { id: investmentId }; // return deleted investment id
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateInvestment = createAsyncThunk(
  "investments/updateInvestment",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_investments")
        .update(updatedData)
        .eq("id", id);

      if (error) throw error;
      return data[0]; // return updated income
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const investmentSlice = createSlice({
  name: "investments",
  initialState: {
    investments: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllInvestments.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = action.payload;
      })
      .addCase(getAllInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.investments.push(action.payload);
      })
      .addCase(addInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      } )
      .addCase(deleteInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.loading = false;
        state.investments = state.investments.filter(
          (inc) => inc.id !== action.payload.id
        );
      })
   
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateInvestment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInvestment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.investments.findIndex(
          (inc) => inc.id === action.payload.id
        );
        if (index !== -1) {
          state.investments[index] = action.payload;
        }
      })
      .addCase(updateInvestment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
}); 

export default investmentSlice.reducer;