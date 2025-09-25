import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user; // return user object
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);


export const isEmailAvailable = createAsyncThunk(
  "auth/isEmailAvailable",
  async (email, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("users") // assuming you have a `users` table
        .select("id")
        .eq("email", email)
        .limit(1);

      if (error) throw error;
      return data.length === 0; // true if email is available
    } catch (err) {
      return rejectWithValue(err.message || "Failed to check email availability");
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLoading: false,
    user: null,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
   
      .addCase(loginUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || "Login failed";
      })

   
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || "Registration failed";
      })

    
      .addCase(isEmailAvailable.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(isEmailAvailable.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(isEmailAvailable.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || "Failed to check email availability";
      })


      .addCase(logoutUser.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
