import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { fetchItemsList } from "../services/apiLists";
import { useLists } from "../features/lists/useLists";
import ShowCard from "../ui/ShowCard";
import SpinnerMini from "../ui/SpinnerMini";

const ListView = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  // don't forget to add error rendering
  const { items, nextStartPoint, hasMore, loading } = useSelector(
    (state) => state.lists.lists[listId]
  ) || {
    items: [],
    nextStartPoint: 0,
    hasMore: false,
  };

  const { lists } = useLists();

  const targetList =
    lists && lists?.filter((list) => list.id === listId)?.[0]?.items_list;

  // render if lists not exist

  const loadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchItemsList(listId, targetList, nextStartPoint));
    }
  };

  // console.log(episodeParentId);

  useEffect(() => {
    if (items?.length !== targetList?.length) {
      dispatch(fetchItemsList(listId, targetList, 0));
    }
  }, [listId, targetList, dispatch, items?.length]);

  if (!listId) return <p>Empty</p>;

  return (
    <div>
      {items && (
        <>
          <div className="grid grid-cols-4 gap-10 py-14">
            {items.map((item) => {
              return (
                <ShowCard
                  show={item}
                  key={item.id}
                  category={item["title"] ? "movie" : "tv"}
                />
              );
            })}
          </div>
          {hasMore && (
            <button
              className="w-full py-2 font-bold text-lg bg-orange-amber"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? <SpinnerMini /> : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ListView;
