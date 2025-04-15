import { useQuery } from "react-query";
import { fetchLastFavorite } from "../api/apiUserList";

export const useLastFavorite = (favoriteId) => {
  const { data, isLodaing } = useQuery({
    queryKey: ["lastFavorite"],
    queryFn: () => fetchLastFavorite(favoriteId),
    enabled: !!favoriteId,
  });

  const movieId = data?.movieId ?? null;
  const tvId = data?.tvId ?? null;

  return { movieId, tvId, isLodaing };
};
