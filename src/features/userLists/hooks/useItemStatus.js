import { useQuery } from "react-query";
import { useListsContext } from "../../../context/ListsContext";
import { useSelector } from "react-redux";
import { fetchItemStatus } from "../api/apiUserList";

export function useItemStatus(itemId, type, parentId = null) {
  const { uid } = useSelector((state) => state.user.user);
  const { watchlistId, favoriteListId, setItemsStatusMap } = useListsContext();

  // I can't use useParams here to get { id: itemId, category: type} because this hook is invoked in both the VirtualMedia (movie & tv pages) and Episode (episode page) components. So, I used parameters/arguments instead

  const { isLoading } = useQuery({
    queryKey: ["itemStatus", itemId, type],
    queryFn: () =>
      fetchItemStatus(itemId, type, watchlistId, favoriteListId, uid, parentId),
    enabled: !!uid && !!itemId && !!watchlistId && !!favoriteListId && !!type,
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

  return { isLoading };
}
