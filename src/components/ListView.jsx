import { useLists } from "../features/lists/useLists";
import ShowCard from "../ui/ShowCard";
import {
  useFetchItemsList,
  useLoadMoreItems,
} from "../features/userLists/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { RiMovie2AiFill, RiMovie2AiLine } from "react-icons/ri";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";

const ListView = ({ listId }) => {
  const { lists } = useLists();

  const targetList =
    lists && lists?.filter((list) => list.id === listId)?.[0]?.items_list;

  const startPoint = 0;
  const { itemsList, isLoading } = useFetchItemsList(
    listId,
    targetList,
    startPoint
  );

  const { loadMoreItems, isLoadingMore } = useLoadMoreItems(listId);

  const loadMore = () => {
    if (itemsList?.nextPoint !== null) {
      loadMoreItems({
        listId,
        list: targetList,
        nextPoint: itemsList.nextPoint,
      });
    }
  };

  if (!listId || !itemsList || !itemsList.items.length) {
    return (
      <section className="mt-5 flex flex-col items-center justify-center h-screen text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-700 p-6 rounded-full shadow-lg">
            <RiMovie2AiLine className="h-20 w-20 text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold ">No Movies or Shows Found</h2>
          <p className="text-gray-400 max-w-md">
            We couldn&apos;t find any content in your list. Start exploring new
            movies, TV shows, or episodes to fill it up. 🎥🍿
          </p>

          <button
            onClick={() => console.log("Redirect to explore page")}
            className="px-6 py-3 bg-orange-amber rounded-lg shadow-md hover:bg-orange-coral transition text-gray-800 font-semibold"
          >
            Explore Movies & Shows
          </button>
        </div>
      </section>
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <section>
      <div className="grid grid-cols-4 gap-10 py-14">
        {itemsList?.items.map((item) => {
          return (
            <ShowCard
              show={item}
              key={item.id}
              category={item["title"] ? "movie" : "tv"}
            />
          );
        })}
      </div>

      {targetList?.length > itemsList?.items.length && (
        <button
          className="w-full py-2 font-bold text-lg bg-orange-amber"
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? (
            <div className="flex justify-center items-center">
              <SpinnerMini />
            </div>
          ) : (
            "Load More"
          )}
        </button>
      )}
    </section>
  );
};

export default ListView;
