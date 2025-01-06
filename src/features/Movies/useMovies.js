import { useQuery } from "react-query";
import { getMovies } from "../../services/apiShow";

export function useMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["shows"],
    queryFn: getMovies,
  });

  return { isLoading, movies, error };
}
