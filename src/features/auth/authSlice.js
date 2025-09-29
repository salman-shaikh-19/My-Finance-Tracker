import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../services/supabaseClient";


// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) throw error;
//       return data.user; // return user object
//     } catch (err) {
//       return rejectWithValue(err.message || "Login failed");
//     }
//   }
// );
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
 
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
      // const { data: authData, error: authError } = await supabase.auth.signInWithOtp({ email, password });

      // if (authError) throw authError;
     
     if (authError) {
        const code = authError.code || authError?.error || "";
        const msg = authError.message || String(authError);

        //  email not confirmed ->then send confirmation mail again
        if (code === "email_not_confirmed" || msg.toLowerCase().includes("email not confirmed")) {
          const { error: resendError } = await supabase.auth.resend({
            type: "signup",
            email,
             options: { emailRedirectTo: "https://my-finance-tracker-ten.vercel.app/" } // optional
          });

          if (resendError) {

            return rejectWithValue("Email not confirmed. Failed to resend confirmation email.");
          }

          return rejectWithValue(
            "Email not confirmed. A new confirmation email has been sent — please check your inbox/spam."
          );
        }


        return rejectWithValue(msg || "Login failed");
      }


      const authUser = authData.user;
      if (!authUser) throw new Error("Login failed");

     
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_user_id", authUser.id)
        .single(); 

      if (userError) throw userError;
      if (!userData) throw new Error("User not found");

      return userData; 
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

export const checkEmailExists = createAsyncThunk(
  "auth/checkEmailExists",
  async (email, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("users") 
        .select("user_id")
        .eq("user_email", email)
        .limit(1);

      if (error) throw error;
      return data.length > 0; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password, avatar = null }, { rejectWithValue }) => {
    try {
     
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      const authUser = data.user; 

   
      if (authUser) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            auth_user_id: authUser.id,  
            user_name: name,
            user_email:email,
            user_avatar: avatar,
          },
        ]);

        if (insertError) throw insertError;
      }

      return authUser;
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
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

      .addCase(checkEmailExists.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(checkEmailExists.fulfilled, (state) => {
        state.userLoading = false;

      })
      .addCase(checkEmailExists.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload || "Failed to check email";
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
