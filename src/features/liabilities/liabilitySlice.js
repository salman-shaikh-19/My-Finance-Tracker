
//slice for liabilities with thunk
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

export const getAllLiabilities = createAsyncThunk(
  "liabilities/getAllLiabilities",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_liabilities")
        .select("*")
        .eq('user_id',userId)
        .neq("remaining_amount", 0)
        .order("created_at", { ascending: false });


      if (error) throw error;
      return data; // return the fetched data
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const addLiability = createAsyncThunk(
  "liabilities/addLiability",
   async (
    {
      userId,
      creditor_name,
      total_amount,
      remaining_amount,
      interest_rate,
      liability_type,
      payment_schedule,
      start_date,
      end_date,
      liability_note,
    }, { rejectWithValue }) => {
    try {
      const payload = {
        user_id: userId,
        creditor_name,
        total_amount: total_amount ? Number(total_amount) : null,
        remaining_amount: remaining_amount ? Number(remaining_amount) : null,
        interest_rate: interest_rate ? Number(interest_rate) : null,
        liability_type,
        payment_schedule,
        start_date,
        end_date: end_date || null,
        liability_note: liability_note || null,
      };
      const { data, error } = await supabase.from("user_liabilities").insert([payload]);

      if (error) throw error;
      // getAllExpenses();
      return data[0]; // return added expense
    } catch (err) {

      return rejectWithValue(err.message);
    }
  }
);

export const deleteLiability = createAsyncThunk(
  "liabilities/deleteLiability",
  async (liabilityId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_liabilities")
        .delete()
        .eq("id", liabilityId);

      if (error) throw error;
      return data[0]; // return deleted expense
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
const liabilitySlice = createSlice({
  name: "liabilities",
  initialState: {
    liabilities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLiabilities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLiabilities.fulfilled, (state, action) => {
        state.loading = false;
        state.liabilities = action.payload;
      })
      .addCase(getAllLiabilities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLiability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLiability.fulfilled, (state, action) => {
        state.loading = false;
        state.liabilities.push(action.payload);
      })
      .addCase(addLiability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(deleteLiability.pending, (state) => {  
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLiability.fulfilled, (state, action) => {
        state.loading = false;
        state.liabilities = state.liabilities.filter(
          (liability) => liability.id !== action.payload.id
        );
      })
      .addCase(deleteLiability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default liabilitySlice.reducer;