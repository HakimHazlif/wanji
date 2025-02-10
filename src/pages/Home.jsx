import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import { lazy, Suspense, useEffect, useState } from "react";
import { useListsContext } from "../context/ListsContext";
import TrendingPeople from "../features/person/TrendingPeople";
import PopularPeople from "../features/person/PopularPeople";

const Recommended = lazy(() => import("../components/Recommended"));
const MoviesList = lazy(() => import("../features/movies/MoviesList"));
const TvShowsList = lazy(() => import("../features/tv/TvShowsList"));

const Home = () => {
  const { isLoading, movies, error } = useMovies();
  const [isIntersetsExict, setIsIntersetsExict] = useState(false);

  const { interestsIds } = useListsContext();

  const image =
    getImageViaPath(movies?.popularMovies[0].backdrop_path, 1280) || null;

  useEffect(() => {
    console.log(interestsIds?.movieId);
    if (interestsIds?.movieId || interestsIds?.tvId) setIsIntersetsExict(true);
  }, [interestsIds]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Discover image={image} />

      {isIntersetsExict ? (
        <Suspense fallback={<Spinner />}>
          <MoviesList listKey="popularMovies" />
          <TvShowsList listKey="popularTv" />
          <TrendingPeople />
          <Recommended />
          <MoviesList listKey="topRatedMovies" />
          <TvShowsList listKey="topRatedTv" />
          <PopularPeople />
          <MoviesList listKey="nowPlaynigMovies" />
          <TvShowsList listKey="onTheAir" />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          <MoviesList listKey="popularMovies" />
          <TvShowsList listKey="popularTv" />
          <TrendingPeople />
          <MoviesList listKey="topRatedMovies" />
          <TvShowsList listKey="topRatedTv" />
          <PopularPeople />
          <MoviesList listKey="nowPlaynigMovies" />
          <TvShowsList listKey="onTheAir" />
        </Suspense>
      )}
    </>
  );
};

export default Home;
