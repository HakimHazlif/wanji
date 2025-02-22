import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useListsContext } from "../../context/ListsContext";
import { fetchItemStatus } from "../../services/apiLists";
import { useSelector } from "react-redux";

export function useItemStatus() {
  const { uid } = useSelector((state) => state.user.user);
  const { category, id } = useParams();
  const { watchlistId, favoriteListId, itemsStatusMap, setItemsStatusMap } =
    useListsContext();

  const { isLoading } = useQuery({
    queryKey: ["itemStatus", category],
    queryFn: () =>
      fetchItemStatus(id, category, watchlistId, favoriteListId, uid),
    enabled: !!uid && !!category && !!watchlistId && !!favoriteListId && !!id,
    onSuccess: (data) => {
      const prevData = itemsStatusMap[category] || {};

      const mergedData = Object.fromEntries(
        new Map([
          ...Object.entries(prevData),
          ...Object.entries(data).map(([key, value]) => {
            if (prevData[key]?.remainLists && value?.remainLists) {
              value.remainLists = [
                ...new Set([
                  ...prevData[key].remainLists,
                  ...value.remainLists,
                ]),
              ];
            }
            return [key, value];
          }),
        ])
      );

      setItemsStatusMap((prev) => ({ ...prev, [category]: mergedData }));
    },
  });

  return { isLoading };
}
