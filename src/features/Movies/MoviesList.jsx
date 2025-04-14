import ShowCard from "../../ui/ShowCard";
import ListScroll from "../lists/ListScroll";

const MoviesList = ({ listKey, movies }) => {
  const category = "movie";

  let path, listTitle;
  if (listKey === "popularMovies") {
    path = "/movies?movies-tag=popular&page=1";
    listTitle = "Popular Movies";
  } else if (listKey === "topRatedMovies") {
    listTitle = "Top Rated Movies";
    path = "/movies?movies-tag=top_rated&page=1";
  } else if (listKey === "nowPlaynigMovies") {
    listTitle = "Now Playnig Movies";
    path = "/movies?movies-tag=now_playing&page=1";
  } else if (listKey === "upcomingMovies") {
    listTitle = "Upcoming Movies";
    path = "/movies?movies-tag=upcoming&page=1";
  }

  return (
    <section
      className={`padding-x ${movies.length > 0 ? "md:pt-32 pt-52" : ""}`}
    >
      {movies.length > 0 && (
        <ListScroll title={listTitle} path={path} viewAll={true}>
          {movies.map((movie) => (
            <ShowCard key={movie.id} show={movie} category={category} />
          ))}
        </ListScroll>
      )}
    </section>
  );
};

export default MoviesList;
