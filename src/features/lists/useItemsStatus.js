import { useQuery } from "react-query";
import { fetchItemsStatus } from "../../services/apiLists";
import { useListsContext } from "../../context/ListsContext";
import { useSelector } from "react-redux";

export function useItemsStatus(itemIds, type) {
  const { uid } = useSelector((state) => state.user.user);
  const {
    watchlistId,
    favoriteListId,
    setMoviesMap,
    setTvShowsMap,
    setEpisodesMap,
  } = useListsContext();

  console.log(`itemIds ${type}:`, itemIds.length);

  const { data, isLoading } = useQuery({
    queryKey: ["itemsStatus", type, { ids: itemIds }],
    queryFn: () =>
      fetchItemsStatus({
        itemIds,
        type,
        watchlistId,
        favoriteListId,
        userId: uid,
      }),
    enabled:
      !!itemIds?.length && !!type && !!watchlistId && !!favoriteListId && !!uid,
    onSuccess: (data) => {
      if (type === "movie") setMoviesMap(data);
      else if (type === "tv") setTvShowsMap(data);
      else if (type === "episode") setEpisodesMap(data);
    },
  });

  return { data, isLoading };
}
