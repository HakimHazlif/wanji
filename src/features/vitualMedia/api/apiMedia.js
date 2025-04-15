import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

export async function getVitualMedia({ category, id }) {
  try {
    const mediaUrl = `${URL_Base}${category}/${id}?append_to_response=credits%2Crecommendations%2Creviews%2Cvideos&language=en-US`;
    const imagesUrl = `${URL_Base}${category}/${id}/images`;

    const [mediaDetails, mediaImages] = await axios.all([
      axios.get(mediaUrl, options),
      axios.get(imagesUrl, options),
    ]);

    return {
      mediaDetails: mediaDetails.data,
      mediaImages: mediaImages.data.backdrops,
      mediaCredits: mediaDetails.data.credits,
      mediaSimilar: mediaDetails.data.recommendations.results,
      mediaReviews: mediaDetails.data.reviews.results,
      mediaVideos: mediaDetails.data.videos.results,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getRecommanded(movieId, tvId) {
  const moviesUrl = `${URL_Base}movie/${movieId}/recommendations?language=en-US&page=1`;
  const tvShowsUrl = `${URL_Base}tv/${tvId}/recommendations?language=en-US&page=1`;

  if (movieId && tvId) {
    const [movies, tvShows] = await axios.all([
      axios.get(moviesUrl, options),
      axios.get(tvShowsUrl, options),
    ]);

    return {
      moviesInterest: movies?.data.results,
      tvShowsInterest: tvShows?.data.results,
    };
  }

  if (movieId) {
    const movies = await axios.get(moviesUrl, options);

    return {
      moviesInterest: movies?.data?.results,
      tvShowsInterest: null,
    };
  }

  if (tvId) {
    const tvShows = await axios.get(tvShowsUrl, options);

    return {
      moviesInterest: null,
      tvShowsInterest: tvShows?.data?.results,
    };
  }

  if (!movieId && !tvId) throw new Error("movieId or tvId are undefinded");
}
