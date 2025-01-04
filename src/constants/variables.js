export const URL_Base = "https://api.themoviedb.org/3/";

export const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export const API_URL = {
  movies: {
    getMoviesList:
      "discover/movie?include_adult=false&include_vidMovieeo=false&language=en-US&page=1&sort_by=popularity.desc",
    getMovie: {
      getMovieDetail: `movie/movie_id?language=en-US`,
      getMovieCredite: `movie/movie_id/credits?language=en-US`,
      getMovieRecommendations: `movie/movie_id/recommendations?language=en-US&page=1`,
      getMovieSimilar: `movie/movie_id/similar?language=en-US&page=1`,
      getMovieReviews: `movie/movie_id/reviews?language=en-US&page=1`,
    },
  },
  series: {
    getSeriesList:
      "discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
    getSerie: {
      getSerieDetail: `tv/series_id?language=en-US`,
      getSerieCredite: `tv/series_id/credits?language=en-US`,
      getSerieSeason: `tv/series_id/season/season_number?language=en-US`,
      getSerieEpisode: `tv/series_id/season/season_number/episode/episode_number?language=en-US`,
      getSerieEpisodeCredite: `tv/series_id/season/season_number/episode/episode_number/credits?language=en-US`,
      getSerieRecommendations: `tv/series_id/recommendations?language=en-US&page=1`,
      getSerieSimilar: `tv/series_id/similar?language=en-US&page=1`,
      getSerieReviews: `tv/series_id/reviews?language=en-US&page=1`,
    },
  },
  person: {
    getPerson: `person/person_id?language=en-US`,
    getPersonMovies: `person/person_id/movie_credits?language=en-US`,
    getPersonseries: `person/person_id/tv_credits?language=en-US`,
  },
};

export default API_URL;
