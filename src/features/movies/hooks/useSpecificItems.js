import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getItemsByList } from "../api/apiMovies";

export function useSpecificItems(id, type) {
  const [searchParams] = useSearchParams();
  const listName =
    type === "movie"
      ? searchParams.get("movies-tag")
      : searchParams.get("tv-tag");
  const page = searchParams.get("page");

  const isIdExist = listName === "for_you" ? (id ? true : false) : true;

  const { data: itemsList, isLoading: isItemsLoading } = useQuery({
    queryKey: ["specificMovies", listName, page],
    queryFn: () => getItemsByList(listName, page, id, type),
    enabled: isIdExist && !!page && !!listName && !!type,
    onError: () => {
      toast.error("Failed to load this page");
    },
  });

  return { itemsList, isLoading: isItemsLoading };
}
