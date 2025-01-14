import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import MovieLists from "../features/movies/MovieLists";
import TvLists from "../features/tv/TvShowLists";

const Home = () => {
  const { isLoading, movies, error } = useMovies();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const image =
    getImageViaPath(movies.popularMovies[0].backdrop_path, 1280) || null;

  return (
    <>
      <Discover image={image} />
      <div className="py-20"></div>

      <MovieLists />
      <div className="py-20"></div>
      <TvLists />
    </>
  );
};

export default Home;
