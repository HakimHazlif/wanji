import { useInfiniteQuery } from "react-query";
import { fetchItemsList } from "../api/apiUserList";

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
