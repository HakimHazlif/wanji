import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../../features/authentication/slices/authSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
  },
});

export default store;
