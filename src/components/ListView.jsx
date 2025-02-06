import ShowCard from "../ui/ShowCard";
import { useFetchInfiniteItems } from "../features/userLists/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import EmptyList from "../ui/EmptyList";
import ShowCardRow from "./ShowCardRow";
import SortBy from "../ui/SortBy";
import { useListsContext } from "../context/ListsContext";
import { useDeleteShow } from "../features/lists/useDeleteShow";
import { useEffect } from "react";

const ListView = ({ targetList, forEditList = false }) => {
  const { isGridView, setIsGridView } = useListsContext();

  const listId = targetList?.id;
  const list = targetList?.items_list;

  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  const {
    itemsList,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFetchInfiniteItems(listId, list);

  function handleDeleteItem(id, type) {
    deleteShow({ id, listId, type });
  }

  useEffect(() => {
    if (forEditList && itemsList?.length + 1 === list?.length) {
      fetchNextPage();
    }
  }, [itemsList?.length, list?.length, forEditList, fetchNextPage]);

  if (isLoading) return <Spinner />;

  if (!listId || !itemsList || itemsList?.length === 0)
    return <EmptyList withButton={forEditList && false} />;

  return (
    <section className="mt-5 relative z-10">
      <div className="flex justify-between items-center border-b border-slate-600 pb-5">
        <div>
          <h3 className="bg-bluish-black text-gray-400 text-lg px-5 py-2 rounded-full w-[160px] font-medium text-center">
            {" "}
            Has {targetList.length}{" "}
            {targetList.length <= 1 ? "title" : "titles"}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          <SortBy />

          <button
            className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
              isGridView
                ? "bg-bluish-black text-gray-500"
                : "hover:bg-slate-600"
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}
          >
            <BsFillGrid3X3GapFill className="w-5 h-5" />
          </button>
          <button
            className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer ${
              !isGridView
                ? "bg-bluish-black text-gray-500"
                : "hover:bg-slate-600"
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
            {itemsList?.map((item) => {
              return (
                <ShowCard
                  key={item?.id}
                  show={item}
                  parentShowId={
                    item?.air_date &&
                    targetList.filter((show) => show?.item_id == item?.id)?.[0]
                      ?.parent_id
                  }
                  category={
                    item?.title ? "movie" : item?.air_date ? "episode" : "tv"
                  }
                  forEditList={forEditList}
                  deleteShow={forEditList ? handleDeleteItem : null}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-flow-row gap-10 py-14">
            {itemsList?.map((item) => {
              return (
                <ShowCardRow
                  key={item?.id}
                  show={item}
                  parentShowId={
                    item?.air_date &&
                    targetList.filter((show) => show?.item_id == item?.id)?.[0]
                      ?.parent_id
                  }
                  category={
                    item?.title ? "movie" : item?.air_date ? "episode" : "tv"
                  }
                  forEditList={forEditList}
                  deleteShow={forEditList ? handleDeleteItem : null}
                />
              );
            })}
          </div>
        )}
      </div>

      {hasNextPage && (
        <button
          className="w-full py-2 font-bold text-lg bg-orange-amber"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
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
