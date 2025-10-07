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
        .eq("user_id", userId);

      const sorted = data.sort((a, b) => {
        // unpaid first
        if (a.remaining_amount === 0 && b.remaining_amount > 0) return 1;
        if (a.remaining_amount > 0 && b.remaining_amount === 0) return -1;
        // then latest first
        return new Date(b.created_at) - new Date(a.created_at);
      });

      if (error) throw error;
      return sorted; // return the fetched data
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
    },
    { rejectWithValue }
  ) => {
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
      const { data, error } = await supabase
        .from("user_liabilities")
        .insert([payload]);

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

//pay liability
export const payLiability = createAsyncThunk(
  "liabilities/payLiability",
  async ({ liabilityId, paymentAmount }, { rejectWithValue }) => {
    try {
      // Fetch current remaining
      const { data: liability, error: fetchError } = await supabase
        .from("user_liabilities")
        .select("remaining_amount")
        .eq("id", liabilityId)
        .single();

      if (fetchError) throw fetchError;

      const currentRemaining = Number(liability.remaining_amount);
      const newRemaining = Math.max(currentRemaining - paymentAmount, 0);

      // Update with .select() to return updated record
      const { data: updated, error: updateError } = await supabase
        .from("user_liabilities")
        .update({ remaining_amount: newRemaining })
        .eq("id", liabilityId)
        .select()
        .single();

      if (updateError) throw updateError;

      return updated;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//updated liability
export const updatedLiability = createAsyncThunk(
  "liabilities/updatedLiability",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_liabilities")
        .update(updatedData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data; // return updated expense
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
      })

      .addCase(payLiability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payLiability.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.liabilities = state.liabilities.map((liab) =>
          liab.id === updated.id ? updated : liab
        );
      })

      .addCase(payLiability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatedLiability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatedLiability.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        state.liabilities = state.liabilities.map((liab) =>
          liab.id === updated.id ? updated : liab
        );
      })
      .addCase(updatedLiability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default liabilitySlice.reducer;
