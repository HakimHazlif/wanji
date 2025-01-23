import { useLists } from "./useLists";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkCheckFill, BsBookmarkPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAddShow } from "./useAddShow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteShow } from "./useDeleteShow";

import { clearLists } from "./listsSlice";

const WatchlistIcon = ({ item }) => {
  const dispatch = useDispatch();
  const { itemId, type, parentId, episode, season } = item;
  // const { id } = useParams();
  const [isWatched, setIsWatched] = useState();
  const { watchlist, isLoading } = useLists();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addShow({
        id: itemId,
        listId,
        type,
        parentId,
        episode,
        season,
      });

      dispatch(clearLists());
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteShow({ id: itemId, listId, parentId: parentId });

      dispatch(clearLists());
    }
  }

  useEffect(() => {
    const watched = watchlist?.items_list.some((el) => el.item_id == itemId);

    setIsWatched(watched);
  }, [setIsWatched, itemId, watchlist?.items_list]);

  if (isAdding || isDeleting || isLoading) return <SpinnerMini />;

  return (
    <>
      {isWatched ? (
        <BsBookmarkCheckFill
          className=" text-transparent-amber hover:text-orange-amber w-10 h-10 cursor-pointer duration-300 transition-colors ease-linear"
          onClick={handleDeleteFromWatchlist}
        />
      ) : (
        <BsBookmarkPlusFill
          className="w-10 h-10 text-slate-300 hover:text-orange-amber cursor-pointer duration-300 transition-colors ease-linear"
          onClick={handleAddToWatchlist}
        />
      )}
    </>
  );
};

export default WatchlistIcon;
