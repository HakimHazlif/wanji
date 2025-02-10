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
    <section
      className={`flex flex-col gap-20 padding-x ${
        interestMovie?.length > 0 || interestTv?.length > 0 ? "pt-28" : ""
      }`}
    >
      {interestMovie?.length > 0 && (
        <ListScroll
          title="Movies You Might Like"
          path="movies?movie-tag=for_you&page=1"
          viewAll={true}
        >
          {interestMovie?.slice(0, 10).map((movie) => (
            <ShowCard key={movie.id} show={movie} category="movie" />
          ))}
        </ListScroll>
      )}
      {interestTv?.length > 0 && (
        <ListScroll
          title="TV Shows You Might Like"
          path="tv-shows?tv-tag=for_you&page=1"
          viewAll={true}
        >
          {interestTv?.slice(0, 10).map((tv) => (
            <ShowCard key={tv.id} show={tv} category="tv" />
          ))}
        </ListScroll>
      )}
    </section>
  );
};

export default Interests;
