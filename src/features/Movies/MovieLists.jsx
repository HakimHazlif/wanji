import { useMovies } from "./useMovies";
import List from "../lists/List";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";

const MovieLists = () => {
  const { isLoading, movies, error } = useMovies();

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  // console.log(movies);

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
    <section className="flex flex-col gap-20 padding-x">
      <List title="Trending Movies">
        {popularMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} title={movie.title} />
        ))}
      </List>
      <List title="Top Rated Movies">
        {topRatedMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} title={movie.title} />
        ))}
      </List>
      <List title="Now Playnig Movies">
        {nowPlaynigMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} title={movie.title} />
        ))}
      </List>
      <List title="Upcoming Movies">
        {upcomingMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} title={movie.title} />
        ))}
      </List>
    </section>
  );
};

export default MovieLists;
