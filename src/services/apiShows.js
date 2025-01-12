import axios from "axios";
import { options, URL_Base } from "../constants/variables";

export async function getShow({ isMovie, showId }) {
  try {
    const showParam = isMovie ? "movie" : "tv";

    const showLists = ["", "/credits", "/similar", "/reviews"];

    const urls = [];

    showLists.forEach((list, index) => {
      const url = `${URL_Base}${showParam}/${showId}${list}?language=en-US${
        index >= 2 && "&page=1"
      }`;
      urls.push(url);
    });

    if (showId) {
      const [showDetails, showCredits, showSimilar, showReviews] =
        await axios.all(urls.map((url) => axios.get(url, options)));

      return {
        showDetails: showDetails.data,
        showCredits: showCredits.data,
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

    const [popularTv, topRatedTv, onTheAir, airingToday] = await axios.all(
      urls.map((url) => axios.get(url, options))
    );

    return {
      popularTv: popularTv.data.results,
      topRatedTv: topRatedTv.data.results,
      onTheAir: onTheAir.data.results,
      airingToday: airingToday.data.results,
    };
  } catch (err) {
    throw new Error(err.response?.data || "Something went wrong");
  }
}
