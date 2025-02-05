import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchItemsList } from "../../services/apiLists";

export function useFetchItemsList(listId, list, startPoint) {
  const queryClient = useQueryClient();

  const {
    data: itemsList,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["itemsList", listId],
    queryFn: () => fetchItemsList(listId, list, startPoint),
    onError: (error) => {
      console.log("fetching error", error);
    },
  });

  return { itemsList, isLoading, refetch };
}

export function useLoadMoreItems(listId) {
  const queryClient = useQueryClient();

  const { mutate: loadMoreItems, isLoading: isLoadingMore } = useMutation({
    mutationFn: ({ listId, list, nextPoint }) =>
      fetchItemsList(listId, list, nextPoint),
    onSuccess: (newData, variables) => {
      queryClient.setQueryData(["itemsList", listId], (oldData) => {
        if (!oldData) return newData;
        return {
          items: [...oldData.items, ...newData.items],
          nextPoint: newData.nextPoint,
        };
      });
    },
    onError: (error) => {
      console.log("Error loading more items", error);
    },
  });

  return { loadMoreItems, isLoadingMore };
}
