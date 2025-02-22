import { useItemsStatus } from "../features/lists/useItemsStatus";
import { useLastFavorite } from "../features/lists/useLastFavorite";
import { useLists } from "../features/lists/useLists";
import { useUserInterests } from "../features/userLists/useUserInterests";

export function useRecommendedMedia() {
  const { favoriteList, isLoading: isFetchingLists } = useLists();

  const {
    movieId,
    tvId,
    isLodaing: isFetchingLastFavorite,
  } = useLastFavorite(favoriteList?.id);

  const { recommendedShows, isLoading: isFetchingInterest } = useUserInterests(
    movieId,
    tvId
  );

  const isLoading =
    isFetchingLists || isFetchingLastFavorite || isFetchingInterest;

  const recommendedMovies = recommendedShows?.moviesInterest ?? [];
  const recommendedTvShows = recommendedShows?.tvShowsInterest ?? [];

  const recommendedMoviesId = recommendedMovies
    ?.slice(0, 8)
    ?.map((item) => item.id);
  const recommendedTvShowsId = recommendedTvShows
    ?.slice(0, 8)
    ?.map((item) => item.id);

  const { isLoading: isFeaturesLoading1 } = useItemsStatus(
    recommendedMoviesId.length ? recommendedMoviesId : null,
    "movie"
  );
  const { isLoading: isFeaturesLoading2 } = useItemsStatus(
    recommendedTvShowsId.length ? recommendedTvShowsId : null,
    "tv"
  );

  const isFeaturesLoading = isFeaturesLoading1 || isFeaturesLoading2;

  return {
    isLoading,
    isFeaturesLoading,
    recommendedMovies,
    recommendedTvShows,
  };
}
