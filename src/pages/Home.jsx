import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";

import { useTvShows } from "../features/tv/useTvShows";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useListsContext } from "../context/ListsContext";
import { useItemsStatus } from "../features/lists/useItemsStatus";

const Recommended = lazy(() => import("../components/Recommended"));
const MoviesList = lazy(() => import("../features/movies/MoviesList"));
const TvShowsList = lazy(() => import("../features/tv/TvShowsList"));
const TrendingPeople = lazy(() => import("../features/person/TrendingPeople"));
const PopularPeople = lazy(() => import("../features/person/PopularPeople"));

const Home = () => {
  const [showExtra, setShowExtra] = useState(false);

  const { isLoading: isMoviesLoading, movies } = useMovies();
  const { isLoading: isTvsLoading } = useTvShows();
  const {
    popularMovies,
    topRatedMovies,
    nowPlaynigMovies,
    upcomingMovies,
    popularTv,
    topRatedTv,
    onTheAir,
    airingTodayTV,
  } = useListsContext();

  const moviesSet = useMemo(() => {
    return Array.from(
      new Set(
        [
          ...popularMovies,
          ...topRatedMovies,
          ...nowPlaynigMovies,
          ...upcomingMovies,
        ].map((movie) => movie.id)
      )
    );
  }, [upcomingMovies, nowPlaynigMovies, topRatedMovies, popularMovies]);

  const { isLoading: isFeaturesLoading1 } = useItemsStatus(
    moviesSet.length ? moviesSet : null,
    "movie"
  );

  const tvShowsSet = useMemo(() => {
    return Array.from(
      new Set(
        [...popularTv, ...topRatedTv, ...onTheAir, ...airingTodayTV].map(
          (show) => show.id
        )
      )
    );
  }, [airingTodayTV, onTheAir, topRatedTv, popularTv]);

  const { isLoading: isFeaturesLoading2 } = useItemsStatus(
    tvShowsSet.length ? tvShowsSet : null,
    "tv"
  );

  const image = useMemo(() => {
    return (
      getImageViaPath(movies?.popularMovies?.[0]?.backdrop_path, 1280) || null
    );
  }, [movies?.popularMovies]);

  useEffect(() => {
    const timer = setTimeout(() => setShowExtra(true), 300);

    return () => clearTimeout(timer);
  }, []);

  if (
    isMoviesLoading ||
    isTvsLoading ||
    isFeaturesLoading1 ||
    isFeaturesLoading2
  )
    return <Spinner />;

  return (
    <>
      <Discover image={image} />

      {isMoviesLoading ? (
        <Spinner />
      ) : (
        <>
          <Suspense fallback={<Spinner />}>
            <MoviesList listKey="popularMovies" movies={popularMovies} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <TvShowsList listKey="popularTv" tvShows={popularTv} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <TrendingPeople />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <Recommended />
          </Suspense>
          {showExtra && (
            <>
              <Suspense fallback={<Spinner />}>
                <MoviesList listKey="topRatedMovies" movies={topRatedMovies} />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <TvShowsList listKey="topRatedTv" tvShows={topRatedTv} />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <PopularPeople />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <MoviesList
                  listKey="nowPlaynigMovies"
                  movies={nowPlaynigMovies}
                />
              </Suspense>
              <Suspense fallback={<Spinner />}>
                <TvShowsList listKey="onTheAir" tvShows={onTheAir} />
              </Suspense>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
