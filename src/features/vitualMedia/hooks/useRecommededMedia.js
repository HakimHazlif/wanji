import { useMemo } from "react";
import { useLastFavorite } from "../../userLists/hooks/useLastFavorite";
import { useLists } from "../../userLists/hooks/useLists";
import { useQuery } from "react-query";
import { getRecommanded } from "../api/apiMedia";

export function useRecommendedMedia() {
  const { favoriteList, isLoading: isFetchingLists } = useLists();

  const {
    movieId,
    tvId,
    isLodaing: isFetchingLastFavorite,
  } = useLastFavorite(favoriteList?.id);

  const { data: recommendedVisualMedia, isLoading: isFetchingInterest } =
    useQuery({
      queryKey: ["interests"],
      queryFn: () => getRecommanded(movieId, tvId),
      enabled: !!movieId || !!tvId,
      onError: (error) => {
        throw new Error(error);
      },
    });

  const recommendeds = useMemo(() => {
    const movies = recommendedVisualMedia?.moviesInterest?.slice(0, 8);
    const shows = recommendedVisualMedia?.tvShowsInterest?.slice(0, 8);

    return {
      movies,
      shows,
    };
  }, [
    recommendedVisualMedia?.tvShowsInterest,
    recommendedVisualMedia?.moviesInterest,
  ]);

  return {
    isLoading: isFetchingInterest || isFetchingLists || isFetchingLastFavorite,
    recommendedMovies: recommendeds?.movies,
    recommendedTvShows: recommendeds?.shows,
  };
}
