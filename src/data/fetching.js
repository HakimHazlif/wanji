

function fetchData(url) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.evn.VITE_API_KEY_TMDB}`
    }
  };
  
  fetch(url, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}





const getMovies = fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
const getTvShows = fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)


const getMovieDetail = fetch('https://api.themoviedb.org/3/movie/1184918?language=en-US', options)
const getMovieCredite = fetch('https://api.themoviedb.org/3/movie/1184918/credits?language=en-US', options)
const getMovieRecommendations = fetch('https://api.themoviedb.org/3/movie/1184918/recommendations?language=en-US&page=1', options)
const getMovieSimilar = fetch('https://api.themoviedb.org/3/movie/1184918/similar?language=en-US&page=1', options)
const getMovieReviews = fetch('https://api.themoviedb.org/3/movie/1184918/reviews?language=en-US&page=1', options)

// tv show
const getTvDetail = fetch('https://api.themoviedb.org/3/tv/series_id?language=en-US', options)
const getTvCredite = fetch('https://api.themoviedb.org/3/tv/series_id/credits?language=en-US', options)
const getTvSeason = fetch('https://api.themoviedb.org/3/tv/series_id/season/season_number?language=en-US', options)
const getTvEpisode = fetch('https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number?language=en-US', options)
const getTevEpisodeCredite = fetch('https://api.themoviedb.org/3/tv/series_id/season/season_number/episode/episode_number/credits?language=en-US', options)
const getTvRecommendations = fetch('https://api.themoviedb.org/3/tv/series_id/recommendations?language=en-US&page=1', options)
const getTvSimilar = fetch('https://api.themoviedb.org/3/tv/series_id/similar?language=en-US&page=1', options)
const getTvReviews = fetch('https://api.themoviedb.org/3/tv/series_id/reviews?language=en-US&page=1', options)






// for example acter or dirctor
const person = fetch('https://api.themoviedb.org/3/person/person_id?language=en-US', options)
const personMovies = fetch('https://api.themoviedb.org/3/person/person_id/movie_credits?language=en-US', options)
const personTv = fetch('https://api.themoviedb.org/3/person/person_id/tv_credits?language=en-US', options)
