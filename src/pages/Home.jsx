import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import MovieLists from "../features/movies/MovieLists";
import TvLists from "../features/tv/TvShowLists";
import { useLists } from "../features/lists/useLists";
import Interests from "../components/Interests";

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

      {favoriteList?.items_list?.length > 0 && <Interests />}

      <MovieLists />
      <TvLists />
    </>
  );
};

export default Home;
