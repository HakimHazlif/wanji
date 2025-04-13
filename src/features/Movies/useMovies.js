import { useQuery } from "react-query";
import { getMovies } from "../../services/apiShows";
import { useItemsStatus } from "../lists/useItemsStatus";
import { useMemo } from "react";

export function useMovies() {
  const {
    isLoading,
    data: movies,
    error,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  // const moviesSet = useMemo(() => {
  //   const popularMovies = movies?.popularMovies?.slice(0, 8) ?? [];
  //   const topRatedMovies = movies?.topRatedMovies?.slice(0, 8) ?? [];
  //   const nowPlaynigMovies = movies?.nowPlaynigMovies?.slice(0, 8) ?? [];
  //   const upcomingMovies = movies?.upcomingMovies?.slice(0, 8) ?? [];

  //   return Array.from(
  //     new Set(
  //       [
  //         ...popularMovies,
  //         ...topRatedMovies,
  //         ...nowPlaynigMovies,
  //         ...upcomingMovies,
  //       ].map((movie) => movie.id)
  //     )
  //   );
  // }, [
  //   movies?.upcomingMovies,
  //   movies?.nowPlaynigMovies,
  //   movies?.topRatedMovies,
  //   movies?.popularMovies,
  // ]);

  // const { isLoading: isFeaturesLoading } = useItemsStatus(
  //   moviesSet.length ? moviesSet : null,
  //   "movie"
  // );

  return {
    isLoading,
    movies,
    error,
  };
}
