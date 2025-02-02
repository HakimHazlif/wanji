import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getEpisodeData } from "../../services/apiShows";

export function useEpisode() {
  const { id, seasonNum, episodeNum } = useParams();

  const { data: episode, isLoading } = useQuery({
    queryKey: ["episode", id, seasonNum, episodeNum],
    queryFn: () => getEpisodeData({ id, seasonNum, episodeNum }),
    onError: (err) => {
      console.log(err);
    },
  });

  const episodeDetails = episode?.episodeDetails || null;
  const episodeCredits = episode?.episodeCredits || null;
  const episodeImage = episode?.episodeImage || null;
  const episodesList = episode?.episodesList || null;

  return {
    episodeDetails,
    episodeCredits,
    episodeImage,
    episodesList,
    isLoading,
  };
}
