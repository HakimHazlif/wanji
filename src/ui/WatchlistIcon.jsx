import { useLists } from "../features/lists/useLists";
import { useSelector } from "react-redux";
import { BsBookmarkCheckFill, BsBookmarkPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAddShow } from "../features/lists/useAddShow";
import SpinnerMini from "../ui/SpinnerMini";

const WatchlistIcon = ({ id }) => {
  const [isWatched, setIsWatched] = useState();
  const { lists } = useLists();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isAdding, error, addShow } = useAddShow();

  const watchelist = lists
    ? lists.filter((item) => item.name === "watchlist")[0]
    : null;

  function handleAddToWatchlist() {
    if (isLoggedIn && watchelist) {
      const listId = watchelist.id;
      addShow({ id, listId });
    }
  }

  useEffect(() => {
    const watched = watchelist?.items_list.some((item) => item.item_id == id);

    if (watched) {
      setIsWatched(watched);
    }
  }, [setIsWatched, id, watchelist?.items_list]);

  if (isAdding) return <SpinnerMini />;

  return (
    <>
      {isWatched ? (
        <BsBookmarkCheckFill className=" text-transparent-amber hover:text-orange-amber text-5xl" />
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
