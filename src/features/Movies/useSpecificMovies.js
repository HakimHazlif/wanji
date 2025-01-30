import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { getMoviesByList } from "../../services/apiShows";

export function useSpecificMovies(id) {
  const [searchParams] = useSearchParams();
  const listName = searchParams.get("movie-tag");
  const page = searchParams.get("page");

  const { data: moviesList, isLoading } = useQuery({
    queryKey: ["specificMovies", listName, page],
    queryFn: () => getMoviesByList(listName, page, id),
    enabled: id !== null || id !== undefined,
    onError: (error) => {
      console.log(error);
    },
  });

  return { moviesList, isLoading };
}
