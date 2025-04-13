import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getEpisodeData } from "../../services/apiShows";
import toast from "react-hot-toast";

export function useEpisode() {
  const { id, seasonNum, episodeNum } = useParams();

  const { data: episode, isLoading } = useQuery({
    queryKey: ["episode", id, seasonNum, episodeNum],
    queryFn: () => getEpisodeData({ id, seasonNum, episodeNum }),
    onError: () => {
      toast.error("Failed to load this episode");
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
