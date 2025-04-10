import { useQuery } from "react-query";
import { fetchItemsStatus } from "../../services/apiLists";
import { useListsContext } from "../../context/ListsContext";
import { useSelector } from "react-redux";

export function useItemsStatus(itemIds, type) {
  const { uid } = useSelector((state) => state.user.user);
  const { watchlistId, favoriteListId, itemsStatusMap, setItemsStatusMap } =
    useListsContext();

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
      const prevData = itemsStatusMap[type] || {};
      const mergedData = Object.fromEntries(
        new Map([...Object.entries(prevData), ...Object.entries(data)])
      ); // This is to prevent duplicate keys

      setItemsStatusMap((prev) => ({ ...prev, [type]: mergedData }));
    },
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { data, isLoading };
}
