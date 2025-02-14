import { useQuery } from "react-query";
import { fetchShortLists } from "../../services/apiLists";

export function useShortLists(watchlistList, favoriteListList, ratingListList) {
  const { data, isLoading } = useQuery({
    queryKey: ["shortLists"],
    queryFn: () =>
      fetchShortLists(watchlistList, favoriteListList, ratingListList),
    enabled:
      watchlistList?.length > 0 ||
      favoriteListList?.length > 0 ||
      ratingListList?.length > 0,
  });

  console.log(data);
  const shortWatchlist = data?.shortWatchlist ?? [];
  const shortFavorites = data?.shortFavorites ?? [];
  const shortRatings = data?.shortRatings ?? [];

  return { isLoading, shortWatchlist, shortFavorites, shortRatings };
}
