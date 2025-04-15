import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

export async function getShowsByGenre(genreId, category, page) {
  const url = `${URL_Base}discover/${category}?include_adult=false&${
    category === "movie"
      ? "include_video=false"
      : "include_null_first_air_dates=false"
  }&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`;

  try {
    const shows = await axios.get(url, options);

    return shows?.data ?? [];
  } catch (err) {
    throw new Error(err.message);
  }
}
