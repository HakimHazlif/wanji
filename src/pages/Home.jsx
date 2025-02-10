import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import { lazy, Suspense } from "react";
import { useListsContext } from "../context/ListsContext";
import TrendingPeople from "../features/person/TrendingPeople";
import PopularPeople from "../features/person/PopularPeople";

const Recommended = lazy(() => import("../components/Recommended"));
const MovieLists = lazy(() => import("../features/movies/MovieLists"));
const TvLists = lazy(() => import("../features/tv/TvShowLists"));

const Home = () => {
  const { isLoading, movies, error } = useMovies();

  const { interestsIds } = useListsContext();

  const isExict =
    interestsIds["interestMovieId"] !== null ||
    interestsIds["interestTvId"] !== null;

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const image =
    getImageViaPath(movies.popularMovies[0].backdrop_path, 1280) || null;

  return (
    <>
      <Discover image={image} />

      {isExict ? (
        <Suspense fallback={<Spinner />}>
          <Recommended />
          <PopularPeople />
          <MovieLists />
          <TrendingPeople />
          <TvLists />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          <PopularPeople />
          <MovieLists />
          <TrendingPeople />
          <TvLists />
        </Suspense>
      )}
    </>
  );
};

export default Home;
