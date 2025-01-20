import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: "",
    username: "",
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
  reducers: {
    authStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
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
        createdAt: "",
        lastSignin: "",
        lastUpdate: "",
      };
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.status = "authenticated";
      state.error = null;
    },
    resetPassword: (state) => {
      state.status = "resetted";
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
