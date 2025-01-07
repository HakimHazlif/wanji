import { useQuery } from "react-query";
import { getMovies } from "../../services/apiShows";

export function useMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return { isLoading, movies, error };
}
