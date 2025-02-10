import { useListsContext } from "../context/ListsContext";
import ListScroll from "../features/lists/ListScroll";
import { useUserInterests } from "../features/userLists/useUserInterests";
import ListGrid from "../ui/ListGrid";
import ShowCard from "../ui/ShowCard";
import Spinner from "../ui/Spinner";

const Recommended = () => {
  const { interestsIds } = useListsContext();
  const { interestMovie, interestTv, isLoading } =
    useUserInterests(interestsIds);

  if (isLoading) return <Spinner />;

  return (
    <section
      className={`flex flex-col gap-20 padding-x ${
        interestMovie?.length > 0 || interestTv?.length > 0 ? "pt-28" : ""
      }`}
    >
      {interestMovie?.length > 0 && (
        <ListGrid
          title="Recommended Movies"
          path="/movies?movie-tag=for_you&page=1"
        >
          {interestMovie?.slice(0, 8).map((movie) => (
            <ShowCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListGrid>
      )}
      {interestTv?.length > 0 && (
        <ListGrid
          title="Recommended TV Shows"
          path="/tv-shows?tv-tag=for_you&page=1"
        >
          {interestTv?.slice(0, 8).map((tv) => (
            <ShowCard key={tv.id} show={tv} category="tv" />
          ))}
        </ListGrid>
      )}
    </section>
  );
};

export default Recommended;
