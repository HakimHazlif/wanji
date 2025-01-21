import { useMovies } from "./useMovies";
import List from "../lists/List";
import Spinner from "../../ui/Spinner";
import ShowCard from "../../ui/ShowCard";

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
      <List title="Trending Movies" path="movies" viewAll={true}>
        {popularMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List
        title="Top Rated Movies"
        path="movies?movieTag=top-rated-movies"
        viewAll={true}
      >
        {topRatedMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List
        title="Now Playnig Movies"
        path="movies?movieTag=now-playing-movies"
        viewAll={true}
      >
        {nowPlaynigMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
      <List
        title="Upcoming Movies"
        path="movies?movieTag=upcoming-movies"
        viewAll={true}
      >
        {upcomingMovies.map((movie) => (
          <ShowCard key={movie.id} show={movie} category={category} />
        ))}
      </List>
    </section>
  );
};

export default MovieLists;
