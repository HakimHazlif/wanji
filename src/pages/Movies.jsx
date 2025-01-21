import { useSearchParams } from "react-router";
import { useMovies } from "../features/movies/useMovies";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import Discover from "../components/Discover";
import { getImageViaPath } from "../utils/helper";
import ShowCard from "../ui/ShowCard";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const movieTag = searchParams.get("movieTag");
  const [moviesList, setMoviesList] = useState([]);

  const { isLoading, movies, error } = useMovies();
  const category = "movie";

  useEffect(() => {
    switch (movieTag) {
      case "top-rated-movies":
        setMoviesList(movies?.topRatedMovies);
        break;
      case "now-playing-movies":
        setMoviesList(movies?.nowPlaynigMovies);
        break;
      case "upcoming-movies":
        setMoviesList(movies?.upcomingMovies);
        break;
      default:
        setMoviesList(movies?.popularMovies);
        break;
    }
  }, [movieTag]);

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Discover
        image={getImageViaPath(moviesList?.[0]?.backdrop_path, 1280) || null}
      />
      <section className="padding-x py-32">
        <div className="w-full grid grid-cols-4 gap-16 ">
          {moviesList?.map((movie) => (
            <ShowCard key={movie.id} show={movie} category={category} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Movies;
