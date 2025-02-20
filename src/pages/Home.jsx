import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useListsContext } from "../context/ListsContext";
import TrendingPeople from "../features/person/TrendingPeople";
import PopularPeople from "../features/person/PopularPeople";
import { useItemsStatus } from "../features/lists/useItemsStatus";
import { useTvShows } from "../features/tv/useTvShows";
import { useUserInterests } from "../features/userLists/useUserInterests";
import { useLists } from "../features/lists/useLists";
import { useLastFavorite } from "../features/lists/useLastFavorite";

const Recommended = lazy(() => import("../components/Recommended"));
const MoviesList = lazy(() => import("../features/movies/MoviesList"));
const TvShowsList = lazy(() => import("../features/tv/TvShowsList"));

const Home = () => {
  const { isLoading: isMoviesLoading, movies } = useMovies();
  const { isLoading: isTvLoading, tvShows } = useTvShows();
  const { favoriteList } = useLists();
  const { movieId, tvId } = useLastFavorite(favoriteList?.id);

  const { recommendedShows, isLoading: isInterestLoading } = useUserInterests(
    movieId,
    tvId
  );

  const image =
    getImageViaPath(movies?.popularMovies?.[0]?.backdrop_path, 1280) || null;

  const uniqueMovies = useMemo(() => {
    const popularMovies = movies?.popularMovies.slice(0, 8) ?? [];
    const topRatedMovies = movies?.topRatedMovies.slice(0, 8) ?? [];
    const nowPlaynigMovies = movies?.nowPlaynigMovies.slice(0, 8) ?? [];
    const recommendedMovies =
      recommendedShows?.moviesInterest?.slice(0, 8) ?? [];

    const allShows = [
      ...popularMovies,
      ...topRatedMovies,
      ...nowPlaynigMovies,
      ...recommendedMovies,
    ];

    return Array.from(
      new Map(allShows?.map((show) => [`${show.id}`, show.id])).values()
    );
  }, [
    movies?.popularMovies,
    movies?.topRatedMovies,
    movies?.nowPlaynigMovies,
    recommendedShows?.moviesInterest,
  ]);

  const uniqueTvShows = useMemo(() => {
    const popularTV = tvShows?.popularTv.slice(0, 8) ?? [];
    const topRatedTV = tvShows?.topRatedTv.slice(0, 8) ?? [];
    const nowPlaynigTV = tvShows?.onTheAir.slice(0, 8) ?? [];
    const recommendedTv = recommendedShows?.tvShowsInterest?.slice(0, 8) ?? [];

    const allShows = [
      ...popularTV,
      ...topRatedTV,
      ...nowPlaynigTV,
      ...recommendedTv,
    ];

    return Array.from(
      new Map(allShows?.map((show) => [`${show.id}`, show.id])).values()
    );
  }, [
    tvShows?.popularTv,
    tvShows?.topRatedTv,
    tvShows?.onTheAir,
    recommendedShows?.tvShowsInterest,
  ]);

  const { isLoading: isMoviesStatusLoading } = useItemsStatus(
    uniqueMovies,
    "movie"
  );

  const { isLoading: isTVStatusLoading } = useItemsStatus(uniqueTvShows, "tv");

  if (isTvLoading || isMoviesLoading) return <Spinner />;

  return (
    <>
      <Discover image={image} />

      <div>
        {isInterestLoading || isMoviesStatusLoading || isTVStatusLoading ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
            <MoviesList listKey="popularMovies" />
            <TvShowsList listKey="popularTv" />
            <TrendingPeople />
            <Recommended recommendedShows={recommendedShows} />
            <MoviesList listKey="topRatedMovies" />
            <TvShowsList listKey="topRatedTv" />
            <PopularPeople />
            <MoviesList listKey="nowPlaynigMovies" />
            <TvShowsList listKey="onTheAir" />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
