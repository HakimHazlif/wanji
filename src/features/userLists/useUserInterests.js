import { useQuery } from "react-query";
import { getUserInterests } from "../../services/apiShows";

export function useUserInterests({ movieId, tvId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["interests"],
    queryFn: () => getUserInterests(movieId, tvId),
    enabled: movieId !== null || tvId !== null,
    onError: (error) => {
      throw new Error(error);
    },
  });
  // console.log(data);

  const interestMovie = data?.moviesInterest;
  const interestTv = data?.tvShowsInterest;

  return { interestMovie, interestTv, isLoading };
}
