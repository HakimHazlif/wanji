import { useListsContext } from "../context/ListsContext";
import ListScroll from "../features/lists/ListScroll";
import { useUserInterests } from "../features/userLists/useUserInterests";
import ShowCard from "../ui/ShowCard";
import Spinner from "../ui/Spinner";

const Interests = () => {
  const { interestsIds } = useListsContext();
  const { interestMovie, interestTv, isLoading } =
    useUserInterests(interestsIds);

  if (isLoading) return <Spinner />;

  return (
    <section className="flex flex-col gap-20 padding-x pt-28">
      {interestMovie && (
        <ListScroll
          title="Movies specially selected for you"
          path="movies?movieTag=for-you"
          viewAll={true}
        >
          {interestMovie?.results?.slice(0, 8).map((movie) => (
            <ShowCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListScroll>
      )}
      {interestTv && (
        <ListScroll
          title="Series specially selected for you"
          path="tv-shows?tvTag=for-you"
          viewAll={true}
        >
          {interestTv?.results?.slice(0, 8).map((tv) => (
            <ShowCard key={tv.id} show={tv} category="tv" />
          ))}
        </ListScroll>
      )}
    </section>
  );
};

export default Interests;
