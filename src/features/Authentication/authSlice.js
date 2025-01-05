import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    uid: "",
    email: "",
    username: "",
  },
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "session",
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
        email: "",
        username: "",
      };
      state.status = "idle";
      state.error = null;
      state.isLoggedIn = false;
    },
    setUser: (state, action) => {
      state.user.uid = action.payload.uid;
      state.user.email = action.payload.email;
      state.user.username = state.isLoggedIn
        ? state.user.username
        : action.payload.username;
      state.status = action.payload ? "authenticated" : "idle";
    },
  },
});

export const { authStart, authSuccess, authFailure, logOutSuccess, setUser } =
  authSlice.actions;
export default authSlice.reducer;
