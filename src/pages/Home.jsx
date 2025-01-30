import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import { useLists } from "../features/lists/useLists";
import { lazy, Suspense } from "react";

const Interests = lazy(() => import("../components/Interests"));
const MovieLists = lazy(() => import("../features/movies/MovieLists"));
const TvLists = lazy(() => import("../features/tv/TvShowLists"));

const Home = () => {
  const { isLoading, movies, error } = useMovies();

  const { favoriteList } = useLists();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const image =
    getImageViaPath(movies.popularMovies[0].backdrop_path, 1280) || null;

  return (
    <>
      <Discover image={image} />

      {favoriteList?.items_list?.length > 0 ? (
        <Suspense fallback={<Spinner />}>
          <Interests />
          <MovieLists />
          <TvLists />
        </Suspense>
      ) : (
        <Suspense fallback={<Spinner />}>
          <MovieLists />
          <TvLists />
        </Suspense>
      )}
    </>
  );
};

export default Home;
