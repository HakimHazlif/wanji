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

  // const popularMovies = movies?.popularMovies.slice(0, 9) ?? [];
  // const topRatedMovies = movies?.topRatedMovies.slice(0, 9) ?? [];
  // const nowPlaynigMovies = movies?.nowPlaynigMovies.slice(0, 9) ?? [];
  // const upcomingMovies = movies?.upcomingMovies.slice(0, 9) ?? [];

  return {
    isLoading,
    movies,
    error,
  };
}
