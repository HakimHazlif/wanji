import { useQuery } from "react-query";
import { fetchShortLists } from "../api/apiUserList";
import { useItemsStatus } from "./useItemsStatus";
import { useState } from "react";

export function useShortLists(
  watchlist,
  favoriteList,
  ratingsList,
  reviewsList
) {
  const [items, setItems] = useState({
    movieIds: [],
    tvIds: [],
    episodeIds: [],
  });

  const { data, isLoading: isShortLoading } = useQuery({
    queryKey: ["shortLists"],
    queryFn: () =>
      fetchShortLists(watchlist, favoriteList, ratingsList, reviewsList),
    enabled:
      watchlist?.length > 0 ||
      favoriteList?.length > 0 ||
      ratingsList?.length > 0 ||
      reviewsList?.length > 0,
    onSuccess: (data) => {
      const { shortWatchlist, shortFavorites, shortRatings, shortReviews } =
        data;
      const allItems = [
        ...shortWatchlist,
        ...shortFavorites,
        ...shortRatings,
        ...shortReviews,
      ];
      setItems({
        movieIds: [
          ...new Set(
            allItems.filter((el) => el["release_date"]).map((el) => el.id)
          ),
        ],
        tvIds: [
          ...new Set(
            allItems.filter((el) => el["first_air_date"]).map((el) => el.id)
          ),
        ],
        episodeIds: [
          ...new Set(
            allItems.filter((el) => el["air_date"]).map((el) => el.id)
          ),
        ],
      });
    },
  });

  const { isLoading: isMovieStatusLoading } = useItemsStatus(
    items.movieIds,
    "movie"
  );
  const { isLoading: isTvStatusLoading } = useItemsStatus(items.tvIds, "tv");
  const { isLoading: isEpisodeStatusLoading } = useItemsStatus(
    items.episodeIds,
    "episode"
  );

  const shortWatchlist = data?.shortWatchlist ?? [];
  const shortFavorites = data?.shortFavorites ?? [];
  const shortRatings = data?.shortRatings ?? [];
  const shortReviews = data?.shortReviews ?? [];

  return {
    isLoading:
      isShortLoading ||
      isEpisodeStatusLoading ||
      isTvStatusLoading ||
      isMovieStatusLoading,
    shortWatchlist,
    shortFavorites,
    shortRatings,
    shortReviews,
  };
}
