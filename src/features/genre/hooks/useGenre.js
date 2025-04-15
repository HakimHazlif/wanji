import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getShowsByGenre } from "../api/apiGenre";

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
  });

  return { genreList, isLoading };
}
