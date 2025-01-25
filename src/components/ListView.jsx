import { useLists } from "../features/lists/useLists";
import ShowCard from "../ui/ShowCard";
import {
  useFetchItemsList,
  useLoadMoreItems,
} from "../features/userLists/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";

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

  console.log(itemsList);

  const loadMore = () => {
    if (itemsList?.nextPoint !== null) {
      loadMoreItems({
        listId,
        list: targetList,
        nextPoint: itemsList.nextPoint,
      });
    }
  };

  if (isLoading) return <Spinner />;

  if (!listId) return <p>Empty</p>;

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
