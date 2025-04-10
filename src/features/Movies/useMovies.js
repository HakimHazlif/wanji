import { useQuery } from "react-query";
import { getMovies } from "../../services/apiShows";
import { useItemsStatus } from "../lists/useItemsStatus";

export function useMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const popularMovies = movies?.popularMovies.slice(0, 8) ?? [];
  const topRatedMovies = movies?.topRatedMovies.slice(0, 8) ?? [];
  const nowPlaynigMovies = movies?.nowPlaynigMovies.slice(0, 8) ?? [];
  const upcomingMovies = movies?.upcomingMovies.slice(0, 8) ?? [];

  const allShows = [
    ...popularMovies,
    ...topRatedMovies,
    ...nowPlaynigMovies,
    ...upcomingMovies,
  ];

  const uniqueMovies = Array.from(
    new Map(allShows.map((show) => [`${show.id}`, show.id])).values()
  );

  const { isLoading: isFeaturesLoading } = useItemsStatus(
    uniqueMovies.length ? uniqueMovies : null,
    "movie"
  );

  return {
    isLoading,
    isFeaturesLoading,
    movies,
    error,
  };
}
