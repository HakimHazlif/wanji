import { useSelector } from "react-redux";
import { useItemStatus } from "../hooks/useItemStatus";
import { useListsContext } from "../../../context/ListsContext";
import { useLists } from "../hooks/useLists";
import { useAddVisualMedia } from "../hooks/useAddVisualMedia";
import { useDeleteVisualMedia } from "../hooks/useDeleteVisualMedia";
import SpinnerMini from "../../../ui/SpinnerMini";
import { BsBookmarkCheckFill, BsBookmarkPlus } from "react-icons/bs";

const WatchlistButton = ({
  item,
  iconSize = "md:text-xl sm:text-lg text-base",
  width = "md:w-[100px] sm:w-[92px] w-[85px]",
}) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { isLoading: isStatusLoading } = useItemStatus();

  const { itemsStatusMap, setItemsStatusMap } = useListsContext();
  const { itemId, type, parentId, episode, season } = item;

  const isWatchlist = itemsStatusMap?.[type]?.get(itemId)?.inWatchlist ?? false;

  const { watchlist, isLoading } = useLists();
  const { isLoading: isAdding, addVisualMedia } = useAddVisualMedia(type);
  const { isLoading: isDeleting, deleteVisualMedia } =
    useDeleteVisualMedia(type);

  function handleAddToWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      addVisualMedia(
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
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: true,
                  inFavorites: false,
                  rating: null,
                });
              else newMap.get(itemId).inWatchlist = true;

              return {
                ...prev,
                [type]: newMap,
              };
            });
          },
        }
      );
    }
  }
  function handleDeleteFromWatchlist() {
    if (isLoggedIn && watchlist) {
      const listId = watchlist.id;
      deleteVisualMedia(
        { id: itemId, listId: listId, type },
        {
          onSuccess: () => {
            setItemsStatusMap((prev) => {
              const newMap = new Map(prev[type]);

              if (!newMap.has(itemId))
                newMap.set(itemId, {
                  inWatchlist: false,
                  inFavorites: false,
                  rating: null,
                });
              else newMap.get(itemId).inWatchlist = false;

              return {
                ...prev,
                [type]: newMap,
              };
            });
          },
        }
      );
    }
  }

  let content;
  if (isAdding || isDeleting || isLoading || isStatusLoading) {
    content = <SpinnerMini iconSize={iconSize} />;
  } else {
    if (isWatchlist) {
      content = (
        <>
          <BsBookmarkCheckFill className={`text-gray-200 ${iconSize}`} />
        </>
      );
    } else {
      content = (
        <>
          <BsBookmarkPlus className={`text-gray-200 ${iconSize}`} />
        </>
      );
    }
  }

  return (
    <button
      className={`${
        isWatchlist
          ? "bg-amber-500 hover:bg-amber-400"
          : "bg-slate-700 hover:bg-slate-600"
      } ${width} py-2 font-bold rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg`}
      onClick={isWatchlist ? handleDeleteFromWatchlist : handleAddToWatchlist}
      disabled={isLoading || isAdding || isDeleting}
    >
      {content}
    </button>
  );
};

export default WatchlistButton;
