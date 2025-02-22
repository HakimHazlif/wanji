import ListGrid from "../ui/ListGrid";
import ShowCard from "../ui/ShowCard";
import { useRecommendedMedia } from "../hooks/useRecommededMedia";
import Spinner from "../ui/Spinner";

const Recommended = () => {
  const { isLoading, recommendedMovies, recommendedTvShows } =
    useRecommendedMedia();

  const interestMovies = recommendedMovies?.slice(0, 8) ?? [];
  const interestTVs = recommendedTvShows?.slice(0, 8) ?? [];

  if (isLoading) return <Spinner />;

  return (
    <section
      className={`flex flex-col gap-20 padding-x ${
        interestMovies.length || interestTVs.length ? "pt-28" : ""
      }`}
    >
      {interestMovies.length > 0 && (
        <ListGrid
          title="Recommended Movies"
          path="/movies?movies-tag=for_you&page=1"
        >
          {interestMovies?.map((movie) => (
            <ShowCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListGrid>
      )}
      {interestTVs.length > 0 && (
        <ListGrid
          title="Recommended TV Shows"
          path="/tv-shows?tv-tag=for_you&page=1"
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
