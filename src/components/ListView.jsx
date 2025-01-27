import { useLists } from "../features/lists/useLists";
import ShowCard from "../ui/ShowCard";
import {
  useFetchItemsList,
  useLoadMoreItems,
} from "../features/userLists/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import EmptyList from "../ui/EmptyList";
import ShowCardRow from "./ShowCardRow";
import SortBy from "../ui/SortBy";
import { useListsContext } from "../context/ListsContext";

const ListView = ({ listId }) => {
  const { lists } = useLists();
  const { isGridView, setIsGridView } = useListsContext();

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

  if (isLoading) return <Spinner />;

  if (!listId || !itemsList || !itemsList.items.length) return <EmptyList />;

  return (
    <section className="mt-5">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="bg-slate-200 text-blue-600 text-lg px-5 py-2 rounded-full w-[160px] font-medium text-center">
            {" "}
            Has {targetList.length}{" "}
            {targetList.length <= 1 ? "title" : "titles"}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <SortBy />

          <button
            className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
              isGridView ? "bg-slate-200 text-blue-600" : "hover:bg-slate-600"
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}
          >
            <BsFillGrid3X3GapFill className="w-5 h-5" />
          </button>
          <button
            className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
              !isGridView ? "bg-slate-200 text-blue-600" : "hover:bg-slate-600"
            }`}
            onClick={() => setIsGridView(false)}
            disabled={!isGridView}
          >
            <FaListUl className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        {isGridView ? (
          <div className="grid grid-cols-4 gap-10 py-14">
            {itemsList?.items.map((item) => {
              return (
                <ShowCard
                  key={item.id}
                  show={item}
                  parentShowId={
                    item["air_date"] &&
                    targetList.filter((show) => show.item_id == item.id)?.[0]
                      ?.parent_id
                  }
                  category={
                    item["title"]
                      ? "movie"
                      : item["air_date"]
                      ? "episode"
                      : "tv"
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-flow-row gap-10 py-14">
            {itemsList?.items.map((item) => {
              return (
                <ShowCardRow
                  key={item.id}
                  show={item}
                  parentShowId={
                    item["air_date"] &&
                    targetList.filter((show) => show.item_id == item.id)?.[0]
                      ?.parent_id
                  }
                  category={
                    item["title"]
                      ? "movie"
                      : item["air_date"]
                      ? "episode"
                      : "tv"
                  }
                />
              );
            })}
          </div>
        )}
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
