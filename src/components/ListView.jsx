import ShowCard from "../ui/ShowCard";
import { useFetchInfiniteItems } from "../features/userLists/useFetchItemsList ";
import Spinner from "../ui/Spinner";
import SpinnerMini from "../ui/SpinnerMini";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import EmptyList from "../ui/EmptyList";
import ShowCardRow from "./ShowCardRow";
import OptionsSelector from "../ui/OptionsSelector";
import { useListsContext } from "../context/ListsContext";
import { useDeleteShow } from "../features/lists/useDeleteShow";
import { useEffect } from "react";
import EditListButton from "./EditListButton";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import LoadMoreButton from "./LoadMoreButton";

const ListView = ({ targetList, forEditList = false }) => {
  const queryClient = useQueryClient();
  const { uid } = useSelector((state) => state.user.user);
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
    refetch,
  } = useFetchInfiniteItems(listId, list);

  function handleDeleteItem(id, type) {
    if (uid) {
      deleteShow({ id, listId, type });
    }
  }

  useEffect(() => {
    const itemsLength = itemsList?.length ?? 0;
    const ListLength = list?.length ?? 0;

    if (forEditList && itemsLength + 1 === ListLength) {
      fetchNextPage();
    }
    if (itemsLength - 1 === ListLength) {
      queryClient.removeQueries(["itemsList", listId]);
      refetch({ refetchPage: (page, index) => index === 0 });
    }
  }, [
    itemsList?.length,
    list?.length,
    forEditList,
    fetchNextPage,
    listId,
    refetch,
    queryClient,
  ]);

  if (isLoading) return <Spinner />;

  if (!listId || !itemsList || !itemsList?.length || !itemsList[0])
    return <EmptyList />;

  return (
    <section className="mt-5 relative z-10">
      <div className="flex justify-between items-center border-b border-slate-600 pb-5">
        <div>
          <h3 className="bg-bluish-black text-gray-400 text-lg px-6 py-2 rounded-full font-medium text-center">
            {itemsList?.length < list.length
              ? `1-${itemsList?.length} ${
                  itemsList?.length <= 1 ? "title" : "titles"
                } / ${list.length}`
              : `${list.length} ${list.length <= 1 ? "title" : "titles"}`}
          </h3>
        </div>
        <div className="flex items-center gap-5">
          {!forEditList && <EditListButton listId={listId} />}
          <OptionsSelector />

          <button
            className={`w-9 h-9 rounded-full flex justify-center items-center  ${
              isGridView
                ? "bg-bluish-black text-gray-500 cursor-not-allowed"
                : "hover:bg-slate-600 cursor-pointer"
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}
          >
            <BsFillGrid3X3GapFill size={20} />
          </button>
          <button
            className={`w-9 h-9 rounded-full flex justify-center items-center  ${
              !isGridView
                ? "bg-bluish-black text-gray-500 cursor-not-allowed"
                : "hover:bg-slate-600 cursor-pointer"
            }`}
            onClick={() => setIsGridView(false)}
            disabled={!isGridView}
          >
            <FaListUl size={20} />
          </button>
        </div>
      </div>

      <div>
        {isGridView ? (
          <div className="grid grid-cols-4 gap-10 py-14">
            {itemsList[0] &&
              itemsList?.map((item) => {
                return (
                  <ShowCard
                    key={item?.id}
                    show={item}
                    parentShowId={
                      item?.air_date &&
                      targetList.filter(
                        (show) => show?.item_id == item?.id
                      )?.[0]?.parent_id
                    }
                    category={
                      item?.title ? "movie" : item?.air_date ? "episode" : "tv"
                    }
                    forEditList={forEditList}
                    deleteShow={forEditList ? handleDeleteItem : null}
                    isDeleting={isDeleting}
                  />
                );
              })}
          </div>
        ) : (
          <div className="grid grid-flow-row gap-10 py-14">
            {itemsList?.map((item, index) => {
              return (
                <ShowCardRow
                  key={item?.id || index}
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
                  isDeleting={isDeleting}
                />
              );
            })}
          </div>
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center w-full">
          <LoadMoreButton
            isFetching={isFetchingNextPage}
            fetchMore={fetchNextPage}
          />
        </div>
      )}
    </section>
  );
};

export default ListView;
