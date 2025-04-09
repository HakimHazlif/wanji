import { useQuery } from "react-query";
import { useSearchParams } from "react-router";
import { getItemsByList } from "../../services/apiShows";
import { useItemsStatus } from "../lists/useItemsStatus";
import toast from "react-hot-toast";

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
    onError: () => {
      toast.error("Failed to load this page");
    },
  });

  const uniqueMedia = itemsList?.results?.map((show) => show.id);

  const { isLoading: isFeaturesLoading } = useItemsStatus(
    uniqueMedia?.length ? uniqueMedia : null,
    type
  );

  return { itemsList, isLoading, isFeaturesLoading };
}
