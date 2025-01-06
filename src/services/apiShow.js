import axios from "axios";
import { API_URLs, options, URL_Base } from "../constants/variables";

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

export async function getMovies() {
  try {
    const moviesLists = ["popular", "top_rated", "now_playing", "upcoming"];

    const urls = [];

    moviesLists.forEach((list) => {
      const url = `${URL_Base}movie/${list}?language=en-US&page=1`;
      urls.push(url);
    });

    const [popularMovies, topRatedMovies, nowPlaynigMovies, upcomingMovies] =
      await axios.all(urls.map((url) => axios.get(url, options)));

    return {
      popularMovies: popularMovies.data.results,
      topRatedMovies: topRatedMovies.data.results,
      nowPlaynigMovies: nowPlaynigMovies.data.results,
      upcomingMovies: upcomingMovies.data.results,
    };
  } catch (err) {
    throw new Error(err.response?.data || "Something went wrong");
  }
}

export async function getTrending() {
  try {
    const trendingLists = ["movie", "tv"];

    const urls = [];

    trendingLists.forEach((list) => {
      const url = `${URL_Base}trending/${list}/day?language=en-US`;
      urls.push(url);
    });

    const [trendingMovies, trendingTv] = await axios.all(
      urls.map((url) => axios.get(url, options))
    );

    return {
      trendingMovies: trendingMovies.data.results,
      trendingTv: trendingTv.data.results,
    };
  } catch (err) {
    throw new Error(err.response?.data || "Something went wrong");
  }
}

export async function getTvShows() {
  try {
    const tvLists = ["popular", "top_rated", "on_the_air", "airing_today"];

    const urls = [];

    tvLists.forEach((list) => {
      const url = `${URL_Base}tv/${list}?language=en-US&page=1`;
      urls.push(url);
    });

    const [popularTv, topRatedTv, nowPlaynigTv, upcomingTv] = await axios.all(
      urls.map((url) => axios.get(url, options))
    );

    return {
      popularTv: popularTv.data.results,
      topRatedTv: topRatedTv.data.results,
      nowPlaynigTv: nowPlaynigTv.data.results,
      upcomingTv: upcomingTv.data.results,
    };
  } catch (err) {
    throw new Error(err.response?.data || "Something went wrong");
  }
}
