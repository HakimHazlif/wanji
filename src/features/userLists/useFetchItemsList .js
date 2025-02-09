import { useInfiniteQuery } from "react-query";
import { fetchItemsList } from "../../services/apiLists";

export function useFetchInfiniteItems(listId, list) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["itemsList", listId],
    queryFn: ({ pageParam = 0 }) => fetchItemsList(listId, list, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPoint < list?.length ? lastPage.nextPoint : undefined;
    },
    cacheTime: 1000 * 60 * 30,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const itemsList =
    data?.pages?.flatMap((page) => {
      if (page?.listId) return page.items;
    }) ?? [];

  const addCreateDateToList =
    itemsList?.length > 0
      ? itemsList.map((item, index) => ({
          ...item,
          created_at: list?.[index]?.created_at,
          media_type: list?.[index]?.type,
        }))
      : [];

  return {
    itemsList: addCreateDateToList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
}

// export function useFetchItemsList(listId, list, startPoint) {
//   const queryClient = useQueryClient();

//   const {
//     data: itemsList,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["itemsList", listId],
//     queryFn: () => fetchItemsList(listId, list, startPoint),
//     onError: (error) => {
//       console.log("fetching error", error);
//     },
//   });

//   return { itemsList, isLoading, refetch };
// }

// export function useLoadMoreItems(listId) {
//   const queryClient = useQueryClient();

//   const { mutate: loadMoreItems, isLoading: isLoadingMore } = useMutation({
//     mutationFn: ({ listId, list, nextPoint }) =>
//       fetchItemsList(listId, list, nextPoint),
//     onSuccess: (newData, variables) => {
//       queryClient.setQueryData(["itemsList", listId], (oldData) => {
//         if (!oldData) return newData;
//         return {
//           items: [...oldData.items, ...newData.items],
//           nextPoint: newData.nextPoint,
//         };
//       });
//     },
//     onError: (error) => {
//       console.log("Error loading more items", error);
//     },
//   });

//   return { loadMoreItems, isLoadingMore };
// }
