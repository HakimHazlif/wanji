import axios from "axios";
import { options, URL_Base } from "../../../services/variables";

export async function getEpisodeData({ id, seasonNum, episodeNum }) {
  const queries = ["", "/credits", "/images"];

  const seasonApiUrl = `${URL_Base}tv/${id}/season/${seasonNum}?language=en-US`;

  const urls = [];

  queries.forEach((query, index) => {
    const url = `${URL_Base}tv/${id}/season/${seasonNum}/episode/${episodeNum}${query}${
      index !== queries.length - 1 ? "?language=en-US" : ""
    }`;
    urls.push(url);
  });

  urls.push(seasonApiUrl);

  const [episodeDetails, episodeCredits, episodeImage, seasonData] =
    await axios.all(urls.map((url) => axios.get(url, options)));

  return {
    episodeDetails: episodeDetails.data,
    episodeCredits: episodeCredits.data,
    episodeImage: episodeImage.data.stills,
    episodesList: seasonData.data.episodes,
  };
}
