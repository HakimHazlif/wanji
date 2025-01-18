import { useLists } from "./useLists";
import { useSelector } from "react-redux";
import { BsBookmarkCheckFill, BsBookmarkPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAddShow } from "./useAddShow";
import SpinnerMini from "../../ui/SpinnerMini";
import { useDeleteShow } from "./useDeleteShow";

const WatchlistIcon = ({ id, type }) => {
  const [isWatched, setIsWatched] = useState();
  const { watchlist, isLoading } = useLists();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addShow({ id, listId, type: type });
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteShow({ id, listId });
    }
  }

  useEffect(() => {
    const watched = watchlist?.items_list.some((item) => item.item_id == id);

    setIsWatched(watched);
  }, [setIsWatched, id, watchlist?.items_list]);

  if (isAdding || isDeleting || isLoading) return <SpinnerMini />;

  return (
    <>
      {isWatched ? (
        <BsBookmarkCheckFill
          className=" text-transparent-amber hover:text-orange-amber text-5xl cursor-pointer duration-300 transition-colors ease-linear"
          onClick={handleDeleteFromWatchlist}
        />
      ) : (
        <BsBookmarkPlusFill
          className="text-5xl text-transparent-amber hover:text-orange-amber cursor-pointer duration-300 transition-colors ease-linear"
          onClick={handleAddToWatchlist}
        />
      )}
    </>
  );
};

export default WatchlistIcon;
