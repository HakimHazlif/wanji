import { useMovies } from "./useMovies";
import List from "../lists/List";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";
import ShowCard2 from "../../ui/ShowCard2";

const MovieLists = () => {
  const { isLoading, movies, error } = useMovies();
  const category = "movie";

  if (isLoading) return <Spinner />;

  if (error) return <p>{error}</p>;

  // console.log(movies);

  const popularMovies = movies.popularMovies.slice(0, 9);
  const topRatedMovies = movies.topRatedMovies.slice(0, 9);
  const nowPlaynigMovies = movies.nowPlaynigMovies.slice(0, 9);
  const upcomingMovies = movies.upcomingMovies.slice(0, 9);

  return (
    <section className="flex flex-col gap-20 padding-x">
      <List title="Trending Movies">
        {popularMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List title="Top Rated Movies">
        {topRatedMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List title="Now Playnig Movies">
        {nowPlaynigMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List title="Upcoming Movies">
        {upcomingMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
    </section>
  );
};

export default MovieLists;
