import axios from "axios";
import { options, URL_Base } from "../constants/variables";

export async function getShow({ category, id }) {
  try {
    const showLists = ["", "/images", "/credits", "/similar", "/reviews"];

    const urls = showLists.map((list, index) => {
      return `${URL_Base}${category}/${id}${list}${
        index === 1 ? "" : `?language=en-US${index >= 3 ? "&page=1" : ""}`
      }`;
    });

    if (id) {
      const [showDetails, showImages, showCredits, showSimilar, showReviews] =
        await axios.all(urls.map((url) => axios.get(url, options)));

      return {
        showDetails: showDetails.data,
        showImages: showImages.data.backdrops,
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

export async function getSeasonData({ id, seasonNum }) {
  const seasonApiUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?language=en-US`;
  const imagesApiUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}/images`;

  try {
    const [seasonDetails, seasonImage] = await axios.all([
      axios.get(seasonApiUrl, options),
      axios.get(imagesApiUrl, options),
    ]);

    return {
      seasonDetails: {
        name: seasonDetails.data.name,
        id: seasonDetails.data.id,
        poster_path: seasonDetails.data.poster_path,
        season_number: seasonDetails.data.season_number,
        vote_average: seasonDetails.data.vote_average,
        overview: seasonDetails.data.overview,
        air_date: seasonDetails.data.air_date,
      },
      episodes: seasonDetails.data.episodes,
      seasonImages: seasonImage.data,
    };
  } catch (err) {
    throw new Error(err);
  }
}
