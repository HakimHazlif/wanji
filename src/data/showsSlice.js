import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, options } from "./api.js";

//import instance from "./axios";

export const fetchShowsList = createAsyncThunk(
  "shows/fetchShowsList",
  async (_, { rejectWithValue }) => {
    try {
      const moviesListUrl = API_URL.movies.getMoviesList;
      const seriesListUrl = API_URL.series.getSeriesList;

      const [moviesList, seriesList] = await axios.all([
        axios.get(moviesListUrl, options),
        axios.get(seriesListUrl, options),
      ]);

      return {
        movies: moviesList.data.results,
        series: seriesList.data.results,
      };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const showsSlice = createSlice({
  name: "shows",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchShowsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const moviesList = (state) => state.showsList.data.movies;
export const seriesList = (state) => state.showsList.data.series;
export const showsStatus = (state) => state.showsList.status;

export default showsSlice.reducer;
