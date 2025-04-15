import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

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
