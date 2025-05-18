import { useQuery } from "react-query";
import { useListsContext } from "../../../context/ListsContext";
import { useSelector } from "react-redux";
import { fetchItemsStatus } from "../api/apiUserList";
import { useRatingAverages } from "../../rating/hooks/useRatingAverages";

export function useItemsStatus(itemIds, type) {
  const { uid } = useSelector((state) => state.user.user);
  const { watchlistId, favoriteListId, setItemsStatusMap } = useListsContext();

  const { data, isLoading: isStatusLoading } = useQuery({
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

  const { isLoading: isAveragesLoading } = useRatingAverages(
    itemIds || [],
    type
  );

  return { data, isLoading: isStatusLoading || isAveragesLoading };
}
