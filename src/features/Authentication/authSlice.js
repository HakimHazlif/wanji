import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: "",
    username: "",
    email: "",
    avatar: "",
  },
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    authFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logOutSuccess: (state) => {
      state.user = {
        uid: "",
        username: "",
        email: "",
        avatar: "",
      };
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = action.payload ? "authenticated" : "idle";
    },
    resetPassword: (state, action) => {
      state.status = "resetting";
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  logOutSuccess,
  setUser,
  resetPassword,
} = authSlice.actions;
export default authSlice.reducer;
