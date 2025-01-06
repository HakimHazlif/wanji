import Discover from "../components/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/Movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import MovieLists from "../features/Movies/MovieLists";

const Home = () => {
  const { isLoading, movies, error } = useMovies();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const image =
    getImageViaPath(movies.popularMovies[0].backdrop_path, 1280) || null;

  return (
    <main>
      <Discover image={image} />
      <MovieLists />
    </main>
  );
};

export default Home;
