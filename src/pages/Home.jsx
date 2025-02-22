import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useListsContext } from "../context/ListsContext";
import TrendingPeople from "../features/person/TrendingPeople";
import PopularPeople from "../features/person/PopularPeople";
import { useTvShows } from "../features/tv/useTvShows";

const Recommended = lazy(() => import("../components/Recommended"));
const MoviesList = lazy(() => import("../features/movies/MoviesList"));
const TvShowsList = lazy(() => import("../features/tv/TvShowsList"));

const Home = () => {
  const { isLoading: isMoviesLoading, movies } = useMovies();
  const { isLoading: isTvsLoading, tvShows } = useTvShows();

  const popularMovies = movies?.popularMovies?.slice(0, 8) ?? [];
  const topRatedMovies = movies?.topRatedMovies?.slice(0, 8) ?? [];
  const nowPlaynigMovies = movies?.nowPlaynigMovies?.slice(0, 8) ?? [];
  const popularTv = tvShows?.popularTv?.slice(0, 8) ?? [];
  const topRatedTv = tvShows?.topRatedTv?.slice(0, 8) ?? [];
  const onTheAir = tvShows?.onTheAir?.slice(0, 8) ?? [];

  const image =
    getImageViaPath(movies?.popularMovies?.[0]?.backdrop_path, 1280) || null;

  if (isMoviesLoading || isTvsLoading) return <Spinner />;

  return (
    <>
      <Discover image={image} />

      <div>
        {isMoviesLoading ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
            <MoviesList listKey="popularMovies" movies={popularMovies} />
            <TvShowsList listKey="popularTv" tvShows={popularTv} />
            <TrendingPeople />
            <Recommended />
            <MoviesList listKey="topRatedMovies" movies={topRatedMovies} />
            <TvShowsList listKey="topRatedTv" tvShows={topRatedTv} />
            <PopularPeople />
            <MoviesList listKey="nowPlaynigMovies" movies={nowPlaynigMovies} />
            <TvShowsList listKey="onTheAir" tvShows={onTheAir} />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default Home;
