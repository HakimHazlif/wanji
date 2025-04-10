import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getShowsByGenre } from "../../services/apiShows";
import toast from "react-hot-toast";

export function useGenre() {
  const { genreId, category } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));

  const { data: genreList, isLoading } = useQuery({
    queryKey: ["genre", genreId, category, page],
    queryFn: () => getShowsByGenre(genreId, category, page),
    onError: () => {
      toast.error("Failed to load genres");
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { genreList, isLoading };
}
