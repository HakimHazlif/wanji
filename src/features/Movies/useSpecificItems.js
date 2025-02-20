import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { getItemsByList } from "../../services/apiShows";

export function useSpecificItems(id, type) {
  const [searchParams] = useSearchParams();
  const listName =
    type === "movie"
      ? searchParams.get("movies-tag")
      : searchParams.get("tv-tag");
  const page = searchParams.get("page");

  const isIdExist = listName === "for_you" ? (id ? true : false) : true;

  const { data: itemsList, isLoading } = useQuery({
    queryKey: ["specificMovies", listName, page],
    queryFn: () => getItemsByList(listName, page, id, type),
    enabled: isIdExist && !!page && !!listName && !!type,
    onError: (error) => {
      console.log(error);
    },
  });

  return { itemsList, isLoading };
}
