
import { configureStore } from "@reduxjs/toolkit";
import showsReducer from '../data/showsSlice.js';
import showReducer from '../data/movieSlice.js'

const store = configureStore({
  reducer: {
    showsList: showsReducer,
    show: showReducer,
  }
})

export default store;