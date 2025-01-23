import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/Authentication/authSlice";
import listsReducer from "../features/lists/listsSlice";

const store = configureStore({
  reducer: {
    user: authReducer,
    lists: listsReducer,
  },
});

export default store;
