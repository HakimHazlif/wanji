
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "./api";
import { options } from "./showsSlice";
//import instance from "./axios";

export const fetchShow = createAsyncThunk('shows/fetchShow', async ({ isMovie, showId },{ rejectWithValue }) => {
  try {
    const showDetailsUrl = isMovie 
      ? API_URL.movies.getMovie.getMovieDetail.replace('movie_id', showId) 
      : API_URL.series.getSerie.getSerieDetail.replace('serie_id', showId);
    const showCrediteUrl = isMovie 
      ? API_URL.movies.getMovie.getMovieCredite.replace('movie_id', showId)
      : API_URL.series.getSerie.getSerieCredite.replace('serie_id', showId);
    const showSimilarUrl = isMovie 
      ? API_URL.movies.getMovie.getMovieSimilar.replace('movie_id', showId)
      : API_URL.series.getSerie.getSerieSimilar.replace('serie_id', showId);

    const [showDetails, showCredite, showSimilar] = await axios.all([
      axios.get(showDetailsUrl, options),
      axios.get(showCrediteUrl, options),
      axios.get(showSimilarUrl, options),
    ])

    return {
      showDetails: showDetails.data,
      showCredite: showCredite.data,
      showSimilar: showSimilar.data,
    }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
})

const showSlice = createSlice({
  name: 'show',
  initialState: {
    showData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShow.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShow.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.showData = action.payload;
      })
      .addCase(fetchShow.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload;
      })
  }
})



export default showSlice.reducer
