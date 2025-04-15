import { useQuery } from "react-query";
import { fetchShortLists } from "../api/apiUserList";

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
