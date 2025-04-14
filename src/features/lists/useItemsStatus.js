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
      console.log(data);
      const dataMap =
        data instanceof Map ? data : new Map(Object.entries(data));

      setItemsStatusMap((prev) => {
        return {
          ...prev,
          [type]: new Map([...(prev[type] || []), ...dataMap]),
        };
      });
    },
  });

  return { data, isLoading };
}
