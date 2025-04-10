import { useQuery } from "react-query";
import { fetchShortLists } from "../../services/apiLists";

export function useShortLists(
  watchlist,
  favoriteList,
  ratingsList,
  reviewsList
) {
  const { data, isLoading } = useQuery({
    queryKey: ["shortLists"],
    queryFn: () =>
      fetchShortLists(watchlist, favoriteList, ratingsList, reviewsList),
    enabled:
      watchlist?.length > 0 ||
      favoriteList?.length > 0 ||
      ratingsList?.length > 0 ||
      reviewsList?.length > 0,
    staleTime: 1000 * 60 * 30,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const shortWatchlist = data?.shortWatchlist ?? [];
  const shortFavorites = data?.shortFavorites ?? [];
  const shortRatings = data?.shortRatings ?? [];
  const shortReviews = data?.shortReviews ?? [];

  return {
    isLoading,
    shortWatchlist,
    shortFavorites,
    shortRatings,
    shortReviews,
  };
}
