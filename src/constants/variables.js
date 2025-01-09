export const URL_Base = "https://api.themoviedb.org/3/";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_TMDB_KEY}`,
  },
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const API_URLs = {
  movies: {
    trending: `${URL_Base}trending/movie/day?language=en-US`,
    list: `${URL_Base}movie/changes?page=1`,
    listByKeyword: `${URL_Base}movie/keyword?language=en-US&page=1`, // we will replace keyword by popular, now_playing, top_rated, upcoming
    listByFilters: `${URL_Base}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
    movie: {
      detail: `${URL_Base}movie/movie_id?language=en-US`,
      credits: `${URL_Base}movie/movie_id/credits?language=en-US`,
      images: `${URL_Base}movie/movie_id/images`,
      videos: `${URL_Base}movie_id/videos?language=en-US`,
      recommendations: `${URL_Base}movie/movie_id/recommendations?language=en-US&page=1`,
      similars: `${URL_Base}movie/movie_id/similar?language=en-US&page=1`,
      reviews: `${URL_Base}movie/movie_id/reviews?language=en-US&page=1`,
    },
  },
  tvShow: {
    trending: `${URL_Base}trending/tv/day?language=en-US`,
    byKeyword: `${URL_Base}tv/keyword?language=en-US&page=1`, // we will replace keyword by popular, top_rated, airing_today, and on_the_air that get a list of TV shows that air in the next 7 days.
    list: `${URL_Base}tv/changes?page=1`,
    byFilter: `${URL_Base}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
    tvShow: {
      detail: `${URL_Base}tv/series_id?language=en-US`,
      images: `${URL_Base}tv/series_id/images`,
      videos: `${URL_Base}tv/series_id/videos?language=en-US`,
      credits: `${URL_Base}tv/series_id/credits?language=en-US`,
      aggregateCridits: `${URL_Base}tv/series_id/aggregate_credits?language=en-US`,
      changes: `${URL_Base}tv/series_id/changes?page=1`,
      episodesGroups: `${URL_Base}tv/series_id/changes?page=1`,

      episode: `${URL_Base}tv/series_id/season/season_number/episode/episode_number?language=en-US`,
      tvShowEpisodeCredite: `${URL_Base}tv/series_id/season/season_number/episode/episode_number/credits?language=en-US`,
      recommendations: `${URL_Base}tv/series_id/recommendations?language=en-US&page=1`,
      similars: `${URL_Base}tv/series_id/similar?language=en-US&page=1`,
      reviews: `${URL_Base}tv/series_id/reviews?language=en-US&page=1`,
      season: {
        details: `${URL_Base}tv/series_id/season/season_number?language=en-US`,
        credits: `${URL_Base}tv/series_id/videos?language=en-US`,
        images: `${URL_Base}tv/series_id/season/season_number/images`,
        videos: `${URL_Base}tv/series_id/season/season_number/videos?language=en-US`,
      },
      episodes: {},
    },
  },
  people: {
    trendingPeople: `${URL_Base}trending/person/day?language=en-US`,
    peopleList: `${URL_Base}person/changes?page=1`,
    popularPeopleList: `${URL_Base}person/popular?language=en-US&page=1`,
    person: {
      personDetails: `${URL_Base}person/person_id?language=en-US`,
      personImages: `${URL_Base}person/person_id/images`,
      personChanges: `${URL_Base}person/person_id/changes?page=1`,
      personWorks: `${URL_Base}person/person_id/combined_credits?language=en-US`,
      personMovies: `${URL_Base}person/person_id/movie_credits?language=en-US`,
      personTvShows: `${URL_Base}person/person_id/tv_credits?language=en-US`,
    },
  },
  companies: {
    companyDetails: `${URL_Base}company/company_id`,
    companyLogo: `${URL_Base}company/company_id/images`,
  },
  search: {
    regular: `${URL_Base}search/collection?query=searchQuery&include_adult=false&language=en-US&page=1`, // we will replace {searchWord} at query parameter by the target search. space key turn out to %20
    company: `${URL_Base}search/company?query=searchQuery&page=1`,
    person: `${URL_Base}search/person?query=searchQuery&include_adult=false&language=en-US&page=1`,
    movie: `${URL_Base}search/movie?query=searchQuery&include_adult=false&language=en-US&page=1`,
    tvShow: `${URL_Base}search/tv?query=searchQuery&include_adult=false&language=en-US&page=1`,
  },
};
