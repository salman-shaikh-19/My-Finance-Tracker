import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { addExpense } from "../expenses/expensesSlice";


dayjs.extend(isoWeek);

export const getAllLiabilities = createAsyncThunk(
  "liabilities/getAllLiabilities",
  async ({ userId, year }, { rejectWithValue }) => {
    try {
      let query = supabase.from("user_liabilities").select("*").eq("user_id", userId);

      // filter by year
      if (year) {
        const start = `${year}-01-01`;
        const end = `${year}-12-31`;
        query = query.gte("start_date", start).lte("start_date", end);
      }

      query = query.order("created_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      // unpaid first, then latest
      const sorted = data.sort((a, b) => {
        if (a.remaining_amount === 0 && b.remaining_amount > 0) return 1;
        if (a.remaining_amount > 0 && b.remaining_amount === 0) return -1;
        return new Date(b.created_at) - new Date(a.created_at);
      });

      return sorted;
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
  async ({ liabilityId, paymentAmount }, { rejectWithValue, dispatch  }) => {
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
          // automatically create an expense for the payment
      const expensePayload = {
        userId: updated.user_id,
        amount: paymentAmount,
        // category: updated.liability_type || "Other", // map liability type as expense category
        category:"Payments",
        date: new Date().toISOString().split("T")[0],
        method: "Other", 
          expense_note: `Paid ${updated.creditor_name ? 'to ' + updated.creditor_name : ''} for ${updated.liability_type ? updated.liability_type.toLowerCase() : 'liability'} of ${Number(paymentAmount).toFixed(2)} on ${new Date().toISOString().split("T")[0]}.\n---- Please ensure payment method if not then update record ----`,

             };

      await dispatch(addExpense(expensePayload));

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
