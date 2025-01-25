import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/Authentication/authSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
