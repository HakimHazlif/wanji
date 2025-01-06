import { useMovies } from "./useMovies";
import List from "../../components/List";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";

const MovieLists = () => {
  const { isLoading, movies, error } = useMovies();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  const popularMovies = movies.popularMovies.filter(
    (movie, index) => index < 8 && movie
  );
  const topRatedMovies = movies.topRatedMovies.filter(
    (movie, index) => index < 8 && movie
  );
  const nowPlaynigMovies = movies.nowPlaynigMovies.filter(
    (movie, index) => index < 8 && movie
  );
  const upcomingMovies = movies.upcomingMovies.filter(
    (movie, index) => index < 8 && movie
  );

  return (
    <section>
      <List title="Trending Movies">
        {popularMovies.map((movie) => (
          <ShowCard key={movie.id} movie={movie} />
        ))}
      </List>
    </section>
  );
};

export default MovieLists;
