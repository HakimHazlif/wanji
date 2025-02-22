import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getSeasonData } from "../../services/apiShows";

export function useSeason() {
  const { id, seasonNum } = useParams();

  const { isLoading, data: seasonData } = useQuery({
    queryKey: ["season", id, seasonNum],
    queryFn: () => getSeasonData({ id, seasonNum }),
    onError: (err) => {
      console.log(err);
    },
  });

  const seasonDetails = seasonData?.seasonDetails || null;
  const episodes = seasonData?.episodes || null;

  return { isLoading, seasonDetails, episodes };
}
