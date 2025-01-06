import Discover from "../features/Movies/Discover";
import Spinner from "../ui/Spinner";
import { useMovies } from "../features/Movies/useMovies";
import { getImageViaPath } from "../utils/helper";
import List from "../components/List";

const Home = () => {
  const { isLoading, movies, error } = useMovies();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const image =
    getImageViaPath(movies.popularMovies[0].backdrop_path, 1280) || null;

  return (
    <main>
      <Discover image={image} />
      <List title="Trending Movies">
        <p>right here will be list of movies</p>
      </List>
    </main>
  );
};

export default Home;
