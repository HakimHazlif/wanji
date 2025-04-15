import { useQuery } from "react-query";
import { getMovies } from "../api/apiMovies";

export function useMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  return {
    isLoading,
    movies,
    error,
  };
}
