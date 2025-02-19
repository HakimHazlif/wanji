import ShowCard from "../../ui/ShowCard";
import ListScroll from "../lists/ListScroll";
import { useMovies } from "./useMovies";

const MoviesList = ({ listKey }) => {
  const { movies } = useMovies();
  const category = "movie";

  const moviesList = movies?.[listKey]?.slice(0, 9) ?? [];

  let path, listTitle;
  if (listKey === "popularMovies") {
    path = "/movies?movie-tag=popular&page=1";
    listTitle = "Popular Movies";
  } else if (listKey === "topRatedMovies") {
    listTitle = "Top Rated Movies";
    path = "/movies?movie-tag=top_rated&page=1";
  } else if (listKey === "nowPlaynigMovies") {
    listTitle = "Now Playnig Movies";
    path = "/movies?movie-tag=now_playing&page=1";
  } else if (listKey === "upcomingMovies") {
    listTitle = "Upcoming Movies";
    path = "/movies?movie-tag=upcoming&page=1";
  }

  return (
    <section
      className={`padding-x ${moviesList.length > 0 ? "md:pt-32 pt-52" : ""}`}
    >
      {moviesList.length > 0 && (
        <ListScroll title={listTitle} path={path} viewAll={true}>
          {moviesList.map((movie) => (
            <ShowCard key={movie.id} show={movie} category={category} />
          ))}
        </ListScroll>
      )}
    </section>
  );
};

export default MoviesList;
