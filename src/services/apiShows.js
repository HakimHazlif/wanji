import axios from "axios";
import { options, URL_Base } from "../constants/variables";

export async function getShow({ category, id }) {
  try {
    const showUrl = `${URL_Base}${category}/${id}?append_to_response=credits%2Crecommendations%2Creviews%2Cvideos&language=en-US`;
    const imagesUrl = `${URL_Base}${category}/${id}/images`;

    const [showDetails, showImages] = await axios.all([
      axios.get(showUrl, options),
      axios.get(imagesUrl, options),
    ]);

    return {
      showDetails: showDetails.data,
      showImages: showImages.data.backdrops,
      showCredits: showDetails.data.credits,
      showSimilar: showDetails.data.recommendations.results,
      showReviews: showDetails.data.reviews.results,
      showVideos: showDetails.data.videos.results,
    };
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

export async function getMoviesByList(list, page, id) {
  const url =
    list === "for_you"
      ? `${URL_Base}movie/${id}/recommendations?language=en-US&page=${page}`
      : `${URL_Base}movie/${list}?language=en-US&page=${page}`;

  try {
    const moviesList = await axios.get(url, options);

    return moviesList ? moviesList.data : [];
  } catch (err) {
    console.log(err);
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

export async function getTvByList(list, page, id) {
  const url =
    list === "for_you"
      ? `${URL_Base}tv/${id}/recommendations?language=en-US&page=${page}`
      : `${URL_Base}tv/${list}?language=en-US&page=${page}`;

  try {
    const moviesList = await axios.get(url, options);

    return moviesList ? moviesList.data : [];
  } catch (err) {
    console.log(err);
  }
}

export async function getSeasonData({ id, seasonNum }) {
  const serieApiUrl = `${URL_Base}tv/${id}?language=en-US`;
  const seasonApiUrl = `${URL_Base}tv/${id}/season/${seasonNum}?language=en-US`;

  try {
    const [serieData, seasonDetails] = await axios.all([
      axios.get(serieApiUrl, options),
      axios.get(seasonApiUrl, options),
    ]);

    return {
      seasonDetails: {
        title: serieData.data.name,
        name: seasonDetails.data.name,
        showId: serieData.data.id,
        seasonId: seasonDetails.data.id,
        status: serieData.data.status,
        genres: serieData.data.genres,
        seasons: serieData.data.seasons,
        poster_path: seasonDetails.data.poster_path,
        season_number: seasonDetails.data.season_number,
        vote_average: seasonDetails.data.vote_average,
        overview: seasonDetails.data.overview,
        air_date: seasonDetails.data.air_date,
      },
      episodes: seasonDetails.data.episodes,
    };
  } catch (err) {
    throw new Error(err);
  }
}

export async function getEpisodeData({ id, seasonNum, episodeNum }) {
  const queries = ["", "/credits", "/images"];

  const seasonApiUrl = `${URL_Base}tv/${id}/season/${seasonNum}?language=en-US`;

  const urls = [];

  queries.forEach((query, index) => {
    const url = `${URL_Base}tv/${id}/season/${seasonNum}/episode/${episodeNum}${query}${
      index !== queries.length - 1 ? "?language=en-US" : ""
    }`;
    urls.push(url);
  });

  urls.push(seasonApiUrl);

  const [episodeDetails, episodeCredits, episodeImage, seasonData] =
    await axios.all(urls.map((url) => axios.get(url, options)));

  return {
    episodeDetails: episodeDetails.data,
    episodeCredits: episodeCredits.data,
    episodeImage: episodeImage.data.stills,
    episodesList: seasonData.data.episodes,
  };
}

export async function getPersonData(personId) {
  const personUrl = `${URL_Base}person/${personId}?append_to_response=movie_credits%2Ctv_credits%2Cimages%2Clatest&language=en-US`;

  const personData = await axios.get(personUrl, options);

  return {
    personDetails: {
      biography: personData?.data?.biography,
      birthday: personData?.data?.birthday,
      deathday: personData?.data?.deathday,
      gender: personData?.data?.gender,
      homepage: personData?.data?.homepage,
      id: personData?.data?.id,
      knownAs: personData?.data?.known_for_department,
      name: personData?.data?.name,
      palceOfBirth: personData?.data?.place_of_birth,
      popularity: personData?.data?.popularity,
      profile_path: personData?.data?.profile_path,
    },
    movieCredits: personData?.data?.movie_credits,
    tvCredits: personData?.data?.tv_credits,
    images: personData?.data?.images?.profiles,
  };
}

export async function getUserInterests(movieId, tvId) {
  const moviesUrl = `${URL_Base}movie/${movieId}/recommendations?language=en-US&page=1`;
  const tvShowsUrl = `${URL_Base}tv/${tvId}/recommendations?language=en-US&page=1`;

  if (movieId && tvId) {
    const [movies, tvShows] = await axios.all([
      axios.get(moviesUrl, options),
      axios.get(tvShowsUrl, options),
    ]);

    console.log({
      moviesInterest: movies?.data.results,
      tvShowsInterest: tvShows?.data.results,
    });
    return {
      moviesInterest: movies?.data.results,
      tvShowsInterest: tvShows?.data.results,
    };
  }

  if (movieId) {
    const movies = await axios.get(moviesUrl, options);

    console.log({
      moviesInterest: movies?.data?.results,
      tvShowsInterest: null,
    });
    return {
      moviesInterest: movies?.data?.results,
      tvShowsInterest: null,
    };
  }

  if (tvId) {
    const tvShows = await axios.get(tvShowsUrl, options);

    console.log({
      moviesInterest: null,
      tvShowsInterest: tvShows?.data?.results,
    });
    return {
      moviesInterest: null,
      tvShowsInterest: tvShows?.data?.results,
    };
  }

  if (!movieId && !tvId) console.log("movieId or tvId are undefinded");
}
