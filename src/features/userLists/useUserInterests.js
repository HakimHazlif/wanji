import { useQuery } from "react-query";
import { getUserInterests } from "../../services/apiShows";

export function useUserInterests(movieId, tvId) {
  const { data: recommendedShows, isLoading } = useQuery({
    queryKey: ["interests"],
    queryFn: () => getUserInterests(movieId, tvId),
    enabled: !!movieId || !!tvId,
    onError: (error) => {
      throw new Error(error);
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { recommendedShows, isLoading };
}
