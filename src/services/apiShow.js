import axios from "axios";
import { API_URLs, options } from "../constants/variables";

export async function getShow({ isMovie, showId }) {
  try {
    const showDetailsUrl = isMovie
      ? API_URLs.movies.getMovie.getMovieDetail.replace("movie_id", showId)
      : API_URLs.series.getSerie.getSerieDetail.replace("series_id", showId);
    const showCrediteUrl = isMovie
      ? API_URLs.movies.getMovie.getMovieCredite.replace("movie_id", showId)
      : API_URLs.series.getSerie.getSerieCredite.replace("series_id", showId);
    const showSimilarUrl = isMovie
      ? API_URLs.movies.getMovie.getMovieSimilar.replace("movie_id", showId)
      : API_URLs.series.getSerie.getSerieSimilar.replace("series_id", showId);
    const showReviewsUrl = isMovie
      ? API_URLs.movies.getMovie.getMovieReviews.replace("movie_id", showId)
      : API_URLs.series.getSerie.getSerieReviews.replace("series_id", showId);

    if (showId) {
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
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getShows() {
  try {
    const moviesListUrl = API_URLs.movies.getMoviesList;
    const seriesListUrl = API_URLs.series.getSeriesList;

    const [moviesList, seriesList] = await axios.all([
      axios.get(moviesListUrl, options),
      axios.get(seriesListUrl, options),
    ]);

    return {
      movies: moviesList.data.results,
      series: seriesList.data.results,
    };
  } catch (err) {
    throw new Error(err.response.data);
  }
}
