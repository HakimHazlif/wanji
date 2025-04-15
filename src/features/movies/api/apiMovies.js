import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

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

export async function getItemsByList(list, page, id, type) {
  const url =
    list === "for_you"
      ? `${URL_Base}${type}/${id}/recommendations?language=en-US&page=${page}`
      : `${URL_Base}${type}/${list}?language=en-US&page=${page}`;

  try {
    const moviesList = await axios.get(url, options);

    return moviesList?.data ?? [];
  } catch (err) {
    throw new Error(err);
  }
}
