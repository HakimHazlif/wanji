import Discover from "../features/Movies/Discover";
import Spinner from "../ui/Spinner";
import { useShows } from "../features/Movies/useShows";
import { getImageViaPath } from "../utils/helper";

const Home = () => {
  const { isLoading, shows, error } = useShows();

  const image = getImageViaPath(shows?.movies[0]?.backdrop_path, 1280) || null;

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  return (
    <main>
      <Discover image={image} />
    </main>
  );
};

export default Home;
