import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { useParams } from "react-router";
import { getShowsByGenre } from "../../services/apiShows";

export function useGenre() {
  const { genreId, category } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page"));

  const { data: genreList, isLoading } = useQuery({
    queryKey: ["genre", genreId, category, page],
    queryFn: () => getShowsByGenre(genreId, category, page),
    onError: (err) => {
      console.log(err.message);
    },
  });

  return { genreList, isLoading };
}
