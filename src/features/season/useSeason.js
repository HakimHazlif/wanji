import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getSeasonData } from "../../services/apiShows";
import toast from "react-hot-toast";

export function useSeason() {
  const { id, seasonNum } = useParams();

  const { isLoading, data: seasonData } = useQuery({
    queryKey: ["season", id, seasonNum],
    queryFn: () => getSeasonData({ id, seasonNum }),
    onError: () => {
      toast.error("Failed to load this season");
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const seasonDetails = seasonData?.seasonDetails || null;
  const episodes = seasonData?.episodes || null;

  return { isLoading, seasonDetails, episodes };
}
