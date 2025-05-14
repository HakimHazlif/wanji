import { useInfiniteQuery } from "react-query";
import { fetchItemsList } from "../api/apiUserList";
import { useMemo } from "react";
// import { useLocation, useParams } from "react-router-dom";
import { useItemsStatus } from "./useItemsStatus";

export function useFetchInfiniteItems(listId, itemsList) {
  let movieIds, tvIds, episodeIds;
  // const { list } = useParams();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const selectedListId = searchParams.get("listId");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["itemsList", listId],
    queryFn: ({ pageParam = 0 }) =>
      fetchItemsList(listId, itemsList, pageParam),
    getNextPageParam: (lastPage) => {
      const items = lastPage?.items ?? [];
      console.log(items);
      movieIds = items.filter((el) => el["release_date"]).map((el) => el.id);
      tvIds = items.filter((el) => el["first_air_date"]).map((el) => el.id);
      episodeIds = items.filter((el) => el["air_date"]).map((el) => el.id);

      return lastPage.nextPoint < itemsList?.length
        ? lastPage.nextPoint
        : undefined;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
  });

  const { isLoading: isMovieStatusLoading } = useItemsStatus(movieIds, "movie");
  const { isLoading: isTvStatusLoading } = useItemsStatus(tvIds, "tv");
  const { isLoading: isEpisodeStatusLoading } = useItemsStatus(
    episodeIds,
    "episode"
  );

  const addCreateDateToList = useMemo(() => {
    const itemsList =
      data?.pages?.flatMap((page) => {
        if (page?.listId) return page.items;
      }) ?? [];

    return itemsList?.length > 0
      ? itemsList.map((item, index) => ({
          ...item,
          created_at: itemsList?.[index]?.created_at,
          media_type: itemsList?.[index]?.type,
        }))
      : [];
  }, [data?.pages]);

  return {
    itemsList: addCreateDateToList,
    isLoading:
      isLoading ||
      isMovieStatusLoading ||
      isTvStatusLoading ||
      isEpisodeStatusLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
}
