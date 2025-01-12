import { useLists } from "../features/lists/useLists";
import { useSelector } from "react-redux";
import { BsBookmarkCheckFill, BsBookmarkPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAddShow } from "../features/lists/useAddShow";
import SpinnerMini from "../ui/SpinnerMini";
import { useDeleteShow } from "../features/lists/useDeleteShow";

const WatchlistIcon = ({ id }) => {
  const [isWatched, setIsWatched] = useState();
  const { lists } = useLists();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isAdding, addShow } = useAddShow();
  const { isLoading: isDeleting, deleteShow } = useDeleteShow();

  const watchlist = lists
    ? lists.filter((item) => item.name === "watchlist")[0]
    : null;

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addShow({ id, listId });
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

  if (isAdding || isDeleting) return <SpinnerMini />;

  return (
    <>
      {isWatched ? (
        <BsBookmarkCheckFill
          className=" text-transparent-amber hover:text-orange-amber text-5xl"
          onClick={handleDeleteFromWatchlist}
        />
      ) : (
        <BsBookmarkPlusFill
          className="text-5xl text-transparent-amber hover:text-orange-amber"
          onClick={handleAddToWatchlist}
        />
      )}
    </>
  );
};

export default WatchlistIcon;
