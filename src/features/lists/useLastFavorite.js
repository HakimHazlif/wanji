import { useQuery } from "react-query";
import { fetchLastFavorite } from "../../services/apiLists";

export const useLastFavorite = (favoriteId) => {
  const { data, isLodaing } = useQuery({
    queryKey: ["lastFavorite"],
    queryFn: () => fetchLastFavorite(favoriteId),
    enabled: !!favoriteId,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const movieId = data?.movieId ?? null;
  const tvId = data?.tvId ?? null;

  return { movieId, tvId, isLodaing };
};
