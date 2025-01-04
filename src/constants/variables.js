export const URL_Base = "https://api.themoviedb.org/3/";

export const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`,
  },
};

export const API_URLs = {
  movies: {
    getMoviesList: `${URL_Base}discover/movie?include_adult=false&include_vidMovieeo=false&language=en-US&page=1&sort_by=popularity.desc`,
    getMovie: {
      getMovieDetail: `${URL_Base}movie/movie_id?language=en-US`,
      getMovieCredite: `${URL_Base}movie/movie_id/credits?language=en-US`,
      getMovieRecommendations: `${URL_Base}movie/movie_id/recommendations?language=en-US&page=1`,
      getMovieSimilar: `${URL_Base}movie/movie_id/similar?language=en-US&page=1`,
      getMovieReviews: `${URL_Base}movie/movie_id/reviews?language=en-US&page=1`,
    },
  },
  series: {
    getSeriesList: `${URL_Base}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
    getSerie: {
      getSerieDetail: `${URL_Base}tv/series_id?language=en-US`,
      getSerieCredite: `${URL_Base}tv/series_id/credits?language=en-US`,
      getSerieSeason: `${URL_Base}tv/series_id/season/season_number?language=en-US`,
      getSerieEpisode: `${URL_Base}tv/series_id/season/season_number/episode/episode_number?language=en-US`,
      getSerieEpisodeCredite: `${URL_Base}tv/series_id/season/season_number/episode/episode_number/credits?language=en-US`,
      getSerieRecommendations: `${URL_Base}tv/series_id/recommendations?language=en-US&page=1`,
      getSerieSimilar: `${URL_Base}tv/series_id/similar?language=en-US&page=1`,
      getSerieReviews: `${URL_Base}tv/series_id/reviews?language=en-US&page=1`,
    },
  },
  person: {
    getPerson: `${URL_Base}person/person_id?language=en-US`,
    getPersonMovies: `${URL_Base}person/person_id/movie_credits?language=en-US`,
    getPersonseries: `${URL_Base}person/person_id/tv_credits?language=en-US`,
  },
};
