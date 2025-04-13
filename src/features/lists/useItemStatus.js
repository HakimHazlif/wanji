import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useListsContext } from "../../context/ListsContext";
import { fetchItemStatus } from "../../services/apiLists";
import { useSelector } from "react-redux";
import { it } from "date-fns/locale";

export function useItemStatus() {
  const { uid } = useSelector((state) => state.user.user);
  const { category, id } = useParams();
  const { watchlistId, favoriteListId, setItemsStatusMap, itemsStatusMap } =
    useListsContext();

  const { isLoading } = useQuery({
    queryKey: ["itemStatus", category],
    queryFn: () =>
      fetchItemStatus(id, category, watchlistId, favoriteListId, uid),
    enabled: !!uid && !!category && !!watchlistId && !!favoriteListId && !!id,
    onSuccess: (data) => {
      setItemsStatusMap((prev) => {
        const newMap = new Map(prev);
        const items = newMap.get(category);
        const itemMap = data instanceof Map ? data?.get(id) : new Map();

        items.set(id, itemMap);
        newMap.set(category, items);

        return newMap;
      });
    },
  });

  return { isLoading };
}
