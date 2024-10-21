import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "./api";
import instance from "./axios";

export const fetchShowsList = createAsyncThunk(shows/fetchShowsList, async (_,{ rejectWithValue }) => {
  try {
    const moviesListUrl = API_URL.movies.getMoviesList;
    const seriesListUrl = API_URL.series.getSeriesList;

    const [moviesList, seriesList] = await axios.all([
      instance.get(moviesListUrl),
      instance.get(seriesListUrl),
    ])

    return {
      movies: moviesList.data,
      series: seriesList.data
    }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

const showsSlice = createSlice({
  name: 'shows',
  initialState: {
    showsData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowsList.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.showsData = action.payload;
      })
      .addCase(fetchShowsList.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default showsSlice.reducer