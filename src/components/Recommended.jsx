import { useEffect } from "react";
import { useItemsStatus } from "../features/lists/useItemsStatus";
import ListGrid from "../ui/ListGrid";
import ShowCard from "../ui/ShowCard";

const Recommended = ({ recommendedShows }) => {
  const interestMovies = recommendedShows?.moviesInterest?.slice(0, 8) ?? [];
  const interestTVs = recommendedShows?.tvShowsInterest?.slice(0, 8) ?? [];

  return (
    <section
      className={`flex flex-col gap-20 padding-x ${
        interestMovies.length || interestTVs.length ? "pt-28" : ""
      }`}
    >
      {interestMovies.length && (
        <ListGrid title="Recommended Movies" path="/movies?tag=for_you&page=1">
          {interestMovies?.map((movie) => (
            <ShowCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListGrid>
      )}
      {interestTVs.length && (
        <ListGrid
          title="Recommended TV Shows"
          path="/tv-shows?tag=for_you&page=1"
        >
          {interestTVs?.map((tv) => (
            <ShowCard key={tv.id} show={tv} category="tv" />
          ))}
        </ListGrid>
      )}
    </section>
  );
};

export default Recommended;
