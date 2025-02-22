import { useSelector } from "react-redux";
import { useLists } from "./useLists";
import { useAddShow } from "./useAddShow";
import { useDeleteShow } from "./useDeleteShow";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import SpinnerMini from "../../ui/SpinnerMini";
import { useListsContext } from "../../context/ListsContext";

const WatchlistButton = ({ item }) => {
  const { isLoggedIn } = useSelector((state) => state.user);

  const { itemsStatusMap, setItemsStatusMap } = useListsContext();
  const { itemId, type, parentId, episode, season } = item;

  const isWatchlist = itemsStatusMap?.[type]?.[itemId]?.inWatchlist ?? false;

  const { watchlist, isLoading } = useLists();
  const { isLoading: isAdding, addShow } = useAddShow(type);
  const { isLoading: isDeleting, deleteShow } = useDeleteShow(type);

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addShow(
        {
          id: itemId,
          listId,
          type,
          parentId,
          episode,
          season,
        },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                [itemId]: {
                  ...prev[type]?.[itemId],
                  inWatchlist: true,
                },
              },
            }));
          },
        }
      );
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteShow(
        { id: itemId, listId: listId, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => ({
              ...prev,
              [type]: {
                ...prev[type],
                [itemId]: {
                  ...prev[type]?.[itemId],
                  inWatchlist: false,
                },
              },
            }));
          },
        }
      );
    }
  }

  let content;
  if (isAdding || isDeleting || isLoading) {
    content = <SpinnerMini />;
  } else {
    if (isWatchlist) {
      content = (
        <>
          <BsBookmarkCheckFill className="text-gray-200 md:text-xl sm:text-lg text-base" />
        </>
      );
    } else {
      content = (
        <>
          <BsBookmarkPlus className="text-gray-200 md:text-xl sm:text-lg text-base" />
        </>
      );
    }
  }

  return (
    <Tooltip title={isWatchlist ? "Delete from Watchlist" : "Add to Watchlist"}>
      <span>
        <button
          className={`${
            isWatchlist
              ? "bg-amber-500 hover:bg-amber-400"
              : "bg-slate-700 hover:bg-slate-600"
          } md:w-[100px] sm:w-[92px] w-[85px] py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg`}
          onClick={
            isWatchlist ? handleDeleteFromWatchlist : handleAddToWatchlist
          }
          disabled={isLoading || isAdding || isDeleting}
        >
          {content}
        </button>
      </span>
    </Tooltip>
  );
};

export default WatchlistButton;
