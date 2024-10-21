const API_URL = {
  movies: {
    getMoviesList: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_vidMovieeo=false&language=en-US&page=1&sort_by=popularity.desc',
    getMovie: {
      getMovieDetail: `https://api.themoviedb.org/3/movie/movie_id?language=en-US`,
      getMovieCredite: `https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US`,
      getMovieRecommendations: `https://api.themoviedb.org/3/movie/movie_id/recommendations?language=en-US&page=1`,
      getMovieSimilar: `https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1`,
      getMovieReviews: `https://api.themoviedb.org/3/movie/movie_id/reviews?language=en-US&page=1`,
    }
  },
  series: {
    getSeriesList: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc',
    getSerie: {
      getSerieDetail: `https://api.themoviedb.org/3/tv/series_id?language=en-US`,
      getSerieCredite: `https://api.themoviedb.org/3/tv/series_id/credits?language=en-US`,
      getSerieSeason: `https://api.themoviedb.org/3/tv/series_id/season/season_number?language=en-US`,
      getSerieEpisode: `https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number?language=en-US`,
      getSerieEpisodeCredite: `https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/credits?language=en-US`,
      getSerieRecommendations: `https://api.themoviedb.org/3/tv/series_id/recommendations?language=en-US&page=1`,
      getSerieSimilar: `https://api.themoviedb.org/3/tv/series_id/similar?language=en-US&page=1`,
      getSerieReviews: `https://api.themoviedb.org/3/tv/series_id/reviews?language=en-US&page=1`
    }
  },
  person: {
    getPerson: `https://api.themoviedb.org/3/person/person_id?language=en-US`,
    getPersonMovies: `https://api.themoviedb.org/3/person/person_id/movie_credits?language=en-US`,
    getPersonseries: `https://api.themoviedb.org/3/person/person_id/tv_credits?language=en-US`,
  }
}

export default API_URL;