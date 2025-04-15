import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

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
