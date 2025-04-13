import { useQuery } from "react-query";
import { fetchItemsStatus } from "../../services/apiLists";
import { useListsContext } from "../../context/ListsContext";
import { useSelector } from "react-redux";

export function useItemsStatus(itemIds, type) {
  const { uid } = useSelector((state) => state.user.user);
  const { watchlistId, favoriteListId, setItemsStatusMap } = useListsContext();

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
    // enabled:
    // !!itemIds?.length && !!type && !!watchlistId && !!favoriteListId && !!uid,
    onSuccess: (data) => {
      setItemsStatusMap((prev) => {
        const newMap = new Map(prev);
        const items = newMap.get(type);

        if (data instanceof Map) {
          data?.forEach((newItemData, itemId) => {
            items.set(itemId, newItemData);
          });
        }

        // newMap.set(type, items);
        return newMap;
      });
    },
  });

  return { data, isLoading };
}
