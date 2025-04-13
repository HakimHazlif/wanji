import { useMemo } from "react";
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

  const recommendeds = useMemo(() => {
    const movies = recommendedShows?.moviesInterest?.slice(0, 8);
    const shows = recommendedShows?.tvShowsInterest?.slice(0, 8);

    return {
      movies,
      shows,
    };
  }, [recommendedShows?.tvShowsInterest, recommendedShows?.moviesInterest]);

  // const recommendedIds = useMemo(() => {
  //   const moviesIds = recommendeds?.movies.map((item) => item.id);
  //   const showsIds = recommendeds?.shows.map((item) => item.id);

  //   return { moviesIds, showsIds };
  // }, [recommendeds?.movies, recommendeds?.shows]);

  // const { isLoading: isFeaturesLoading1 } = useItemsStatus(
  //   recommendedIds?.moviesIds?.length ? recommendedIds?.moviesIds : null,
  //   "movie"
  // );
  // const { isLoading: isFeaturesLoading2 } = useItemsStatus(
  //   recommendedIds?.showsIds?.length ? recommendedIds?.showsIds : null,
  //   "tv"
  // );

  return {
    isLoading: isFetchingInterest || isFetchingLists || isFetchingLastFavorite,
    recommendedMovies: recommendeds?.movies,
    recommendedTvShows: recommendeds?.shows,
  };
}
