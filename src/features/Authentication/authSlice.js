import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUser,
  login,
  logout,
  resetForgottenPassword,
  signup,
  updateAuthPassword,
  updatePassword,
  updateProfile,
} from "../../services/apiAuth";

const initialState = {
  user: {
    uid: "",
    username: "",
    bio: "",
    email: "",
    avatar: "",
    createdAt: "",
    lastSignin: "",
    lastUpdate: "",
  },
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user;
        state.status = "idle";
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(resetForgottenPassword.fulfilled, (state) => {
        state.status = "Passwordresetted";
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.user = initialState.user;
        state.status = "idle";
        state.error = action.error;
        state.isLoggedIn = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "authenticated";
        state.error = null;
      });

    builder
      .addMatcher(
        isAnyOf(
          signup.pending,
          login.pending,
          logout.pending,
          resetForgottenPassword.pending,
          updatePassword.pending,
          updateAuthPassword.pending,
          updateProfile.pending,
          getUser.pending
        ),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          signup.rejected,
          login.rejected,
          logout.rejected,
          resetForgottenPassword.rejected,
          updatePassword.rejected,
          updateAuthPassword.rejected,
          updateProfile.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          signup.fulfilled,
          login.fulfilled,
          updatePassword.fulfilled,
          updateAuthPassword.fulfilled,
          updateProfile.fulfilled
        ),
        (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.isLoggedIn = true;
          state.error = null;
        }
      );
  },
});

// export const {
//   authStart,
//   authSuccess,
//   authFailure,
//   logOutSuccess,
//   setUser,
//   resetPassword,
// } = authSlice.actions;
export default authSlice.reducer;
