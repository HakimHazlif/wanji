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
  });
  // console.log(data);

  return { recommendedShows, isLoading };
}
