import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, options } from "./api.js";
//import instance from "./axios";

export const fetchShow = createAsyncThunk(
  "shows/fetchShow",
  async ({ isMovie, showId }) => {
    try {
      let showDetailsUrl;
      let showCrediteUrl;
      let showSimilarUrl;
      let showReviewsUrl;

      if (isMovie) {
        showDetailsUrl = API_URL.movies.getMovie.getMovieDetail.replace(
          "movie_id",
          showId
        );
        showCrediteUrl = API_URL.movies.getMovie.getMovieCredite.replace(
          "movie_id",
          showId
        );
        showSimilarUrl = API_URL.movies.getMovie.getMovieSimilar.replace(
          "movie_id",
          showId
        );
        showReviewsUrl = API_URL.movies.getMovie.getMovieReviews.replace(
          "movie_id",
          showId
        );
      } else {
        showDetailsUrl = API_URL.series.getSerie.getSerieDetail.replace(
          "series_id",
          showId
        );
        showCrediteUrl = API_URL.series.getSerie.getSerieCredite.replace(
          "series_id",
          showId
        );
        showSimilarUrl = API_URL.series.getSerie.getSerieSimilar.replace(
          "series_id",
          showId
        );
        showReviewsUrl = API_URL.series.getSerie.getSerieReviews.replace(
          "series_id",
          showId
        );
      }

      const [showDetails, showCredite, showSimilar, showReviews] =
        await axios.all([
          axios.get(showDetailsUrl, options),
          axios.get(showCrediteUrl, options),
          axios.get(showSimilarUrl, options),
          axios.get(showReviewsUrl, options),
        ]);

      return {
        showDetails: showDetails.data,
        showCredite: showCredite.data,
        showSimilar: showSimilar.data.results,
        showReviews: showReviews.data.results,
      };
    } catch (err) {
      console.log(err.message);
    }
  }
);

const showSlice = createSlice({
  name: "show",
  initialState: {
    showData: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShow.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShow.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showData = action.payload;
      })
      .addCase(fetchShow.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const showStatus = (state) => state.show.status;
export const showData = (state) => state.show.showData; //for check date that fetched. remove after
export const showDetails = (state) => state.show.showData.showDetails;
export const showCredite = (state) => state.show.showData.showCredite;
export const showSimilar = (state) => state.show.showData.showSimilar;
export const showReviews = (state) => state.show.showData.showReviews;

export const { resetStatus } = showSlice.actions;
export default showSlice.reducer;
