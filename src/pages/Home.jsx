import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/hooks/useMovies";
import { getImageViaPath } from "../utils/helper";

import { useTvShows } from "../features/tv/hooks/useTvShows";
import { lazy, Suspense, useMemo } from "react";
import { useListsContext } from "../context/ListsContext";
import { useItemsStatus } from "../features/userLists/hooks/useItemsStatus";
import SuspenseList from "../ui/SuspenseList";

const RecommendedMedias = lazy(() =>
  import("../features/vitualMedia/components/RecommendedMedias")
);
const MoviesList = lazy(() =>
  import("../features/movies/components/MoviesList")
);
const TvShowsList = lazy(() => import("../features/tv/components/TvShowsList"));
const TrendingPeople = lazy(() =>
  import("../features/person/components/TrendingPeople")
);
const PopularPeople = lazy(() =>
  import("../features/person/components/PopularPeople")
);

const Home = () => {
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
          <Suspense fallback={<SuspenseList />}>
            <MoviesList listKey="popularMovies" movies={popularMovies} />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <TvShowsList listKey="popularTv" tvShows={popularTv} />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <TrendingPeople />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <RecommendedMedias />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <MoviesList listKey="topRatedMovies" movies={topRatedMovies} />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <TvShowsList listKey="topRatedTv" tvShows={topRatedTv} />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <PopularPeople />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <MoviesList listKey="nowPlaynigMovies" movies={nowPlaynigMovies} />
          </Suspense>
          <Suspense fallback={<SuspenseList />}>
            <TvShowsList listKey="onTheAir" tvShows={onTheAir} />
          </Suspense>
        </>
      )}
    </>
  );
};

export default Home;
