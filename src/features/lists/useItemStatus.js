import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useListsContext } from "../../context/ListsContext";
import { fetchItemStatus } from "../../services/apiLists";
import { useSelector } from "react-redux";

export function useItemStatus() {
  const { uid } = useSelector((state) => state.user.user);
  const { category, id } = useParams();
  const { watchlistId, favoriteListId, setItemsStatusMap } = useListsContext();

  const { isLoading } = useQuery({
    queryKey: ["itemStatus", category],
    queryFn: () =>
      fetchItemStatus(id, category, watchlistId, favoriteListId, uid),
    enabled: !!uid && !!category && !!watchlistId && !!favoriteListId && !!id,
    onSuccess: (data) => {
      const dataMap =
        data instanceof Map ? data : new Map(Object.entries(data));
      setItemsStatusMap((prev) => {
        return {
          ...prev,
          [category]: new Map([...(prev[category] || []), ...dataMap]),
        };
      });
    },
  });

  return { isLoading };
}
