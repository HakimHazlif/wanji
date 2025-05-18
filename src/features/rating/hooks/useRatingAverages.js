import { useQuery } from "react-query";
import { getRatingAverageForItems } from "../api/apiRating";
import { useListsContext } from "../../../context/ListsContext";

export function useRatingAverages(itemIds, type) {
  const { setRatingAverages } = useListsContext();

  const items = itemIds.map((id) => ({
    item_id: id,
    type: type,
  }));

  const { data: mediaAverages, isLoading } = useQuery({
    queryKey: ["rating-averages", { ids: itemIds }],
    queryFn: () => getRatingAverageForItems(items),
    enabled:
      !!items && items.length > 0 && !!itemIds && itemIds.length > 0 && !!type,
    onSuccess: (data) => {
      setRatingAverages((prev) => {
        const updatedMap = new Map(prev[type]);

        if (data) {
          for (const [key, value] of data.entries()) {
            updatedMap.set(key, value);
          }
        }

        return {
          ...prev,
          [type]: updatedMap,
        };
      });
    },
    staleTime: 10 * 60 * 1000,
  });

  return { mediaAverages, isLoading };
}
